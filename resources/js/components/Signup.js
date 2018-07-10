import React, { Component } from 'react'

export class Signup extends Component {

    render(){
        return (
            <div>
                <form className='col-10 offset-1' autoComplete="off" action='/signup' method='POST'>
                    <small className="form-text text-muted">*required</small>
                    <div className="form-group row" >
                      <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email*</label>
                      
                      <div className="col-sm-10">
                        <input type="email" className="form-control" id="inputEmail" name="email"placeholder="Email" aria-describedby="emailHelp"></input>
                        
                      </div>
                    </div>
            
                    <div className="form-group row">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password*</label>
                        <div className="col-sm-10">
                          <input type="password" className="form-control" id="inputPassword" name="password" placeholder="Password"></input>
                        </div>
                    </div>
            
                    <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="inputFirstName">First Name*</label>
                          <input type="text" className="form-control" id="inputFirstName" name="firstName" placeholder="First Name"></input>
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="inputLastName">Last Name*</label>
                          <input type="text" className="form-control" id="inputLastName" name="lastName" placeholder="Last Name"></input>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="inputCoupleID" className="col-sm-2 col-form-label">Couple ID</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" id="inputCoupleID" name="coupleID" placeholder="If your partner has one..."></input>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="inputBirthday" className="col-sm-2 col-form-label">Birthday</label>
                        <div className="col-sm-10">
                          <input type="date" className="form-control" id="inputBirthday" name="birthday" placeholder="Birthday"></input>
                        </div>
                    </div>
            
                    <div className="form-group row">
                        <label htmlFor="inputAnniversary" className="col-sm-2 col-form-label">Anniversary</label>
                        <div className="col-sm-10">
                          <input type="date" className="form-control" id="inputAnniversary" name="anniversary" placeholder="Anniversary"></input>
                        </div>
                    </div>
            
                    <div className="form-group row">
                        <label htmlFor="uploadPhoto" className="col-sm-2 col-form-label">Choose your photo</label>
                        <div className="col-sm-10">
                            <input type="file" className="form-control-file" id="uploadPhoto" name="photoLink"></input>
                        </div>
                    </div>
                    
                    <button className="btn btn-primary btn-lg offset-10" type="submit" name="action">Submit</button>
                </form>
            </div>
        )
    }
}