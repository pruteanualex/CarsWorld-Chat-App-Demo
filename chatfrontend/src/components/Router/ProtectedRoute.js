import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

const ProtectedRoute = ({ component:Component, ...props })=>{
    
    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);

  

    return (
        
        <Route  {...props}
        
            render={(props)=>{
              
                if (isLoggedIn === false) {
                    return  <Redirect  to='/login' />
                }else{
                    return <Component {...props}/>
                }
            }}
        />
    );
}

export default ProtectedRoute;