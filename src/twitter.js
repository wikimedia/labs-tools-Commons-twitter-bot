'use strict';

const Twit = require('twit');

const twit = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const Twitter = {
  post: (status_tweet) => {
    update({ status: status_tweet.getText(), image: status_tweet.getImage() });
  },

  reply: (reply_tweet) => {
    update({ status: reply_tweet.getText(), in_reply_to_status_id: reply_tweet.getInReplyToStatusID() });
  },

//returns event listener
  stream: () => {
    return twit.stream('user');
  }
};

//makes a new tweet
function update(params) {
  
  twit.post('media/upload', params.image, function (err, data, response) {
    if (err){
      console.log('ERROR:');
      console.log(err);
    }
    else{
      console.log('Image uploaded!');
      console.log('tweeting...');

      T.post('statuses/update', {
        media_ids: new Array(data.media_id_string)
      },
        function(err, data, response) {
          if (err){
            console.log('ERROR:');
            console.log(err);
          }
          else{
            console.log('Posted an image!');
          }
        }
      );
    }
  });
}

module.exports = Twitter;
