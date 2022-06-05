import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import tokenState from "../recoil/token";
import createRoom from "../request/createRoom";
import Button from './Button'
import Loading from "./Loading";

const CreateRoom = () => {

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [memberLimit, setMemberLimit] = useState(2);
  const [token, setToken] = useRecoilState(tokenState)

  const navigate = useNavigate();

  const inputRef = useRef(null)
  const onClickCreateButton = async() => {
    const data = {
      title : title,
      hasPassword : !inputRef.current.disabled,
      password : password,
      memberLimit: memberLimit
    }
    setLoading(true)
    const res = await createRoom(token, data, navigate);
    if(res === 401) {
      setToken("");
      window.location.reload();
    }
    setLoading(false)  
  }

  const onClickCancleButton = () => {
    navigate("/home")
  }

  const onClickCheck = () => {
    inputRef.current.disabled = !inputRef.current.disabled
    inputRef.current.value = ""
    setPassword("")
    inputRef.current.focus()
  }

  const onChangeSelect = (e) => {
    if(e.target.value !== "") {
      setMemberLimit(e.target.value)
    }
  }

  const titleChange = (e) => {
    setTitle(e.target.value)
  }

  const passwordChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <Container>
      <InputGroup>
        <InputBox placeholder="방 제목" type="text" onChange={titleChange}></InputBox>
        <Password>
          <CheckBox type="checkbox" onClick={onClickCheck}></CheckBox>
          <PasswordInputBox placeholder="비밀번호" type="password" ref={inputRef} disabled onChange={passwordChange}></PasswordInputBox>
        </Password>
        <Select onChange={onChangeSelect}>
          <Option value="2">2명</Option>
          <Option value="3">3명</Option>
          <Option value="4">4명</Option>
          <Option value="5">5명</Option>
        </Select>
      </InputGroup>
      <Buttons>
        <Button onClick={onClickCreateButton} color={"#99EA97"}>만들기</Button>
        <Button onClick={onClickCancleButton} color={"#EA9797"}>취소</Button>
      </Buttons>
      <Loading isLoading={loading} type="spin" color="99EA97"></Loading>
    </Container>
  )
}

const Container = styled.div`
  width: 42rem;
  height: 42rem;
  text-align: center;
  margin: 0 auto;
`

const InputBox = styled.input`
  margin: 1.2rem;
  border-radius: 20px;
  width: 40rem;
  height: 4rem;
  font-size: 30px;
`
const PasswordInputBox = styled(InputBox)`
  width: 35rem;
`

const CheckBox = styled.input`
  width: 4rem;
  height: 4rem;
`

const Select = styled.select`
  width: 40rem;
  height: 4rem;
  border-radius: 20px;
  font-size: 30px;
  text-align: center;
  margin-bottom: 2rem;
`

const Option = styled.option`
  font-size: 30px;
`

const Buttons = styled.div`
  display: grid;
  justify-content: center;
`

const Password = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
`

const InputGroup = styled.div`
  display: grid;
  justify-items: center;
`

export default CreateRoom