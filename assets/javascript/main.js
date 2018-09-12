$(document).ready(function(){
var topics = ["MLB", "NHL", "NFL", "Skateboarding", "Golf", "NBA"];
var newTopic = "";
var a = $("<button>"); 


function topicsButton () {

    $(".item").empty();

    for (var i = 0; i < topics.length; i++) {
       

      a = $("<button>" + topics[i] + "</button>").addClass("btn btn-success").attr("data-name", topics[i]);

      $(".item").append(a);
    };
    
}

topicsButton();


$("#newTopic").on("click", function() {
    event.preventDefault();
    console.log("submit");
    newTopic = $("topic-input").val();
$("#item").append(newTopic);
topics.push(newTopic);
console.log(topics);
$("#topic-input").empty();
topicsButton();
});

$(document).on("click", "button", function() {
    $("#gifs").empty();
    var b = $(this).attr("data-name");
console.log("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + b + "&api_key=Eo5t7vS8W5Hvtp9WS7xjCTVWyqqrixGo&limit=10";
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function(response) {
        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
         var gifDiv = $('<div>');
        var rating = results[i].rating;
        var r = $("<p>").text("Rating: " + rating);
        var gifImage = $('<img>');

        gifImage.attr('src', results[i].images.fixed_height_still.url);
        gifImage.attr('data-still', results[i].images.fixed_height_still.url);
        gifImage.attr('data-animate', results[i].images.fixed_height.url)
        gifImage.attr('data-state', "still")
        gifImage.addClass("gif");

        gifDiv.append(r)
        gifDiv.append(gifImage);
        $("#gifs").prepend(gifDiv);
        }
    });
    
});

$("#gifs").on("click", ".gif", function(event) {
    event.preventDefault();
    var state= $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"))
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"))
        $(this).attr("data-state", "still");
    }
});

});