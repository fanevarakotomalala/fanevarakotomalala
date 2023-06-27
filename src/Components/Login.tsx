import React , {useState} from 'react';
import { Formik , Field , Form , ErrorMessage } from 'formik';
import { login } from '../services/driverAuth.service';
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';

const Login : React.FC = () => {
        let navigate = useNavigate();
        const [loading , setLoading] = useState<boolean>(false);
        const [message , setMessage] = useState<string>("");
        const initialValues : {
            drivername:string,
            password:string
        } = {
            drivername:"",
            password:""
        };
        const validationSchema = Yup.object().shape({
            drivername:Yup.string().required("Ce champ est requis!"),
            password:Yup.string().required("Ce champ est requis!")
        });
        const handleLogin = (formValue:{drivername:string , password:string}) => {
            const {drivername , password} = formValue;
            setMessage("");
            setLoading(true);
            login (drivername , password).then(
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
                                <label htmlFor="drivername">Nom d'utilisateur</label>
                                <Field name="drivername" type = "text" className="form-control"/>
                                <ErrorMessage name='drivername' component="div" className='alert alert-danger'/>
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
                                     <span>Se connecter</span>
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