import React, { Component } from 'react'
import Logo from '../../../images/logo2.png'

export const Nav = ({photo_couple}) => (
    <div id='nav'>
        <nav className="navbar navbar-light bg-default border">
            <span className="navbar-brand mb-0 h1"><img src={Logo} height="50px"></img></span>
            
            <div className='d-flex justify-content-end'><a className="text-white" href="/">Logout</a></div>
        </nav>
    </div>
)