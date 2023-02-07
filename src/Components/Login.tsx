import React , {useState} from 'react';
import { Formik , Field , Form , ErrorMessage } from 'formik';
import { login } from '../services/auth.service';
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';

const Login : React.FC = () => {
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
                <div className="card card-container">
                    <h2>Connexion</h2>
                    <Formik
                      initialValues= {initialValues}
                      validationSchema = {validationSchema}
                      onSubmit = {handleLogin}
                    >
                          <Form>
                            <div className="form-group">
                                <label htmlFor="username">Nom d'utilisateur</label>
                                <Field name="username" type = "text" className="form-control"/>
                                <ErrorMessage name='username' component="div" className='alert alert-danger'/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Mot de passe</label>
                                <Field name="password" type = "password" className="form-control"/>
                                <ErrorMessage name='password' component="div" className='alert alert-danger'/>
                            </div>
                            <div className="form-group">
                                <button type = "submit" className="btn btn-primary btn-block" disabled={loading}>
                                    {
                                        loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )
                                    }
                                     <span>Login</span>
                                </button>
                            </div>
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
        );
   
};
export default Login