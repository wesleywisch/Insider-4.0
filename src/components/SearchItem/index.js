import React from "react";
import { SearchItemContainer, Banner, Title, RateContainer, Rate } from './styles';

import { Ionicons } from '@expo/vector-icons';

export function SearchItem({ data, navigatePage }) {

  function detailMovie() {
    if(data.release_date === '') {
      alert('Filme ainda sem data de lançamento');
      return;
    }

    navigatePage(data);
  }

  return (
    <SearchItemContainer activeOpacity={0.7} onPress={detailMovie}>
      {data.poster_path ? (
        <Banner
          resizeMethod="resize"
          source={{ uri: `https://image.tmdb.org/t/p/original/${data?.poster_path}` }}
        />
      ) : (
        <Banner
          resizeMethod="resize"
          source={require('../../assets/semfoto.png')}
        />
      )}

      <Title>{data.title}</Title>

      <RateContainer>
        <Ionicons name="md-star" size={12} color="#e7a74e" />
        <Rate>{data?.vote_average}/10</Rate>
      </RateContainer>
    </SearchItemContainer>
  );
}