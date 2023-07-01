import React, { useState} from "react";

import Maps from "./Maps";

const BoardUser: React.FC = () => {
  const [destination , setDestination] =useState("");
  const handleSearch = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }
  return (
    <div className="container wrapper">
       <form onSubmit={handleSearch}>
           <input type="text" onChange={(event) => setDestination(event.target.value)} className="form-control" />
           <button className="btn btn-primary">Rechercher</button>
       </form>
       <Maps destination={destination}/>
    </div>
  );
};
export default BoardUser;