import React from "react";
import { Link } from "react-router-dom";
import { Hero } from "../Components/Hero";
import { Banner } from "../Components/Banner";

export const Error = () => {
  return (
    <Hero>
      <Banner title="404" subtitle="page not found">
        <Link to="/" className="btn-primary">
          Return home
        </Link>
      </Banner>
    </Hero>
  );
};
