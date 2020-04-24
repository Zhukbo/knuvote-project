import React, { Component } from 'react';
import VoteService from '../../services/knuvote-service';
import './votings.css';

export default class Votings extends Component{

    constructor(){
        super();
        //this.updateData();
        this.senings();
       // this.updateData2();
    }
    state = {
        nameCategory: null
    }

    //exam = new VoteService();
    send = new VoteService();
    
    senings(){
        this.send.createCategory();
    }
    /*updateData2(){
        this.exam
            .getCategories()
            .then((obj)=>{
                this.setState({
                    nameCategory: obj.nameCategory               
                });
            });
           
        };*/
    updateData(){
        this.exam
            .getStatsCategory()
            .then((obj)=>{
                this.setState({
                    countCategories: obj.countCategories,
                    countVotes: obj.countVotes,
                    topCategory: obj.topCategory,
                    topCategoryId: obj.topCategoryId
                });
            });
           
        };

    render(){

        const {nameCategory /*countCategories, countVotes, topCategory, topCategoryId*/} = this.state; 
        return(
            <div>
                <div>назва категорії {nameCategory}</div>
            </div>
        );
    }

}
