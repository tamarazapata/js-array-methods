const form = document.getElementById('form');
const input = document.getElementById('movie-input'); 
const movieList = document.getElementById('movieList');
const label = document.createElement('label'); 


label.classList.add('error-message'); 

let movies = [
    { id: 1, title: 'The Shawshank Redemption', watched: false },
    { id: 2, title: 'Inception', watched: false },
    { id: 3, title: 'The Matrix', watched: false }
];

const totalMovies = document.getElementById('total-movies');
const moviesWatched = document.getElementById('movies-watched');

document.addEventListener("DOMContentLoaded", () => {
    initialMovies();
    countMovies();
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const movieTitle = input.value.trim(); 

    if (movieTitle) {
        const movieExists = movies.some(movie => movie.title.toLowerCase() === movieTitle.toLowerCase());

        if (movieExists) {
            label.innerHTML = 'El título de la película ya existe';  
            form.appendChild(label);  
        } else {
            const newMovie = {
                id: Date.now(),
                title: movieTitle,
                watched: false
            };
            movies.push(newMovie);  
            initialMovies();  
            input.value = '';  
            label.innerHTML = '';  
        }
    } else {
        label.innerHTML = 'Debes ingresar un título válido';  
        form.appendChild(label);  
    }
});

const initialMovies = () => {
    let template = '';
    for (const movie of movies) {
        template += createElement(movie);  
    movieList.innerHTML = template;  
};
}

function createElement(movie) {
    return `
        <div class="alert ${movie.watched ? 'alert-success' : 'alert-secondary'} d-flex justify-content-between align-items-center">
            <p class="m-0">${movie.title}</p>
            <h3 class="m-0">
                <i class="fa-solid fa-eye" role="button" onclick="watchedMovies(${movie.id})"></i>
                <i class="fa-solid fa-trash" role="button" onclick="deleteMovies(${movie.id})"></i>
            </h3>
        </div>
    `;
}
function watchedMovies(id) {
    const indexMovie = movies.findIndex((movie) => movie.id === id);
    movies[indexMovie].watched = movies[indexMovie].watched ? false : true;
    initialMovies();  
    countMovies();
}

function deleteMovies(id) {
    const indexMovie = movies.findIndex((movie) => movie.id === id);
    movies.splice(indexMovie,1) 
    initialMovies(); 
    countMovies();
}

function editMovies(id) {
    const indexMovie = movies.findIndex((movie) => movie.id === id);

    initialMovies(); 
    countMovies();
}
function countMovies (){
    totalMovies.innerHTML =  `Total de películas: ${movies.length}`;
    const totalWatchedMovies = movies.filter((m) => m.watched == true)
    moviesWatched.innerHTML = `Películas vistas: ${totalWatchedMovies.length}`
}

