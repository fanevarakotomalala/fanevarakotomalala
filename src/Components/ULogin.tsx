import React , {useState} from 'react';
import { Formik , Field , Form , ErrorMessage } from 'formik';
import { login } from '../services/auth.service';
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import { FaFacebook , FaLinkedin , FaTwitter } from 'react-icons/fa';
import draw2 from '../assets/draw2.webp'

const ULogin : React.FC = () => {
        let navigate = useNavigate();
        const [loading , setLoading] = useState<boolean>(false);
        const [message , setMessage] = useState<string>("");
        const initialValues : {
            username:string,
            password:string
        } = {
            username:"",
            password:""
        };
        const validationSchema = Yup.object().shape({
            username:Yup.string().required("Ce champ est requis!"),
            password:Yup.string().required("Ce champ est requis!")
        });
        const handleLogin = (formValue:{username:string , password:string}) => {
            const {username , password} = formValue;
            setMessage("");
            setLoading(true);
            login (username , password).then(
                () => {
                   navigate('/profile');
                   window.location.reload();
                  
                },
                (error) => {
                    const resMessage =
                      (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                      error.message ||
                      error.toString();
                    setLoading(false);
                    setMessage(resMessage);
                  }
            );
        };

        return(
            <div className="vh-100 wrapper login  ">
                <div className='container-fluid h-custom main-content '>
                   <div className='row d-flex justify-content-center align-items-center h-100'>
                      <div className='col-md-9 col-lg-6 col-xl-5'>
                         <img src= {draw2} alt="sample" className='img-fluid' />
                      </div>
                      <div className='col-md-8 col-lg-6 col-xl-4 offset-xl-1'>
                        <Formik 
                           initialValues= {initialValues} 
                           validationSchema = {validationSchema} 
                           onSubmit = {handleLogin}>
                              <Form>
                                  <div className='d-flex flex-row align-items-center justify-content-center justify-content-lg-start'>
                                      <p className="lead fw-normal mb-0 me-3">Se connecter avec</p>
                                      <button type="button" className="btn btn-primary btn-floating mx-1">
                                          <FaFacebook/>
                                       </button>
                                       <button type="button" className="btn btn-primary btn-floating mx-1">
                                          <FaTwitter/>
                                       </button>
                                       <button type="button" className="btn btn-primary btn-floating mx-1">
                                          <FaLinkedin/>
                                       </button>
                                  </div>
                                  <div className='divider d-flex align-items-center my-4'>
                                    <p className='text-center fw-bold mx-2 mb-0'>Ou</p>
                                  </div>
                                  <div className="form-outline mb-4">
                                     <label htmlFor="username" className='form-label' >Nom d'utilisateur</label>
                                     <Field name="username" type = "text" className="form-control form-control-lg"/>
                                     <ErrorMessage name='username' component="div" className='alert alert-danger'/>
                                  </div>
                                  <div className="form-outline mb-4">
                                    <label htmlFor="password" className='form-label'>Mot de passe</label>
                                    <Field name="password" type = "password" className="form-control form-control-lg"/>
                                    <ErrorMessage name='password' component="div" className='alert alert-danger'/>
                                  </div>
                                  <div className='d-flex justify-content-between align-items-center'>
                                     <div className='form-check mb-0'>
                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                        <label className="form-check-label" htmlFor="form2Example3">
                                            Se souvenir de moi
                                         </label>
                                     </div>
                                     <a href="#!" className="text-body">Mot de passe oublié?</a>
                                  </div>
                                  <div className='text-center text-lg-start mt-4 pt-2'>
                                    <button className='btn btn-primary btn-lg login-btn' disabled={loading}>
                                       {
                                            loading && (
                                                            <span className="spinner-border spinner-border-sm"></span>
                                                        )
                                       }               
                                        <span>Se connecter</span>                                    
                                    </button>
                                    <p className='"small fw-bold mt-2 pt-1 mb-0'>
                                            vous n'avez pas de compte?
                                            <a href="#!" className='link-danger'>Inscription</a>
                                    </p>
                                      {
                                            message && (
                                                            <div className="form-group">
                                                                <div className="alert alert-danger" role= "alert">
                                                                    {message}
                                                                </div>
                                                            </div>
                                                        )
                                      }
                                    
                                  </div>
                              </Form>
                        </Formik>

                      </div>
                      
                   </div>
                </div>                                                                                                                
                              
        </div>
          
    );
   
};
export default ULogin