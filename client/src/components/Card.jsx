/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React from 'react'
import removeRecipe  from "../actions/removeRecipe";
import { useDispatch } from "react-redux";

import { Container, Text, SubTitle, Img, Button, LinkStyled } from './styles/Cards'
import Prueba from '../images/prueba.png'

export default function Card(props) {

  const dispatch = useDispatch()

  const handleDelete = async (recipe) => {
    const result = await window.confirm(`Desea eliminar la receta ${recipe.tilte}?`)
    if (result) {
      dispatch(removeRecipe(recipe.id))
      window.alert('Receta eliminada con exito!')
    }
  }

  return (
    <Container>
      <h2>{props.title}</h2>
      <Img src={props.image} />
      <SubTitle>Tags:</SubTitle>
      {props.diets?.map((diet) => {
        <Text key={diet.name}>{diet.name}</Text>
      })}
      <LinkStyled to='/:receta'>
        <Button>Receta</Button>
      </LinkStyled>
      <Button onClick={handleDelete(props.recipe)}>Eliminar</Button>
    </Container>
  )
}