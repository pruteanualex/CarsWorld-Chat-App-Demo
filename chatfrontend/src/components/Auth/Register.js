import React ,{useState} from "react"
import registerImage from '../../assets/imagse/register.svg';
import {Link} from 'react-router-dom';

import {useDispatch} from 'react-redux';
import {register} from '../../store/actions/auth';

const Register = ({history}) => {

    const dispatch = useDispatch();

    const [firstName,setFirstName] = useState('')
    const [lastName,setlastName] = useState('') 
    const [email,setEmail] = useState('')  
    const [gender,setGender] = useState('male') 
    const [password,setPassword] = useState('') 
    
    const submitForm = (e) =>{
        e.preventDefault();
        dispatch(register({firstName, lastName, email, gender, password},history));
    }

    return (
        <div id="auth-container">
            <div id="auth-card">
                <div>
                    <div id="image-section">
                        <img src={registerImage} alt="Register"/>
                    </div>
                    <div id="form-section">
                        <h2>Create an account</h2>
                        <form onSubmit={submitForm}>
                            <div className="input-field mb-1">
                                <input 
                                onChange = { e => setFirstName(e.target.value) }
                                    value={firstName}
                                    required='required'
                                    type="text"
                                    placeholder="First name"/>
                             </div>
                             <div className="input-field mb-1">
                                <input 
                                onChange = { e => setlastName(e.target.value) }
                                    value={lastName}
                                    required='required'
                                    type="text"
                                    placeholder="Last name"/>
                             </div>
                             <div className="input-field mb-1">
                                <input 
                                onChange = { e => setEmail(e.target.value) }
                                    value={email}
                                    required='required'
                                    type="email"
                                    placeholder="Email"/>
                             </div>
                             <div className="input-field mb-1">
                                <select
                                onChange = { e => setGender(e.target.value) }
                                    value={gender}
                                    required='required'>

                                    <option value="male"> Male </option>
                                    <option value="female"> Female </option>
                                </select>
                             </div>
                             <div className="input-field mb-1">
                                <input 
                                onChange = { e => setPassword(e.target.value) }
                                    value={password}
                                    required='required'
                                    type="password"
                                    placeholder="Password"/>
                             </div>

                             <button>REGISTER</button>
                             <p>Already have an account? <Link to='/login'>Login</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register