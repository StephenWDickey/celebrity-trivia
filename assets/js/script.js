// script file to see fetch for yelp

// imdb API key
var key = "k_01ly574i"

// url to API Ninjas Celebrity API
var ninjasUrl = "https://api.api-ninjas.com/v1/celebrity?name="

// Celebrity API key
var ninjasKey = "EbyKJN6Fx+lZBTlMbCLTSw==0t4uz4G3aPpnWFgY"

// targeting some html elements
var submitBtn = document.getElementById("submit-btn");
var clearBtn = document.getElementById("clear-btn");
var clearFavoritesBtn = document.getElementById("clear-favorites-btn");

var mainDiv = document.getElementById("main-content");
var inputEl = document.querySelector("#actor-input");
var mainContainer = document.querySelector(".main-container");
var actorPicContainer = document.querySelector(".pic-container");

var formElement = document.querySelector(".form-container");
var favorites = document.getElementById("favorites");
var favoriteListEl = document.querySelector("#favorites-list");


/////////////////////////////////////////////////////////

// this function saves the current history list
var saveHistory = function(inputHistoryList) {
    var historyList = inputHistoryList
    localStorage.setItem("history", JSON.stringify(historyList));

}

var displayErrorModal = function () {
    // When the user clicks on the button, open the modal
    // mainDiv.classList.remove("has-background-dark");

    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "flex";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        }
    }
}

var loadHistory = function() {
    storedHistoryList = JSON.parse(localStorage.getItem("history"))
    if (!storedHistoryList) {
        loadedHistoryList = []
    } else if (storedHistoryList == []){
        loadedHistoryList = []
    } else {
        var loadedHistoryList = storedHistoryList    
    }
    saveHistory(loadedHistoryList);
    return(loadedHistoryList)
}

var createHistory = function(actorInput) {
    // have actorName become a favorite
    var newListItem = document.createElement("li")
    newListItem.classList.add("favorite-actor", "has-text-dark")
    newListItem.textContent = actorInput
    // this next line keeps pushing to the thing
    favoriteListEl.appendChild(newListItem);
}


var deleteHistory = function(event) {
    event.preventDefault()
    var historyList = [];
    var allFavs = document.querySelectorAll(".favorite-actor");
    allFavs.forEach(actor => {
        actor.remove();
    });
    saveHistory(historyList);
}

// this creates a new history list from the items in storage
var createHistoryFromStorage = function(storageHistory) {
    if (!storageHistory) {
    } else {
        newHistoryList = []
        for (i = 0; i < storageHistory.length; i++) {
            createHistory(storageHistory[i])
            newHistoryList.push(storageHistory[i])
        }
        historyList = newHistoryList
        saveHistory(historyList);
    }
}

// this needs to be edited to work with every time 
var clear = function() {

    if (actorPicContainer.classList.contains("has-text-centered")) {
        
        var divsToDelete = document.querySelectorAll(".cont-to-del")

        var picToDelete = document.querySelector(".inside-item")
        
        mainDiv.classList.remove("has-text-centered");
        
        picToDelete.remove(); 
        
        divsToDelete.forEach(div => {
            
            div.remove();

        });
    }
    
}

var clearButtonHandler = function (event) {

    event.preventDefault();

    clear();
}

