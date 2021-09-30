import React, { useState, useEffect } from "react";
import { ScrollView, Modal } from 'react-native';

import {
  DetailContainer,
  Header,
  HeaderButton,
  Banner,
  ButtonLink,
  Title,
  ContentArea,
  Rate,
  ListGenres,
  Description,
} from './styles';

import { Feather, Ionicons } from '@expo/vector-icons';

import { useNavigation, useRoute } from "@react-navigation/native";

import { api, key } from '../../services/api';

import Stars from 'react-native-stars';

import { Genres } from '../../components/Genres';
import { ModalLink } from "../../components/ModalLink";

import { saveMovie, hasMovie, deleteMovie } from '../../utils/storage';

export function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const [movie, setMovie] = useState({});
  const [openModalLink, setOpenModalLink] = useState(false);
  const [favoriteMovie, setFavoriteMovie] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function getMovie() {
      const response = await api.get(`/movie/${route.params?.id}`, {
        params: {
          api_key: key,
          language: 'pt-BR',
        }
      }).catch((err) => {
        console.log(err);
      });

      if (isActive) {
        setMovie(response.data);

        const isFavorite = await hasMovie(response.data);
        setFavoriteMovie(isFavorite);
      }
    }

    if (isActive) {
      getMovie();
    }

    return () => {
      isActive = false;
    }
  }, []);

  async function handleFavoriteMovie(movie) {
    if (favoriteMovie) {
      await deleteMovie(movie.id);
      setFavoriteMovie(false);
      alert('Filme removido da lista');
    } else {
      await saveMovie('@primeReact', movie);
      setFavoriteMovie(true);
      alert('Filme salvo na lista');
    }
  }

  return (
    <DetailContainer>
      <Header>
        <HeaderButton activeOpacity={0.7} onPress={() => navigation.goBack()}>
          <Feather
            name="arrow-left"
            size={28}
            color="#fff"
          />
        </HeaderButton>

        <HeaderButton onPress={() => handleFavoriteMovie(movie)}>
          <Ionicons
            name={favoriteMovie ? "bookmark" : "bookmark-outline"}
            size={28}
            color="#fff"
          />
        </HeaderButton>
      </Header>

      <Banner
        resizeMethod="resize"
        source={{ uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}` }}
      />

      <ButtonLink onPress={() => setOpenModalLink(true)}>
        <Feather name="link" size={24} color="#fff" />
      </ButtonLink>

      <Title numberOfLines={2}>{movie.title}</Title>

      <ContentArea>
        <Stars
          default={movie.vote_average}
          count={10}
          half={true}
          starSize={20}
          fullStar={<Ionicons name="md-star" size={24} color="#E7A74e" />}
          emptyStar={<Ionicons name="md-star-outline" size={24} color="#E7A74e" />}
          halfStar={<Ionicons name="md-star-half" size={24} color="#E7A74e" />}
          disable={true}
        />
        <Rate>{movie.vote_average}/10</Rate>
      </ContentArea>

      <ListGenres
        data={movie?.genres}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Genres data={item} />}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Descrição</Title>
        <Description>{movie?.overview}</Description>
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={openModalLink}>
        <ModalLink
          link={movie?.homepage}
          title={movie?.title}
          closeModal={() => setOpenModalLink(false)}
        />
      </Modal>
    </DetailContainer>
  );
}
