import React from "react";

const Img = ({ handleClick, src }) => {
  return (
    <>
      <img onClick={handleClick} src={src} alt="" />
    </>
  );
};

export default Img;
