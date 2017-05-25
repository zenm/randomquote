var url = "https://quotesondesign.com/wp-json/posts";
var quoteText = "";
var quoteAuthor ="";
var twitterURL = "https://twitter.com/intent/tweet?text=";

$(document).ready(function() {
  $.ajax({
    url: url,
    method: "GET",
    cache: false,
    dataType: "json",
    data: {
      "filter[orderby]" : "rand",
      "filter[posts_per_page]" : 1,
      "callback" : "?"
    },
    success: function(json){
      quoteText = json[0].content;
      quoteAuthor = json[0].title;
      $(".quote-text").html(quoteText);
      $(".quote-auth").html(quoteAuthor);
      console.log(quoteText);
    }
  });
});

$(".next-quote").on("click", function(){
  $.ajax({
    url: url,
    method: "GET",
    cache: false,
    dataType: "json",
    data: {
      "filter[orderby]" : "rand",
      "filter[posts_per_page]" : 1,
      "callback" : "?"
    },
    success: function(json){
      quoteText = json[0].content;
      quoteAuthor = json[0].title;
      $(".quote-text").html(quoteText);
      $(".quote-auth").html(quoteAuthor);
    }
  });
});

var quoteNoTags = function quoteNoTags(quoteText){
  var quoteText = quoteText.substring(3,quoteText.length - 5);
  return quoteText;
}

var quoteAndAuthorToTweet = function quoteAndAuthor (quoteNoTags, quoteAuthor){
  var tweetQuoteAuthor = "";

  //need to account for length of quote, author and empty space, dash, empty space.
  if((quoteNoTags(quoteText).length + quoteAuthor.length + 3) <= 140){
    tweetQuoteAuthor = quoteNoTags(quoteText) + " - " + quoteAuthor;
    return tweetQuoteAuthor;
  } else {
    var quoteToShorten = quoteNoTags(quoteText);
    tweetQuoteAuthor = quoteToShorten.substring(0, 140 - (quoteAuthor.length + 6)) + "... - " + quoteAuthor;
    return tweetQuoteAuthor;
  }
}

$(".twitter-button").on("click", function(){
  window.open(twitterURL+quoteAndAuthorToTweet(quoteNoTags, quoteAuthor));
});
