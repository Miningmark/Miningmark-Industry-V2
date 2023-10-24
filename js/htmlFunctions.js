$(document).ready(function(){

//Start Bedingungen
    aktTab = "ressourcen";
    var aktInfo = "02";
    $("#" + aktInfo + "Tab").toggleClass("active");
    $("#" + aktInfo + "Info").css("display", "block");


    
    guiUpdateKomplett();
    timer();
    

//TAB wechsel
    $(".tabButton").on("click",function(e){
        var id = this.id.substring(0, (this.id.length - 9));
        if(id != aktInfo){
            switchTab(id);
        }
    });

    function switchTab(tab){
        $("#" + aktTab + "Tab").css("display", "none");
        $("#" + tab + "Tab").css("display", "block");
        $("#" + aktTab + "TabButton").toggleClass("active");
        $("#" + tab + "TabButton").toggleClass("active");
        aktTab = tab;
        guiAutoSeite();
    }

//Ressourcen Auswahl wechsel
    $(document).on("click", ".ressourcenAuswahl", function(){
        var id = this.id.substring(0, 2);
        if(id != aktInfo){
            switchInfo(id);
        }
    });

    function switchInfo(info){
        $("#" + aktInfo + "Info").css("display", "none");
        $("#" + info + "Info").css("display", "block");
        $("#" + aktInfo + "Tab").toggleClass("active");
        $("#" + info + "Tab").toggleClass("active");
        aktInfo = info;
    }
    
//Manuel Materialien Abbauen
    $(document).on("click", ".manuel", function(){
        var typID = this.id.substring(0, 2) * 1;
        statistik.manuell ++;
        if(materialListe[typID].anzahl + 1 <= materialListe[typID].lager){
            materialListe[typID].anzahl += 1;
            statistik.material[typID] += 1;
            guiupdateRessourcen();
        }  
    });

//Lager Erweitern
    $(document).on("click", ".lagerErweitern", function(){
        var typID = this.id.substring(0, 2) * 1;
        if(materialListe[0].anzahl >= materialListe[typID].lagerErweiterung){
            materialListe[typID].lager = materialListe[typID].lagerErweiterung;
            materialListe[0].anzahl -= materialListe[typID].lagerErweiterung;
            materialListe[typID].lagerErweiterung *= 2;
            guiupdateRessourcen();
        }else{
            console.log("Zu wenig Geld");
            fehler("Zu wenig Geld");
        }
    });

//Fabrik kaufen
    $(document).on("click", ".fabrikKaufen", function(){
        var typID = this.id.substring(0, 2) * 1;
        var stufe = this.id.substring(8, 9) * 1;
        var tempAnzahl = materialListe[typID].fabrikKosten[stufe].length;
        var i = 0;
        var alleMaterialien = true;
        var fehlt = "";
        while(i<tempAnzahl){
            if(materialListe[materialListe[typID].fabrikKosten[stufe][i][0]].anzahl < materialListe[typID].fabrikKosten[stufe][i][1]){
                alleMaterialien = false;
                fehlt = materialListe[materialListe[typID].fabrikKosten[stufe][i][0]].name;
            }
            i++;
        }
        i = 0;
        if(alleMaterialien){
            while(i<tempAnzahl){
                materialListe[materialListe[typID].fabrikKosten[stufe][i][0]].anzahl -= materialListe[typID].fabrikKosten[stufe][i][1];
                materialListe[typID].fabrikKosten[stufe][i][1] = Math.floor(materialListe[typID].fabrikKosten[stufe][i][1] * 1.05);
                i++;    
            }
            materialListe[typID].fabrik[stufe] ++;
            statistik.stufe[stufe] ++;
            proSecUpdate();
            guiupdateRessourcen();
        }else{
            console.log("Nicht genug Material " + fehlt);
            fehler("Nicht genug Material " + fehlt);
        }
    });

//Fabrik verkauf 
    $(document).on("click", ".fabrikVerkaufen", function(){
        var typID = this.id.substring(0, 2) * 1;
        var stufe = this.id.substring(8, 9) * 1;
        var tempAnzahl = materialListe[typID].fabrikKosten[0].length;
        var i = 0;
        if(materialListe[typID].fabrik[stufe] > 0){
            while(i<tempAnzahl){
                materialListe[typID].fabrikKosten[stufe][i][1] = Math.floor(materialListe[typID].fabrikKosten[stufe][i][1] / 1.05);
                i++;    
            }
            materialListe[typID].fabrik[stufe] --;
            proSecUpdate();
            guiupdateRessourcen();
        }else{
            console.log("Keine Fabrik vorhanden");
            fehler("Keine Fabrik vorhanden");
        }
    });
   
//EnergieSpeicher

    $(document).on("click", ".speicherKaufen", function(){
        var typID = this.id.substring(0, 2) * 1;
        var stufe = this.id.substring(10, 11) * 1;
        var tempAnzahl = energieSpeicher.kosten[stufe].length;
        var i = 0;
        var alleMaterialien = true;
        var fehlt = "";
        
        while(i<tempAnzahl){
            if(materialListe[energieSpeicher.kosten[stufe][i][0]].anzahl <= energieSpeicher.kosten[stufe][i][1]){
                alleMaterialien = false;
                fehlt = materialListe[energieSpeicher.kosten[stufe][i][0]].name;
            }
            i++;
        }
        i = 0;
        if(alleMaterialien){
            while(i<tempAnzahl){
                materialListe[energieSpeicher.kosten[stufe][i][0]].anzahl -= energieSpeicher.kosten[stufe][i][1];
                energieSpeicher.kosten[stufe][i][1] = Math.floor(energieSpeicher.kosten[stufe][i][1] * 1.05);
                i++;    
            }
            energieSpeicher.speicher[stufe] ++;
            materialListe[1].lager += energieSpeicher.speicherKapazität[stufe];
            
            proSecUpdate();
            guiupdateRessourcen();
        }else{
            console.log("Nicht genug Material " + fehlt);
            fehler("Nicht genug Material " + fehlt);
        }
    });









//Meldung

    $(document).on("click", ".meldung", function(){
        $(this).parent().parent().removeClass("show");
    });

});