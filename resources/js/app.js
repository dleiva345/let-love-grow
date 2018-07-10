import React, { Component } from 'react';
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Start } from './components/Start';
import { Signup } from './components/Signup';
import { Mypage } from './components/Mypage';
import { Whoops404 } from './components/Whoops404';

export class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            couple_key:'',
            email:'',
            password:'',
            first_name:'',
            last_name:'',
            birthday:'',
            anniversary:'',
            photo:'',
            photo_couple:'',
            login: false
        }
        this.onUpdate = this.onUpdate.bind(this)
    }

    onUpdate(data){
        this.setState({
            couple_key: data.couple_key,
            email: data.email,
            password: data.password,
            first_name: data.first_name,
            last_name: data.last_name,
            birthday: data.birthday,
            anniversary: data.anniversary,
            photo: data.photo,
            photo_couple:data.photo_couple,
            login: true
        })
    }

    isLoginSuccess = () => {
        if (this.state.login) {
            return <Redirect to='/mypage' />
        } else {
            return <Redirect to='' />
        }
    }

    // <Route exact path='/' component={Start} />
    //<Route exact path='/' render={ (props) => <Start onUpdate={this.onUpdate} />} />

    render(){
        return (
            <Router>
            <div>
                {this.isLoginSuccess()}
                <Switch>
                    <Route exact path='/' render={ (props) => <Start onUpdate={this.onUpdate} />} />
                    <Route exact path='/mypage' component={Mypage} />
                    <Route exact path='/signup' component ={Signup} />
                    <Route path='*' component ={Whoops404} />
                </Switch>
            </div>
            </Router>
        )
    }
}






    

