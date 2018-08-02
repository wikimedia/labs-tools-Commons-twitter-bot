'use strict';

/* Image class holding all information about the image*/
class Image {
  constructor(key, url, image, signature) {
    this.key = key;
    this.url = url;
    this.image = image;
    this.author = signature;
  }
/*returns an emoji*/
  getKey() {
    return this.key;
  }
/*return image url*/
  toString() {
    return this.url;
  }
/*return image in base 64*/
  getImage() {
    return this.image;
  }
/*return image author*/
  getAuthor(){
    return this.author;
  }
}

module.exports = Image;
