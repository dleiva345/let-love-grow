import React, { Component } from 'react'

//for example...
import Profile from './mypageView/Profile'
import Album from './mypageView/Album'
import Message from './mypageView/Message'

export class Mypage extends Component {
    render(){
        return(
            <div>
                <nav className="navbar navbar-light bg-light border">
                    <span className="navbar-brand mb-0 h1">Navbar</span>
                    <div className='d-flex justify-content-end'>Logout</div>
                </nav>
                <div className="border container">
                    <div className='row'>
                        <div className='col col-3'>
                            <div className="container p-5 border text-center"><br /><br /> Profile Area <br /><br /></div>
                            <div className="container p-5 border text-center"><br /><br /> Album Area <br /><br /></div>
                        </div>
                        <div className='col col-6'>
                            <div className="container p-5 border text-center"><br /><br />Mood area<br /><br /></div>
                            <div className="container p-5 border text-center"><br /><br />Message area<br /><br /></div>
                        </div>
                        <div className='col col-3'>
                            <div className="container p-5 border text-center"><br /><br />Calendar area<br /><br /></div>
                            <div className="container p-5 border text-center"><br /><br />Todo area<br /><br /></div>
                        </div>
                    </div>
                    <div className='border'>
                        <div className="container p-3 border text-center"><br /><br />Notification area<br /><br /></div>
                    </div>
                </div>
            </div>
        )
    }
}