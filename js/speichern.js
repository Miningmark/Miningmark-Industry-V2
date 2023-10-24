
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

function speichern(){

    window.localStorage.setItem("spielstand", datenSammeln());
    erfolg("Speichern erfolgreich");
    speicherInterval = 30;
                   
}


function laden(){
    datenSchreiben(window.localStorage.getItem("spielstand"));
    erfolg("Laden erfolgreich"); 

}


function exportieren(){
    document.getElementById("ioTextfeld").value = "";
    document.getElementById("ioTextfeld").value = datenSammeln();
}

function importieren(){
    var input = document.getElementById("ioTextfeld").value;
    if(input == "12345"){
        cheatern();
    }else{
        datenSchreiben(input);
    document.getElementById("ioTextfeld").value = "";
    }
}




function datenSammeln(){
    var ausgabe = "";
//Geld
    ausgabe += materialListe[0].anzahl + "#";
//Material
    for(var i = 1; i < materialListe.length; i++){
        ausgabe += materialListe[i].materialSpeichern() + "#"
    }
//Forschung
    ausgabe += forschung.forschungSpeichern() + "#";
//Projekt
    ausgabe += projekt.projektSpeichern() + "#";
//Sonnensystem
    ausgabe += planeten.planetenSpeichern() + "#";
//Evakuierung
    ausgabe += evakuieren.evakuierenSpeichern() + "#";
//Status
    ausgabe += statistik.statusSpeichern() + "#";
//EnergieSpeicher
    ausgabe += energieSpeicher.speicherSpeichern() + "#";
//Verschlüsseln
    var encodedString = Base64.encode(ausgabe);
    console.log(ausgabe);
    console.log(encodedString);

    return encodedString;
}


async function datenSchreiben(input){

    flag = false;
    await sleep(200);

    try {
        var decodedString = Base64.decode(input);
        console.log("Input:");
        console.log(decodedString);

        var data = decodedString.split("#");
//Geld ~ MaterialListe[0]
        materialListe[0].anzahl = data[0]*1;
        
//Materialien ~ MaterialListe[1]-[13] Energie - Helium-3
        //anzahl,lager,versteckt,autoVerkaufAnzahl,autoVerkaufAktiv,fabrik,fabrikVersteckt,fabrikKosten
        for(var k = 1; k <  materialListe.length; k++){  
            var material = data[k].split(";");
            var kosten = [];            
            for(var i = 0; i < material[7]; i++){
                var temp = [];
                var nummer = 0;
                var inhalt = material[8+i].split(",");
                for(var j = 0; j < inhalt.length/2; j++){
                    temp.push([inhalt[nummer]*1,inhalt[nummer+1]*1]);
                    nummer += 2;
                }
                kosten.push(temp);
            }
            material[2] = boolVonString(material[2]);
            material[4] = boolVonString(material[4]);
            material[5] = material[5].split(",").map(Number);
            material[6] = material[6].split(",").map(boolVonString);
            materialListe[k].materialLaden(material[0]*1,material[1]*1,material[2],material[3]*1,material[4],material[5],material[6],kosten);
        }

//Forschung
        var forschungDaten = data[14].split(";");
        forschungDaten[1] = forschungDaten[1].split(",").map(Number);
        forschungDaten[2] = forschungDaten[2].split(",").map(Number);
        forschungDaten[3] = forschungDaten[3].split(",").map(boolVonString);
        forschungDaten[4] = forschungDaten[4].split(",").map(boolVonString);

        forschung.forschungLaden(forschungDaten[0]*1,forschungDaten[1],forschungDaten[2],forschungDaten[3],forschungDaten[4]); 
        
//Projekte
        var projektDaten = data[15].split(";");
        projektDaten[0] = projektDaten[0].split(",").map(boolVonString);

        projekt.projektLaden(projektDaten[0]);  

//Sonnensystem
        var planetenDaten = data[16].split(";");

        planetenDaten[0] = planetenDaten[0].split(",").map(boolVonString);

        planeten.planetenLaden(planetenDaten[0]); 

//Evakuierun & Interstellar
        var evakuierungDaten = data[17].split(";");
        evakuierungDaten[2] = evakuierungDaten[2].split(",").map(Number);
        
        var schiffKosten = [];
        var nummer = 0;
        var inhalt = evakuierungDaten[3].split(",");
        for(var j = 0; j < inhalt.length/2; j++){
            schiffKosten.push([inhalt[nummer]*1,inhalt[nummer+1]*1]);
            nummer += 2;
        }
        var portalKosten = [];
        var nummer = 0;
        var inhalt = evakuierungDaten[4].split(",");
        for(var j = 0; j < inhalt.length/2; j++){
            portalKosten.push([inhalt[nummer]*1,inhalt[nummer+1]*1]);
            nummer += 2;
        }
        
        evakuieren.evakuierenLaden(evakuierungDaten[0]*1,evakuierungDaten[1]*1,evakuierungDaten[2],schiffKosten,portalKosten);  //,evakuierungDaten[5]

//Status
        var statusDaten = data[18].split(";");
        statusDaten[1] = statusDaten[1].split(",").map(Number);
        statusDaten[6] = statusDaten[6].split(",").map(Number);

        statistik.statusLaden(statusDaten[0]*1,statusDaten[1],statusDaten[2]*1,statusDaten[3]*1,statusDaten[4]*1,statusDaten[5]*1,statusDaten[6],statusDaten[7]*1);

//EnergieSpeicher
        var energieSpeicherDaten = data[19].split(";");
        energieSpeicherDaten[0] = energieSpeicherDaten[0].split(",").map(Number);
        energieSpeicherDaten[2] = energieSpeicherDaten[2].split(",").map(boolVonString);

        var inhalt = energieSpeicherDaten[1].split(",");
        var kosten = [];
        var nummer = 0;
        for(var i = 0; i < energieSpeicher.speicher.length; i++){
            var temp = [];
            for(var j = 0; j < energieSpeicher.kosten[i].length; j++){
                temp.push([inhalt[nummer]*1,inhalt[nummer+1]*1]);
                nummer += 2;
            }
            kosten.push(temp);
        }    

        energieSpeicher.speicherLaden(energieSpeicherDaten[0],kosten,energieSpeicherDaten[2]);

    } catch (error) {
        console.log(error);  
        fehler("Kein gültiger Spielstand");
        window.alert(error);
        location.reload(); 
    }

//GUI neu zeichen    
    guiNachLaden();
    await sleep(200);
    flag = true;

}


function boolVonString(s) {
    if (s == 'true') return true
    if (s == 'false') return false
    return null
}



  