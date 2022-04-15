import React from "react";
import styled from "styled-components";

export const Button = ({onClick, children, color}) => {


  return(
    <StartButton onClick={onClick} color={color}>{children}</StartButton>
  )
}




const StartButton = styled.button`
width: 15rem;
height: 3.5rem;
margin: 5px;
border-radius: 25px;
border: none;
background-color: ${props => props.color};
font-size: 25px;
box-shadow: 1px 1px 1px 1px gray;
&:active {
  margin-top: 5px;
  margin-left: 5px;
  box-shadow: none;
}
`