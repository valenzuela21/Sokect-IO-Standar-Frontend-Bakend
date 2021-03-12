import React, {useState, useEffect, useContext} from 'react'
import {SocketContext} from "../context/SocketContext";

export const BandList = () => {
    const {socket} = useContext(SocketContext)
    const [bands, setBands] = useState([])

    useEffect(() => {
        socket.on('current-bands', (bands) => {
            setBands(bands)
        })
        return () => socket.off('current-bands')
    }, [socket])


    const changeName = (event, id) => {
        const newName = event.target.value;
        setBands(bands => bands.map(band => {
            if (band.id === id) {
                band.name = newName
            }
            return band
        }))

    }

    const onLostFocus = (id, name) => socket.emit('change-bands', {id, name});


    const votar = (id) => {
        socket.emit('vote-bands', id);
    }

    const erase = (id) => {
        socket.emit('erase-bands', id);
    }


    const createRows = () => {
        return (
            bands.map(band => (
                <tr className="border-bottom" key={band.id}>
                    <td>
                        <button
                            className="btn btn-primary"
                            onClick={() => votar(band.id)}
                        > +1
                        </button>
                    </td>
                    <td>
                        <input
                            className="form-control"
                            value={band.name}
                            onChange={(event) => changeName(event, band.id)}
                            onBlur={(event) => onLostFocus(band.id, band.name)}
                        />
                    </td>
                    <td>
                        <h3>{band.votes}</h3>
                    </td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() => erase(band.id)}
                        > Borrar
                        </button>
                    </td>
                </tr>
            ))

        )

    }
    return (
        <div>
            <h4>Bandas Actuales</h4>
            <table className="table table-stripped">
                <thead>
                <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Votos</th>
                    <th>Borrar</th>
                </tr>
                </thead>
                <tbody>
                {createRows()}
                </tbody>
            </table>
        </div>
    )
}




