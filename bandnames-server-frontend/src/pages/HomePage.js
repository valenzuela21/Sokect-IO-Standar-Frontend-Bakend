import React,{useContext}from 'react';
import {SocketContext} from "../context/SocketContext";
import {BandAdd} from "../Components/BandAdd";
import {BandList} from "../Components/BandList";

import '../App.css';
import {BandChart} from "../Components/BandChart";

function HomePage() {

    const {online} = useContext(SocketContext)

    return(
        <div className="container">

            <div className="alert">
                <p>
                    Service status:
                    {
                        online
                            ? <span className="text-success"> Online</span>
                            : <span className="text-danger"> Offline</span>
                    }

                </p>
            </div>

            <h1>BandNames</h1>
            <hr />
            <div>
                <BandChart/>
            </div>

            <div className="row">
                <div className="col-8">
                   <BandList />
                </div>

                <div className="col-4">
                    <BandAdd />
                </div>
            </div>


      </div>
    );

}

export default HomePage;
