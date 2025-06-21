export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
  }
}

export const fetchMovie = async ({query}: {query: string}) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`
  


  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok){
    throw new Error('Failed to fetch movie '+ response.statusText)
  }

  const data = await response.json();

  return data.results;
}

// /discover/movie?include_adult=&include_video=false&language=en-US&page=1&sort_by=popularity.desc';


export const fetchMovieDetails = async (movieID: string): Promise<MovieDetails> => {
  try {
    const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieID}?api_key=${TMDB_CONFIG.API_KEY}`, {
      method: 'GET',
      headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) throw new Error('failed to fetch movie details');

    return await response.json();

    
  }catch(error){
    console.log(error);
    throw error;
    
  }
}