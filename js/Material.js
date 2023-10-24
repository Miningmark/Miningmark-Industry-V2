class Material{
    constructor(id, nameID, name, anzahl, lager, preis, manuel, versteckt, autoVerkaufAnzahl, autoVerkaufAktiv,fabrik,fabrikVersteckt,fabrikInfo,fabrikVerbrauch,fabrikKosten){
        this.id = id;
        this.nameID = nameID;
        this.name = name;
        this.anzahl = anzahl;
        this.lager = lager;
        this.lagerErweiterung = this.lager*2;
        this.preis = preis;
        this.ps = 0;
        this.projektBonus = 0;
        this.manuel = manuel;
        this.versteckt = versteckt;
        this.autoVerkaufAnzahl = autoVerkaufAnzahl;
        this.autoVerkaufAktiv = autoVerkaufAktiv;
        this.fabrik = fabrik;       //[fabrikstufe,fabrikstufe]
        this.fabrikVersteckt = fabrikVersteckt;
        this.fabrikInfo = fabrikInfo;   //[[produktion,verbrauch(true/fals), verbrauch Material, Menge],[]]
        this.fabrikVerbrauch = fabrikVerbrauch;
        this.fabrikKosten = fabrikKosten;   //[[[baukosten ID, menge]],[[baukosten ID, menge],[baukosten ID, menge]]]
        
        
    }

    materialSpeichern(){
        var speicher = ""

        speicher += this.anzahl + ";";
        speicher += this.lager + ";";
        speicher += this.versteckt + ";";
        speicher += this.autoVerkaufAnzahl + ";";
        speicher += this.autoVerkaufAktiv + ";";
        speicher += this.fabrik + ";";
        speicher += this.fabrikVersteckt + ";";
        speicher += this.fabrik.length + ";";
        for(var i = 0; i < this.fabrik.length; i++){
            speicher += this.fabrikKosten[i] + ";";
        }

        return speicher;
    }

    materialLaden(anzahl,lager,versteckt,autoVerkaufAnzahl,autoVerkaufAktiv,fabrik,fabrikVersteckt,fabrikKosten){
        this.anzahl = anzahl;
        this.lager = lager;
        this.lagerErweiterung = this.lager*2;
        this.versteckt = versteckt;
        this.autoVerkaufAnzahl = autoVerkaufAnzahl;
        this.autoVerkaufAktiv = autoVerkaufAktiv;
        this.fabrik = fabrik;       
        this.fabrikVersteckt = fabrikVersteckt;
        this.fabrikKosten = fabrikKosten;
    }

    
    

}

