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
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    let $tweet = /* Your code for creating the tweet element */
      `<div class="tweet">
        <header>
          <div>
            <img class="userAvatar" src="${tweet.user.avatars}">
            <a class="userName">${tweet.user.name}</a>
          </div>
          <div class="userHandle">
            <a>${tweet.user.handle}</a>
          </div>
        </header>
        
        <div class="theTweet">
        <a><strong>${escape(tweet.content.text)}</strong></a>
        </div>
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

    const textAreaInput = $('textarea').val();
    const textAreaLength = (textAreaInput.length);


    if (!textAreaLength) {
      $("#error-empty").slideDown("fast").delay(1500).slideUp("slow");
      return;
    }
    if (textAreaLength > 140) {
      $("#error-tooLong").slideDown("fast").delay(1500).slideUp("slow");
      return;
    }
    let url = '/tweets';

    $.ajax({
      url: url,
      method: "POST",
      data: formData,
    }).then(() => {
      loadTweets();
    });

    const textarea = document.getElementById('tweet-text');
    const counter = document.getElementById('counter');

    textarea.value = "";
    counter.value = 140;
  });

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then((tweetsData) => {
        renderTweets(tweetsData);
      });
  };


  loadTweets();
});