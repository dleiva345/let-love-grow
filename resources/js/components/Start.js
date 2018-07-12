import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

export class Start extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email:'',
            password:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({ [event.target.id] : event.target.value });

    }

    handleSubmit(event) {
        event.preventDefault();
        var query = this.state;
        const { onUpdate } = this.props;  //this line is important for update parent's state

        fetch("/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)
        })
        .then(function(response) {
            if (response.status >= 400) {
                console.log("Bad response from server");
            }
            return response.json();
        })
        .then(function(data) {
            if (data.email) {
                //update parent state
                onUpdate(data) 
            } else {
                //redirect to '/'
                window.location="/";
            }
            
        })
        .catch(function(err){
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <p className= 'col-6 offset-3 display-3 mb-5 border'>Your logo here</p>
                <form className= 'mb-5 col-6 offset-3' onSubmit={this.handleSubmit}  method='POST'  > 
                    <div className="form-group">
                      <label htmlFor="email">Email address</label>
                      <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email"
                             onChange={this.handleChange}
                             required>
                            </input>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" className="form-control" id="password" name="password" placeholder="Password"
                             onChange={this.handleChange}
                             required>
                             
                       </input>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>

                <div className= 'col-6 offset-3'>
                    <p>If you don't have an account...</p>
                    <Link to={'/signup'}><button className= "btn btn-primary">Signup</button></Link>
                </div>
            </div>
        )
    }
}
