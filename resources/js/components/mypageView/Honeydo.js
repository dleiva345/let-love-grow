import React, { Component } from 'react'



export const HoneyDo = ({honey_do, honey_dos, handleChange, handleHoneyDo, handleCheck}) => (
    <div>
        <div className='card-header p-2 border mt-1'>Honey Do</div>
        <div className='card-body border p-0'>
            {honey_dos.map((todo) =>(
                <form  className="p-1" action= {'/honeydoDelete/'+ todo._id} method = "post">
                    <input type="checkbox" id={todo._id} onClick={(e) => {handleCheck(e)}} />{todo.honey_do}
                </form>
            ))}
            <form>
                <div className="row m-0 ">
                    <input className="col-12" id="honey_do" type="text" name="honey_do" onChange={(e) => {handleChange(e)}} value={honey_do}></input>
                    <button type="submit" className="col-3 btn btn-sm btn-default text-white" onClick={(e) => handleHoneyDo(e)}>Add</button>
                </div>
            </form>
        </div>
    </div>
)