$(document).ready(function(){

    $(window).keydown(function(event){
        if(event.keyCode == 13) {
          event.preventDefault();
          return false;
        }
      });

//Geld InfoInhalt   
    const div1 = document.querySelector("#geldInfoInhalt");

    var id = ""
    var versteckt = "";
    for(var i = 2; i < materialListe.length; i++){ 
        if(i < 10){
            id = "0" + i;
        }else{
            id = "" + i;
        }
        if(materialListe[i].versteckt){
            versteckt = "none";
        }else{
            versteckt = "block";
        }
        
        div1.insertAdjacentHTML("beforeend", `
        <div class="${materialListe[i].nameID} card border-info mb-3" style="max-width: 30rem; height: 270px; display: ${versteckt};">
            <div class="card-header">${materialListe[i].name} verkaufen  ${materialListe[i].preis}€ je ${materialListe[i].name}
            </div>
            <div class="card-body">
                <div class="kaufButton">
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button id="${id}Verkaufen0001" type="button" class="verkaufen btn btn-secondary btn-outline-warning">1x</button>
                        <button id="${id}Verkaufen0010" type="button" class="verkaufen btn btn-secondary btn-outline-warning">10x</button>
                        <button id="${id}Verkaufen0100" type="button" class="verkaufen btn btn-secondary btn-outline-warning">100x</button>
                        <button id="${id}Verkaufen1000" type="button" class="verkaufen btn btn-secondary btn-outline-warning">1000x</button>
                        <button id="${id}Verkaufen9999" type="button" class="verkaufen btn btn-secondary btn-outline-warning">Alles</button>
                    </div>
                    <div style="height: 10px;">
                    </div>
                    <div class="card border-info mb-3" style="width: 280px; height: 150px;">
                        <div class="card-header">Dauerverkauf
                        </div>
                        <div class="card-body" >
                            <form style="display: flex;">  
                                <fieldset>
                                    <div class="form-check form-switch">
                                        <input class="autoVerkaufSchalter form-check-input" type="checkbox" id="${id}AutoVerkaufSchalter" >
                                        <label class="form-check-label" for="${id}AutoVerkaufSchalter" id="${materialListe[i].nameID}AutoVerkaufSchalterText" >Inaktiv  0/Sek</label>
                                    </div>
                                    <div style="height: 5px;">
                                    </div>
                                    <div class="input-group mb-3" >                                                                      
                                        <input id="${materialListe[i].nameID}AutoVerkaufAnzahlEingabe" style="width: 100px;" type="text" class="autoVerkaufEingabe " placeholder="Anzahl"  >
                                        <button id="${id}AutoVerkaufAnzahlUbernehmen" class="autoVerkaufAnzahlUbernehmen btn btn-primary" type="button" >Übernehmen</button>
                                    </div>
                                </fieldset>  
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `);
    }


//Ressourcen Auswahl

    const div2 = document.querySelector("#ressourcenAuswahlListe");

    var id = ""
    var versteckt = "";
    for(var i = 0; i < materialListe.length; i++){ 
        if(i < 10){
            id = "0" + i;
        }else{
            id = "" + i;
        }
        if(materialListe[i].versteckt){
            versteckt = "none";
        }else{
            versteckt = "block";
        }
        div2.insertAdjacentHTML("beforeend", `
        <a id="${id}Tab" class="${materialListe[i].nameID} ressourcenAuswahl list-group-item list-group-item-action" style="display: ${versteckt};">
            <div class="ressourcenListeObjekt">
                <img class="ressourcenListeObjektBild" src="img/${materialListe[i].nameID}.png">
                <p class="ressourcenListeObjektMaterial" >${materialListe[i].name}</p>
                <p id="${materialListe[i].nameID}ProSec" class="ressourcenListeObjektProSec">0/Sek  </p>
                <p class="ressourcenListeObjektAnzahl"> <span id="${materialListe[i].nameID}AnzahlBestand"> XX</span>  <span id="${materialListe[i].nameID}AnzahlLager"> </span></p>
            </div>
        </a>

        `);
    }


//Ressourcen Tab
    const div3 = document.querySelector("#ressourcenTabInfo");

    var id = ""
    for(var i = 2; i < materialListe.length; i++){ 
        if(i < 10){
            id = "0" + i;
        }else{
            id = "" + i;
        }          

        div3.insertAdjacentHTML("beforeend", `
        <div id="${id}Info" class="hoheDynamisch info card border-primary mb-3 tab-pane in" style="display: none;" >
            <div class="card-header" style="font-size: 22px;">${materialListe[i].name}</div>
            <div class="card-body">
                <p class="card-text">${materialText[i]}</p>
                <p id="${materialListe[i].nameID}ProjektBonus"></p>
                ${manuelMoglich(i,id)}
                
                <div style="height: 20px;"></div>
                <!-- Lager -->
                <div class="card border-info mb-3" style="width: 650px;">
                    <div class="card-header">${materialListe[i].name}lager</div>
                    <div class="card-body">
                        <span>Aktuelle Lagerauslastung</span> 
                        <div class="progress">
                            <div id="${materialListe[i].nameID}LagerStatus" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>
                        </div>
                        <span>Lagererweiterung auf <span id="${materialListe[i].nameID}LagerErweiterung">${zahlenAusgabeKonvention(materialListe[i].lagerErweiterung)}</span> Einheiten<br>
                        Kosten: <span id="${materialListe[i].nameID}LagerKosten"> ${zahlenAusgabeKonvention(materialListe[i].lagerErweiterung)}</span> € </span>
                        <div class="kaufButton">
                            <button id="${id}LagerErweitern" style="margin: 10px;" type="button" class="lagerErweitern btn btn-primary">Lager Vergrößern</button>
                        </div>
                    </div>
                </div>
                ${fabrikenGenerieren(i,id)}
            </div>
        </div>

        `);
    }

    function manuelMoglich(i,id){
        if(materialListe[i].manuel){
            return `<button id="${id}Manuel" type="button" class="manuel btn btn-primary">1x Erhalten</button>`;
        }
        return ``;
    }

    function fabrikenGenerieren(i,id){
        var fabriken = ""
        for(var j = 0; j < materialListe[i].fabrik.length; j++){
            var versteckt = "";
            if(materialListe[i].fabrikVersteckt[j]){
                versteckt = "display: none;";
            }else{
                versteckt = "";
            }

            fabriken += `
                <!-- Fabrik ${j} --> 
                <div class="${id}${j} card border-info mb-3" style="width: 650px; ${versteckt}">
                    <div class="card-header">${fabrikName[i][j]}: <span id="${materialListe[i].nameID}Fabrik${j}Anzahl" >${materialListe[i].fabrik[j]}</span> </div>
                    <div class="card-body">
                        <span>Produziert:  ${zahlenAusgabeKonvention(materialListe[i].fabrikInfo[j][0])} ${materialListe[i].name} / pro Sekunde ${brauchtVerbrauchsmaterial(i,id,j)}<br>
                        Kostet: ${kosten(i,id,j)} </span>
                        <div class="kaufButton">
                            <button id="${id}Fabrik${j}Kaufen" style="margin: 10px;" type="button" class="fabrikKaufen btn btn-primary">${fabrikKnopfe[i][j][0]}</button>
                            <button id="${id}Fabrik${j}verkaufen" style="margin: 10px;" type="button" class="fabrikVerkaufen btn btn-danger">${fabrikKnopfe[i][j][1]}</button>
                        </div>
                    </div>
                </div>
            `
        }
        return fabriken;
    }

    function brauchtVerbrauchsmaterial(i,id,j){
        var verbrauch = "";
        if(materialListe[i].fabrikInfo[j][1]){
            verbrauch += `<br> Verbraucht: `;
            for(var k = 0; k < materialListe[i].fabrikVerbrauch[j].length; k++){
                verbrauch += ` ${zahlenAusgabeKonvention(materialListe[i].fabrikVerbrauch[j][k][1])} ${materialListe[materialListe[i].fabrikVerbrauch[j][k][0]].name} `;
                if(k+1 < materialListe[i].fabrikVerbrauch[j].length){
                    verbrauch += ` , `;
                }
            }
            verbrauch += ` / pro Sekunde`;
        }
        return verbrauch;
    }
    function kosten(i,id,j){
        var kosten = "";    
        for(var k = 0; k < materialListe[i].fabrikKosten[j].length; k++){
            kosten += `<span id="${materialListe[i].nameID}Fabrik${j}${materialListe[materialListe[i].fabrikKosten[j][k][0]].nameID}Kosten">${zahlenAusgabeKonvention(materialListe[i].fabrikKosten[j][k][1])} </span> ${materialListe[materialListe[i].fabrikKosten[j][k][0]].name} `;
            if(k+1 < materialListe[i].fabrikKosten[j].length){
                kosten += ` , `;
            }
        }
        return kosten;
    }

});

