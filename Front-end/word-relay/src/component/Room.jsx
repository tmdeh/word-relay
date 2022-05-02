import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Room = () => {
  
  const { id } = useParams();

  const getRoomInfo = async() => {

  } 
  return(
    <>{id}</>
  )
}

export default Room