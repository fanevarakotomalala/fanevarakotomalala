import React from 'react'

const Maps:React.FC = () => {
    return (
        <div>
             <div>
                <h1>Ici , vous rechercher l'endroit ou vous voulez vous rendre.</h1>
             </div>
             <div className="form-group d-flex">
                <input type="text" className="form-control form-control-lg" />
                <button className="btn btn-primary"></button>
             </div>

        </div>
    );
}
export default Maps;