import React from "react";
import styled from "styled-components";

const CreateRoom = () => {
  return (
    <Container>
      <InputBox placeholder="방 제목" type="text"></InputBox>
      <InputBox placeholder="비밀번호" type="password"></InputBox>
      <CheckBox type="checkbox"></CheckBox>
      <InputBox placeholder="인원 수" type=""></InputBox>
    </Container>
  )
}

const Container = styled.div`
  
`

const InputBox = styled.input`
  border-radius: 25px;
  width: 600px;
  height: 80px;
  font-size: 30px;
`

const CheckBox = styled.input`
  width: 80px;
  height: 80px;
`

export default CreateRoom