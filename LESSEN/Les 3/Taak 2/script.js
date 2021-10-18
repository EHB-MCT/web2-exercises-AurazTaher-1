

"use strict";

window.onload = function () {

    let submitForm = document.getElementById("searchform").addEventListener("submit", e => {
        e.preventDefault();
        let inputTitles = document.getElementById("inputTitle").value;
        let inputYears = document.getElementById("inputYear").value;
        searchMovie(inputTitles, inputYears);

    })

}



function searchMovie(inputTitles, inputYears) {

    fetch(`https://www.omdbapi.com/?apikey=e441e34&t=${inputTitles}&y=${inputYears}`)
    .then(response => response.json())
    .then(data => {
    console.log("succes", data);
    console.log('Movie:', data.Title, data.Year);

    let containerInfo = document.getElementById("infoMovie");
    let htmlString =
    `<div class="col-md-4">

    <img src="${data.Poster}" class="card-img" alt="...">

    </div>

    <div class="col-md-8">

    <div class="card-body">

    <h5 class="title">${data.Title}</h5>

    <p class="director">${data.Director}</p>

    <p class="plot">${data.Plot}</p>

    <p class="runtime"><small class="text-muted">${data.Runtime}</small></p>

    </div>

    </div>

    <button type="button" class="btn" id="${data.imdbID}">+</button>`;


    containerInfo.insertAdjacentHTML('beforeend', htmlString);
    let addCounter = document.getElementById(`${data.imdbID}`).addEventListener('click', e => {

        e.preventDefault();
        let containerCounter = document.getElementById('counter');
        let counterString = `<h3 class="title">${data.Runtime}</h5>`;
        containerCounter.insertAdjacentHTML('beforeend', counterString);
    });

    console.log('Druk');

    });

}