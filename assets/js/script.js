var resultsCards = document.getElementById('results-cards');
var fetchButton = document.getElementById('job-search');

function getApi() {
    var searchTerm = "";
    searchTerm = "description=" + document.getElementById("search-bar").value;

    // var searchLocation = "";
    // searchLocation = "location=" + document.getElementById("location-bar").value;

    // fetch request gets a list of jobs with the description javascript
    // var requestUrl = 'https://cors-anywhere.herokuapp.com/jobs.github.com/positions.json?' + searchTerm + "&" + searchLocation;
    var requestUrl = 'https://cors-anywhere.herokuapp.com/jobs.github.com/positions.json?' + searchTerm;
    console.log(requestUrl);

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      //Loop over the data to generate a table, each table row will have a link to the repo url
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
        innerCardContent.textContent = "Company: " + data[i].company + " | Location: " + data[i].location;
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

fetchButton.addEventListener('click', function(event) {
event.preventDefault();
getApi();
});