
var url = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1"
var quoteText = "";
var quoteAuthor ="";
var twitterURL = "https://twitter.com/intent/tweet?text=";
var headers = {
  "X-Mashape-Key": "RVNNIOQLgOmshkGRrOvVu5xjbzURp1kXpWpjsn74mamDf71DKS",
  "Content-Type": "application/x-www-form-urlencoded",
  "Accept": "application/json"
}

function getQuoteFromAPI(){
 $.ajax({
   url: url,
   headers: headers,
   method: "GET",
   cache: false,
   dataType: "json",
   data: {
     "cat": "famous",
     "count": "1"
   },
   //successful callback will allow an API to appear on page
   success: function(data){
     quoteText = data.quote;
     quoteAuthor = data.author;
     $(".quote-text").html(quoteText);
     $(".quote-auth").html(quoteAuthor);
   }
 });
}
//get a quote on page load.
$(document).ready(function() {
  getQuoteFromAPI();
});

// get another quote on click
$(".next-quote").on("click", function(){
  getQuoteFromAPI();
});

//need to convert special characters with percent encoding when passing as URL parameter.
var percentEncoding = {
  "!": "%21",
  "#":"%23",
  "$":"%24",
  "&":"%26",
  "'":"%27",
  "(":"%28",
  ")":"%29",
  "*":"%2A",
  "+":"%2B",
  ",":"%2C",
  "/":"%2F",
  ":":"%3A",
  ";":"%3B",
  "=":"%3D",
  "?":"%3F",
  "@":"%40",
  "[":"%5B",
  "]":"%5D"
};

var cleanedText = function clearPunctuation(text) {
  var quoteWithPercentEncoding = "";
    for(var i = 0; i<text.length; i++) {
      if(percentEncoding.hasOwnProperty(text[i])) {
        quoteWithPercentEncoding += percentEncoding[text[i]];
      } else {
        quoteWithPercentEncoding += text[i];
      }
    }
  return quoteWithPercentEncoding;
}

var quoteAndAuthorToTweet = function quoteAndAuthor (quoteText, quoteAuthor){
  var tweetQuoteAuthor = "";

  //need to account for length of quote, author and empty space, dash, empty space.
  if((quoteText.length + quoteAuthor.length + 3) <= 140){
    tweetQuoteAuthor = quoteText + " - " + quoteAuthor;
    return tweetQuoteAuthor;
  } else {
    var quoteToShorten = quoteText;
    tweetQuoteAuthor = quoteToShorten.substring(0, 140 - (quoteAuthor.length + 6)) + "... - " + quoteAuthor;
    return tweetQuoteAuthor;
  }
}
 // open twitter window
$(".twitter-button").on("click", function(){
  window.open(twitterURL+cleanedText(quoteAndAuthorToTweet(quoteText, quoteAuthor)));
});
