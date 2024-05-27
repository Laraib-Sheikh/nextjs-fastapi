import React from "react";
import Card from "../Components/Card"; // assuming Card is in the same directory

interface Person {
  name: string;
  techStack: string;
  linkedIn: string;
  email: string;
  picture: string;
}

const persons: Person[] = [
  {
    name: "Maqbool Ahmad",
    techStack: "Python/ML developer",
    linkedIn: "https://www.linkedin.com/in/maqbool-ahmad-391b06229",
    email: "Maqbool.riazahmad@gmail.com",
    picture: "./asserts/maqbool.png",
  },
  {
    name: "Ahmad Ali",
    techStack: "Data Scientist",
    linkedIn: "https://www.linkedin.com/in/ahmad-a-176704241",
    email: "toahmada14@gmail.com",
    picture: "./asserts/ahmad.png",
  },
  {
    name: "Laraib Ahmad",
    techStack: "MERN STACK DEVELOPER",
    linkedIn: "#",
    email: "laraib.ahhhmad123@gmail.com",
    picture: "./asserts/laraib.png",
  },
  {
    name: "Taimoor Ahmad",
    techStack: "MERN STACK DEVELOPER",
    linkedIn: "#",
    email: "dave@example.com",
    picture: "./asserts/taimoor.png",
  },
  {
    name: "Dawood Rizwan",
    techStack: "AI Developer",
    linkedIn: "#",
    email: "dawooddogar26@gmail.com",
    picture: "./asserts/Dawood.jpeg",
  },
];

const Aboutus: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-700">
      <div className="flex flex-wrap justify-center gap-4">
        {persons.map((person, index) => (
          <Card key={index} person={person} />
        ))}
      </div>
    </div>
  );
};

export default Aboutus;
