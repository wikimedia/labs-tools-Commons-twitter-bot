'use strict';
var fs = require('fs');

class Image {
  constructor(key, url, image) {
    this.key = key;
    this.url = url;
    this.image = image;
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
}

module.exports = Image;
