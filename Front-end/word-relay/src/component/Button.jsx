import React from "react";
import styled from "styled-components";

export const Button = ({onClick, children, color}) => {


  return(
    <ButtonContainer>
      <StartButton onClick={onClick} color={color}>{children}</StartButton>
    </ButtonContainer>
  )
}


export default Button;



const StartButton = styled.button`
width: 15rem;
height: 3.5rem;
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

const ButtonContainer = styled.div`
  width: 16rem;
  height: 4rem;
  margin: 10px;
`