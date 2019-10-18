            // Initial array of topics
            var topics = ["Dog", "Cat", "Goat", "Turtle", "Sheep", "Cow", "Skunk", "Bird", "Fish", "Raccoon", "Possum", "Lizard"];

            //displayGifs();

            function displayGifs() {

                // queryURL for Giphy API
                var topic = $(this).attr("data-name");
                console.log("looking up info on " + topic);

                var queryURL = "https://api.giphy.com/v1/gifs/search?q=cute+" + topic + "&limit=10&api_key=KoLknmRTMIRcsRhLhOdl1cKs11fcWVkR";


                //// Step 1 - Data retreival etc. Refer to working-movie-app-easier for refernce. Store the AJAX request in the results variable
                //// Step 2 - Loop through the "topics" array and display the images. Refer to dynamic-elements-solution for reference. 
                //// Step 3 - Add the if, else statement to the on click event ($(".gif").on("click", function()). Refer to pausing-gifs-solutions
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    $("#images").empty();
                    console.log(response);
                    // console.log(response.data.images.fixed_height_downsampled.url);
                    var results = response.data;

                    for (var i = 0; i < results.length; i++) {

                        // Creating and storing a div tag
                        var imageDiv = $("<div>");

                        // Creating a paragraph tag with the result item's rating
                        var p = $("<p>").text("Rating: " + results[i].rating);
                        // Creating and storing an image tag
                        // Saving the image
                        // var imageURL = response.data.url;

                        // animated image: results[i].images
                        var imageUrl = results[i].images.fixed_height_still.url;
                        var imageAnimateUrl = results[i].images.fixed_height_downsampled.url;
                        console.log("Still State image is " + imageUrl);
                        console.log("Animated State image is " + imageAnimateUrl);
                        // // Creating and storing img tag
                        var imageTopic = $("<img>");

                        // // Setting the image attributes to imageUrl
                        imageTopic.attr({
                            src: imageUrl,
                            alt: "image topic",
                            "data-still": imageUrl,
                            "data-animate": imageAnimateUrl,
                            "data-state": "still",
                            "class": "gif"
                        });

                        // Appending the paragraph and image tag to the imageDiv
                        imageDiv.append(p);
                        imageDiv.append(imageTopic);

                        // // // Prepending the imageTopic to the "#images" div
                        $("#images").prepend(imageDiv);


                    } $(".gif").click(function () {
                        // console.log("here");

                        var state = $(this).attr("data-state");
                        // console.log("This is the current state of this click: " + state);
                        // console.log("I clicked the image!");
                        /// PICK UP HERE revist the if statement - this may be the issue   
                        if (state === "still") {
                            console.log("It's Still");
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                            // console.log("This should be animate " + state);
                        } else if (state === "animate") {
                            console.log("Its animated");
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                        }
                    });

                });

            }
            function createButtons() {
                // Empty previously created buttons 
                //NOTE: not sure I need this code
                //$("#buttons-view").empty();

                // Looping through the arrqay of topics
                for (var i = 0; i < topics.length; i++) {
                    console.log("Inside createButtons function " + topics[i]);
                    // Dynamically create buttons for each topic in the array
                    var a = $("<button>");
                    // Add a class
                    a.addClass("topic");
                    a.addClass("btn btn-primary")
                    // Add a data-attribute with the value of the topic at index i
                    a.attr("data-name", topics[i]);
                    // Provide the button's text with the value of the topics at index i
                    a.text(topics[i]);
                    // Add the button to the buttons-view div
                    $("#buttons-view").append(a);
                }
            };
             // This function handles events where a movie button is clicked
    //   $("#add-animal").on("click", function(event) {
    //     event.preventDefault();
    //     // This line grabs the input from the textbox
    //     var topic = $("#animal-input").val().trim();

    //     // Adding movie from the textbox to our array
    //     topics.push(topic);

    //     // Calling createButtons which handles the processing of our topics array
    //     createButtons();
    //   });


            $(document).on("click", ".topic", displayGifs);
            createButtons();





