class Evakuieren{
    constructor(){
        this.menschen = 7961017954;
        this.evakuiert = 0;
        this.wege = [0,0,0];
        this.wegeAnzahl = [120000,1500000];
        this.schiffKosten = [[0,150000],[11,35000],[10,25000],[5,50000]];
        this.portalKosten = [[0,200000],[11,37500],[10,35000],[13,7500]];
        this.infrastrukturKosten = [[0,10000000],[11,1500000],[10,750000],[5,250000]];
        this.interstellarInhalt = [false,false];
        
    }

    evakuierenSpeichern(){
        var ausgabe = "";
        ausgabe += this.menschen +";";
        ausgabe += this.evakuiert + ";";
        ausgabe += this.wege + ";";
        ausgabe += this.schiffKosten + ";";
        ausgabe += this.portalKosten + ";";

        return ausgabe;
    }

    evakuierenLaden(menschen,evakuiert,wege,schiffKosten,portalKosten,sichtbar){
        this.menschen = menschen;
        this.evakuiert = evakuiert;
        this.wege = wege;
        this.schiffKosten = schiffKosten;
        this.portalKosten = portalKosten;
    }



}