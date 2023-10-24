


function zahlenAusgabeKonvention(zahl){
    var ausgabe = "";
    var temp = 0;
    if(zahl < 1000){
        ausgabe = zahl.toFixed(1);
    }else if(zahl < 1000000){
        temp = zahl /1000;
        ausgabe = ""+temp.toFixed(1) + "K";
    }else if(zahl < 1000000000){
        temp = zahl /1000000;
        ausgabe = ""+temp.toFixed(1) + "Mio";
    }else if(zahl < 1000000000000){
        temp = zahl /1000000000;
        ausgabe = ""+temp.toFixed(1) + "Mrd";
    }else{
        ausgabe = zahl;
    }

    return ausgabe;
}




function fehler(text){
    var x1 = document.getElementById("snackbar1");
    $("#fehlermeldungTitel").html(text)
    x1.className = "show";
    setTimeout(function(){ x1.className = x1.className.replace("show", ""); }, 3000);
}

function erfolg(text){
    var x2 = document.getElementById("snackbar2");
    $("#erfolgTitel").html(text)
    x2.className = "show";
    setTimeout(function(){ x2.className = x2.className.replace("show", ""); }, 3000);
}


function cheatern(){
    console.log("Cheaten");
    forschung.anzahl += 1000000;
    geld.anzahl += 10000000;
    for(var i = 2; i < materialListe.length; i++){
        materialListe[i].lager = 100000000;
        materialListe[i].anzahl += 1000000;

    }
}
