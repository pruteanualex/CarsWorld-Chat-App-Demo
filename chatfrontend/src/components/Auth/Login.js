import React, {useState} from "react"
import loginImage from '../../assets/imagse/login.svg';
import {Link} from 'react-router-dom';
import '../../assets/scss/Auth.scss'; 
//import AuthServices from '../../services/authService';


import {useDispatch} from 'react-redux';
import {login} from '../../store/actions/auth';



const Login = ({history}) => {

    const dispatch = useDispatch();
    //JS ACTION
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const submitForm = (e) => {
        e.preventDefault();

        dispatch(login({email,password},history));


        //props.history

    //     AuthServices.login({email,password})
    //    console.log({email,password})


    }

    //RENDER CONTENT
    return (
        <div id="auth-container">
            <div id="auth-card">
                <div>
                    <div id="image-section">
                        <img src={loginImage} alt="Login"/>
                    </div>
                    <div id="form-section">
                        <h2>Welcome back</h2>
                        <form onSubmit = {submitForm}>
                             <div className="input-field mb-1">
                                <input 
                                onChange = { e => setEmail(e.target.value) }
                                    value={email}
                                    required='required'
                                    type="text"
                                    placeholder="Email"/>
                             </div>
                             <div className="input-field mb-1">
                                <input
                                onChange = { e => setPassword(e.target.value) } 
                                    value={password}
                                    required='required'
                                    type="password"
                                    placeholder="Password"/>
                             </div>

                             <button>LOGIN</button>
                             <p>Don't have an account? <Link to='/register'>Register</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login





// axios.post('http://127.0.0.1:4000/login',{email,password})
        // .then(res =>{
        //     console.log("respons", res);
        // })
        // .catch(err => {
        //     console.log(`error:${err}`)
        // });