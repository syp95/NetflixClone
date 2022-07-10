const API_KEY = '10923b261ba94d897ac6b81148314a3f';
const BASE_PATH = 'https://api.themoviedb.org/3';

export interface IMovie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
    name?: string;
}

export interface IGetMoviesResult {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

export function getMovies() {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
        (response) => response.json(),
    );
}

export interface IGetTopMoviesResult {
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

export function getTopRateMovies() {
    return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(
        (response) => response.json(),
    );
}

export function getUpCominngMovies() {
    return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(
        (response) => response.json(),
    );
}
export interface IGetLatestMovies {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
}

export function getLatestMovies() {
    return fetch(`${BASE_PATH}/movie/latest?api_key=${API_KEY}`).then(
        (response) => response.json(),
    );
}
interface IGenres {
    id: number;
    name: string;
}
export interface IDetail {
    genres: IGenres[];
    homepage: string;
    original_title?: string;
    original_name?: string;
    tagline: string;
    runtime: number;
    number_of_episodes?: number;
    number_of_seasons?: number;
}

export function getDetail(movieId?: string) {
    return fetch(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}`).then(
        (response) => response.json(),
    );
}

export function getTvAiring() {
    return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then(
        (response) => response.json(),
    );
}

export function getTvTopRated() {
    return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then(
        (response) => response.json(),
    );
}

export function getTvTopPopular() {
    return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then(
        (response) => response.json(),
    );
}

export function getSearch(keyword: string) {
    return fetch(
        `${BASE_PATH}/search/multi?api_key=${API_KEY}&language=ko&include_adult=false&query=${keyword}`,
    ).then((response) => response.json());
}
