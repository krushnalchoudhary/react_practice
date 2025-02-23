import React from "react";

export const Counter = () => {

    let count = 10;

    function increase() {
      
        count=count+1;
    }

  return (
    <>
      <div style={{alignItems:"centre"}}>counter : {count}</div>
      <button onClick={increase}> add </button>
      <button> remove </button>
    </>
  );
};

export default Counter;
