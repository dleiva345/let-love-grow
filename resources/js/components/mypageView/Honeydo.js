import React from 'react'

export const HoneyDo = ({couple_key, honeyDos, fetchHoneyDo}) => (
    <div id='honeyDo'>
    
        <div className='card-header p-2 border mt-1'>Honey Do List
        </div>

        <div className='card-body border'>
            <div className='clearfix'>
                <img className="img-thumbnail rounded float-left mr-2"
                     style={{width:"70px", height:"70px"}}
                     src="../resources/images/logo.png">
                </img>
                <button className="btn btn-primary btn-sm offset-8" data-toggle="modal" data-target="#HoneyDoModal">Add Honey Do</button>
            </div>
        </div>

        <div className="modal fade" id="HoneyDoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        
        <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
            
                <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add to Honey Do List</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
            
                <div className="modal-body">
                    <form action='/honeyDoAdd' method='POST'>
                        <small className="form-text text-muted">Required*</small>
                        
                        <div className="form-group row">
                            <label htmlFor="inputDescription" className="col-sm-2 col-form-label">Honey Do*</label>
                            <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputDescription" name="descr" placeholder="Description"></input>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="inputDescription" className="col-sm-2 col-form-label">Honey*</label>
                            <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputDescription" name="descr" placeholder="Name"></input>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="inputDate" className="col-sm-2 col-form-label">Honey Do By*</label>
                            <div className="col-sm-10">
                            <input type="date" className="form-control" id="inputDate" name="date" placeholder="MM/DD/YYYY"></input>
                            </div>
                        </div>

                        <div className="form-group row" >
                            <div className="col-sm-10">
                            <input type="hidden" className="form-control" id="inputCoupleKey" name="couple_key" value={couple_key}></input>
                            </div>
                        </div>
                        <button className="btn btn-primary btn-sm offset-11" type="submit" name="action">Save</button>
                    </form>

                </div>

            </div>
        </div>
      </div>
    </div>
)
