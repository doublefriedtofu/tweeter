/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function() {

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
    .then((tweetsData) => {
      renderTweets(tweetsData);
    });
  };
  
  loadTweets();
  
  const createTweetElement = function(tweet) {
    // included esacpe function to encode the a string. 
    // protects the app from attacks using <script> being rendered
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

  const renderTweets = function(tweets) {
    $('#tweet-container').empty();
    // loops through tweets
    for (let tweet of tweets) {
      // calls createTweetElement for each tweet
      const tweetElement = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweet-container').append(tweetElement);
    }
  };
  
  
  $('form').on('submit', function(event) {
    event.preventDefault();
    const formData = $(this).serialize();
    
    const textAreaInput = $('textarea').val();
    const textAreaLength = (textAreaInput.length);
    
    // error messages if there is no input
    if (!textAreaLength) {
      $("#error-empty").slideDown("fast").delay(1500).slideUp("slow");
      return;
    }
    // error message if there is more than 140 charactor count
    if (textAreaLength > 140) {
      $("#error-tooLong").slideDown("fast").delay(1500).slideUp("slow");
      return;
    }
    let url = '/tweets';
    
    // uploads submitted tweet using ajax
    $.ajax({
      url: url,
      method: "POST",
      data: formData,
    }).then(() => {
      loadTweets();
    });
    
    // resets input and char count after tweet submit
    $('#tweet-text').val('');
    $('#counter').val('140');
  });
});