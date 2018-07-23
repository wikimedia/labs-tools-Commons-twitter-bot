'use strict';

const findModifier = require('../find_modifier');

class ReplyTweet {
  constructor(request_tweet, image) {
    this.request_tweet = request_tweet;
    this.image = image;
  }

  async getText() {
    let image_object = await this.image;
    let modifier = findModifier(image_object.key, this.request_tweet.getText());
    return modifier ? `@${this.request_tweet.getScreenName()} ${image_object.key + modifier} ${image_object.url} ${image_object.author}` : `@${this.request_tweet.getScreenName()} ${image_object.key} ${image_object.url} ${image_object.author}`;
  }

  /**
   * If a Fitzpatrick modifier is found in the request tweet, combines it with the image key
   */
  async getEmojiWithModifier() {
    let hello = await this.image;
    let key = hello.key;
    let modifier = findModifier(key, this.request_tweet.getText());
    return modifier ? (key + modifier) : key;
  }

  getInReplyToStatusID() {
    return this.request_tweet.getStatusID();
  }
  replyScreenName(){
  return `@${this.request_tweet.getScreenName()}`;
 }
}

module.exports = ReplyTweet;
