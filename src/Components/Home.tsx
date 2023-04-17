import React, { useState, useEffect } from "react";
import { getPublicContent } from "../services/user.service";
import logotaximoto from '../assets/logotaximoto.png';
import './style.css';
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
      <div className=" mycard">
        <img src= {logotaximoto} alt="taximoto" className="logotaxi"  />
        <h1>Bienvenue!</h1>
        <p className="lead">Votre sécurité est notre priorité , voyager sans crainte avec nous.  Nous pouvons vous enmener où vous voulez en rien de temps. Vous pouvez nous contacter n'importe où et n'importe quand.</p>
      </div>
      
    </div>
  );
};
export default Home;