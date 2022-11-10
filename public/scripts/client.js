/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
  const renderTweets = function(tweets) {
    // loops through tweets
    for (let tweet of tweets) {
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
            <a>${timeago.format(tweet.created_at)}</a>
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

  $('form').on('submit', function(event) {
    event.preventDefault();
    const formData = $(this).serialize();

    const textAreaInput = $('textarea').val()
    const textAreaLength = (textAreaInput.length)
    if(!textAreaLength) {
      return alert("Your Tweet is empty!") 
    }
    if (textAreaLength > 140) {
      return alert("Your Tweet is too long!")
    }

    let url = '/tweets';

    $.ajax({
      url: url,
      method: "POST",
      data: formData,
    }).then(() => {
      loadTweets();
    });

    this.reset();
  });

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then((tweetsData) => {
        renderTweets(tweetsData);
      });
  };


  loadTweets();
});