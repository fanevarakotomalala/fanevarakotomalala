import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
const Inscription:React.FC = () => {
    return (
         <div className="container wrapper">
            <div className="row ligne main-content">
                <div className="col-6">
                    <Link to={"/register"} className="nav-link compte ">
                              <h2>Créer un compte chauffeur   <BsArrowRight/></h2>
                    </Link>
                    
                </div>
                <div className="col-6">
                <Link to={"/register"} className="nav-link compte ">
                    <h2>Créer un compte passager   <BsArrowRight/></h2>
                </Link>
                </div>
                

            </div>
         </div>
    )
}
export default Inscription;