var createActorData = function (actorName){

    submitBtn.classList.add("is-loading");

    var imdbUrl = "https://imdb-api.com/en/API/SearchName/k_01ly574i/" + actorName;
    // fetch IMDB
    fetch(imdbUrl).then(function(response) {

        response.json().then(function(data) {

            if (data.errorMessage === "") {

                console.log("success");
            } 
            
            else {

                displayErrorModal();
            }

            // obtain IMDB Actor Id
            var actorId = data.results[0].id

            // search IMDB again for actor page
            var secondImdbUrl = "https://imdb-api.com/API/Name/k_01ly574i/" + actorId;

            fetch(secondImdbUrl).then(function(response) {

                response.json().then(function(data) {

                    
                    
                    
                        submitBtn.classList.remove("is-loading");

                        // create dynamic elements
                        var actorContainer = document.createElement("div");
                        actorContainer.classList.add("card")
                        var actorPic = document.createElement("img");
                        var actorPicHeader = document.createElement("h3");


                        actorPicHeader.textContent = data.name;

                        // src for picture comes from IMDB 

                        actorPic.src = data.image

                        actorPic.classList.add("card-image", "inside-item");

                        actorPicContainer.classList.add("has-text-centered");

                        actorPicHeader.classList.add("card-header", "is-size-3", "has-text-centered", "pic-header", "cont-to-del");


                        // we dynamically generate html elements
                        var actorMovieContainer = document.createElement("div");
                        var actorKnownFor1Container = document.createElement("div");
                        var actorKnownFor2Container = document.createElement("div");
                        var actorKnownFor3Container = document.createElement("div");
                        var actorKnownFor4Container = document.createElement("div");
            

                    

                        // append elements
                        actorPicContainer.appendChild(actorPicHeader);

                        actorPicContainer.appendChild(actorPic);
                
                


                        ////////////////////////////////////////////////////////////////////////////////
                

                        // movie titles from IMDB    
                        // we get movie titles and movie ids
                        var knownFor1 = data.knownFor[0].fullTitle;
                        var knownFor2 = data.knownFor[1].fullTitle;
                        var knownFor3 = data.knownFor[2].fullTitle;
                        var knownFor4 = data.knownFor[3].fullTitle;
                        var knownForId1 = data.knownFor[0].id;
                        var knownForId2 = data.knownFor[1].id;
                        var knownForId3 = data.knownFor[2].id;
                        var knownForId4 = data.knownFor[3].id;


                        actorMovieContainer.classList.add("card", "is-size-4", "cont-to-del", "has-background-info");
                    
                        actorMovieContainer.textContent = "Best known for: ";

                        actorKnownFor1Container.textContent = knownFor1;
                        actorKnownFor1Container.classList.add("known-for-1", "card-content", "cont-to-del");

                        actorKnownFor2Container.textContent = knownFor2;
                        actorKnownFor2Container.classList.add("known-for-2", "card-content", "cont-to-del");

                        actorKnownFor3Container.textContent = knownFor3;
                        actorKnownFor3Container.classList.add("known-for-3", "card-content", "cont-to-del");

                        actorKnownFor4Container.textContent = knownFor4;
                        actorKnownFor4Container.classList.add("known-for-4", "card-content", "cont-to-del");

                        actorMovieContainer.appendChild(actorKnownFor1Container);
                        actorMovieContainer.appendChild(actorKnownFor2Container);
                        actorMovieContainer.appendChild(actorKnownFor3Container);
                        actorMovieContainer.appendChild(actorKnownFor4Container);
                    
                        actorContainer.appendChild(actorMovieContainer);

                        mainContainer.appendChild(actorContainer);

                    


                        var movieFetch1 = function (event) {

                            event.stopImmediatePropagation();

                            var movieFetchUrl = "https://imdb-api.com/en/API/Title/k_01ly574i/" + knownForId1;

                            fetch(movieFetchUrl).then(function(response) {
                        
                                response.json().then(function(data) {

                                

                                    var moviePic = document.createElement("img");

                                    var writerInfo = document.createElement("div");

                                    var plotInfo = document.createElement("div");

                                    

                                    moviePic.src = data.image;

                                    moviePic.classList.add("movie-pic", "card-image", "inside-item");

                                    actorKnownFor1Container.appendChild(moviePic);

                                    var writer = data.writers;

                                    

                                    writerInfo.textContent = "Writer(s): " + writer;

                                    writerInfo.classList.add("cont-to-del");

                                    actorKnownFor1Container.appendChild(writerInfo);

                                    var plot = data.plot;

                                    

                                    plotInfo.classList.add("cont-to-del");

                                    plotInfo.textContent = "Synopsis: " + plot;

                                    actorKnownFor1Container.appendChild(plotInfo);

                                    actorKnownFor1Container.classList.remove("known-for-1");

                                    
                                    

                                

                                
                                
                                    

                                })
                        
                            })        

                        }

                        var movieFetch2 = function () {

                            var movieFetchUrl = "https://imdb-api.com/en/API/Title/k_01ly574i/" + knownForId2;


                            fetch(movieFetchUrl).then(function(response) {
                        
                                response.json().then(function(data) {

                                    var moviePic = document.createElement("img");

                                    moviePic.src = data.image;

                                    moviePic.classList.add("movie-pic", "card-image", "inside-item");

                                    actorKnownFor2Container.appendChild(moviePic);

                                    var writer = data.writers;

                                    var writerInfo = document.createElement("div");

                                    writerInfo.classList.add("cont-to-del");

                                    writerInfo.textContent = "Writer(s): " + writer;

                                    actorKnownFor2Container.appendChild(writerInfo);

                                    var plot = data.plot;

                                    var plotInfo = document.createElement("div");

                                    plotInfo.classList.add("cont-to-del");

                                    plotInfo.textContent = "Synopsis: " + plot;

                                    actorKnownFor2Container.appendChild(plotInfo);

                                    actorKnownFor2Container.classList.remove("known-for-2");


                                })
                        
                            })        

                        }

                        var movieFetch3 = function () {

                            var movieFetchUrl = "https://imdb-api.com/en/API/Title/k_01ly574i/" + knownForId3;


                            fetch(movieFetchUrl).then(function(response) {
                        
                                response.json().then(function(data) {

                                    var moviePic = document.createElement("img");

                                    moviePic.src = data.image;

                                    moviePic.classList.add("movie-pic", "card-image");

                                    actorKnownFor3Container.appendChild(moviePic);

                                    var writer = data.writers;

                                    var writerInfo = document.createElement("div");

                                    writerInfo.classList.add("cont-to-del");

                                    writerInfo.textContent = "Writer(s): " + writer;

                                    actorKnownFor3Container.appendChild(writerInfo);

                                    var plot = data.plot;

                                    var plotInfo = document.createElement("div");

                                    plotInfo.classList.add("cont-to-del");

                                    plotInfo.textContent = "Synopsis: " + plot;

                                    actorKnownFor3Container.appendChild(plotInfo);

                                    actorKnownFor3Container.classList.remove("known-for-3");


                                })
                        
                            })        

                        }

                        var movieFetch4 = function () {

                            var movieFetchUrl = "https://imdb-api.com/en/API/Title/k_01ly574i/" + knownForId4;


                            fetch(movieFetchUrl).then(function(response) {
                        
                                response.json().then(function(data) {

                            

                                    var moviePic = document.createElement("img");

                                    moviePic.src = data.image;

                                    moviePic.classList.add("movie-pic", "card-image");

                                    actorKnownFor4Container.appendChild(moviePic);

                                    var writer = data.writers;

                                    var writerInfo = document.createElement("div");

                                    writerInfo.classList.add("cont-to-del");

                                    writerInfo.textContent = "Writer(s): " + writer;

                                    actorKnownFor4Container.appendChild(writerInfo);

                                    var plot = data.plot;

                                    var plotInfo = document.createElement("div");

                                    plotInfo.classList.add("cont-to-del");

                                    plotInfo.textContent = "Synopsis: " + plot;

                                    actorKnownFor4Container.appendChild(plotInfo);

                                    actorKnownFor4Container.classList.remove("known-for-4");


                                })
                        
                            })        

                        }

                        // event listeners for 'known for' movies
                        // third argument = options, we only want it to run once
                        actorKnownFor1Container.addEventListener("click", movieFetch1, { once: true });
                        actorKnownFor2Container.addEventListener("click", movieFetch2, { once: true });
                        actorKnownFor3Container.addEventListener("click", movieFetch3, { once: true });
                        actorKnownFor4Container.addEventListener("click", movieFetch4, { once : true });
                    
                    
                    
                    
                    
                        var actorAwardsContainer = document.createElement("div");
                    

                
                        var awards = data.awards;

                

                        actorAwardsContainer.textContent = "Awards: " + awards + " Click to see more!";

                        actorAwardsContainer.classList.add( "is-size-4", "cont-to-del", "awards-container", "has-background-success");
                    
                        actorContainer.appendChild(actorAwardsContainer);
                    



                        var thirdImdbUrl = "https://imdb-api.com/en/API/NameAwards/k_01ly574i/" + actorId;

                    
                        // fetch awards endpoint
                        var awardsFetch = function() {
                        
                            fetch(thirdImdbUrl).then(function(response) {
                            
                                response.json().then(function(data) {

                                    var eventTitles = [];

                                    for (var i=0; i < 15; i++) {

                                        var eventTitle = data.items[i].eventTitle;

                                        eventTitles.push(eventTitle);

                                    }
                            
                                    var eventTitlesClean = eventTitles.join(" ");

                                    var actorEventTitlesContainer = document.createElement("div");

                            

                                    actorEventTitlesContainer.textContent = "Award names: " + eventTitlesClean;

                                    actorAwardsContainer.appendChild(actorEventTitlesContainer);

                                    actorAwardsContainer.classList.remove("awards-container");

                                    actorAwardsContainer.classList.add("cont-to-del");

                                


                                })

                            })

                        }


                        // we limit the awardsFetch function to being activated only once
                        actorAwardsContainer.addEventListener("click", awardsFetch, { once: true });

                    
                    
                })
            })
        })
    })

    // fetching Celebrity API
    $.ajax({
        method: 'GET',
        // search Celebrity API with user input
        url: 'https://api.api-ninjas.com/v1/celebrity?name=' + actorName,
        // our Celebrity API key in header request for authorization
        headers: { 'X-Api-Key': 'EbyKJN6Fx+lZBTlMbCLTSw==0t4uz4G3aPpnWFgY'},
        contentType: 'application/json',

        success: function(result) {
        

            if (result.length === 0) {
                displayErrorModal();
            }

            var actorInfoContainer = document.createElement("div");
            actorInfoContainer.classList.add("cont-to-del", "card", "has-background-primary")
            var actorAge = document.createElement("p");
            var actorBirthday = document.createElement("p");
            var actorNationality = document.createElement("p");
            var actorHeight = document.createElement("p");
            var actorNetWorth = document.createElement("p");
            var age = result[0].age;
            var birthday = result[0].birthdy;
            var nationality = result[0].nationality.toUpperCase();
            var height = result[0].height;
            var netWorth = result[0].net_worth;


            // update class for styling

            actorAge.textContent = "Age: " + age;
            actorAge.classList.add("is-size-4", "card-content");
            actorBirthday.textContent = "Birthday: " + birthday;
            actorBirthday.classList.add("is-size-4", "card-content");
            actorNationality.textContent = "Nationality: " + nationality;
            actorNationality.classList.add("is-size-4", "card-content");
            actorHeight.textContent = "Height: " + (height*3.28).toPrecision(3) + " feet";
            actorHeight.classList.add("is-size-4", "card-content");
            actorNetWorth.textContent = "Net worth: $" + netWorth;
            actorNetWorth.classList.add("is-size-4", "card-content");
            

            actorInfoContainer.appendChild(actorAge);
            actorInfoContainer.appendChild(actorBirthday);
            actorInfoContainer.appendChild(actorNationality);
            actorInfoContainer.appendChild(actorHeight);
            actorInfoContainer.appendChild(actorNetWorth);
            mainContainer.appendChild(actorInfoContainer);
        },

        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    })
}


//////////////////////////////////////////////////////////////////////


var createDataFromFav = function(event) {
    var actorName = event.target.textContent
    clear();
    createActorData(actorName)
}


////////////////////////////////////////////////////////////////////////



var submitButtonHandler = function (event) {
    // prevents browser refresh
    event.preventDefault();
    //there needs to be an if statment here
    
    // takes user input and stores it in variable
    var actorName = inputEl.value.trim();
    historyList.push(actorName) 
    inputEl.value = "";

    if (mainDiv.textContent != "") {
        clear();
    }

    saveHistory(historyList)
    

    createActorData(actorName);    
    createHistory(actorName);
}

/////////////////////////////////////////////////////////////////////////////

var newHistory = loadHistory();
createHistoryFromStorage(newHistory);

// event listener runs submitButtonHandler function on submit btn
submitBtn.addEventListener("click", submitButtonHandler);

// event listener on clear button
clearBtn.addEventListener("click", clear);

// event listener for clear favorites button
clearFavoritesBtn.addEventListener("click" , deleteHistory);

favoriteListEl.addEventListener("click", createDataFromFav);