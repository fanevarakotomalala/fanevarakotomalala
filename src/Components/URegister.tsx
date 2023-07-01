import React  , {useState} from 'react';
import { Formik , Field , ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import IUser from '../types/user.type';
import { register } from '../services/auth.service';
import { FaFacebook , FaGoogle , FaTwitter , FaGithub } from 'react-icons/fa';

const URegister : React.FC = () => {
    const [successfull , setSuccessfull] = useState<boolean>(false);
    const [message , setMessage] = useState<string>("");

    const initialValues: IUser = {
        username:"",
        email:"",
        password:"",
     
       
      };

    const validationSchema = Yup.object().shape({
        username: Yup.string().test(
            "len",
            "Le nom d'utilisateur doit être composé de 3 à 20 caractères.",
            (val:any) =>
              val && 
              val.toString().length >= 3 &&
              val.toString().length <= 20
        )
        .required("Ce champ est requis"),
        email:Yup.string().email("Email invalide").required("Ce champ est requis"),
        password:Yup.string()
          .test(
            "len",
             "Le mot de passe doit être composé entre 6 et 40 caractères.",
              (val:any) =>
                val && 
                val.toString().length >= 6 &&
                val.toString().length <= 40
          )
          .required("Ce champ est requis"),
    });
    
    const handleRegister = (formValue:IUser) => {
        const {username , email , password  } = formValue;
        register( username ,  email ,password ).then (
            (response) => {
                setMessage(response.data.message);
                setSuccessfull(true);
                console.log(response.data);
            },
            (error) => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
                 setMessage(resMessage);
                 setSuccessfull(false);
              }
            
        );
    };

    return(
        <div className="   wrapper register ">
            
            {!successfull && (
              <div className="container  px-4 py-5 px-md-5 text-center text-lg-start my-5">
                 <div className='row gx-lg-5 align-items-center mb-5'>
                    <div className='col-lg-6 mb-5 mb-lg-0 zindex' >
                       <h1 className='my-5 display-5 fw-bold ls-tight'>
                                Nous vous offrons  <br />
                                <span>le meilleur service</span>
                       </h1>
                       <p className='mb-4 opacity-70'>
                            Inscrivez-vous pour bénéficier 100% de nos services.
                            Avec votre compte , vous pouvez appeler un chauffeur dans votre
                            ville à tout moment.
                       </p>
                    </div>
                    <div className='col-lg-6 mb-5 mb-lg-0 position-relative'>
                        <div id="radius-shape-1" className ="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className ="position-absolute shadow-5-strong"></div>
                        <div className='card bg-glass'>
                            <div className='card-body px-4 py-5 px-md-5'>
                               <Formik initialValues={initialValues} validationSchema = {validationSchema} 
                                    onSubmit={handleRegister}>
                                        <Form>
                                            {
                                                !successfull && (
                                                     <div>                                                       
                                                                                                                 
                                                             <div className="form-outline mb-4">
                                                                   <label htmlFor="username" className='form-label'>Nom </label>
                                                                   <Field className="form-control" name="username" type="text"/>                                                          
                                                                   <ErrorMessage
                                                                       name='username'
                                                                       component="div"
                                                                       className='alert alert-danger'/>
                                                             </div>                                                                                                               
                                                            
                                                                                                                                                                                                          
                                                            
                                                             <div className="form-outline mb-4">
                                                                       <label htmlFor="email" className='form-label'>Email</label>
                                                                       <Field className="form-control" name="email" type="email"/>                                                               
                                                                       <ErrorMessage
                                                                         name='email'
                                                                         component="div"
                                                                         className='alert alert-danger'/>
                                                             </div>                                                                                                         
                                                             <div className='form-outline mb-4'>    
                                                                <label htmlFor="password" className='form-label'>Mot de passe</label>                                            
                                                                <Field className="form-control" name="password" type="password"/>
                                                                <ErrorMessage
                                                                   name='password'
                                                                   component="div"
                                                                   className='alert alert-danger'/>

                                                             </div>
                                                             <button type='submit' className="btn btn-primary btn-block mb-4">S'inscrire</button>
                                                             <div className="text-center">
                                                                <p>ou s'inscrire avec:</p>
                                                                 <button type="button" className="btn btn-link btn-floating mx-1">
                                                                      <FaFacebook/>
                                                                 </button>
                                                                 <button type="button" className="btn btn-link btn-floating mx-1">
                                                                      <FaGoogle/>
                                                                 </button>
                                                                 <button type="button" className="btn btn-link btn-floating mx-1">
                                                                      <FaTwitter/>
                                                                  </button>
                                                                  <button type="button" className="btn btn-link btn-floating mx-1">
                                                                        <FaGithub/>
                                                                  </button>
                                                              </div>
                                                     </div>
                                                      
                                                )
                                            }
                                            

                                        </Form>
                                  </Formik>
                                
                            </div>

                        </div>
                        
                    </div>

                </div>
                        
            </div>)}
                {
                            message && (
                                <div className="form-group">
                                    <div
                                     className= {successfull ? "alert alert-success" : "alert alert-danger"}
                                     role="alert"
                                    >
                                      {message}
                                    </div>
                                </div>
                            )
                }
        </div>
    );
    
};
export default URegister;