//FabrikInfos
var fabrikName = [[],   //Geld
                [],     //Energie
                ["Förster","Holzvollernter","Waldrodung","synthetisches Holz"],
                ["Bergarbeiter","Metallmine","Metallminenkomplex","mega Metallmine"],
                ["kleiner Bohrturm","Bohrturm","Ölfeld","Offshore-Plattform"],
                ["kleine Raffinerie","Raffinerie","große Raffinerie","Raffinerie Komplex"],
                ["kleine Köhlerei","Köhlerei","Holzkohle Fabrik","Holzkohlezentrum"],
                ["kleine Kupfermine","Kupfermine","große Kupfermine","gigantische Kupfermine"],
                ["kleine Goldmine","Goldmine","große Goldmine","riesige Goldmine"],
                ["kleine Silizium Abbaustelle","Silizium Abbaustelle","große Silizium Abbaustelle","gigantische Silizium Abbaustelle"],
                ["kleine Schaltkreisproduktion","Schaltkreisproduktion","7nm-Fab","1nm-Fab"],
                ["kleine Titanmine","Titanmine","große Titanmine","mega Titanmine"],
                ["kleine Uranmine","Uranmine","große Uranmine","riesige Uranmine"],
                ["kleine Helium-3 förderanlage","Helium-3 Förderkomplex"]];

