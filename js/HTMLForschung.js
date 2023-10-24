$(document).ready(function(){

    const div1 = document.querySelector("#forscherErwerbenAuswahl");
    
    for(var i = 0; i < wissenschaftlerName.length; i++){
        var id = ""
        if(i < 10){
            id = "0" + i;
        }else{
            id = "" + i;
        }
        var versteckt = "";
        if(forschung.wissenschaftlerVersteckt[i]){
            versteckt = ` wissenschaftlerIstVersteckt `;
        }
        div1.insertAdjacentHTML("beforeend", `
        <div id="wissenschaftlerID${id}" class="${versteckt} forscherInfoCard card border-primary mb-3" >
            <div class=" card-header">${wissenschaftlerName[i]} : <span id="${id}forscher">XXX</span></div>
            <div class="card-body" >
                <img class="forscherBild" src="img/${wissenschaftlerName[i]}.png">
                <p class="forscherinfo card-text">${wissenschaftlerBeschreibung[i]}</p>
                <div style="height: 5px;"></div>
                <p class="forscherEinstellKosten">Einstellungskosten: <span id="${id}forscherKosten"> XXX </span> € <br>
                Unterhalt: <span id="${id}forscherUnterhalt"> ${zahlenAusgabeKonvention(forschung.wissenschaftlerUnterhalt[i][1])+" "+materialListe[forschung.wissenschaftlerUnterhalt[i][0]].name}</span>  / pro Sekunde</p>
                
                <div style="display: flex;">
                <button id="${id}ForscherEinstellen" type="button" class="forscherEinstellen btn btn-primary">&emsp; Einstellen &emsp;</button>
                <button id="${id}ForscherEntlassen" type="button" class="forscherEntlassen btn btn-danger">&emsp; Entlassen &emsp;</button>
                </div>
            </div>
        </div>
        `);
    }

    const div2 = document.querySelector("#forschungInhalt");

    for(var i = 0; i < forschungName.length; i++){ 
        var id = ""
        if(i < 10){
            id = "0" + i;
        }else{
            id = "" + i;
        }
        var versteckt = "";
        if(forschung.forschungVersteckt[i]){
            versteckt = ` forschungIstVersteckt `;
        }
      
        div2.insertAdjacentHTML("beforeend", `
        <div id="forschungID${id}" class="${versteckt} card text-white bg-primary" style="width: 300px; height: 230px; margin: 10px;">
          <div class="forschungInfoKopf card-header">${forschungName[i]} 
            <img class="check" id="check${id}" src="img/check.png">
            </div>
            <div class="card-body" >
                <p class="card-text">${forschungBeschreibung[i]}</p>
                <div class="forschungErwerbenInfo" id="${id}forschungErwerbenInfo">
                    <p class="forschungsKosten card-text">kosten: <br>${zahlenAusgabeKonvention(forschung.forschungKosten[i])} <img style="height: 17px;" src="img/forschungspunkte.png"></p>
                    <button id="${id}forschung" type="button" class="forschungFreischalten btn btn-info btn-lg">Freischalten</button>
                </div>
            </div>
            <div style=" clear: both;"></div>
        </div>
        `);
    }

});

//Wissenschaftler Info
var wissenschaftlerName = ["Tüftler","Student","Wissenschaftler","Professor","Künstliche Intelligenz"];

var wissenschaftlerBeschreibung = ["Der Tüftler ist ein selbsternanter Wissenschafter. <br> 1 Forschunspunkt/Sek",
                                    "Der Student hat studiert, weiß aber <br> auch nicht alles. <br> 10 Forschungspunkte/Sek",
                                    "Der Wissenschafter hat bereits <br>einiges an Erfahrung. <br> 35 Forschungspunkte/Sek",
                                    "Der Professor hat sein ganzes Leben <br>geforscht und hat sehr viel Erfahrung. <br> 175 Forschungspunkte/Sek",
                                    "Die Künstliche Intelligenz betreibt <br>24/7 Grundlagenforschung. <br> 450 Forschungspunkte/Sek"];


