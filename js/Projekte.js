class Projekt{
    constructor() {
        this.erworben = [false,false,false,false,false,false,false,false,false,false,false,false,false];
        this.versteckt = [false,true,true,true,true,true,true,true,true,true,true,true,true];
        this.sichtbar = false;
    }

    projektSpeichern(){
        var ausgabe = "";
        ausgabe += this.erworben + ";";
        return ausgabe;
    }

    projektLaden(erworben,versteckt,sichtbar){
        this.erworben = erworben;

    }



    erwerben(id){

        switch(id){
            case 0:
                materialListe[1].projektBonus += 250;
                $("#energieProjektBonus").append(`250 Energie durch das Projekt "Offshore-Windpark".<br>`);
                break;
            case 1:
                $(".projektID02").removeClass("projektIstVersteckt");
                $("#sonnensystem").css("display", "block");
                $(".projektID08").removeClass("projektIstVersteckt");
                $(".projektID09").removeClass("projektIstVersteckt");
                $(".projektID12").removeClass("projektIstVersteckt");
                break;
            case 2:
                forschung.projektBonus += 175;
                break;
            case 3:
                forschung.forschungsEffizienz += 0.05;
                forschung.energieEffizienz += 0.05;
                $("#wissenschaftlerID04").removeClass("wissenschaftlerIstVersteckt");
                if(forschung.forschungErworben[16]){
                    $("#forschungID17").removeClass("forschungIstVersteckt");
                }
                $("#forschungID19").removeClass("forschungIstVersteckt");
                $("#forschungID30").removeClass("forschungIstVersteckt");
                break;
            case 4:
                $(".helium3").css("display", "block");
                forschung.anzahl += 12500;
                $("#forschungID18").removeClass("forschungIstVersteckt");
                $("#forschungID20").removeClass("forschungIstVersteckt");
                $(".014").css("display", "block");
                $("#forschungID36").removeClass("forschungIstVersteckt");
                $("#forschungID38").removeClass("forschungIstVersteckt");
                break;
            case 5:
                $("#metallProjektBonus").append(`200 Metall durch das Projekt "Multi Bergbau Komplex".<br>`);
                $("#kupferProjektBonus").append(`150 Kupfer durch das Projekt "Multi Bergbau Komplex".<br>`);
                $("#goldProjektBonus").append(`145 Gold durch das Projekt "Multi Bergbau Komplex".<br>`);
                $("#titanProjektBonus").append(`100 Titan durch das Projekt "Multi Bergbau Komplex".<br>`);
                $("#uranProjektBonus").append(`10 Uran durch das Projekt "Multi Bergbau Komplex".<br>`);
                materialListe[3].projektBonus += 200;
                materialListe[7].projektBonus += 150;
                materialListe[8].projektBonus += 145;
                materialListe[11].projektBonus += 100;
                materialListe[12].projektBonus += 10;
                break;
            case 6:
                $("#titanProjektBonus").append(`350 Titan durch das Projekt "Mars Bergbau".<br>`);
                materialListe[11].projektBonus += 350;
                break;
            case 7:
                $("#energieProjektBonus").append(`25.000 Energie durch das Projekt "Dyson-Sphäre".<br>`);
                materialListe[1].projektBonus += 25000;
                break;
            case 8:
                forschung.projektBonus += 40;
                $("#zielUnbekannt").css("display", "none");
                $(".zielBekannt").css("display", "block");
                break;
            case 9:
                forschung.projektBonus += 50;
                $("#forschungID34").removeClass("forschungIstVersteckt");
                $("#zielUnbekannt").css("display", "none");
                $(".zielBekannt").css("display", "block");
                break;
            case 10:
                if(evakuieren.wege[2] == 1){
                    $("#generationenschiffKarte").removeClass("projektIstVersteckt");
                }
                $("#interstellar").css("display", "block");
                $("#zielUnbekannt").css("display", "none");
                $(".zielBekannt").css("display", "block");
                break;
            case 11:
                if(evakuieren.wege[2] == 1){
                    $("#wurmlochportalKarte").removeClass("projektIstVersteckt");
                }
                $("#interstellar").css("display", "block");
                $("#zielUnbekannt").css("display", "none");
                $(".zielBekannt").css("display", "block");
                break;
            case 12:
                $("#treibstoffProjektBonus").append(`375 Treibstoff durch das Projekt "Raketentreibstoff Fabrik".<br>`);
                materialListe[5].projektBonus += 375;
                break;
            default:
        }
    }
}