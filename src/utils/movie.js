
// gerar uma lista de filmes com o tamanha que desejar.
export function getListMovies(size, movies) {
  let popularMovies = [];

  for (let i = 0, l = size; i < l; i++) {
    popularMovies.push(movies[i]);
  }

  return popularMovies;
}

// gerar um número aleatorio com base no tamanha da lista de filmes que for passada.
export function randomBanner(movies) {
  return Math.floor(Math.random() * movies.length);
}
