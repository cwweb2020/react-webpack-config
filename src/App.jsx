import React from "react";
import Header from "./components/Header";
import mar from "./assets/img/2.jpg";
import camino from "./assets/img/3.jpg";
import bosque from "./assets/img/1.jpg";

const App = () => {
  return (
    <>
      <Header />
      <h1>Paisajes desplegados por webpack</h1>
      <br />
      <br />
      <section className="photo__gallery">
        <img src={mar} alt="" />
        <img src={camino} alt="" />
        <img src={bosque} alt="" />
      </section>
      <p className="parrafo">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa quidem
        obcaecati error quae voluptatem necessitatibus vero aspernatur sint amet
        atque distinctio iure nam ea recusandae fugiat, assumenda explicabo
        aliquid provident!
      </p>
    </>
  );
};

export default App;
