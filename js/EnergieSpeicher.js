class EnergieSpeicher{
    constructor() {
        this.speicher = [0,0,0,0];
        this.speicherKapazität = [500,1250,15000,45000];
        this.kosten = [[[0,900]],[[0,2750],[7,550]],[[0,35000],[7,6400]],[[0,235000],[7,26500],[13,50]]];
        this.versteckt = [false,true,true,true];
    }


    speicherSpeichern(){
        var ausgabe = "";
        ausgabe += this.speicher +";";
        ausgabe += this.kosten +";";
        ausgabe += this.versteckt +";";
        
        return ausgabe;
    }

    speicherLaden(speicher,kosten,versteckt){
        this.speicher = speicher;
        this.kosten = kosten;
        this.versteckt = versteckt;

    }

}