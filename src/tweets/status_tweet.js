'use strict';

class StatusTweet {
	//constructor takes an image object
  constructor(image) {
    this.image = image;
  }

/*return image key and url*/
  getText() {
    return `${this.image.getKey()} ${this.image.toString()}`;
  }
  getImage(){
    return `${this.image.getImage()}`;
  }
}

module.exports = StatusTweet;
