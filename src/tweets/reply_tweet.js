/*
*This class builds the content of the tweet ready for a reply
*/
'use strict';

const findModifier = require('../find_modifier');

class ReplyTweet {
  constructor(request_tweet, image) {
    this.request_tweet = request_tweet;
    this.image = image;
  }

  async getText() {
    let image_object = await this.image;
   /*If a Fitzpatrick modifier is found in the request tweet, combines it with the image key*/
    let modifier = findModifier(image_object.key, this.request_tweet.getText());
    //return a reply in text.
    return modifier ? `@${this.request_tweet.getScreenName()} ${image_object.key + modifier} ${image_object.url} ${image_object.author}` : `@${this.request_tweet.getScreenName()} ${image_object.key} ${image_object.url} ${image_object.author}`;
  }
  getInReplyToStatusID() {
    return this.request_tweet.getStatusID();
  }
  replyScreenName(){
  return `@${this.request_tweet.getScreenName()}`;
 }
}

module.exports = ReplyTweet;
