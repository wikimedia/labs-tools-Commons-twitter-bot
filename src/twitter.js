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

  reply: async (reply_tweet) => {
    try{
      reply_tweet.image.then(async function(value){
       // console.log(reply_tweet.getEmojiWithModifier());
        let status_update = await reply_tweet.getText();
        update({ status: status_update+" "+value.key, image: value.image, in_reply_to_status_id: reply_tweet.getInReplyToStatusID() });
      });
    }catch(err){
      console.log(err);
    }
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

      twit.post('statuses/update', {
        status: param.status ,
        media_ids: new Array(data.media_id_string),
        in_reply_to_status_id: param.in_reply_to_status_id
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
