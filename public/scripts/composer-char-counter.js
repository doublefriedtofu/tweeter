$(document).ready(function() {
  // for ID
  $('#tweet-text').on("keyup keydown", function() {
    const maxLength = 140 - $(this).val().length;
    if (maxLength < 0) {
      $('.counter').css("color", "red");
    } else {
      $('.counter').css("color", "#545149");
    }
    $('.counter').text(maxLength);
  });
});
