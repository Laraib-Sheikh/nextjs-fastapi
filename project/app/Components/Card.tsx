import React from "react";

interface Person {
  name: string;
  techStack: string;
  linkedIn: string;
  email: string;
  picture: string;
}

interface PersonCardProps {
  person: Person;
}

const Card: React.FC<PersonCardProps> = ({ person }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg ">
      <img
        className="w-40 rounded-full h-40 flex justify-center items-center"
        src={person.picture}
        alt={`${person.name}'s picture`}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{person.name}</div>
        <p className="text-gray-800 text-base">{person.techStack}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <a
          href={person.linkedIn}
          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2 mb-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          href={`mailto:${person.email}`}
          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >
          {person.email}
        </a>
      </div>
    </div>
  );
};

export default Card;
