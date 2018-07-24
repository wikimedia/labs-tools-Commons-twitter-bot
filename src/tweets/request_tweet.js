/*
*This class checks if the bot has recieved a tweet, if the tweet is eligible
*for a reply and also provides the tweet information like, tweeter userhandle
*tweet id, the emoji and also check if the reply has been done
*/

'use strict';

class RequestTweet {
  constructor(payload) {
    this.payload = payload;
  }
/*check if the bot should reply to user tweet*/
  shouldReply() {
    return this.isMentioned() && !this.isRetweet();
  }
/*returns emoji in text*/
  getText() {
    return this.payload.text;
  }
/*return id of the tweet*/
  getStatusID() {
    return this.payload.id_str;
  }
/*return username tweeter handle*/
  getScreenName() {
    return this.payload.user.screen_name;
  }
/*check if the the bot was tweeted to*/
  isMentioned(screen_name) {
    screen_name = screen_name || process.env.TWITTER_SCREEN_NAME;
    let mentions = this.payload.entities.user_mentions;

    return !!mentions.find((mention) => {
      return mention.screen_name === screen_name;
    });
  }
/*check if the bot has reply to tweet*/
  isRetweet() {
    return !!this.payload.retweeted_status;
  }
}

module.exports = RequestTweet;
