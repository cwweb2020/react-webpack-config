import React from "react";

interface TestProps {
  title: string;
  description: string;
}

interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  occupation: string;
  sallary?: number;
}

const user: Employee = {
  name: "John Doe",
  age: 25,
  occupation: "Software Developer",
  sallary: 50000,
};

const increaseSallary = () => {
  alert("Sallary increased");
};

const Test = ({ title, description }: TestProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <button onClick={increaseSallary}>increase sallary</button>
    </div>
  );
};

export default Test;
