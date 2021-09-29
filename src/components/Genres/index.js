import React from "react";

import {
  GenresContainer,
  Name,
} from './styles';

export function Genres({ data }) {
  return(
    <GenresContainer>
      <Name>{data.name}</Name>
    </GenresContainer>
  );
}