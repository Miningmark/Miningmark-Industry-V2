class Status{
    constructor(manuell,stufe,reiter,forschungen,projekte,planeten,material,startzeit){
        this.manuell = manuell || 0;
        this.stufe = stufe || [0,0,0,0];
        this.reiter = reiter || 3;
        this.forschungen = forschungen || 0;
        this.projekte = projekte || 0;
        this.planeten = planeten || 0;
        this.material = material || [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        this.startzeit = startzeit || Date.now();
    }

    statusSpeichern(){
        var ausgabe = "";
        ausgabe += this.manuell + ";";
        ausgabe += this.stufe + ";";
        ausgabe += this.reiter + ";";
        ausgabe += this.forschungen + ";";
        ausgabe += this.projekte + ";";
        ausgabe += this.planeten + ";";
        ausgabe += this.material + ";";
        ausgabe += Date.now()-this.startzeit + ";";
        
        return ausgabe;
    }

    statusLaden(manuell,stufe,reiter,forschungen,projekte,planeten,material,spielzeit){
        this.manuell = manuell;
        this.stufe = stufe;
        this.reiter = reiter;
        this.forschungen = forschungen;
        this.projekte = projekte;
        this.planeten = planeten;
        this.material = material;
        this.startzeit = Date.now()-spielzeit;
    }

    

    gesamtZeit(){
        var aktuelleZeit = Date.now();
        var zeit = Math.floor((aktuelleZeit - this.startzeit) /1000);
        var gesamtZeit = "";
        var temp = 0;

        if(zeit > 3600){
            temp = Math.floor(zeit/3600);
            zeit -= temp * 3600;
            if(temp < 10){
                gesamtZeit += "0" + temp + ":"
            }else{
                gesamtZeit += temp + ":"
            }
        }else{
            gesamtZeit += "00:"
        }
        if(zeit > 60){
            temp = Math.floor(zeit/60);
            zeit -= temp * 60;
            if(temp < 10){
                gesamtZeit += "0" + temp + ":"
            }else{
                gesamtZeit += temp + ":"
            }
        }else{
            gesamtZeit += "00:"
        }
        if(zeit < 10){
            gesamtZeit += "0" + zeit
        }else{
            gesamtZeit += zeit
        }

        return gesamtZeit;
    }

}