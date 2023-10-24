$(document).ready(function () {
    sizeContent();
    $(window).resize(sizeContent);
});

function sizeContent() {
    var newHeight = $("html").height() + "px";
    $(".seite").css("min-height", newHeight); 
    var fensterhohe = window.innerHeight;
    var vh = Math.floor(100*(fensterhohe - 220)/fensterhohe);
    $(".hoheDynamisch").css("height", vh+"vh");
}


function start(){
    $("#intro").css("display", "none");
    $("#spiel").css("display", "block");
    startflag = true;
}

function gewonnen(){
    $("#endText").html("Du hast die Menschheit erfolgreich nach <br> Alpha Centauri Evakuiert. <br> Evakuiert: " + evakuieren.evakuiert + "<br> Spielzeit: " + statistik.gesamtZeit());
    $("#outro").css("display", "block");
    $("#spiel").css("display", "none");
}

function ende(){
    localStorage.clear();
    location.reload();
}


function setStyleSheet(url){
    var stylesheet = document.getElementById("stylesheet");
    stylesheet.setAttribute('href', url);
    switch(url){
        case 'css/darkly.css':
            standartTextfarbe = "white";
            break;
        case 'css/default.css':
            standartTextfarbe = "black";
            break;
        case 'css/cyborg.css':
            standartTextfarbe = "white";
            break;
        case 'css/morph.css':
            standartTextfarbe = "black";
            window.alert("Bei diesem Design kommt es gelegentlich zu GUI-Fehlern.");
            break;
        case 'css/quartz.css':
            standartTextfarbe = "white";
            window.alert("Bei diesem Design kommt es gelegentlich zu GUI-Fehlern.");
            break;
        case 'css/sketchy.css':
            standartTextfarbe = "black";
            break;
        case 'css/vapor.css':
            standartTextfarbe = "white";
            break;
        default:
    }
 }
