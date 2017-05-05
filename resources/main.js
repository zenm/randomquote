var url = "https://quotesondesign.com/wp-json/posts";


$(document).ready(function() {
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
        alert(json[0].content);
        }
      });
    });
    $(".twitter-button").on("click", function(){
      //in progress
      alert("twitter word");
  });
});





//
// $.ajax({
//    url: 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en',
//    data: {
//       format: 'json'
//    },
//    error: function() {
//       $('.quote-text').html('<p>An error has occurred</p>');
//    },
//    dataType: 'application/json',
//    success: function(){
//      alert("word");
//    }
// });



// attempt 03MAY2017
// $.post("https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en", function(json) {
//   $(".quote-text").html(json);
// });


// $.ajax({
//    url: 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?',
//    data: {
//       format: 'jsonp'
//    },
//    error: function() {
//       $('.quote-text').html('<p>An error has occurred</p>');
//    },
//    dataType: 'jsonp',
//    success: function(){
//      alert("word");
//    }




//
// $.get("http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en", function(data){
//   $(".quote_text").html(data);
//   alert( "Load was performed." );
// });
