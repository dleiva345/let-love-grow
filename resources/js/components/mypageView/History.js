import React from 'react'

export const History = ({couple_key}) => (
    <div id='history'>
        <form action='/historyAdd' method='POST'>
            <small className="form-text text-muted">Required*</small>
                        
            <div className="form-group row">
                <label htmlFor="inputDescription" className="col-sm-2 col-form-label col-form-label-sm">Event*</label>
                <div className="col-sm-10">
                <input type="text" className="form-control form-control-sm" id="inputDescription" name="event" placeholder="Description"></input>
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="inputDate" className="col-sm-2 col-form-label col-form-label-sm">Date*</label>
                <div className="col-sm-10">
                <input type="date" className="form-control form-control-sm" id="inputDate" name="date"></input>
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="inputDate" className="col-sm-2 col-form-label col-form-label-sm">Time*</label>
                <div className="col-sm-10">
                <input type="time" className="form-control form-control-sm" id="inputDate" name="time"></input>
                </div>
            </div>

            <div className="form-group row" >
                <div className="col-sm-10">
                <input type="hidden" className="form-control form-control form-control-sm" id="inputCoupleKey" name="couple_key" value={couple_key}></input>
                </div>
            </div>
            <button className="btn btn-primary btn-sm mt-0" type="submit" name="action">Save</button>
        </form>

    </div>

)
