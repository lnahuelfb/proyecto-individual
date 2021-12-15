import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  height: 350px;
  width: 250px;
  border: solid 1px red;
  border-radius: 5px;
  text-align: center;
  background-color: #00ff00;
`

export const Img = styled.img`
  width: 75%;
  border-radius: 5px;
`

export const Text = styled.p`
  margin-top: 10px;
`

export const SubTitle = styled.h4`
  margin: 5px 0;
`

export const LinkStyled = styled(Link)`
  text-decoration: 'none';
  &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`

export const Button = styled.button`
  width: 25%;
`