import React, {useState, useContext} from 'react'
import {SocketContext} from "../context/SocketContext";

export const BandAdd = () => {
    const [value, setValue] = useState()
    const {socket} =  useContext(SocketContext)

    const onSubmit = (event) =>{
        event.preventDefault()
        console.log(value)
        if(value.trim().length > 0){
            socket.emit('new-band', {name: value})
            setValue('')
        }
    }

    return(
        <>
            <h4>Agregar Nueva Banda</h4>
            <form onSubmit={onSubmit}>
                <input className = "form-control"
                        value={value}
                        onChange={(e)=> setValue(e.target.value)}
                        placeholder = "Nuevo nombre de la banda"/>
            </form>
            </>
    )

}