var materialText = [[],   //Geld
                [],     //Energie
                ["Holz ist eine wichtige Basis-Ressource und wird für fast alle einfachen Gebäude und Maschinen benötigt."],
                ["Metall ist eine der wichtigsten Ressourcen. Es wird für viele Dinge verwendet, unter anderem für die Aufrüstung von Speichern und Maschinen."],
                ["Öl wird aus dem Erdinneren gepumpt. Man nennt es auch das schwarze Gold."],
                ["Treibstoff; damit laufen Motoren."],
                ["Holzkohle ist eine sekundäre Ressource und wird von Maschinen verwendet, um Energie zu erzeugen."],
                ["Kupfer ist eine nicht wegdenkbares Metall, das für alle elektonischen Geräte gebraucht wird."],
                ["Gold ein wertvolles Edelmetall, das für die Schuck-, und Elektroindustrie sehr wichtig ist."],
                ["Silizium ist ein klassisches Halbmetall, weist daher sowohl Eigenschaften von Metallen als auch von Nichtmetallen auf und ist ein Elementhalbleiter."],
                ["Elektronik ist die Wissenschaft von der Steuerung des elektrischen Stromes durch elektronische Schaltungen."],
                ["Dieses Metall ist weiß-metallisch glänzend, hat eine geringe Dichte, ist dehnbar, korrosions- und temperaturbeständig."],
                ["Uran ist ein Metall, dessen sämtliche Isotope radioaktiv sind. Eine besondere Bedeutung erhielt Uran nach der Entdeckung der Kernspaltung im Jahre 1938."],
                ["Helium-3 ist ein extrem gutes Kühlmittel das u.a. benutzt wird um Supraleiter auf annähernd 0°Kelvin runter zu kühlen."]];
