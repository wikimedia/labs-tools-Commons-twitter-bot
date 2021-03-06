/*
*This script executes the bot reply
*/

'use strict';

const Images = require('../src/images');
const Twitter = require('../src/twitter');
const ReplyTweet = require('../src/tweets/reply_tweet');
const RequestTweet = require('../src/tweets/request_tweet');

let stream = Twitter.stream();

/*payload execute after an event tweet*/
stream.on('tweet', (payload) => {
  let request_tweet = new RequestTweet(payload);
/*if tweet is eligible to a reply, reply to tweet*/
  if (request_tweet.shouldReply()) {
    let image = new Images().getFromText(request_tweet.getText());
    if (!image) { return; }

    let reply_tweet = new ReplyTweet(request_tweet, image);
    Twitter.reply(reply_tweet);
  }
});

stream.on('error', (payload) => {
  console.error(payload);
});
