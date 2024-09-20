import React, { useState, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import mar from "./assets/img/2.jpg";
import camino from "./assets/img/3.jpg";
import bosque from "./assets/img/1.jpg";
import TopHeader from "./components/TopHeader";
// import Img from "./components/Img";
// import Modal from "./components/Modal";

// Usamos React.lazy para cargar el nuevo componente
const LazyComponent = React.lazy(() => import("./components/LazyComponent"));

const LazyModal = React.lazy(() => import("./components/Modal"));

const LazyImageComponent = React.lazy(() => import("./components/Img"));

const App = () => {
  const [state, setstate] = useState(false);
  const [src, setSrc] = useState(null);
  const [pics, setPics] = useState([mar, camino, bosque]);
  const [showRoute, setShowRoute] = useState(true);

  const handleClick = (e) => {
    const { src } = e.target;
    setstate(!state);
    setSrc(src);
  };
  return (
    <>
      <BrowserRouter>
        <TopHeader />
        <Header />

        <h1>Los paisajes mas lindos</h1>
        <br />
        <br />
        <section className="photo__gallery">
          {pics.map((pic, index) => (
            <Suspense>
              <LazyImageComponent
                src={pic}
                handleClick={handleClick}
                key={index}
              />
            </Suspense>
          ))}
        </section>
        <p className="parrafo">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa quidem
          obcaecati error quae voluptatem necessitatibus vero aspernatur sint
          amet atque distinctio iure nam ea recusandae fugiat, assumenda
          explicabo aliquid provident!
        </p>
        {state && (
          <Suspense fallback={<div>Cargando el componente Modal...</div>}>
            <LazyModal src={src} handleClick={handleClick} />
          </Suspense>
        )}
        <br />
        <br />
        <br />
        <br />
        {/* Nueva sección para probar React.lazy con una ruta */}
        {showRoute && (
          <nav>
            <Link onClick={() => setShowRoute((prev) => !prev)} to="/lazy">
              Ir al componente Lazy
            </Link>
          </nav>
        )}
        <Routes>
          <Route
            path="/lazy"
            element={
              <Suspense fallback={<div>Cargando el componente Lazy...</div>}>
                <LazyComponent />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default App;
