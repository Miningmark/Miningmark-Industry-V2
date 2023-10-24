$(document).ready(function(){

  
    $(".autoVerkaufSchalter").on("click", function(e){
        var typID = this.id.substring(0, 2)*1;
        if($(this).prop("checked") == true){
            materialListe[typID].autoVerkaufAktiv = true;
        }else if($(this).prop("checked") == false){
            materialListe[typID].autoVerkaufAktiv = false;
        }
        proSecUpdate();
        guiupdateRessourcen();
    });
    
    $(".autoVerkaufAnzahlUbernehmen").on("click", function(e){
        var typID = this.id.substring(0, 2)*1;
        if($.isNumeric($("#"+ materialListe[typID].nameID +"AutoVerkaufAnzahlEingabe").val())){
            materialListe[typID].autoVerkaufAnzahl = $("#" + materialListe[typID].nameID + "AutoVerkaufAnzahlEingabe").val()* 1;
            
        }else{
            $("#" + materialListe[typID].nameID + "AutoVerkaufAnzahlEingabe").val("");
            console.log("Keine Gültige Zahl");
            fehler("Keine Gültige Zahl");
        }
        proSecUpdate();
        guiupdateRessourcen();
    });

    $(".verkaufen").on("click", function(e){
        var typID = this.id.substring(0, 2)*1;
        var menge = this.id.substring(11, 15)*1;
        console.log("typID:"+typID+" menge:"+menge);
        if(menge == 9999 && materialListe[typID].anzahl > 0){
            console.log("Anzahl:"+materialListe[typID].anzahl); 
            materialListe[0].anzahl += materialListe[typID].anzahl*materialListe[typID].preis;
            statistik.material[0] += materialListe[typID].anzahl*materialListe[typID].preis;
            materialListe[typID].anzahl = 0;
        }else if(menge <= materialListe[typID].anzahl){
            materialListe[typID].anzahl -= menge;
            materialListe[0].anzahl += menge * materialListe[typID].preis;
            statistik.material[0] += menge * materialListe[typID].preis;
        }else{
            console.log("Zu wenig " +  materialListe[typID].nameID + " im Lager");
            fehler("Zu wenig " +  materialListe[typID].nameID + " im Lager");
        }
        guiupdateRessourcen();
    });




});