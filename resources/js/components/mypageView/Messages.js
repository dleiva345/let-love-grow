import React from 'react'
import '../../../css/style.css'

export const Messages = ({first_name, messages, message, handleMessenger, handleChange}) => (
    <div className='m-0'>
      <div id='messages'>
        <div className='card-header p-2 border mt-1'>Instant messages</div>
        <div id="chatLog" className="col-12 border" style={{'height': '280px', 'overflow': 'auto'}}> <div dangerouslySetInnerHTML={{ __html: messages }}></div>   </div> 
        
        <form id="chatInput">
            <div className="row m-0 ">
              <input className="col-3" id="first_name" value={first_name} readonly></input>
              <input className="col-9" id="message" type="text" onChange={(e) => {handleChange(e)}} value={message} ></input>
              <button type="submit" className="col-3 btn btn-default btn-sm" onClick={handleMessenger}>Send</button>
            </div>
        </form>

      </div>  
    </div>
)
