import React  , {useState} from 'react';
import { Formik , Field , ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import IUser from '../types/user.type';
import { register } from '../services/auth.service';

const Register : React.FC = () => {
    const [successfull , setSuccessfull] = useState<boolean>(false);
    const [message , setMessage] = useState<string>("");

    const initialValues: IUser = {
        username: "",
        email: "",
        password: "",
        roles:[]
       
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
        const {username , email , password , roles  } = formValue;
        register(username , email , password , roles).then (
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
        <div className="col-md-12">
            <div className="card card-container">
                <h2>Inscription</h2>
                <Formik initialValues={initialValues} validationSchema = {validationSchema} onSubmit={handleRegister}>
                     <Form>
                        {
                            !successfull && (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="username">Nom d'utlisateur</label>
                                        <Field className="form-control" name="username" type="text"/>
                                        <ErrorMessage
                                          name='username'
                                          component="div"
                                          className='alert alert-danger'/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <Field className="form-control" name="email" type="email"/>
                                        <ErrorMessage
                                          name='email'
                                          component="div"
                                          className='alert alert-danger'/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Mot de passe</label>
                                        <Field className="form-control" name="password" type="password"/>
                                        <ErrorMessage
                                          name='password'
                                          component="div"
                                          className='alert alert-danger'/>
                                    </div>
                                    <div role="group" aria-labelledby="checkbox-group" className='mb-2'  >
                                        <div className="form-check-inline">
                                           <label className='form-check-label'>
                                              <Field type="checkbox" name="roles" className="form-check-input" value="user" />
                                               user
                                           </label>
                                        </div>
                                        <div className="form-check-inline">
                                           <label className='form-check-label'>
                                              <Field type="checkbox" name="roles" className="form-check-input" value="moderator" />
                                               moderator
                                           </label>
                                        </div>
                                        <div className="form-check-inline">
                                           <label className='form-check-label'>
                                              <Field type="checkbox" name="roles" className="form-check-input" value="admin" />
                                               admin
                                           </label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button type='submit' className="btn btn-primary btn-block">S'inscrire</button>
                                    </div>
                                </div>
                            )
                        }
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
                     </Form>
                </Formik>
            </div>
        </div>
    );
    
};
export default Register;

