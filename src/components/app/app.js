import React ,{Component} from 'react';
import Header from '../header/';
import Login from '../login';
import Registration from '../registration';
import HeaderPanel from '../header-panel';
import Votings from '../votings';
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom';
import './app.css';
import CategoryList from '../category-list/category-list';
import CandidateList from '../candidate-list/candidate-list';
import ActivateAccount from '../auth';
import VoteService from '../../services/knuvote-service';
import CreateCategory from '../create-category';


export default class App extends Component {
    constructor(){
        super();
        this.updateCategory();           
    }

    obj = new VoteService();
    cand = new VoteService();

    state = {
        arr : [],
        candidates : [],
        categoryId: 0,
        categoryName:'',
        token:'',
        isLogin: false
        }
        
    onCategoryClick = (id, name)=>{
        this.updateCandidate();
        this.setState(()=>{
            return{
                
                categoryId: id,
                categoryName: name
            };
        });
        
    }
    updateCategory(){
        this.obj.getCategories().then((e)=>{
                this.setState(prevState => ({
                    arr: [...prevState.arr, ...e]
                  }));            
            });
           
    };    
    updateCandidate(){
        this.cand.getCandidates(this.state.categoryId).then((e)=>{
                this.setState(prevState => ({
                    candidates: [...prevState.candidates, ...e]
                  }));            
            });
           
    };   
    getUserData=(utoken, uisLogin)=>{
        this.setState({token:utoken,
                       isLogin:uisLogin});
    } 
    render() {     
        const {arr, candidates,categoryId, categoryName, isLogin, token} = this.state;
    return (
    <div >
        
        <Router>
        
            <Header/>
                    <HeaderPanel />
                    <Route path="/"
                            render={() => <h2>Welcome to KNU Vote</h2>}
                            exact />
                    <Route path="/login" render={(()=> <Login getUserData = {this.getUserData}/>) } />
                    <Route path="/registration" component={Registration} />
                    <Route path="/votings" component={Votings}/>

                    <Route exact path="/category-list">
                    {isLogin ? <Route path="/category-list" render ={(() => <CategoryList arr={arr}
                    onCategoryClick = {this.onCategoryClick}/>)}/> : <Redirect to ="/login"/>}
                    </Route> 

                    <Route path="/candidate-list" render ={(() => <CandidateList candidates={candidates}
                                                                                 categoryId = {categoryId}
                                                                                 categoryName = {categoryName}/>)}/>
                    <Route path="/auth" render={(() => <ActivateAccount/>)}/>
                    <Route path="/create-category" component={CreateCategory}/>
                    
                    
        </Router>
        

    </div>
    );
    }

};

