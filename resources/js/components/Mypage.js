import React, { Component } from 'react'

import { Nav } from './mypageView/Nav'
import { Profile } from './mypageView/Profile'
//import { Mood } from './mypageView/Mood'
import { Album } from './mypageView/Album'
import { Messages } from './mypageView/Messages'
import { History } from './mypageView/History'
import { Calendar } from 'react-calendar';
import io from 'socket.io-client'



export class Mypage extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            couple_key: this.props.couple_key,
            email: this.props.email,
            password: this.props.password,
            first_name: this.props.first_name,
            last_name: this.props.last_name,
            birthday: this.props.birthday,
            anniversary: this.props.anniversary,
            photo: this.props.photo,
            photo_couple: this.props.photo_couple,
            last_one:[],
            albums: [],
            socket_url: 'http://localhost:3000/mypage/' + this.props.couple_key,
            //socket_url: '--heroku address url' + this.props.couple_key,
            messages:["Tigger: Test\n Pooh: trial\n"],
            message:''
        }

        //establish socket.io connection (client side)
        this.socket = io(this.state.socket_url)
        this.socket.on('receive_message', (msg)=> {
            addMessage(msg)
        })
         
        const addMessage = msg => {
            console.log(msg);
            this.setState({messages: [...this.state.messages, msg]});
            console.log(this.state.messages);
        }
            
        this.handleMessenger = event => {
            event.preventDefault();
            var data = {name:this.state.first_name, message: this.state.message};
            this.socket.emit('send_message', data);
            
            //for test only
            var current = new Date();
            var hr = current.getHours();
            var min = current.getMinutes();
            if (min < 10) {
                min = "0" + min;
            }
            var currentTime = hr + ":" + min;
            var msg = data.name + ' : ' + data.message + '\t\t\t\t' + currentTime + '\n';
            this.setState({messages: [...this.state.messages, msg]});
            ////////////////

            this.setState({message: ''});
        }


        this.fetchAlbum = this.fetchAlbum.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {

    }

    handleChange = (event) => {
        this.setState({ [event.target.id] : event.target.value });    
    }


    fetchAlbum = (couple_key) => {
        var query = {
            'couple_key' : couple_key
        }
        fetch('/album', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(query)
        })
        .then((response) => {
            if (response.status >= 400) {
                console.log("Bad response from server");
            }
            return response.json()
        })
        .then((data) => {
            this.setState({
                last_one: data[0],
                albums: data    
            })   
        })
    }

    

    render(){
        if(this.state.albums.length === 0) {
            this.fetchAlbum(this.state.couple_key);
        }
        return(
            <div id='mypage'>
                <Nav photo_couple={this.state.photo_couple}/>
                <div className="border container">
                    <div className='row'>
                        <div className='container m-0 col-4'>
                            <Profile    couple_key={this.state.couple_key}
                                        email={this.state.email}
                                        first_name={this.state.first_name}
                                        last_name={this.state.last_name}
                                        birthday={this.state.birthday}
                                        anniversary={this.state.anniversary}
                                        photo={this.state.photo}
                                        photo_couple={this.state.photo_couple}/>
                                        <br></br>
                            <div className="container p-2 border text-center"><br /><br />Mood area<br /><br /></div><br></br>            
                            <div className="container p-4 border text-center"><br /><br />Todo area<br /><br /></div>   
                            
                        </div>

                        <div className='container m-0 col-4'>
                            <Album  couple_key={this.state.couple_key}
                                    albums={this.state.albums}
                                    last_one={this.state.last_one}
                                    fetchAlbum={this.fetchAlbum} 
                                    handleChange={this.handleChange} />
                            <br></br>        

                            <Messages first_name={this.state.first_name}
                                      messages={this.state.messages}
                                      message={this.state.message}
                                      handleMessenger={this.handleMessenger}
                                      handleChange={this.handleChange} />        
                        </div>

                        <div className='container m-0 col-4'>
                            <div className='card-header p-2 border mt-1'>Upcoming Events</div>
                            <div className='card-body border'>
                                <Calendar />
                                <History couple_key={this.state.couple_key}/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
  
        )
    }
}