import React, { Component } from 'react'

import { Nav } from './mypageView/Nav'
import { Profile } from './mypageView/Profile'
import { Album } from './mypageView/Album'
import { Messages } from './mypageView/Messages'
import { History } from './mypageView/History'
import { HoneyDo } from './mypageView/HoneyDo'
import Calendar from 'react-day-picker';
import 'react-day-picker/lib/style.css';
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
            message:'',
            events:{},
            thisMonth: new Date().getMonth(),
            honey_dos:[],
            honey_do:''
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
        this.fetchHistory = this.fetchHistory.bind(this);
        this.fetchHoneyDo = this.fetchHoneyDo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);

    }

    componentDidMount() {
        this.fetchAlbum(this.state.couple_key);
        this.fetchHistory(this.state.thisMonth, this.state.couple_key);
        this.fetchHoneyDo(this.state.couple_key);
    }

    handleChange = (event) => {
        this.setState({ [event.target.id] : event.target.value });    
    }

    handleCheck = (event) => {
        event.preventDefault();
        fetch('/honeydoDelete/'+ event.target.id, {
            method: 'POST'
        })
        .then((response) => {
            if (response.status >= 400) {
                console.log("Bad response from server");
            } else {
                this.fetchHoneyDo(this.state.couple_key);
            }
        })    
    }

    handleHoneyDo = (event) => {
        event.preventDefault();
        var query = {couple_key:this.state.couple_key, honey_do: this.state.honey_do}
        fetch('/honeydoAdd', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(query)
        })
        this.fetchHoneyDo(this.state.couple_key)
        this.setState({honey_do: ''});
    }

    fetchHoneyDo = (couple_key) => {
        var query = {
            'couple_key' : couple_key
        }
        fetch('/honeyDo', {
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
                honey_dos: data    
            }) 
        })
    }


    fetchHistory = (thisMonth, couple_key) => {
        var query = {
            'couple_key' : couple_key,
            'month': thisMonth
        }
        fetch('/history', {
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
        .then((histories) => {
            var events={}
            histories.map(history =>{
                var dateNumber = parseInt(history.date.substring(8,10));
                if (events[dateNumber]){
                    events[dateNumber].push(history.event)
                } else {
                    events[dateNumber]=[history.event]
                }
                
            })
            console.log(events)  
            this.setState({
                events: events    
            }) 
            
        })
    }

    renderDay = (day) => {
        const date = day.getDate();
        const cellStyle = { height: 30, width: 30, position: 'relative'};
        const dateStyle = {position: 'absolute', color: 'lightgray', bottom: 0, right: 0, fontSize: 7 };
        const eventStyle = {position: 'absolute', color: 'blue', bottom: 0, right: 0, fontSize: 20 };
        const birthdayStyle = { fontSize: '0.8em', textAlign: 'left' };
    
        return (
          <div>
              {this.state.events[date] ? <button type="button" className="btn btn-sm btn-secondary" data-toggle="tooltip" data-placement="top" title={this.state.events[date]} >{date}</button> : <div>{date}</div>}
          </div>
        );
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
        return(
            <div id='mypage'>
                <Nav photo_couple={this.state.photo_couple}/>
                <div className="border container">
                    <div className='row'>
                        <div className='m-0 col-4'>
                            <Profile    couple_key={this.state.couple_key}
                                        email={this.state.email}
                                        first_name={this.state.first_name}
                                        last_name={this.state.last_name}
                                        birthday={this.state.birthday}
                                        anniversary={this.state.anniversary}
                                        photo={this.state.photo}
                                        photo_couple={this.state.photo_couple}/>
                            
                        <div class="p-5 border text-center"><br></br>Mood area<br></br></div>

                            
                            
                        </div>

                        <div className='m-0 col-4'>
                       
                            <Album  couple_key={this.state.couple_key}
                                    albums={this.state.albums}
                                    last_one={this.state.last_one}
                                    fetchAlbum={this.fetchAlbum} 
                                    handleChange={this.handleChange} />
                            
                            <Messages first_name={this.state.first_name}
                                      messages={this.state.messages}
                                      message={this.state.message}
                                      handleMessenger={this.handleMessenger}
                                      handleChange={this.handleChange} />
                            
                        </div>

                        <div className='m-0 col-4'>
                            <div className='card-header p-2 border mt-1 d-flex justify-content-between'  data-toggle="modal" data-target="#historyAddModal"> <div>Upcoming Events</div><div className="btn btn-sm btn-primary text-white">add</div></div>
                                <History couple_key={this.state.couple_key} />
                            <div className='card-body border'>
                                <Calendar renderDay={this.renderDay}
                                          handleClick={this.handleClick} />
                            </div>
                            <HoneyDo honey_do={this.state.honey_do}
                                    honey_dos={this.state.honey_dos}
                                    handleChange={this.handleChange}
                                    handleHoneyDo={this.handleHoneyDo}
                                    handleCheck={this.handleCheck} />
                        </div>

                    </div>
                </div>
            </div>
  
        )
    }
}