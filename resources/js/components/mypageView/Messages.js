import React from 'react'


export const Messages = ({first_name, messages, message, handleMessenger, handleChange}) => (
    <div className='m-0'>
      <div id='messages'>
        <div className='card-header p-2 border mt-1'>Instant messages</div>
        <textarea id="chatLog" className="col-12" value={messages} rows="10" readonly></textarea> 
        <form id="chatInput">
            <div className="row m-0 ">
              <input className="col-3" id="first_name" value={first_name} readonly></input>
              <input className="col-7" id="message" type="text" onChange={(e) => {handleChange(e)}} value={message} ></input>
              <button type="submit" className="col-2 btn btn-primary btn-sm" onClick={handleMessenger}>Send</button>
            </div>
        </form>
      </div>  
    </div>
)
