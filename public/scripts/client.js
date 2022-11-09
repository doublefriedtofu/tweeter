/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

$(document).ready(function() {
  const renderTweets = function(tweets) {
    // loops through tweets
    for (let tweet of tweets) {
      console.log('tweet:', tweet);
      // calls createTweetElement for each tweet
      const tweetElement = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweet-container').append(tweetElement);
    }
  };

  const createTweetElement = function(tweet) {
    let $tweet = /* Your code for creating the tweet element */
      `<div class="tweet">
        <header>
          <div>
            <img class="eachTweet" src="${tweet.user.avatars}">
            <a>${tweet.user.name}</a>
          </div>
          <div class="headerName">
            <a>${tweet.user.handle}</a>
          </div>
        </header>
        
        <div class="theTweet">
        ${tweet.content.text}
        </div>
        
        <div class="tweets-container"></div>
        
        <footer>
          <div class="date">
            <a>${tweet.created_at}</a>
          </div>
          <div>
            <button class="fa-solid  fa-flag"></button>
            <button class="fa-solid fa-retweet"></button>
            <button class="fa-solid fa-heart"></button>
          </div>
        
        </footer>
        </div>`;

    return $tweet;
  };

  renderTweets(data);
});