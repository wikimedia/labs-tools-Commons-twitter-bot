'use strict';

class RequestTweet {
  constructor(payload) {
    this.payload = payload;
  }

  shouldReply() {
    return this.isMentioned() && !this.isRetweet();
  }
//returns emoji in text
  getText() {
    return this.payload.text;
  }

  getStatusID() {
    return this.payload.id_str;
  }

  getScreenName() {
    return this.payload.user.screen_name;
  }
//check if the the bot was tweeted
  isMentioned(screen_name) {
    screen_name = screen_name || process.env.TWITTER_SCREEN_NAME;
    let mentions = this.payload.entities.user_mentions;

    return !!mentions.find((mention) => {
      return mention.screen_name === screen_name;
    });
  }
//check if the bot has reply to tweet
  isRetweet() {
    return !!this.payload.retweeted_status;
  }
}

module.exports = RequestTweet;
