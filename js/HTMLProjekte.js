$(document).ready(function(){


    const div1 = document.querySelector("#grossProjekteIhalt");

    for(var i = 0; i < projektName.length; i++){
        var id = ""
        if(i < 10){
            id = "0" + i;
        }else{
            id = "" + i;
        }
        var versteckt = "";
        if(projekt.versteckt[i]){
            versteckt = ` projektIstVersteckt `;
        }
        div1.insertAdjacentHTML("beforeend", `
            <div class="projektID${id} ${versteckt} card border-info mb-3" style=" height: 300px; margin: 10px;">
                <div class="card-header" style="font-size: 20px;" >${projektName[i]}</div>
                <div class="card-body" >
                    <div style="width: 500px;">
                        <p class="card-text">${projektBeschreibung[i]}</p>
                    </div><img class="" src="img/${projektBild[i]}.png" style="position: absolute; right: 20px; top: 70px; height: 120; float: right;">
                    <p id="${id}ProjektKosten" style="position: absolute; left: 200px; top: 210px;">Kosten:  ${kosten(i,id)}</p>
                    <button id="${id}ProjektFreischalten" type="button" class="projektFreischalten btn btn-primary btn-lg" style="position: absolute; left: 20px; top: 200px;">Projekt Starten</button>
                    <div id="${id}ProjektFortschrittHintergrund" class="progress" style="position: absolute; bottom: 20px; left: 20px; width: 635px;">
                        <div id="${id}ProjektFortschritt" class="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 50%;">  
                        </div>
                    </div>
                    <p id="${id}ProjektFortschrittText" style="position: absolute; bottom: 2px; left: 320px; width: 150px;"> XX%</p>
                </div>
            </div>
        `);
    }

    function kosten(i,id){
        var kosten = "";
        
        for(var j = 0;j < projektKosten[i].length; j++){
            kosten += `<span id="${id}Projekt${materialListe[projektKosten[i][j][0]].nameID}Kosten">${zahlenAusgabeKonvention(projektKosten[i][j][1])} </span> ${materialListe[projektKosten[i][j][0]].name}`;
            if(j+1 < projektKosten[i].length){
                kosten += ` , `;
            }
        }
        return kosten;
    }
    


});




//Projekt Name
var projektName = ["Offshore-Windpark","Weltraumbahnhof","Forschungs Raumstation","Rechenzentrum","Mondbasis","Multi Bergbau Komplex","Mars Bergbau","Dyson-Sphäre","Observatorium","Weltraum Teleskop","Lichtgeschwindigkeitsantrieb","Theoretisches Wurmlochreisen","Raketentreibstoff Fabrik"];

//Projekt Beschreibung
var projektBeschreibung = ["Offshore-Windparks sind Windparks, die im Küstenvorfeld der Meere errichtet werden und große Mengen Energie durch den dort starken Wind generieren. Liefert dauerhaft 250 Energie.",
                            "Als Weltraumbahnhof bezeichnet man einen Startplatz, von dem aus Trägerraketen mit Raumfahrzeugen in eine Umlaufbahn um den Planeten Erde starten. Bei den beförderten Nutzlasten handelt es sich um Satelliten, Raumsonden oder Raumschiffe.",
                            "Raumstationen sind Raumflugkörper, die sich meist im Orbit eines Himmelskörpers befinden und es Menschen ermöglichen, lange Zeit auf ihnen zu leben.  Liefert dauerhaft 175 Forschungspunkte.",
                            "Mit Rechenzentrum bezeichnet man sowohl das Gebäude als auch die Räumlichkeiten, in denen die zentrale Rechentechnik untergebracht ist. Liefert eine dauerhafte Optimierung deines Forschung-, und Energienetzwerks sowie genung Rechenleistung für eine Forschungs KI.",
                            "Die Mondbasis dient als Ausgangspunkt für die weitere Erforschung des Mondes und als Bergbaubasis um Helium-3 zu gewinnen. Liefert einmalig 12500 Forschungspunkte und schaltet Helium-3 frei.",
                            "Auf einem einigartigem Stück Land, bei dem es die verschiedensten Erze gibt, hast du einen gigantischen Minenkomplex errichtet. Dieser liefert dauerhaft: 200 Metall, 150 Kupfer, 145 Gold, 100 Titan, 10 Uran.",
                            "Eine sehr effiziente und vorallem lukrative Titanmine auf dem Mars. Liefert dauerhaft 350 Titan.",
                            "Eine Dyson-Sphäre ist ein Konstrukt um die Energie eines Sterns oder eines Schwarzen Loches optimal nutzen zu können. Benannt ist sie nach dem Physiker Freeman Dyson. Liefert dauerhaft 25.000 Energie.",
                            "Ein Observatorium, ist ein Ort zur Beobachtung physikalischer und anderer naturwissenschaftlicher Phänomene. Die wohl bekannteste Art von Observatorium ist die Sternwarte zur Beobachtung von Himmelskörpern im Bereich des sichtbaren Lichtes. Liefert dauerhaft 40 Forschungspunkte und -daten für weitere Forschungen.",
                            "Ein Weltraumteleskop ist ein Teleskop, das sich außerhalb der störenden Erdatmosphäre im Weltraum befindet. Vorteile des Weltraums für Teleskope sind fehlende Luftunruhe und Zugang zu von der Atmosphäre verschluckten Bereichen. Liefert dauerhaft 75 Forschungspunkte und -daten für weitere Projekte.",
                            "Mit einem Lichtgeschwindigkeits-Antrieb können wir Schiffe bauen, die sich so schnell wie das Licht fortbewegen. Durch die Umsetztung dieses Projekts können Sie neue Raumschiffe bauen.",
                            "Mit Wurmlöchern können Menschen durch das Universum reisen. Forscher haben einen Weg herausgefunden, wie es möglich sein könnte. Mit diesem Projekt erhalten Sie die Baupläne eines Wurmlochportals.",
                            "Die Raketentreibstoff-Fabrik stellt große Mengen an Treibstoff her. Durch ihn entsteht der Schub einer Rakete. Die Wahl des Raketentreibstoffes ist der bestimmende Faktor für den spezifischen Impuls eines Raketentriebwerks. Liefert dauerhaft 450 Treibstoff."];

//Projekt Bild
var projektBild = ["offshoreBunt","weltraumbahnhofBunt","raumstationBunt","rechenzentrum","mondbasisBunt","mineBunt","marsmineBunt","dysonBunt","observatoriumBunt","weltraumteleskopBunt","lichtgeschwindigkeitBunt","wurmlochtheorieBunt","raketentreibstoffFabrikBunt"];

//Projekt Kosten
var projektKosten = [[[0,12500],[3,2500]],
                    [[0,25000],[3,7500],[5,1500]],
                    [[0,25000],[3,5000],[5,950],[10,475]],
                    [[0,50000],[3,2500],[10,1750]],
                    [[0,75000],[10,3900],[11,4500]],
                    [[0,175000],[3,25000],[11,16000],[10,9500]],
                    [[0,125000],[3,9500],[10,6550],[5,37500]],
                    [[0,1100000],[11,54000],[10,31000],[5,65000]],
                    [[0,75000],[3,3500],[10,3500]],
                    [[0,125000],[11,11000],[10,3500],[5,10000]],
                    [[0,5000000],[11,500000],[5,1500000]],
                    [[0,5000000],[11,500000],[1,1000000],[13,75000]],
                    [[0,75000],[3,15000],[4,20000],[6,20000]]];

