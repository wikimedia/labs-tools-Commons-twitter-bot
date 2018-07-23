'use strict';
var fs = require('fs');

class Image {
  constructor(key, url, image, author) {
    this.key = key;
    this.url = url;
    this.image = image;
    this.author = author;
  }

  getKey() {
    return this.key;
  }

  toString() {
    return this.url;
  }

  getImage() {
    return this.image;
  }
  getAuthor(){
    return this.author;
  }
}

module.exports = Image;
