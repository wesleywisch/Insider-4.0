import React, { useEffect, useState } from 'react';

import { MoviesContainer, ListMovies } from './styles';

import { Header } from '../../components/Header';
import { FavoriteItem } from '../../components/FavoriteItem';

import { getMoviesSave, deleteMovie } from '../../utils/storage';

import { useNavigation, useIsFocused } from '@react-navigation/native';

export function Movies() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let isActive = true;

    async function getFavoriteMovies() {
      const results = await getMoviesSave('@primeReact');

      if (isActive) {
        setMovies(results);
      }
    }

    if (isActive) {
      getFavoriteMovies();
    }

    return () => {
      isActive = false;
    }
  }, [isFocused]);

  async function handleDelete(id) {
    const result = await deleteMovie(id);
    setMovies(result);
  }

  function navigateDetailsPage(item) {
    navigation.navigate('Detail', { id: item.id });
  }

  return (
    <MoviesContainer>
      <Header title="Meus filmes" />

      <ListMovies
        showsVerticalScrollIndicator={false}
        data={movies}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <FavoriteItem
            data={item}
            deleteMovie={handleDelete}
            navigatePage={() => navigateDetailsPage(item)}
          />
        )}
      />
    </MoviesContainer>
  );
}