/**
var fabrikText = [[],   //Geld
                [],     //Energie
                ["Der Förster fällt Bäume","Der Holzvollernter fällt Baume in einer unglaublichen Geschwindigkeit.","",""],
                ["Der Bergarbeiter baut für dich Metall ab.","Beschreibung","Beschreibung","Beschreibung"],
                ["Der kleine Bohrturm fördert langsam Öl.","Beschreibung","Beschreibung","Beschreibung"],
                ["Die kleine Raffinerie wandelt dein Öl in Treibstoff um.","Beschreibung","Beschreibung","Beschreibung"],
                ["Die kleine Köhlerei produziert Holzkohle.","Beschreibung","Beschreibung","Beschreibung"],
                ["Die kleine Kupfermine findet etwas Kupfererz.","Beschreibung","Beschreibung","Beschreibung"],
                ["Die kleine Goldmine fördert etwas Golderz.","Beschreibung","Beschreibung","Beschreibung"],
                ["Die kleine Silizium Abbaustelle ist ein Tagebau bei einer Wüste.","Beschreibung","Beschreibung","Beschreibung"],
                ["In der kleinen Schaltkreisproduktion werden grundlegende Komponenten gefertigt.","Beschreibung","Beschreibung","Beschreibung"],
                ["Die kleine Titanmine fördert geringe Mengen an Titanerz","Beschreibung","Beschreibung","Beschreibung"],
                ["Die kleine Uranmine fördert geringe Mengen an Uranerz","Beschreibung","Beschreibung","Beschreibung"],
                ["Beschreibung","Beschreibung"]];
*/

var fabrikKnopfe = [[[]],   //Geld
                    [[]],   //Energie
                    [["Förster einstellen", "Förster entlassen"],["Holzvollernter kaufen","Holzvollernter verkaufen"],["Waldrodung beginnen","Waldrodung beenden"],["Fabrik kaufen","Fabrik abreisen"]],
                    [["Bergarbeiter einstellen", "Bergarbeiter entlassen"],["Metallmine bauen","Metallmine abreisen"],["Metallminenkomplex bauen","Metallminenkomplex abreisen"],["Mega Metallmine bauen","Mega Metallmine abreisen"]],
                    [["kleinen Bohrturm bauen","kleinen Bohrturm abreisen"],["Bohrturm bauen","Bohrturm abreisen"],["Ölfeld erwerben","Ölfeld verkaufen"],["Offshore-Plattform bauen","Offshore-Plattform abreisen"]],
                    [["kleine Raffinerie bauen","kleine Raffinerie abreisen"],["Raffinerie bauen","Raffinerie abreisen"],["große Raffinerie bauen","große Raffinerie abreisen"],["Raffinerie Komplex bauen","Raffinerie Komplex abreisen"]],
                    [["kleine Köhlerei bauen","kleine Köhlerei abreisen"],["Köhlerei bauen","Köhlerei abreisen"],["Holzkohlefabrik bauen","Holzkohlefabrik abreisen"],["Holzkohlezentrum bauen","Holzkohlezentrum abreisen"]],
                    [["kleine Kupfermine bauen","kleine Kupfermine abreisen"],["Kupfermine bauen","Kupfermine abreisen"],["große Kupfermine bauen","große Kupfermine abreisen"],["gigantische Kupfermine bauen","gigantische Kupfermine abreisen"]],
                    [["kleine Goldmine bauen","kleine Goldmine abreisen"],["Goldmine bauen","Goldmine abreisen"],["große Goldmine bauen","große Goldmine abreisen"],["riesige Goldmine bauen","riesige Goldmine abreisen"]],
                    [["kleine Silizium Abbaustelle bauen","kleine Silizium Abbaustelle abreisen"],["Silizium Abbaustelle bauen","Silizium Abbaustelle abreisen"],["große Silizium Abbaustelle bauen","große Silizium Abbaustelle abreisen"],["gigantische Silizium Abbaustelle bauen","gigantische Silizium Abbaustelle abreisen"]],
                    [["kleine Schaltkreisproduktion bauen","kleine Schaltkreisproduktion abreisen"],["Schaltkreisproduktion bauen","Schaltkreisproduktion abreisen"],["7nm-Fab bauen","7nm-Fab abreisen"],["1nm-Fab bauen","1nm-Fab abreisen"]], 
                    [["kleine Titanmine bauen","kleine Titanmine abreisen"],["Titanmine bauen","Titanmine abreisen"],["große Titanmine bauen","große Titanmine abreisen"],["mega Titanmine bauen","mega Titanmine abreisen"]],
                    [["kleine Uranmine bauen","kleine Uranmine abreisen"],["Uranmine bauen","Uranmine abreisen"],["große Uranmine bauen","große Uranmine abreisen"],["riesige Uranmine bauen","riesige Uranmine abreisen"]],
                    [["kleine Helium-3 förderanlage bauen","kleine Helium-3 förderanlage abreisen"],["Helium-3 Förderkomplex bauen","Helium-3 Förderkomplex abreisen"]]];


