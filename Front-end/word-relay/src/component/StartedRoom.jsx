import React from "react";
import { useParams } from "react-router-dom";

const StartedRoom = () => {
  
  const {id} = useParams();

  return(
    <div>
      {id}
    </div>
  )

}

export default StartedRoom;