const BandList = require('./band-list')
class Sockets {
    constructor( io ) {
        this.io = io;
        this.bandList = new BandList();
        this.socketEvents();
    }

    socketEvents(){
        //On Connection
        this.io.on('connection', (socket) => {
            console.log('Client Success Connection!')

            //Emitir Input client connection
            socket.emit('current-bands', this.bandList.getBands())

            //Vote Output client bands
            socket.on('vote-bands',(id) => {
                this.bandList.increaseVotesBands(id)
                this.io.emit('current-bands', this.bandList.getBands())
            })

            //Vote Erase client bands
            socket.on('erase-bands', (id) => {
                this.bandList.removeBand(id)
                this.io.emit('current-bands', this.bandList.getBands())
            })

            //Change Name
            socket.on('change-bands', (data)=>{
                this.bandList.changeNameBands(data.id, data.name)
                this.io.emit('current-bands', this.bandList.getBands())
            })

            //Create New Band
            socket.on('new-band', (data)=>{
                this.bandList.addBand(data.name)
                this.io.emit('current-bands', this.bandList.getBands())
            })

        })
    }

}
module.exports = Sockets
