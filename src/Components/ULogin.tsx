import React , {useState} from 'react';
import { Formik , Field , Form , ErrorMessage } from 'formik';
import { login } from '../services/auth.service';
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import image from '../assets/image.jpg'

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
            <div className="col-md-12 ">
                <section className="vh-100">
                    <div className='container py-5 h-100'>
                        <div className='row d-flex justify-content-center align-items-center h-100'>
                            <div className="col col-xl-10">
                                <div className="card">
                                    <div className="row g-0">
                                        <div className='col-md-6 col-lg-5 d-none d-md-block'>
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                             alt="login form" className="img-fluid border"  />
                                        </div>
                                        <div className='col-md-6 col-lg-7 d-flex align-items-center'>
                                            <div className='card-body p-4 p-lg-5 text-black'>
                                                <Formik initialValues= {initialValues} validationSchema = {validationSchema}  onSubmit = {handleLogin}>
                                                       <Form>
                                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                                 <i className="fas fa-cubes fa-2x me-3"></i>
                                                                 <span className="h1 fw-bold mb-0">Logo</span>
                                                            </div>
                                                            <h5 className="fw-normal mb-3 pb-3 Space" >Connectez-vous à votre compte</h5>
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
                                                          <div className="pt-1 mb-4">
                                                              <button type = "submit" className="btn btn-dark btn-lg btn-block" disabled={loading}>
                                                                 {
                                                                    loading && (
                                                                       <span className="spinner-border spinner-border-sm"></span>
                                                                    )
                                                                }               
                                                                <span>Se connecter</span>
                                                             </button>
                                                          </div>
                                                          <a className="small text-muted" href="#!">Forgot password?</a>
                                                          <p className="mb-5 pb-lg-2 Colors" >Don't have an account? <a href="#!"
                                                              className='Colors'>Register here</a></p>
                                                           <a href="#!" className="small text-muted">Terms of use.</a>
                                                           <a href="#!" className="small text-muted">Privacy policy</a>
                                                                 {
                                                                      message && (
                                                                          <div className="form-group">
                                                                                <div className="alert alert-danger" role= "alert">
                                                                                    {message}
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
                            </div>

                        </div>

                    </div>

                </section>
            </div>
        );
   
};
export default ULogin