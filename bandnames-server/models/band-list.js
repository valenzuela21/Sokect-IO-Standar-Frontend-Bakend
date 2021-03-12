const Band = require('./band')
class BandList{
    constructor() {
        this.bands = [
            new Band('Metalica'),
            new Band('Heroes del silencio'),
            new Band('Bon Jovi'),
            new Band('Breaking Bejami')
        ]
    }

    addBand(name){
        const newBand = new Band(name);
        this.bands.push(newBand);
        return this.bands
    }

    removeBand(id){
        this.bands = this.bands.filter(band => band.id !== id)
    }

    getBands(){
        return this.bands
    }

    increaseVotesBands(id){
        this.bands = this.bands.map(
            band=>{
                if(band.id === id){
                    band.votes += 1;
                }
                return band
            }
        )
    }

    changeNameBands(id, newName){
        this.bands = this.bands.map(
            band => {
                if(band.id === id){
                    band.name = newName;
                }
                return band
            }
        )
    }


}
module.exports = BandList;
