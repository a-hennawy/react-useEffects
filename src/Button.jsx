import React from "react";

function Button({ clickFunc, name }) {
  return (
    <div>
      <button onClick={clickFunc}>{name}</button>
    </div>
  );
}

export default Button;
