import React, { useState, useEffect } from "react";
import { getPublicContent } from "../services/user.service";
import logotaximoto from '../assets/logotaximoto.png';
const Home: React.FC = () => {
  const [content, setContent] = useState<string>("");
  useEffect(() => {
    getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);
  return (
    <div className="container">
      <img src= {logotaximoto} alt="taximoto" className="logotaxi"  />
    </div>
  );
};
export default Home;