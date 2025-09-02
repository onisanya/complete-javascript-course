'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v3.1/all

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////
if (Module.hot) {
  Module.hot.accept();
}

const renderPopup = function (data, className = '') {
  console.log('renderPopup called');
  console.log(data);

  const html = `
<article class="country">
          <img class="country__img" src="${Object.entries(data.flags)[0][1]}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} mln people</p>
            <p class="country__row"><span>🗣️</span>${
              Object.entries(data.languages)[0][1]
            }</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[Object.keys(data.currencies)[0]].name
            }</p>
          </div>
        </article>
`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  //console.log(request.responseText);

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    //console.log(data);

    renderPopup(data);
  });
};

const getCountryDataAndNeighbour = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  //console.log(request.responseText);

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    //console.log(data);

    renderPopup(data);
    // get neighbours
    //console.log(data.borders);

    const neighbours = data.borders;

    //console.log(neighbours);

    if (!neighbours) return;
    console.log(`nb 0 == ${neighbours[0]}`);

    let requestNeighbour = new XMLHttpRequest();
    neighbours?.forEach(neighbour => {
      requestNeighbour.open(
        'GET',
        `https://restcountries.com/v3.1/alpha/${neighbour}`
      );
      //console.log(`neighbour == ${neighbour}`);
      requestNeighbour.send();
      //console.log(this.responseText);
      requestNeighbour.addEventListener('load', function () {
        const neighbourData = JSON.parse(this.responseText);
        renderPopup(neighbourData[0], 'neighbour');
      });
      setTimeout(() => {
        console.log('<-tick->');
      }, 1000);
    });
  });
};
// getCountryDataAndNeigbour('italy');
// getCountryData('portugal');
// getCountryData('usa');
/*
let requestNeighbour = new XMLHttpRequest();
requestNeighbour.open('GET', 'https://restcountries.com/v3.1/alpha/AUT');
requestNeighbour.send();
requestNeighbour.addEventListener('load', function () {
  const neighbourData = JSON.parse(this.responseText);
  console.log(neighbourData);
});
*/
getCountryDataAndNeighbour('italy');
