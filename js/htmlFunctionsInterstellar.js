$(document).ready(function(){


    $("#generationenschiffBauen").click(function(){
        var i = 0;
        var alleMaterialien = true;
        var fehlt = "";
        while(i<evakuieren.schiffKosten.length){
            if(materialListe[evakuieren.schiffKosten[i][0]].anzahl <= evakuieren.schiffKosten[i][1]){
                alleMaterialien = false;
                fehlt = materialListe[evakuieren.schiffKosten[i][0]].name;
            }
            i++;
        }
        i = 0;
        if(alleMaterialien){
            while(i<evakuieren.schiffKosten.length){
                materialListe[evakuieren.schiffKosten[i][0]].anzahl -= evakuieren.schiffKosten[i][1];
                evakuieren.schiffKosten[i][1] = Math.floor(evakuieren.schiffKosten[i][1] * 1.05);
                i++;    
            }
            evakuieren.wege[0] ++;
            guiupdateInterstellar();
        }else{
            console.log("Nicht genug Material " + fehlt);
            fehler("Nicht genug Material " + fehlt);
        }   
    });

    $("#wurmlochportalBauen").click(function(){
        var i = 0;
        var alleMaterialien = true;
        var fehlt = "";
        while(i<evakuieren.portalKosten.length){
            if(materialListe[evakuieren.portalKosten[i][0]].anzahl <= evakuieren.portalKosten[i][1]){
                alleMaterialien = false;
                fehlt = materialListe[evakuieren.portalKosten[i][0]].name;
            }
            i++;
        }
        i = 0;
        if(alleMaterialien){
            while(i<evakuieren.portalKosten.length){
                materialListe[evakuieren.portalKosten[i][0]].anzahl -= evakuieren.portalKosten[i][1];
                evakuieren.portalKosten[i][1] = Math.floor(evakuieren.portalKosten[i][1] * 1.05);
                i++;    
            }
            evakuieren.wege[1] ++;
            guiupdateInterstellar();
        }else{
            console.log("Nicht genug Material " + fehlt);
            fehler("Nicht genug Material " + fehlt);
        }   
    });

    $("#infrastrukturBauen").click(function(){
        var i = 0;
        var alleMaterialien = true;
        var fehlt = "";
        while(i<evakuieren.infrastrukturKosten.length){
            if(materialListe[evakuieren.infrastrukturKosten[i][0]].anzahl <= evakuieren.infrastrukturKosten[i][1]){
                alleMaterialien = false;
                fehlt = materialListe[evakuieren.infrastrukturKosten[i][0]].name;
            }
            i++;
        }
        i = 0;
        if(alleMaterialien){
            while(i<evakuieren.infrastrukturKosten.length){
                materialListe[evakuieren.infrastrukturKosten[i][0]].anzahl -= evakuieren.infrastrukturKosten[i][1];
                evakuieren.infrastrukturKosten[i][1] = Math.floor(evakuieren.infrastrukturKosten[i][1] * 1.05);
                i++;    
            }
            evakuieren.wege[2] ++;
            $("#infrastrukturFortschrittAnzeige").css("display", "none");
            $("#infrastrukturFortschrittText").css("display", "none");
            $("#infrastrukturBauen").css("display", "none");
            $("#infrastrukturGesamtKosten").css("display", "none");
            if(projekt.erworben[10]){
                $("#generationenschiffKarte").removeClass("projektIstVersteckt");
            }
            if(projekt.erworben[11]){
                $("#wurmlochportalKarte").removeClass("projektIstVersteckt");
            }


            guiupdateInterstellar();
        }else{
            console.log("Nicht genug Material " + fehlt);
            fehler("Nicht genug Material " + fehlt);
        }   
    });



});