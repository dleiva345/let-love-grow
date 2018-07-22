import React, { Component } from 'react'
import { Icon } from 'react-icons-kit'
import { happy } from 'react-icons-kit/icomoon/happy'
import { smile } from 'react-icons-kit/icomoon/smile'
import { tongue } from 'react-icons-kit/icomoon/tongue'
import { sad } from 'react-icons-kit/icomoon/sad'
import { wink } from 'react-icons-kit/icomoon/wink'
import { grin } from 'react-icons-kit/icomoon/grin'
import { cool } from 'react-icons-kit/icomoon/cool'
import { angry } from 'react-icons-kit/icomoon/angry'
import { evil } from 'react-icons-kit/icomoon/evil'
import { shocked } from 'react-icons-kit/icomoon/shocked'
import { baffled } from 'react-icons-kit/icomoon/baffled'
import { confused } from 'react-icons-kit/icomoon/confused'
import { neutral } from 'react-icons-kit/icomoon/neutral'
import { hipster } from 'react-icons-kit/icomoon/hipster'
import { wondering } from 'react-icons-kit/icomoon/wondering'
import { sleepy } from 'react-icons-kit/icomoon/sleepy'
import { frustrated } from 'react-icons-kit/icomoon/frustrated'
import { crying } from 'react-icons-kit/icomoon/crying'

export const Mood = ({couple_key, mood_me, mood_partner, handleClick, fetchMood}) => (
    <div>
        <div className='card-header p-2 border mt-1 d-flex justify-content-between' onClick={()=>fetchMood(couple_key)}><div>Mood</div><div className="btn btn-sm btn-primary text-white">update</div></div>
        <div className='card-body border'>
                    
                <div className="dropdown mb-3">
                    <p>How are you feeling today?</p>
                        <button className="btn btn-primary dropdown-toggle d-flex justify-content-center" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                { (() => {
                                    switch(mood_me){
                                        case 'happy': return  <Icon size={18} icon={happy}/>
                                        case 'smile': return  <Icon size={18} icon={smile}/>
                                        case 'tongue': return  <Icon size={18} icon={tongue}/>
                                        case 'sad': return  <Icon size={18} icon={sad}/>
                                        case 'wink': return  <Icon size={18} icon={wink}/>
                                        case 'grin': return  <Icon size={18} icon={grin}/>
                                        case 'cool': return  <Icon size={18} icon={cool}/>
                                        case 'angry': return  <Icon size={18} icon={angry}/>
                                        case 'evil': return  <Icon size={18} icon={evil}/>
                                        case 'shocked': return  <Icon size={18} icon={shocked}/>
                                        case 'baffled': return  <Icon size={18} icon={baffled}/>
                                        case 'confused': return  <Icon size={18} icon={confused}/>
                                        case 'neutral': return  <Icon size={18} icon={neutral}/>
                                        case 'hipster': return  <Icon size={18} icon={hipster}/>
                                        case 'wondering': return  <Icon size={18} icon={wondering}/>
                                        case 'sleepy': return  <Icon size={18} icon={sleepy}/>
                                        case 'frustrated': return  <Icon size={18} icon={frustrated}/>
                                        case 'crying': return  <Icon size={18} icon={crying}/>
                                    }
                                    })()
                                } 
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button className="dropdown-item" id="mood_me" value="happy" onClick={() => handleClick("happy")}><Icon size={18} icon={happy}/></button>
                                <button className="dropdown-item" id="mood_me" value="smile" onClick={() => handleClick("smile")}><Icon size={18} icon={smile}/></button>
                                <button className="dropdown-item" id="mood_me" value="tongue" onClick={() => handleClick("tongue")}><Icon size={18} icon={tongue}/></button>
                                <button className="dropdown-item" id="mood_me" value="sad" onClick={() => handleClick("sad")}><Icon size={18} icon={sad}/></button>
                                <button className="dropdown-item" id="mood_me" value="wink" onClick={() => handleClick("wink")}><Icon size={18} icon={wink}/></button>
                                <button className="dropdown-item" id="mood_me" value="grin" onClick={() => handleClick("grin")}><Icon size={18} icon={grin}/></button>
                                <button className="dropdown-item" id="mood_me" value="cool" onClick={() => handleClick("cool")}><Icon size={18} icon={cool}/></button>
                                <button className="dropdown-item" id="mood_me" value="angry" onClick={() => handleClick("angry")}><Icon size={18} icon={angry}/></button>
                                <button className="dropdown-item" id="mood_me" value="evil" onClick={() => handleClick("evil")}><Icon size={18} icon={evil}/></button>
                                <button className="dropdown-item" id="mood_me" value="shocked" onClick={() => handleClick("shocked")}><Icon size={18} icon={shocked}/></button>
                                <button className="dropdown-item" id="mood_me" value="baffled" onClick={() => handleClick("baffled")}><Icon size={18} icon={baffled}/></button>
                                <button className="dropdown-item" id="mood_me" value="confused" onClick={() => handleClick("confused")}><Icon size={18} icon={confused}/></button>
                                <button className="dropdown-item" id="mood_me" value="neutral" onClick={() => handleClick("neutral")}><Icon size={18} icon={neutral}/></button>
                                <button className="dropdown-item" id="mood_me" value="hipster" onClick={() => handleClick("hipster")}><Icon size={18} icon={hipster}/></button>
                                <button className="dropdown-item" id="mood_me" value="wondering" onClick={() => handleClick("wondering")}><Icon size={18} icon={wondering}/></button>
                                <button className="dropdown-item" id="mood_me" value="sleepy" onClick={() => handleClick("sleepy")}><Icon size={18} icon={sleepy}/></button>
                                <button className="dropdown-item" id="mood_me" value="frustrated" onClick={() => handleClick("frustrated")}><Icon size={18} icon={frustrated}/></button>
                                <button className="dropdown-item" id="mood_me" value="crying" onClick={() => handleClick("crying")}><Icon size={18} icon={crying}/></button>
                        </div>
                </div>

                <div>
                    <p>Your partner</p>
                    { (() => {
                        switch(mood_partner){
                            case 'happy': return  <Icon size={60} icon={happy}/>
                            case 'smile': return  <Icon size={60} icon={smile}/>
                            case 'tongue': return  <Icon size={60} icon={tongue}/>
                            case 'sad': return  <Icon size={60} icon={sad}/>
                            case 'wink': return  <Icon size={60} icon={wink}/>
                            case 'grin': return  <Icon size={60} icon={grin}/>
                            case 'cool': return  <Icon size={60} icon={cool}/>
                            case 'angry': return  <Icon size={60} icon={angry}/>
                            case 'evil': return  <Icon size={60} icon={evil}/>
                            case 'shocked': return  <Icon size={60} icon={shocked}/>
                            case 'baffled': return  <Icon size={60} icon={baffled}/>
                            case 'confused': return  <Icon size={60} icon={confused}/>
                            case 'neutral': return  <Icon size={60} icon={neutral}/>
                            case 'hipster': return  <Icon size={60} icon={hipster}/>
                            case 'wondering': return  <Icon size={60} icon={wondering}/>
                            case 'sleepy': return  <Icon size={60} icon={sleepy}/>
                            case 'frustrated': return  <Icon size={60} icon={frustrated}/>
                            case 'crying': return  <Icon size={60} icon={crying}/>
                        }
                        })()
                    } 
                </div>

        </div> 
        
    </div>
)