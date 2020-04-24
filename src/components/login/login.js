import React, { Component } from 'react';
import VoteService from '../../services/knuvote-service';

import './login.css';

export default class Login extends Component{
    state = {
        email:'',
        password:'',
        token: '',
        isLogin: false,
    }

    obj = new VoteService();

    onSubmit(e){
        e.preventDefault();
        this.obj.login(this.state);

    }
    onButtonClick = () =>{
        this.obj.login(this.state).then((e)=>{
            
            this.setState({
                
                token: e.token,
                isLogin: true,
                
                
            });
            
            if (e.token == undefined){
                this.setState({
                    isLogin:false
                })
            };
            this.props.getUserData(this.state.token, this.state.isLogin);
           }
        );                   
    }



    onChangeUsername =(e) =>{
        this.setState({
            email:e.target.value
        });
    };

    onChangePassword =(e) =>{
        this.setState({
            password:e.target.value
        });
    };

    render(){
        const {email, password, isLogin} = this.state;
        return(
            <div>
            <form className = "login-class"
             onSubmit = {this.onSubmit}>
                <h3>LOGIN AREA</h3>
                <input value={email} onChange = {this.onChangeUsername}type="text" className="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1"></input>
                <input  value={password} onChange = {this.onChangePassword} type="text" className="form-control" placeholder="Password" aria-label="Username" ></input>
                <button  
                onClick = {this.onButtonClick} 
                type="button" 
                className="btn btn-primary">Log in</button>
                
                </form>
                <span className = 'loginLabelClass'>{isLogin?"Login":"Something went wrong, try again"}</span>
                </div>
                        
        );
    }
    
};