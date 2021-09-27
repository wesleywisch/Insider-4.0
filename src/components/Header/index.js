import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import { Container, MenuButton, Title } from './styles';

export function Header({ title }) {
  const navigation = useNavigation();

  return (
    <Container>
      <MenuButton onPress={() => navigation.openDrawer()}>
        <Feather name="menu" size={36} color="#fff" />
      </MenuButton>
      <Title>{title}</Title>
    </Container>
  );
}
