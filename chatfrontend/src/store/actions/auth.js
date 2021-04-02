import AuthServices from '../../services/authService';

import {LOGIN,REGISTER, LOGOUT,UPDATE_PROFILE} from '../types/index';


///parents => will tok email and password
export const login = (params,history) => dispatch => {
    
    return AuthServices.login(params)
            .then(data => {
                //Trigge the action
                dispatch({type:LOGIN,payload:data});
                history.push('/');
            })
            .catch(err =>{
                console.log(err);
            });
}

export const register = (params,history) => dispatch => {
    
    return AuthServices.register(params)
            .then(data => {
                //Trigge the action
                dispatch({type:REGISTER,payload:data});
                history.push('/');
            })
            .catch(err =>{
                console.log(err);
            });
}

export const updateProfile = (params) => dispatch => {

    return AuthServices.updateProfile(params)
            .then(data => {
                //Trigge the action
                dispatch({type:UPDATE_PROFILE,payload:data});
            })
            .catch(err =>{
                
                throw err
            });
}


export const logout = () => dispatch =>{
    AuthServices.logout()
    dispatch({type:LOGOUT});
}
