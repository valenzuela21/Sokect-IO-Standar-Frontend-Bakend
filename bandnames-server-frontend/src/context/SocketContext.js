import React, {createContext} from  'react'
import {useSocket} from "../hooks/useSocket";
export const SocketContext = createContext();
const PATH_URL = process.env.REACT_APP_HOST
export const  SocketProvider = ({children}) =>{

    const {socket, online} = useSocket(PATH_URL)

    return (
        <SocketContext.Provider value={{socket, online}}>
            {children}
        </SocketContext.Provider>
    )
}
