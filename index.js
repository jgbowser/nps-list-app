

const apiKey ='WU1Oq7r0lirQojGQPQTuAzoy8Ygq51UQMCvJKN6e';

const baseUrl = 'https://developer.nps.gov/api/v1/parks';




const watchForm = function() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('.js-search-term').val();
    const maxResults = $('.js-max-results').val();
    getParks(searchTerm, maxResults);
  });
};

const getParks = function(query, numResults) {
  const params = {
    api_key: apiKey,
    q: query,
    limit: numResults,
  };
  const queryString = formatQueryString(params);
  const url = baseUrl + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(jsonResponse => displayResults(jsonResponse))
    .catch(error => {
        $('.js-error-message').text(`Something went wrong: ${error.message}`);
    });
};

const displayResults = function(jsonResponse) {
  $('.js-results-list').empty();
  for (let i = 0; i < jsonResponse.data.length; i++) {
      $('.js-results-list').append(`<li><h3>${jsonResponse.data[i].fullName}</h3>
      <p>${jsonResponse.data[i].description}</p>
      <a href="${jsonResponse.data[i].url}" alt="link to ${jsonResponse.data[i].name} homepage">${jsonResponse.data[i].name}</a>
      </li>`);
  }
  $('.js-results').removeClass('hidden');
};

const formatQueryString = function(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
};


$(watchForm());