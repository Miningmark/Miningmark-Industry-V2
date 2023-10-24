$(document).ready(function(){


    const div1 = document.querySelector("#planetenAuswahlListe");

    for(var i = 0; i < planetenName.length; i++){
        if(i < 10){
            id = "0" + i;
        }else{
            id = "" + i;
        }
        div1.insertAdjacentHTML("beforeend", `
            <a id="${id}PlanetenTab" class=" planetenAuswahl list-group-item list-group-item-action">
                <div class="planetenListeObjekt" >
                    <img class="planetenListeObjektBild" src="img/${planetenBild[i]}.png">
                    <div style="">
                        <p class="planetenListeObjektName" >${planetenName[i]}</p>
                    </div>
                    <img class="check2" id="checkPlanet${id}" src="img/check.png">
                </div>
            </a>

        `);
    }


    const div2 = document.querySelector("#planetenTabInfo");

    for(var i = 0; i < planetenName.length; i++){
        if(i < 10){
            id = "0" + i;
        }else{
            id = "" + i;
        }
        div2.insertAdjacentHTML("beforeend", `
            <div id="${id}PlanetenInfo" class="planetenInfo card border-primary mb-3">
                <div class="card-header">${planetenName[i]}</div>
                <div class="card-body">
                    <p>${planetenBeschreibung[i]}</p>
                    <p>Belohnung: ${planetenBelohnung[i]}</p>
                    <p > Kostet: <span id="${id}PlanetErforschenKosten" > ${zahlenAusgabeKonvention(planetenKosten[i])} </span> Treibstoff</p>
                    <button id="${id}PlanetErforschen" type="button" class="planetErforschen btn btn-primary btn-lg">Erforschen</button>
                </div>
            </div>

        `);
    }




});


//Planeten Name
var planetenName = ["Sonne","Merkur","Venus","Mond","Mars","Asteroidengürtel","Jupiter","Saturn","Uranus","Neptun","Kuipergürtel"];

//Planeten Bild
var planetenBild = ["sonne","merkur","venus","mond","mars","asteroiden","jupiter","saturn","uranus","neptun","kuiper"];

//planeten Kosten
var planetenKosten = [74000,38500,19000,500,27500,74500,294000,450000,975000,1500000,3400000];

//Planeten Beschreibung
var planetenBeschreibung = ["Die Sonne ist der Stern, der der Erde am nächsten ist und das Zentrum des Sonnensystems bildet. Sie ist ein durchschnittlich großer Stern im äußeren Drittel der Milchstraße. Die Sonne ist ein Zwergstern (Gelber Zwerg), der sich im Entwicklungsstadium der Hauptreihe befindet. Sie enthält 99,86 % der Masse des Sonnensystems. Ihr Durchmesser ist mit 1,4 Millionen Kilometern etwa 110-mal so groß wie der der Erde.",
                            "Der Merkur ist mit einem Durchmesser von knapp 4880 Kilometern der kleinste, mit einer durchschnittlichen Sonnenentfernung von etwa 58 Millionen Kilometern der sonnennächste und somit auch schnellste Planet im Sonnensystem. Er hat mit einer maximalen Tagestemperatur von rund +430 °C und einer Nachttemperatur bis -170 °C die größten Oberflächen-Temperaturschwankungen aller Planeten.",
                            "Die Venus ist mit einer durchschnittlichen Sonnenentfernung von 108 Millionen Kilometern der zweitinnerste und mit einem Durchmesser von ca. 12.100 Kilometern der drittkleinste Planet des Sonnensystems. Sie zählt zu den vier erdähnlichen Planeten, die auch terrestrische oder Gesteinsplaneten genannt werden.",
                            "Der Mond ist unser größter Satellit, der sich alle 27 Tage einmal um die Erde dreht. Er enthält eine große Menge an Helium-3, eines der bestbekanntesten Kühlmittel.",
                            "Der Mars ist, von der Sonne aus gezählt, der vierte Planet im Sonnensystem und der äußere Nachbar der Erde. Er zählt zu den erdähnlichen Planeten. Sein Durchmesser ist mit knapp 6800 Kilometern etwa halb so groß, wie der der Erde, sein Volumen beträgt gut ein Siebtel des Erdvolumens. Damit ist der Mars nach dem Merkur der zweitkleinste Planet des Sonnensystems, hat jedoch eine vielfältige Geologie und die höchsten Vulkane des Sonnensystems.",
                            "Der Asteroidengürtel oder Hauptgürtel ist ein Bereich im Sonnensystem mit einer gehäuften Ansammlung von Asteroiden, der sich zwischen den Planetenbahnen von Mars und Jupiter befindet. Der Zwergplanet Ceres und ein Großteil der bisher bekannten Asteroiden des Sonnensystems befinden sich in diesem Bereich. Bis April 2017 wurden mehr als 650.000 solcher Objekte erfasst. ",
                            "Jupiter ist mit einem Äquatordurchmesser von rund 143.000 Kilometern der größte Planet des Sonnensystems. Mit einer durchschnittlichen Entfernung von 778 Millionen Kilometern ist er von der Sonne aus gesehen der fünfte Planet. Er ist nach dem römischen Hauptgott Jupiter benannt. ",
                            "Der Saturn ist von der Sonne aus gesehen der sechste Planet des Sonnensystems und mit einem Äquatordurchmesser von etwa 120.500 Kilometern nach Jupiter der zweitgrößte. Mit 95 Erdmassen hat er jedoch nur 30 % der Masse Jupiters. Wegen seines auffallenden und schon im kleinen Fernrohr sichtbaren Ringsystems wird er oft auch der Ringplanet genannt, obwohl auch bei den anderen drei Gasplaneten Ringsysteme gefunden wurden.",
                            "Der Uranus ist von der Sonne aus mit einer durchschnittlichen Sonnenentfernung von 2,9 Milliarden Kilometern der siebte Planet im Sonnensystem und wird zu den Eisriesen gerechnet. Er ist nach dem griechischen Himmelsgott Uranos benannt. Er ist damit als einziger Planet nach einem Gott der griechischen Götterwelt benannt.",
                            "Der Neptun ist der achte und äußerste bekannte Planet unseres Sonnensystems. Mit einem Durchmesser von knapp 50.000 Kilometern hat Neptun fast den vierfachen Erddurchmesser und das rund 58-fache Erdvolumen. Nach Jupiter, Saturn und Uranus ist Neptun der viertgrößte Planet des Sonnensystems.",
                            "Der Kuipergürtel ist eine nach Gerard Peter Kuiper benannte ringförmige, relativ flache Region, die sich im Sonnensystem außerhalb der Neptunbahn in einer Entfernung von ungefähr 30 bis 50 Astronomischen Einheiten (AE) nahe der Ekliptik erstreckt und schätzungsweise mehr als 70.000 Objekte mit mehr als 100 km Durchmesser sowie viele kleinere Objekte enthält."];

//Planeten Belohnung
var planetenBelohnung = ["Baupläne für eine Dyson-Sphäre",
                        "Forschungseffizienz +1%",
                        "Forschungseffizienz + 1%",
                        "Den perfekten Ort für eine Mondbasis",
                        "Den Perfekten Ort für eine Titanmine",
                        "Forschungseffizienz + 1%",
                        "Forschungseffizienz + 1%",
                        "Forschungseffizienz + 1%",
                        "Forschungseffizienz + 1%",
                        "Forschung für das grundlegende verständniss der Lichtgeschwindigkeit",
                        "Forschungseffizienz + 10%"];