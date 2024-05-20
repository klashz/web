import React from "react";

interface AboutProps {
  // здесь можно добавить любые пропсы, если они понадобятся
}

const About: React.FC<AboutProps> = (props) => {
  return (
    <h1>
      Страница для переключения
    </h1>
  );
};

export default About;
