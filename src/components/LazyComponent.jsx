import React from "react";

const LazyComponent = () => {
  return (
    <div>
      <h1>Componente Lazy</h1>
      <p className="parrafo">
        Este componente fue cargado de forma dinámica gracias a React.lazy y
        Suspense
      </p>
    </div>
  );
};

export default LazyComponent;