var forschungName = ["Energie","Treibstoff","Holzvollernter","Großprojekte","Ressourceneffizienz I","Ressourceneffizienz II","Ressourceneffizienz III","Kupfer","Gold","Silizium","Elektronik","Ressourceneffizienz IV","Ressourceneffizienz V","Ressourceneffizienz VI","Titan","Uran","Verbesserter Bergbau","Bergbau 3.0","Vollautomatisierter Bergbau","Automatisierung","Vollautomatisierte Anlagen","verbesserte Schaltkreise","7nm Transistoren","1nm Transistoren","Ressourceneffizienz VII","Ressourceneffizienz VIII","Ressourceneffizienz IX","Ressourceneffizienz X","Ressourceneffizienz XI","Ressourceneffizienz XII","Forschungseffizienz I","Forschungseffizienz II","Forschungseffizienz III","Lichtgeschwindigkeit","Wurmlochtheorie","Großer Akkumulator","Mehr Helium-3","Mega Akkumulator","Giga Akkumulator"];

var forschungBeschreibung = ["Energie ist der Treibstoff für die moderne Welt",
                            "Eine Flüssigkeit, mit der Maschinen laufen.",
                            "Eine große Maschine, die sehr schnell komplette Bäume ernten kann.",
                            "Die grundlegene Forschung wie man Großprojekte umsetzt.",
                            "Ressourceneffizienz erhöht die Produktion von Ressourcen um 1%",
                            "Ressourceneffizienz erhöht die Produktion von Ressourcen um 1%",
                            "Ressourceneffizienz erhöht die Produktion von Ressourcen um 1%",
                            "Kupfer ist ein in der modernen Welt unerersetzlicher Rohstoff.",
                            "Gold ist ein in der modernen Welt ebenso unersetzlicher Rohstoff wie beispielsweise Kupfer.",
                            "Silizium ist ein Halbleiter, der für die Elektronik extrem wichtig ist",
                            "Elektronik: daraus bestet die moderne Welt",
                            "Ressourceneffizienz erhöht die Produktion von Ressourcen um 1%",
                            "Ressourceneffizienz erhöht die Produktion von Ressourcen um 1%",
                            "Ressourceneffizienz erhöht die Produktion von Ressourcen um 1%",
                            "Titan ist ein Leichtmetall, das sehr strapazierfähig ist",
                            "Uran ein radioaktives Element, das u.a Verwendung in Kernkraftwerken findet.",
                            "Durch neue Abbaumethoden kannst du nun größere Minen bauen.",
                            "Durch die Automatisierung grundlegender Bergbaumechaniken sind nun größere Minen realisierbar.",
                            "Mit deinem Bergbauwissen von anderen Planeten kannst du jetzt Vollautomatisierte Minen bauen.",
                            "Durch Netzwerktechnik kannst du nun neuere und effizientere Produktionsanlagen bauen.",
                            "Der Schlüssel für vollautomatisierte Anlagen ist Helium-3 zum Kühlen der Elektronik.",
                            "Wenn man Schaltkreise effizienter bauen will, muss man die Größe reduzieren.",
                            "Die 7nm Fertigung ist ein Meilenstein in der Baugröße von Transistoren",
                            "Die 1nm Fertigung die kleinstmögliche Fertigungsgrößes!",
                            "Ressourceneffizienz erhöht die Produktion von Ressourcen um 1%",
                            "Ressourceneffizienz erhöht die Produktion von Ressourcen um 1%",
                            "Ressourceneffizienz erhöht die Produktion von Ressourcen um 1%",
                            "Ressourceneffizienz erhöht die Produktion von Ressourcen um 1%",
                            "Ressourceneffizienz erhöht die Produktion von Ressourcen um 1%",
                            "Ressourceneffizienz erhöht die Produktion von Ressourcen um 1%",
                            "Forschungseffizienz erhöht die Generierung von Forschungspunkten um 1%",
                            "Forschungseffizienz erhöht die Generierung von Forschungspunkten um 1%",
                            "Forschungseffizienz erhöht die Generierung von Forschungspunkten um 1%",
                            "Die Entwicklung eines Antriebs für Reisen mit Lichtgeschwindigkeit.",
                            "Wurmlöcher sind theoretische Gebilde, die entfernte Punkte im All verbinden.",
                            "Der großer Akkumulator kann mehr Energie speichern als sein kleiner Bruder.",
                            "Eine neue Art des Helium-3 Abbau.",
                            "Der Mega Akkumulator kann noch mehr Energie speichern",
                            "Der Giga Akkumulator; der bestmögliche Energiespeicher. <br> HYPER HYPER!"];
        