// resultsCards is the div where all the search results will be placed
var resultsCards = document.getElementById('results-cards');
var searchHistory = document.getElementById("search-history");

// Initialization function
function init() {

  $(document).ready(function () {
      $("#job-search").click(function (event) {
        event.preventDefault();
        saveSearch();
        jobSearch();
      });
  });
}

// Run the initialization function
init()

// Saves searches to local storage as an array
function saveSearch() {
  $(searchHistory).empty();
  if (JSON.parse(localStorage.getItem("search-history")) !== null) {
    var history = JSON.parse(localStorage.getItem("search-history"));
  } else {
    var history = [];
  }
  history.push(document.getElementById("search-bar").value);
  localStorage.setItem("search-history", JSON.stringify(history));
  var searchList = document.createElement("ul");
  searchHistory.appendChild(searchList);
  for(var i = 0; i<10; i++){
    if(i > JSON.parse(localStorage.getItem("search-history")).length -1){
      return
    }
    else{
      var li = document.createElement("li");
       li.textContent = JSON.parse(localStorage.getItem("search-history"))[JSON.parse(localStorage.getItem("search-history")).length -1 -i];
      searchList.appendChild(li);
    }
  }

}

// This function searches the Github Jobs API for listings based on input, then loads the results to the page
function jobSearch() {
    resultsCards.innerHTML = "";
    var searchTerm = "";
    searchTerm = document.getElementById("search-bar").value;
    var requestUrl = 'https://cors-anywhere.herokuapp.com/jobs.github.com/positions.json?description=' + searchTerm;

  // Fetch request to Github Jobs API
  fetch(requestUrl)
    .then(function (response) {
      var responseStatus = response.status;
      if (response.ok == false) {
        resultsCards.textContent = "Error: " + responseStatus + " | Please refresh the page and try again";
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      // Loop over the returned data to create a card for each job listing
      for (var i = 0; i < data.length; i++) {
        // Creating all the elements within the card
        var createCardColumn = document.createElement('div');
        createCardColumn.className = "card column is-one-fifth";
        createCardColumn.style.height = "250px";
        var cardHeader = document.createElement('header');
        cardHeader.className = "card-header";
        var cardTitle = document.createElement('p');
        cardTitle.className = "card-header-title is-centered";
        var cardContent = document.createElement('div');
        cardContent.className = "card-content";
        var innerCardContent = document.createElement('div');
        innerCardContent.className = "content";
        var cardFooter = document.createElement('footer');
        cardFooter.className = "card-footer";
        var cardLink = document.createElement('a');
        cardLink.className = "card-footer-item";

        // Populating the cards with info about job search results
        cardTitle.textContent = data[i].title;
        // Some of the company URLs are not provided or, annoyingly, just "http:". This conditional links the company url only if the URL provided by the API is not empty or "http:"
        if (data[i].company_url !== null && data[i].company_url !== "http:") {
          innerCardContent.innerHTML = "<strong>Company: </strong><a href=" + data[i].company_url + ">" + data[i].company + "</a>"+ "<br><strong> Location: </strong>" + data[i].location + " (" + data[i].type + ")";
        } else {
          innerCardContent.innerHTML = "<strong>Company: </strong>" + data[i].company + "<br><strong> Location: </strong>" + data[i].location + " (" + data[i].type + ")";
        }
        cardLink.textContent = "Click here to learn more";
        cardLink.href = data[i].url;


        // Appending card elements in the correct order

        resultsCards.appendChild(createCardColumn);
        createCardColumn.appendChild(cardHeader);
        cardHeader.appendChild(cardTitle);
        createCardColumn.appendChild(cardContent);
        cardContent.appendChild(innerCardContent);
        createCardColumn.appendChild(cardFooter);
        cardFooter.appendChild(cardLink);
    }
});
}

// Skill search button call

$("#skill-search").click(function (event) {
  event.preventDefault();
  saveSearch();
  getSkills();
});

// Skill search function

function getSkills(){
  resultsCards.innerHTML = ""
    var uuids = [];
    var jobTitles = [];
    var counter=0;
    //first fetch
    fetch("http://api.dataatwork.org/v1/jobs/autocomplete?contains=" + document.getElementById("search-bar").value).then(function(response){
        if(response.ok){
        response.json().then(function(apidata) {
          for(var i=0; i< 10; i++){
            if(i > apidata.length -1){
              return
            }
            else{
            uuids.push(apidata[i].uuid);
            jobTitles.push(apidata[i].suggestion);}
            }
        }).then(function(){
            //second fetch
            //I need this part done per job
            for(var i=0; i<uuids.length; i++){
            fetch("http://api.dataatwork.org/v1/jobs/" + uuids[i] + "/related_skills").then(function(respond){
            if(respond.ok){
            respond.json().then(function(data){
             //html element creation
             var createCardColumn = document.createElement('div');
             createCardColumn.className = "card column is-full";
             var cardHeader = document.createElement('header');
             cardHeader.className = "card-header";
             var cardTitle = document.createElement('h2');
             cardTitle.className = "card-header-title is-centered";
             var cardContent = document.createElement('div');
             cardContent.className = "card-content";
             var innerCardContent = document.createElement('div');
             innerCardContent.className = "content";
             var cardFooter = document.createElement('footer');
             cardFooter.className = "card-footer"; 
             cardTitle.textContent = jobTitles[counter];
             counter++
             cardHeader.appendChild(cardTitle);
            for(var j = 0; j<10; j++){
                //random "i" value to get a random skill and its description
                 var randomI= Math.floor(Math.random()*data.skills.length)
                var skillName = data.skills[randomI].skill_name;
                var skillDescription = data.skills[randomI].description;
                var p4skill =document.createElement("p");
                var p4description = document.createElement("p");
                p4skill.className = "pskill";
                p4description.className = "pdescription";
                p4skill.textContent = skillName;
                p4description.textContent = skillDescription;
                innerCardContent.appendChild(p4skill);
                innerCardContent.appendChild(p4description); 
                //end of j for
                }
               //Appending content here
               resultsCards.appendChild(createCardColumn);
               createCardColumn.appendChild(cardHeader);
               createCardColumn.appendChild(cardContent);
               cardContent.appendChild(innerCardContent);
               createCardColumn.appendChild(cardFooter); 
            }) //end 2nd fetch function data
            } // end 2nd api respond.ok
        }) //end of 2nd fetch
        } //end of for loop
        })
        //end first fetch if(response.ok)
    }
    else{
      var createCardColumn = document.createElement('div');
      createCardColumn.className = "card column is-full";
      var cardHeader = document.createElement('header');
      cardHeader.className = "card-header"
      cardHeader.textContent = "Error: " + response.status + " | Job not found";
      resultsCards.appendChild(createCardColumn);
      createCardColumn.appendChild(cardHeader);
    }
    //end first fetch
    })
    uuids = [];
    jobTitles = [];
//end function call
}
