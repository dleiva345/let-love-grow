import React, { Component } from 'react'
import Logo from '../../../images/logo.png'

export const Nav = ({photo_couple}) => (
    <div id='nav'>
        <nav className="navbar navbar-light bg-light border">
            <span className="navbar-brand mb-0 h1"><img src={Logo} height="50px"></img></span>
            
            <div className='d-flex justify-content-end'><a href="/">Logout</a><img src={photo_couple} height="40px" style={{"borderRadius": "50%", "width":"30px"}}></img></div>
        </nav>
    </div>
)