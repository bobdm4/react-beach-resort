import React from "react";
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";
import { Title } from "./Title";

export const Services = () => {
  const data = [
    {
      icon: <FaCocktail />,
      title: "Free coctails",
      info:
        "Lorem ipsum dolor amet consectetur adipisicing elit. Magni, corporis!",
    },
    {
      icon: <FaHiking />,
      title: "Endlees Hiking",
      info:
        "Lorem ipsum dolor amet consectetur adipisicing elit. Magni, corporis!",
    },
    {
      icon: <FaShuttleVan />,
      title: "Frеe shuttle",
      info:
        "Lorem ipsum dolor amet consectetur adipisicing elit. Magni, corporis!",
    },
    {
      icon: <FaBeer />,
      title: "Strongest beer",
      info:
        "Lorem ipsum dolor amet consectetur adipisicing elit. Magni, corporis!",
    },
  ];

  return (
    <section className="services">
      <Title title="services" />
      <div className="services-center">
        {data.map((item, i) => {
          return (
            <article key={i} className="service">
              <span>{item.icon}</span>
              <h6>{item.title}</h6>
              <p>{item.info}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};
