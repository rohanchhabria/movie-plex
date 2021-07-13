const apikey = 'f4af9932e94dada181cb3a587dbd68fb';
const apiurl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=' + apikey + '&page=1';
// console.log(apiurl);

const searchurl = 'https://api.themoviedb.org/3/search/movie?api_key=' + apikey + '&query=';

async function getmovies(url) {
    const response = await fetch(url);
    const data = await response.json();

    // console.log(data.results);
    moviecards(data.results);
}

// render initial movies since the page is blank
getmovies(apiurl);

const movierating = document.querySelector('.movie-rating');

function ratingscheme(rating) {
    if(rating >= 8) {
        return 'green';
    }
    else if(rating >= 5) {
        return 'orange';
    }
    else {
        return 'red';
    }
}

//w120 = width 1280px; do not add / at end because the poster path from api url already has /
const imagepath = 'https://image.tmdb.org/t/p/w1280';
const maincontainer = document.querySelector('.main-container');

// this will create a movie card for every movie parsed into the list of movies.
function moviecards(movies) {
    maincontainer.innerHTML = '';

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;

        const moviecard = document.createElement('div');
        moviecard.classList.add('movie-card');

        moviecard.innerHTML = `
        <img class="thumbnail" src="${imagepath + poster_path}" alt="${title}" />
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${ratingscheme(vote_average)}">${vote_average}</span>
        </div>
        <div class="movie-overview">
            <h3>Overview</h3>
            ${overview}
        </div>`;

        maincontainer.appendChild(moviecard);
    });
}

const form = document.querySelector('.form');
const searchbar = document.querySelector('.search-bar');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const searchterm = searchbar.value;
    // console.log(searchterm);
    if(searchterm && searchterm != '') {
        console.log(searchurl + searchterm);
        getmovies(searchurl + searchterm);
        searchbar.value = '';
    }
    else {
        window.location.reload();
    }
});