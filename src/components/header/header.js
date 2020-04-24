import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import VoteService from '../../services/knuvote-service';


export default class Header extends Component{
    
   obj = new VoteService();
    Profile = () =>{
      this.obj.getProfile().then((e)=>{
        return(e.username)
      })
    }
render (){
    return(
    <div className = 'header d-flex'>
        <h3>
        <Link to = "/">
          KNU Vote
        </Link>
      </h3>
      <ul className="d-flex justify-content-end">
        <li>
          <Link to="/login">Log in</Link>
        </li>
        <li>
          <Link to="/registration">Registration</Link>
        </li>
        <li>
          <Link to="/starships">Log out</Link>
        </li>
        <li>
            <span>{this.Profile}</span>
        </li>
      </ul>

    </div>
    );
}

}

