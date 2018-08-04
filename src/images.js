'use strict';
var path = require('path'),
request= require('request-promise');
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
/* return a randomly selected emoji*/
   getRandom() {
    let completeKeys = getCompleteKeys(this.records);
    let allowedKeys = getAllowedKeys(completeKeys);
    let key = randomMember(allowedKeys);
    console.log("emogi in text: " + key);
    return getImage(this.records, key);
  }
/*returns image object and takes emoji.text as param*/
   getFromText(text) {
    let keys = getSortedKeys(this.records);
    console.log("text sent to getFromTtext: " + text);
    let key = keys.find((key) => {
      key = getBaseCodepoint(key);
      return text.indexOf(key) !== -1;
    });
    console.log("emogi in text: " + key);
    return getImage(this.records, key);
  }
}

/*return randomly selected an object image */
async function getImage(records, key) {
  var response, image, response2, image_license;
  var parse_wikitext, response3;
  let urls = records[key];

  if (urls === undefined) {
    return null; // record not found
  } else if (urls.length === 0) {
    return new ImageIncomplete(key);
  }

  let url = randomMember(urls);
  //split url to have the file name
  let image_name = url.split(":");
  //build api query to get the image url
  let query = "https://commons.wikimedia.org/w/api.php?action=query&format=json&formatversion=2&prop=imageinfo&iiprop=url&iiurlwidth=500&iiurlheight=500&titles=File:" + image_name[2];
  //build api query to get the image lisence
  let query2 = "https://commons.wikimedia.org/w/api.php?action=query&format=json&formatversion=2&prop=imageinfo&iiprop=url&titles=File:" + image_name[2] + "&iiprop=extmetadata";
  //build api query to get the image author
  let query3 = "https://commons.wikimedia.org/w/api.php?action=parse&format=json&formatversion=2&prop=wikitext&page=File:" + image_name[2];

  try {
    //query the commons api and get the response in json
    response = await request(query, { json: true }, logUrl);
    response2 = await request(query2, { json:true }, logUrl);
    response3 = await request(query3, {json:true}, logUrl);
  }catch(err) {
    console.log("Response error:");
    console.log(err);
  }

  try {
    //read through the json response and get the image in base 64
    image = await request.get({url:response.query.pages[0].imageinfo[0].thumburl, encoding: 'base64'}, logUrl);
    //read through the response and get the license and author information
    image_license = response2.query.pages[0].imageinfo[0].extmetadata.LicenseShortName.value;
    //read through the reponse and get the wikitext that contains the author name.
    parse_wikitext = response3.parse.wikitext;
  }catch(err) {
    console.log("save error: ")
    console.log(err);
  }
  let licence_url = response2.query.pages[0].imageinfo[0].extmetadata.licenceUrl.value;
  let image_Author = getImageAuthor(parse_wikitext);
  let signature = "By "+image_Author+" under "+image_license + " " + licence_url;

  return new Image(key, url, image, signature);
}

/*request call back function*/
function logUrl(err, res, body) {
  if (err) { return console.log(err); }
  console.log("Processing requests...");
}

/*returns the author name from the wikitext of the image page*/
function getImageAuthor(wikitext) {
  //return if wikitext is empty
  if(!wikitext) {
    return "Undefined Author";
  }
  //store all parameters in an array
  let parameters = wikitext.split('|');
  //loop trough the array and return the value of the author
  var index;
  for(index = 0; index < parameters.length; index++) {
    if(parameters[index].search("Author") != -1 || parameters[index].search("author") != -1) {
      //Bug: Can use regular expresions to eliminate all un necesary characters.
      let parameter = parameters[index].replace("[", "");
      parameter = parameter.replace("]", "");
      let author = parameter.split("=");
      return author[1];
    }
  }

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