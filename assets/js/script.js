// resultsCards is the div where all the search results will be placed
var resultsCards = document.getElementById('results-cards');

// Initialization function
function init() {

  $(document).ready(function () {
      $("#job-search").click(function (event) {
        event.preventDefault();
          if ($('input').val().length === 0) {
            //  && $('#zipcode').val().length === 0 (This code will be added to the above if statement when we add location search functionality)
              alert("No entry detected! Please enter an occupation.");
          } else {
              jobSearch();
          }
      });
  });
}

// Run the initialization function
init()

// This function searches the Github Jobs API for listings based on input, then loads the results to the page
function jobSearch() {
    resultsCards.innerHTML = "";
    var searchTerm = "";
    searchTerm = "description=" + document.getElementById("search-bar").value;

    // These two commented out lines of code were for the location search bar, they'll be added to the final version later
    // var searchLocation = "";
    // searchLocation = "location=" + document.getElementById("location-bar").value;

    // fetch request gets a list of jobs with the description
    // var requestUrl = 'https://cors-anywhere.herokuapp.com/jobs.github.com/positions.json?' + searchTerm + "&" + searchLocation;
    var requestUrl = 'https://cors-anywhere.herokuapp.com/jobs.github.com/positions.json?' + searchTerm;

  // Fetch request to Github Jobs API
  fetch(requestUrl)
    .then(function (response) {
      var responseStatus = response.status;
      if (responseStatus !== 200) {
        resultsCards.textContent = "Error: " + responseStatus + " | Please refresh the page and try again"
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

