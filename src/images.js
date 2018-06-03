'use strict';
var fs = require('fs'),
path = require('path'),
request = require('request');
const data = require('../data/images');
const blacklist = require('../data/blacklist');
const Image = require('./image');
const ImageIncomplete = require('./image_incomplete');
const firstBy = require('thenby');

const VARIATION_SELECTOR_MATCHER = /\uFE0F$/;

class Images {
  constructor (records) {
    this.records = records || data;
  }

  getRandom() {
    let completeKeys = getCompleteKeys(this.records);
    let allowedKeys = getAllowedKeys(completeKeys);
    let key = randomMember(allowedKeys);

    return getImage(this.records, key);
  }
//returns image object and takes emoji.text as param
  getFromText(text) {
    let keys = getSortedKeys(this.records);

    let key = keys.find((key) => {
      key = getBaseCodepoint(key);

      return text.indexOf(key) !== -1;
    });

    return getImage(this.records, key);
  }
}

/*return randomly selected an object image */
function getImage(records, key) {
  let urls = records[key];

  if (urls === undefined) {
    return null; // record not found
  } else if (urls.length === 0) {
    return new ImageIncomplete(key);
  }

  let url = randomMember(urls);
  console.log(url)

  //split url to have the file name
  let image_name = url.split(":");

  //build api query
  let query = "https://commons.wikimedia.org/w/api.php?action=query&format=json&formatversion=2&prop=imageinfo&iiprop=url&iiurlwidth=500&iiurlheight=500&titles=File:" + image_name[2];
  
  request(query, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(query);
      //image url
    console.log(body.query.pages[0].imageinfo[0].url);

    //download image with fix size(w:500, h:500)
    download(body.query.pages[0].imageinfo[0].thumburl, body.query.pages[0].title, function(){
      console.log('done');
    });

  });
  //var image_path = path.join(__dirname, '../data/ImagesDownloaded/' + image_name[2]),
  //image = fs.readFileSync(image_path, { encoding: 'base64' });

  return new Image(key, url, image_name[2]);
}

/*returns one random image url from an array of urls */
function randomMember(array) {
  return array[array.length * Math.random() << 0];
}

function getCompleteKeys(records) {
  return Object.keys(records).filter((key) => {
    return records[key].length > 0;
  });
}

/* return keys with the blacklist keys indexed by -1*/
function getAllowedKeys(keys) {
  return keys.filter((key) => {
    return blacklist.indexOf(key) === -1;
  });
}

function getSortedKeys(records) {
  return Object.keys(records).sort(
    firstBy((a, b) => { return b.length - a.length; })
    .thenBy((a, b) => { return records[b].length - records[a].length; })
  );
}
function download(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream('data/ImagesDownloaded'+filename)).on('close', callback);
  });
};

/**
 * Get the base codepoint, without the VS16 variation selector
 *
 * When searching, matching against the base character casts a wider net than the full emoji. In some cases, on some
 * platforms, they're visually identical.
 *
 * For more information, please see: https://en.wikipedia.org/wiki/Emoji#Emoji_versus_text_presentation
 *
 * @param  {String} character
 * @return {String}
 */
function getBaseCodepoint(character) {
  return character.replace(VARIATION_SELECTOR_MATCHER, '');
}

module.exports = Images;
