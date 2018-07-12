import React, { Component } from 'react'

import { Nav } from './mypageView/Nav'
import { Profile } from './mypageView/Profile'
import { Album } from './mypageView/Album'


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
            albums: []
            
        }
        this.fetchAlbum = this.fetchAlbum.bind(this)
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
                        <div className='col-4'>
                            <Profile    couple_key={this.state.couple_key}
                                        email={this.state.email}
                                        first_name={this.state.first_name}
                                        last_name={this.state.last_name}
                                        birthday={this.state.birthday}
                                        anniversary={this.state.anniversary}
                                        photo={this.state.photo}
                                        photo_couple={this.state.photo_couple} />
                                        
                            <Album      couple_key={this.state.couple_key}
                                        albums={this.state.albums}
                                        last_one={this.state.last_one}
                                         />
                        </div>

                        <div className='col col-5'>
                            <div className="container p-5 border text-center"><br /><br />Mood area<br /><br /></div>
                            <div className="container p-5 border text-center"><br /><br />Message area<br /><br /></div>
                        </div>
                        <div className='col col-3'>
                            <div className="container p-5 border text-center"><br /><br />Calendar area<br /><br /></div>
                            <div className="container p-5 border text-center"><br /><br />Todo area<br /><br /></div>
                        </div>

                    </div>
                </div>
            </div>
  
        )
    }
}