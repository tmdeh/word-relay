import React from "react";
import '../css/Loading.css';
import ReactLoading from 'react-loading'

const Loading = ({isLoading, type, color}) => {
  return(
    <div className={isLoading ? 'openLoading loading' : 'loading'}>
      {isLoading ? (
        <div className="loading-bar">
          <h1 style={{marginBottom: '50px'}}>로딩중</h1>
          <ReactLoading
          type={type}
          color={color}
          height={'50%'}
          width={'50%'} />
        </div>
      ) : null}
    </div>
  )
}

export default Loading