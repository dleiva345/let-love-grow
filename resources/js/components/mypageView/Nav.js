import React, { Component } from 'react'

export const Nav = (photo_couple) => (
    <div id='nav'>
        <nav className="navbar navbar-light bg-light border">
            <span className="navbar-brand mb-0 h1"><img src="./resources/images/logo.png"></img></span>
            
            <div className='d-flex justify-content-end'>Logout<img src= {photo_couple} style={{"border-radius": "50%", "width":"30px"}}></img></div>
        </nav>
    </div>
)