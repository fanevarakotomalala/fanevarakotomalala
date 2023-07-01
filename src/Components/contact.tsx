import React from 'react'
import './style.css'

const Contact:React.FC = () => {
     return (
         <div className='containers '>
            <div className='texte'>
                <h2>Vous avez des questions? Nous serons ravis de vous répondre.</h2>
            </div>
            <div className='carte card card-container bg-light'>
                <h3 className='pb-3 pt-3'>Contactez-nous</h3>
                <div className="form-group">
                    <label htmlFor="Nom">Nom et prenom</label>
                    <input type="text" name='Nom' className="form-control form-control-lg" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Adresse email</label>
                    <input type="email" name='email'  className="form-control form-control-lg" />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea name="message"  className='form-control form-control-lg'  rows={4}></textarea>
                </div>
                <button className='btn btn-primary button'>Envoyer</button>
            </div>
         </div>
     );
}

export default Contact;