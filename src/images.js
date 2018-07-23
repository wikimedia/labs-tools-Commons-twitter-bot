'use strict';
var fs = require('fs'),
path = require('path'),
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

   getRandom() {
    let completeKeys = getCompleteKeys(this.records);
    let allowedKeys = getAllowedKeys(completeKeys);
    let key = randomMember(allowedKeys);
    console.log("emogi in text: " + key);
    key = "🦋";
    return getImage(this.records, key);
  }
//returns image object and takes emoji.text as param
   getFromText(text) {
    let keys = getSortedKeys(this.records);
    console.log("text sent to getFroTtext: " + text);
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
  var response, image;
  let urls = records[key];

  if (urls === undefined) {
    return null; // record not found
  console.log(key);
  } else if (urls.length === 0) {
  console.log(key);
    return new ImageIncomplete(key);
  }
  console.log(key);
  let url = randomMember(urls);
  console.log(url[1])
  //split url to have the file name
  let image_name = url[0].split(":");
  //build api query
  let query = "https://commons.wikimedia.org/w/api.php?action=query&format=json&formatversion=2&prop=imageinfo&iiprop=url&iiurlwidth=500&iiurlheight=500&titles=File:" + image_name[2];
  console.log(query);
  console.log("before request");
  try{
    response = await request(query, { json: true }, logUrl);
  }catch(err){
    console.log("Response error:");
    console.log(err);
  }
  try{
    image = await request.get({url:response.query.pages[0].imageinfo[0].thumburl, encoding: 'base64'}, logUrl);
  }catch(err){
    console.log("save error: ")
    console.log(err);
  }

  return new Image(key, url[0], image, url[1]);
}

function logUrl(err, res, body){
  if (err) { return console.log(err); }
  //image url
  console.log("Processing requests...");
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
 @return {String}
 */
function getBaseCodepoint(character) {
  return character.replace(VARIATION_SELECTOR_MATCHER, '');
}

module.exports = Images;
