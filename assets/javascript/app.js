$(document).ready(function () {

    $("#addBtn").on('click', function (event) {
        event.preventDefault();

        var btnName = $("#food-input").val().trim();
        console.log(btnName);
        createNewBtn(btnName);
    });

    // Event listener for all button elements
    $(document).on("click", function (event) {
        event.preventDefault();
        var btnClicked = $(event.target);
        if ($(btnClicked).attr("data-person")) {
            var food = $(btnClicked).attr("data-person");
            searchGiphy(food);
        };
        // In this case, the "this" keyword refers to the button that was clicked

    });

    // Function below is set up to generate new buttons for GIFs to emerge based on the buttons' names

    function createNewBtn(btnTitle) {
        var newBtn = $("<button>");
        newBtn.attr('data-person', btnTitle);
        newBtn.text(btnTitle);
        newBtn.addClass('gif');
        $("#foodButtons").append(newBtn);
    };

    function searchGiphy(searchParam) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            searchParam + "&api_key=bW7yRGFZkMgcjF48i07T13QqxaESHV5M&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After the data comes back from the API
            .then(function (response) {
                // Storing an array of results in the results variable
                var results = response.data;
                // Looping over every result item
                for (var i = 0; i < results.length; i++) {
                    // Only taking action if the photo has an appropriate rating
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                        // Creating a div for the gif
                        var gifDiv = $("<div>");
                        // Storing the result item's rating
                        var rating = results[i].rating;
                        // Creating a paragraph tag with the result item's rating
                        var p = $("<p>").text("Rating: " + rating);
                        // Creating an image tag
                        var foodImage = $("<img>");
                        // Giving the image tag an src attribute of a proprty pulled off the
                        // result item
                        foodImage.attr("src", results[i].images.fixed_height.url);
                        // Appending the paragraph and personImage we created to the "gifDiv" div we created
                        gifDiv.append(p);
                        gifDiv.append(foodImage);
                        // Prepending the gifDiv to the "#images" div in the HTML
                        $("#images").prepend(gifDiv);
                    }
                }
            });
    }


})