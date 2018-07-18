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
            birthday: data.birthday.substring(0,10),
            anniversary: data.anniversary.substring(0,10),
            photo: data.photo,
            photo_couple:data.photo_couple,
            login: true
        })
    }

    isLoginSuccess = () => {
        if (this.state.login) {
            var url = "/mypage/" + this.state.couple_key
            return <Redirect to={url} />
        } else {
            return <Redirect to='' />
        }
    }

    render(){
        return (
            <Router>
            <div>
                {this.isLoginSuccess()}
                <Switch>
                    <Route exact path='/' render={ (props) => <Start onUpdate={this.onUpdate} />} />
                    <Route path={'/mypage/'+ this.state.couple_key} render={ (props) => <Mypage couple_key={this.state.couple_key}
                                                                            email={this.state.email}
                                                                            password={this.state.password}
                                                                            first_name={this.state.first_name}
                                                                            last_name={this.state.last_name}
                                                                            birthday={this.state.birthday}
                                                                            anniversary={this.state.anniversary}
                                                                            photo={this.state.photo}
                                                                            photo_couple={this.state.photo_couple}  
                                                                            {...props}/>} />
                    <Route exact path='/signup' component ={Signup} />
                    <Route path='*' component ={Whoops404} />
                </Switch>
            </div>
            </Router>
        )
    }
}






    

