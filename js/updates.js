schiffPos = 330;
schiffFlag = true;
standartTextfarbe = "white";

async function timer(){
    var updateZeit = Date.now();
    var speicherZeit = Date.now();
    var aktuelleZeit = Date.now();
    speicherInterval = 30;
    flag = true;
    startflag = false;
    

    if (localStorage.getItem("spielstand") != null) {
        $("#spiel").css("display", "block");
        startflag = true;
        laden();
    }else{
        $("#intro").css("display", "block");
        
    }
    while(true){
        if(startflag){
        
            while(true){
                while(flag){
                    aktuelleZeit = Date.now();
                    await sleep(20);
                    if(aktuelleZeit >= updateZeit + 1000){
                        timerUpdate();
                        updateZeit = aktuelleZeit;
                    }
                    if(aktuelleZeit >= speicherZeit + 100){
                        speicherInterval -= 0.1;
                        $("#speicherZeit").html("Autospeichern in " + speicherInterval.toFixed(1));
                        speicherZeit = aktuelleZeit;
                        if(speicherInterval <= 0.1){
                            speicherInterval = 30;
                            speichern();
                        }
                    }
                    schiffBewegung();
                }
                await sleep(100);
            }
        }
        await sleep(100);
    }

    
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function schiffBewegung(){
    if(evakuieren.wege[0] > 0){
        if(schiffFlag){
            if(schiffPos + 1 < 1050){
                schiffPos += 1;
                $("#schiffrechts").css("display", "block");
                $("#schiffrechts").css("left", schiffPos);
            }else{
                schiffFlag = false;
                $("#schiffrechts").css("display", "none");
            }
        }else{
            if(schiffPos - 1 > 330){
                schiffPos -= 1;
                $("#schifflinks").css("display", "block");
                $("#schifflinks").css("left", schiffPos);
            }else{
                schiffFlag = true;
                $("#schifflinks").css("display", "none");
            }
        }
    }
}


function timerUpdate(){
    automatismus();
    guiAutoSeite();
}

function guiAutoSeite(){
    switch(aktTab){
        case "ressourcen":
            guiupdateRessourcen();
            break;
        case "forschung":
            guiupdateForschung();
            break;
        case "grossProjekte":
            guiupdateProjekte();
            break;
        case "sonnensystem":
            guiupdateSonnensystem();
            break;
        case "interstellar":
            guiupdateInterstellar();
            break;
        case "evakuierung":
            guiupdateEvakuierung();
            break;
        case "status":
            guiupdateStatus();
            break;
        case "hilfe":
            break;
        default:
    }
}

function guiUpdateKomplett(){
    guiupdateRessourcen();
    guiupdateForschung();
    guiupdateProjekte();
    guiupdateSonnensystem();
    guiupdateInterstellar();
    guiupdateEvakuierung();

}


function automatismus(){
    
    let anzahlListe = [materialListe[0].anzahl];
    let zyklusProduktion = [0];

    //Array mit Default befüllen
    for(let i = 1; i < materialListe.length; i++){
        anzahlListe.push(materialListe[i].anzahl);
        zyklusProduktion.push(0);
    }
    for(let i = 1; i < materialListe.length; i++){      //i=1 wegen 0-> Geld hat keine Fabriken
        zyklusProduktion[i] += materialListe[i].projektBonus;
        statistik.material[i] += materialListe[i].projektBonus;
        var boniMultiplikator = forschung.ressourcenEffizienz;
        if(i == 1){
            boniMultiplikator = forschung.energieEffizienz;
        }

        for(let j = 0; j < materialListe[i].fabrik.length; j++){
            if(materialListe[i].fabrikInfo[j][1]){  //Fabrik MIT Verbrauch
                var verbrauchAnzahl = materialListe[i].fabrikVerbrauch[j].length;
                var allesVerfugbar = true;
                var maxmoglich = 99999;
                for(var k = 0; k < verbrauchAnzahl;k++){
                    let gesamtVerfugbar = anzahlListe[materialListe[i].fabrikVerbrauch[j][k][0]] + zyklusProduktion[materialListe[i].fabrikVerbrauch[j][k][0]];
                    if(gesamtVerfugbar < materialListe[i].fabrik[j] * materialListe[i].fabrikVerbrauch[j][k][1]){
                        allesVerfugbar = false;
                        let temp = Math.floor(gesamtVerfugbar / materialListe[i].fabrikVerbrauch[j][k][1]);
                        if(temp < maxmoglich){
                            maxmoglich = temp;
                        }
                    }
                }
                if(allesVerfugbar){
                    zyklusProduktion[i] += boniMultiplikator * materialListe[i].fabrik[j] * materialListe[i].fabrikInfo[j][0];
                    statistik.material[i] += boniMultiplikator * materialListe[i].fabrik[j] * materialListe[i].fabrikInfo[j][0];
                    for(var k = 0; k < verbrauchAnzahl;k++){
                        zyklusProduktion[materialListe[i].fabrikVerbrauch[j][k][0]] -= materialListe[i].fabrik[j] * materialListe[i].fabrikVerbrauch[j][k][1];
                    }
                }else{  //Teilweiße Ausreichend Verbrauchsgüter
                    zyklusProduktion[i] += boniMultiplikator * maxmoglich * materialListe[i].fabrikInfo[j][0];
                    statistik.material[i] += boniMultiplikator * maxmoglich * materialListe[i].fabrikInfo[j][0];
                    for(var k = 0; k < verbrauchAnzahl;k++){
                        zyklusProduktion[materialListe[i].fabrikVerbrauch[j][k][0]] -= maxmoglich * materialListe[i].fabrikVerbrauch[j][k][1];
                    }
                }
            }else{  //Fabrik OHNE Verbrauch
              zyklusProduktion[i] += boniMultiplikator * materialListe[i].fabrik[j] * materialListe[i].fabrikInfo[j][0];
              statistik.material[i] += boniMultiplikator * materialListe[i].fabrik[j] * materialListe[i].fabrikInfo[j][0];
            }
        }
        //Autoverkauf
        if(materialListe[i].autoVerkaufAktiv){
            let verkaufAnzahl = materialListe[i].autoVerkaufAnzahl;
            let verkaufPreis = materialListe[i].preis;
            let verfugbar = anzahlListe[i] + zyklusProduktion[i];
            if(verfugbar >= verkaufAnzahl){
                zyklusProduktion[i] -= verkaufAnzahl;
                statistik.material[0] += verkaufAnzahl * verkaufPreis;
                zyklusProduktion[0] += verkaufAnzahl * verkaufPreis;
            }else{
                zyklusProduktion[0] += verfugbar * verkaufPreis;
                statistik.material[0] += verfugbar * verkaufPreis;
                zyklusProduktion[i] -= verfugbar;
            }
        }
    }
    //Forschungspunkte
    forschung.ps = 0;
    for(var i = 0; i < forschung.wissenschaftler.length; i++){
        let gesamtVerfugbar = anzahlListe[forschung.wissenschaftlerUnterhalt[i][0]] + zyklusProduktion[forschung.wissenschaftlerUnterhalt[i][0]];
        if(gesamtVerfugbar >= forschung.wissenschaftlerUnterhalt[i][1] * forschung.wissenschaftler[i]){
            forschung.ps += forschung.forschungsEffizienz * forschung.wissenschaftlerPunkte[i] * forschung.wissenschaftler[i];
            zyklusProduktion[forschung.wissenschaftlerUnterhalt[i][0]] -= forschung.wissenschaftler[i] * forschung.wissenschaftlerUnterhalt[i][1];
        }else{
            var maxmoglich = Math.floor(gesamtVerfugbar / forschung.wissenschaftlerUnterhalt[i][1]);
            forschung.ps += forschung.forschungsEffizienz * maxmoglich * forschung.wissenschaftlerPunkte[i];
            zyklusProduktion[forschung.wissenschaftlerUnterhalt[i][0]] -= maxmoglich * forschung.wissenschaftlerUnterhalt[i][1];
        }
        
    }
    forschung.ps += forschung.projektBonus;
    forschung.anzahl += forschung.ps;

    //Für Geld seperat da kein (Lager) Maximum
    materialListe[0].anzahl += Math.floor(zyklusProduktion[0]);
    materialListe[0].ps = Math.floor(zyklusProduktion[0]);

    for(let i = 1; i < materialListe.length; i++){
        if(materialListe[i].anzahl + zyklusProduktion[i] <= materialListe[i].lager){
            materialListe[i].anzahl += Math.floor(zyklusProduktion[i]);
            materialListe[i].ps = Math.floor(zyklusProduktion[i]);
        }else{
            materialListe[i].anzahl = materialListe[i].lager;
            materialListe[i].ps = Math.floor(zyklusProduktion[i]);
        }
    }

    //Evakuieren
    evakuieren.menschen += 2;
    if(evakuieren.menschen >= evakuieren.wege[0] * evakuieren.wegeAnzahl[0]){
        evakuieren.menschen -= evakuieren.wege[0] * evakuieren.wegeAnzahl[0];
        evakuieren.evakuiert += evakuieren.wege[0] * evakuieren.wegeAnzahl[0];
    }else{
        evakuieren.evakuiert += evakuieren.menschen;
        evakuieren.menschen = 0;
        flag = false;
        gewonnen();
    }
    if(evakuieren.menschen >= evakuieren.wege[1] * evakuieren.wegeAnzahl[1]){
        evakuieren.menschen -= evakuieren.wege[1] * evakuieren.wegeAnzahl[1];
        evakuieren.evakuiert += evakuieren.wege[1] * evakuieren.wegeAnzahl[1];
    }else{
        evakuieren.evakuiert += evakuieren.menschen;
        evakuieren.menschen = 0;
        flag = false;
        gewonnen();
    }
}


function guiupdateRessourcen(){
    
//Geld
    proSecFarbe(0);
    $("#geldAnzahlBestand").html(zahlenAusgabeKonvention(materialListe[0].anzahl) + "€");
    $("#geldProSec").html(zahlenAusgabeKonvention(materialListe[0].ps) + "/Sek");
//Materialien tab Info Anzahl; je/Sec
    for(var i = 1; i < materialListe.length; i++){
        //console.log(materialListe[i]);
        proSecFarbe(i);
        var tempID = "#" + materialListe[i].nameID +"AnzahlBestand";
        if(materialListe[i].anzahl == 0){
            $(tempID).css("color", "red");
        }else if(materialListe[i].anzahl == materialListe[i].lager){
            $(tempID).css("color", "green");
        }else{
            $(tempID).css("color", standartTextfarbe);
        }
        $("#" + materialListe[i].nameID +"AnzahlBestand").html(zahlenAusgabeKonvention(materialListe[i].anzahl));
        $("#" + materialListe[i].nameID +"AnzahlLager").html(" / " + zahlenAusgabeKonvention(materialListe[i].lager));
        $("#" + materialListe[i].nameID +"ProSec").html(zahlenAusgabeKonvention(materialListe[i].ps) + "/Sek");
        //Materialien  LagerProgress
        var auslastung = Math.floor(materialListe[i].anzahl / materialListe[i].lager * 100);
        $("#" + materialListe[i].nameID +"LagerStatus").css("width", auslastung + "%");
        //Materialien geldTab Autoverkauf
        if(materialListe[i].autoVerkaufAktiv){
            $("#" + materialListe[i].nameID + "AutoVerkaufSchalterText").html("Aktiv  " + zahlenAusgabeKonvention(materialListe[i].autoVerkaufAnzahl) + "/Sek");
        }else{
            $("#" + materialListe[i].nameID + "AutoVerkaufSchalterText").html("Inaktiv  " + zahlenAusgabeKonvention(materialListe[i].autoVerkaufAnzahl) + "/Sek");
        }
        
    }
//Lager Erweitern
    for(var i = 2; i < materialListe.length; i++){
        $("#"+materialListe[i].nameID+"LagerErweiterung").html(zahlenAusgabeKonvention(materialListe[i].lagerErweiterung));
        $("#"+materialListe[i].nameID+"LagerKosten").html(zahlenAusgabeKonvention(materialListe[i].lagerErweiterung));
        if(materialListe[i].lagerErweiterung > materialListe[0].anzahl){
            $("#"+materialListe[i].nameID+"LagerKosten").css("color", "red");
        }else{
            $("#"+materialListe[i].nameID+"LagerKosten").css("color", standartTextfarbe);
        }
    }
    

//Alle Fabriken
    for(var i = 1; i < materialListe.length; i++){
        for(var j = 0; j < materialListe[i].fabrik.length; j++){
            $("#" + materialListe[i].nameID +"Fabrik" + j + "Anzahl").html(materialListe[i].fabrik[j]);
            for(var k = 0; k < materialListe[i].fabrikKosten[j].length; k++){
                var tempID = "#"+materialListe[i].nameID+"Fabrik"+j+materialListe[materialListe[i].fabrikKosten[j][k][0]].nameID+"Kosten";
                $(tempID).html(zahlenAusgabeKonvention(materialListe[i].fabrikKosten[j][k][1]));
                if(materialListe[i].fabrikKosten[j][k][1] > materialListe[materialListe[i].fabrikKosten[j][k][0]].anzahl){
                    $(tempID).css("color", "red");
                }else{
                    $(tempID).css("color", standartTextfarbe);
                }
            }
        }
    }

//EnergieSpeicher
    for(var i = 0; i < energieSpeicher.speicher.length; i++){
        $("#energieSpeicher"+i+"Anzahl").html(energieSpeicher.speicher[i]);
        for(var j = 0; j < energieSpeicher.kosten[i].length; j++){
            var tempID = "#energieSpeicher"+i+materialListe[energieSpeicher.kosten[i][j][0]].nameID+"Kosten";
            $(tempID).html(zahlenAusgabeKonvention(energieSpeicher.kosten[i][j][1]));
            if(energieSpeicher.kosten[i][j][1] > materialListe[energieSpeicher.kosten[i][j][0]].anzahl){
                $(tempID).css("color", "red");
            }else{
                $(tempID).css("color", standartTextfarbe);
            }
        }

    }

}

function guiupdateForschung(){
    $("#forschungAnzahl").html(zahlenAusgabeKonvention(forschung.anzahl));
    $("#forschungProSec").html(zahlenAusgabeKonvention(forschung.ps) + "/Sek");

    for(var i = 0; i < forschung.wissenschaftlerPreis.length; i++){
        var id = ""
        if(i < 10){
            id = "0" + i;
        }else{
            id = "" + i;
        }
        $("#"+id+"forscher").html(zahlenAusgabeKonvention(forschung.wissenschaftler[i]));
        var tempID = "#"+id+"forscherKosten";
        $(tempID).html(zahlenAusgabeKonvention(forschung.wissenschaftlerPreis[i]));
        if(materialListe[0].anzahl < forschung.wissenschaftlerPreis[i]){
            $(tempID).css("color", "red");
        }else{
            $(tempID).css("color", standartTextfarbe);
        }
    }
    
}


function guiupdateProjekte(){
//Projekte
    for(var i = 0; i < projekt.erworben.length; i++){
        var id = ""
        if(i < 10){
            id = "0" + i;
        }else{
            id = "" + i;
        }

        var tempBrauchen = 0;
        var tempHaben = 0;
        if(!projekt.erworben[i]){
            for(var j = 0; j < projektKosten[i].length; j++){
                tempBrauchen += projektKosten[i][j][1];
                var tempID = "#"+id+"Projekt"+materialListe[projektKosten[i][j][0]].nameID+"Kosten";
                if(projektKosten[i][j][1] > materialListe[projektKosten[i][j][0]].anzahl){
                    $(tempID).css("color", "red");
                    tempHaben += materialListe[projektKosten[i][j][0]].anzahl;
                }else{
                    $(tempID).css("color", standartTextfarbe);
                    tempHaben += projektKosten[i][j][1];
                }
            }
        }
        var tempProzent = tempHaben / tempBrauchen * 100;
        tempProzent = tempProzent.toFixed(2);      
        $("#"+id+"ProjektFortschritt").css("width", tempProzent + "%");
        $("#"+id+"ProjektFortschrittText").html(tempProzent + "%");
    }

}   

function guiupdateSonnensystem(){
    for(var i = 0; i < planeten.erforscht.length; i++){
        if(planeten.erforscht[i]){
            var id = ""
            if(i < 10){
                id = "0" + i;
            }else{
                id = "" + i;
            }
            $("#"+id+"PlanetErforschenKosten").css("display", "none");
            $("#"+id+"PlanetErforschen").css("display", "none");
            $("#checkPlanet"+ id).css("display", "block");
        }else{
            var tempID = "#"+id+"PlanetErforschenKosten";
            if(planetenKosten[i] > materialListe[5].anzahl){
                $(tempID).css("color", "red");
            }else{
                $(tempID).css("color", standartTextfarbe);
            }
        }
    }
}   

function guiupdateInterstellar(){
    $("#generationenschiffAnzahl").html(evakuieren.wege[0]);
    $("#wurmlochportalAnzahl").html(evakuieren.wege[1]);

    var tempBrauchen = 0;
    var tempHaben = 0;
    for(var j = 0; j < evakuieren.schiffKosten.length; j++){
        tempBrauchen += evakuieren.schiffKosten[j][1];
        var tempID = "#schiff"+materialListe[evakuieren.schiffKosten[j][0]].nameID;
        if(evakuieren.schiffKosten[j][1] > materialListe[evakuieren.schiffKosten[j][0]].anzahl){
            $(tempID).html(zahlenAusgabeKonvention(evakuieren.schiffKosten[j][1]));
            $(tempID).css("color", "red");
            tempHaben += materialListe[evakuieren.schiffKosten[j][0]].anzahl;
        }else{
            $(tempID).html(zahlenAusgabeKonvention(evakuieren.schiffKosten[j][1]));
            $(tempID).css("color", standartTextfarbe);
            tempHaben += evakuieren.schiffKosten[j][1];
        }
    }
    var tempProzent = tempHaben / tempBrauchen * 100;
    tempProzent = tempProzent.toFixed(2);      
    $("#schiffFortschritt").css("width", tempProzent + "%");
    $("#schiffFortschrittText").html(tempProzent + "%");

    var tempBrauchen = 0;
    var tempHaben = 0;
    for(var j = 0; j < evakuieren.portalKosten.length; j++){
        tempBrauchen += evakuieren.portalKosten[j][1];
        var tempID = "#portal"+materialListe[evakuieren.portalKosten[j][0]].nameID;
        if(evakuieren.portalKosten[j][1] > materialListe[evakuieren.portalKosten[j][0]].anzahl){
            $(tempID).html(zahlenAusgabeKonvention(evakuieren.portalKosten[j][1]));
            $(tempID).css("color", "red");
            tempHaben += materialListe[evakuieren.portalKosten[j][0]].anzahl;
        }else{
            $(tempID).html(zahlenAusgabeKonvention(evakuieren.portalKosten[j][1]));
            $(tempID).css("color", standartTextfarbe);
            tempHaben += evakuieren.portalKosten[j][1];
        }
    }
    var tempProzent = tempHaben / tempBrauchen * 100;
    tempProzent = tempProzent.toFixed(2);      
    $("#portalFortschritt").css("width", tempProzent + "%");
    $("#portalFortschrittText").html(tempProzent + "%");

    var tempBrauchen = 0;
    var tempHaben = 0;
    for(var j = 0; j < evakuieren.infrastrukturKosten.length; j++){
        tempBrauchen += evakuieren.infrastrukturKosten[j][1];
        var tempID = "#infrastruktur"+materialListe[evakuieren.infrastrukturKosten[j][0]].nameID;
        if(evakuieren.infrastrukturKosten[j][1] > materialListe[evakuieren.infrastrukturKosten[j][0]].anzahl){
            $(tempID).html(zahlenAusgabeKonvention(evakuieren.infrastrukturKosten[j][1]));
            $(tempID).css("color", "red");
            tempHaben += materialListe[evakuieren.infrastrukturKosten[j][0]].anzahl;
        }else{
            $(tempID).html(zahlenAusgabeKonvention(evakuieren.infrastrukturKosten[j][1]));
            $(tempID).css("color", standartTextfarbe);
            tempHaben += evakuieren.infrastrukturKosten[j][1];
        }
    }
    var tempProzent = tempHaben / tempBrauchen * 100;
    tempProzent = tempProzent.toFixed(2);      
    $("#infrastrukturFortschritt").css("width", tempProzent + "%");
    $("#infrastrukturFortschrittText").html(tempProzent + "%");
}

function guiupdateEvakuierung(){
    $("#erdMenschen").html(evakuieren.menschen);
    $("#erdEvakuiert").html(evakuieren.evakuiert);

    if(evakuieren.wege[1] > 0){
        $(".portal").css("display", "block");
    }


}

function guiupdateStatus(){

    $("#manuellAbgebaut").html(statistik.manuell);
    $("#gebaudeStufe1").html(statistik.stufe[0]);
    $("#gebaudeStufe2").html(statistik.stufe[1]);
    $("#gebaudeStufe3").html(statistik.stufe[2]);
    $("#gebaudeStufe4").html(statistik.stufe[3]);

    $("#reiterFrei").html(statistik.reiter + "/6");
    $("#forschungenFrei").html(statistik.forschungen + " / " + forschung.forschungErworben.length);
    $("#projekteFrei").html(statistik.projekte + " / " + projekt.erworben.length);
    $("#planetenFrei").html(statistik.planeten + " / " + planeten.erforscht.length);

    for(var i = 0; i < materialListe.length; i++){
        $("#materialAnzahl"+i).html(zahlenAusgabeKonvention(statistik.material[i]));
    }

    $("#gesamtzeit").html(statistik.gesamtZeit());

}


function proSecFarbe(typID){
    if(materialListe[typID].ps >= 0){
        $("#" + materialListe[typID].nameID +"ProSec").css("color", standartTextfarbe);
    }else{
        $("#" + materialListe[typID].nameID +"ProSec").css("color", "red");
    }
}


function proSecUpdate(){
    
    let anzahlListe = [materialListe[0].anzahl];
    let zyklusProduktion = [0];

    //Array mit Default befüllen
    for(let i = 1; i < materialListe.length; i++){
        anzahlListe.push(materialListe[i].anzahl);
        zyklusProduktion.push(0);
    }
    for(let i = 1; i < materialListe.length; i++){      //i=1 wegen 0-> Geld hat keine Fabriken
        zyklusProduktion[i] += materialListe[i].projektBonus;
        var boniMultiplikator = forschung.ressourcenEffizienz;
        if(i == 1){
            boniMultiplikator = forschung.energieEffizienz;
        }
        for(let j = 0; j < materialListe[i].fabrik.length; j++){
            if(materialListe[i].fabrikInfo[j][1]){  //Fabrik MIT Verbrauch
                var verbrauchAnzahl = materialListe[i].fabrikVerbrauch[j].length;
                var allesVerfugbar = true;
                var maxmoglich = 99999;
                for(var k = 0; k < verbrauchAnzahl;k++){
                    let gesamtVerfugbar = anzahlListe[materialListe[i].fabrikVerbrauch[j][k][0]] + zyklusProduktion[materialListe[i].fabrikVerbrauch[j][k][0]];
                    if(gesamtVerfugbar < materialListe[i].fabrik[j] * materialListe[i].fabrikVerbrauch[j][k][1]){
                        allesVerfugbar = false;
                        let temp = Math.floor(gesamtVerfugbar / materialListe[i].fabrikVerbrauch[j][k][1]);
                        if(temp < maxmoglich){
                            maxmoglich = temp;
                        }
                    }
                }
                if(allesVerfugbar){
                    zyklusProduktion[i] += boniMultiplikator * materialListe[i].fabrik[j] * materialListe[i].fabrikInfo[j][0];
                    for(var k = 0; k < verbrauchAnzahl;k++){
                        zyklusProduktion[materialListe[i].fabrikVerbrauch[j][k][0]] -= materialListe[i].fabrik[j] * materialListe[i].fabrikVerbrauch[j][k][1];
                    }
                }else{  //Teilweiße Ausreichend Verbrauchsgüter
                    zyklusProduktion[i] += boniMultiplikator * maxmoglich * materialListe[i].fabrikInfo[j][0];
                    for(var k = 0; k < verbrauchAnzahl;k++){
                        zyklusProduktion[materialListe[i].fabrikVerbrauch[j][k][0]] -= maxmoglich * materialListe[i].fabrikVerbrauch[j][k][1];
                    }
                }
            }else{  //Fabrik OHNE Verbrauch
              zyklusProduktion[i] += boniMultiplikator * materialListe[i].fabrik[j] * materialListe[i].fabrikInfo[j][0];
            }
        }
        //Autoverkauf
        if(materialListe[i].autoVerkaufAktiv){
            let verkaufAnzahl = materialListe[i].autoVerkaufAnzahl;
            let verkaufPreis = materialListe[i].preis;
            let verfugbar = anzahlListe[i] + zyklusProduktion[i];
            if(verfugbar >= verkaufAnzahl){
                zyklusProduktion[i] -= verkaufAnzahl;
                zyklusProduktion[0] += verkaufAnzahl * verkaufPreis;
            }else{
                zyklusProduktion[0] += zyklusProduktion[i] * verkaufPreis;
                zyklusProduktion[i] = 0;
            }
        }
    }

    //Forschungspunkte
    forschung.ps = 0;
    for(var i = 0; i < forschung.wissenschaftler.length; i++){
        let gesamtVerfugbar = anzahlListe[forschung.wissenschaftlerUnterhalt[i][0]] + zyklusProduktion[forschung.wissenschaftlerUnterhalt[i][0]];
        if(gesamtVerfugbar > forschung.wissenschaftlerUnterhalt[i][1]){
            forschung.ps += forschung.wissenschaftlerPunkte[i]*forschung.wissenschaftler[i];
            zyklusProduktion[forschung.wissenschaftlerUnterhalt[i][0]] -= forschung.wissenschaftler[i] * forschung.wissenschaftlerUnterhalt[i][1];
        }else{
            var maxmoglich = Math.floor(gesamtVerfugbar / forschung.wissenschaftlerUnterhalt[i][1]);
            forschung.ps += maxmoglich * forschung.wissenschaftlerPunkte[i];
            zyklusProduktion[forschung.wissenschaftlerUnterhalt[i][0]] -= maxmoglich * forschung.wissenschaftlerUnterhalt[i][1];
        }
        
    }
    forschung.ps += forschung.projektBonus;
    forschung.anzahl += forschung.ps;

    //Für Geld seperat da kein Lager Maximum
    materialListe[0].ps = Math.floor(zyklusProduktion[0]);
    for(let i = 1; i < materialListe.length; i++){
        if(materialListe[i].anzahl + zyklusProduktion[i] <= materialListe[i].lager){
            materialListe[i].ps = Math.floor(zyklusProduktion[i]);
        }else{
            materialListe[i].ps = Math.floor(zyklusProduktion[i]);
        }
        proSecFarbe(i);
    }
}

function guiNachLaden(){

//Reiter


//Geld
    for(var i = 2; i < materialListe.length; i++){
        if(i < 10){
            id = "0" + i;
        }else{
            id = "" + i;
        }

        if(materialListe[i].autoVerkaufAktiv){ 
            $("#"+id+"AutoVerkaufSchalter").each(function () { this.checked = !this.checked; });    
        }
        
    }


//Material & Fabriken freischalten


//Forschung 
    for(var i = 0; i < forschung.forschungErworben.length; i++){
        if(i < 10){
            id = "0" + i;
        }else{
            id = "" + i;
        }

        //Forschung erworben
        if(forschung.forschungErworben[i]){
            $("#"+id+"forschungErwerbenInfo").css("display", "none");
            $("#check"+ id).css("display", "block");
            forschung.erwerben(i);
        }
    }

//Projekte
    for(var i = 0; i < projekt.erworben.length; i++){
        if(i < 10){
            id = "0" + i;
        }else{
            id = "" + i;
        }

        if(projekt.erworben[i]){
            $("#"+id+"ProjektFortschrittHintergrund").css("display", "none");
            $("#"+id+"ProjektFortschrittText").css("display", "none");
            $("#"+id+"ProjektFreischalten").css("display", "none");
            $("#"+id+"ProjektKosten").css("display", "none");
            projekt.erwerben(i);
        }

    }

//Planeten
    for(var i = 0; i < planeten.erforscht.length; i++){
        if(planeten.erforscht[i]){
            var id = ""
            if(i < 10){
                id = "0" + i;
            }else{
                id = "" + i;
            }
            $("#"+id+"PlanetErforschenKosten").css("display", "none");
            $("#"+id+"PlanetErforschen").css("display", "none");
            $("#checkPlanet"+ id).css("display", "block");
            planeten.erforschen(i);
        }
    }

//Interstellar
    guiupdateInterstellar();
    if(evakuieren.wege[2] == 1){
        $("#infrastrukturFortschrittAnzeige").css("display", "none");
        $("#infrastrukturFortschrittText").css("display", "none");
        $("#infrastrukturBauen").css("display", "none");
        $("#infrastrukturGesamtKosten").css("display", "none");
    }

//Evakuierung


//Status



}