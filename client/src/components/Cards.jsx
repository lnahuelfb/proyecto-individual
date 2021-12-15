import React from 'react'

import { Container, Text, SubTitle, Img, Button, LinkStyled } from './styles/Cards'
import Prueba from '../images/prueba.png'

export default function Cards() {
  return (
    <Container>
      <h2>Nombre de receta</h2>
      <Img src={Prueba} />
      <SubTitle>Tags:</SubTitle>
      <Text>#Carnivoro #Vegano #Desayuno</Text>
      <LinkStyled to='/:receta'>
        <Button>Receta</Button>
      </LinkStyled>
    </Container>
  )
}