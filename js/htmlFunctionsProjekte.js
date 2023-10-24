$(document).ready(function(){


    $(document).on("click", ".projektFreischalten", function(){
        var i = this.id.substring(0, 2) * 1;
        var id = ""
        if(i < 10){
            id = "0" + i;
        }else{
            id = "" + i;
        }
        var tempAnzahl = projektKosten[i].length;
        var j = 0;
        var alleMaterialien = true;
        var fehlt = "";
        while(j<tempAnzahl){
            if(materialListe[projektKosten[i][j][0]].anzahl <= projektKosten[i][j][1]){
                alleMaterialien = false;
                fehlt = materialListe[projektKosten[i][j][0]].name;
            }
            j++;
        }
        j = 0;
        if(alleMaterialien){
            while(j<tempAnzahl){
                materialListe[projektKosten[i][j][0]].anzahl -= projektKosten[i][j][1];
                j++;    
            }
            $("#"+id+"ProjektFortschrittHintergrund").css("display", "none");
            $("#"+id+"ProjektFortschrittText").css("display", "none");
            $("#"+id+"ProjektFreischalten").css("display", "none");
            $("#"+id+"ProjektKosten").css("display", "none");
            projekt.erwerben(i)
            projekt.erworben[i] = true;
            proSecUpdate();
            guiupdateProjekte();
            statistik.projekte ++;
            if(i == 1){
                statistik.reiter++;
            }
            if(!projekt.erworben[11] && i == 10){
                statistik.reiter++; 
            }
            if(!projekt.erworben[10] && i == 11){
                statistik.reiter++; 
            }


        }else{
            console.log("Nicht genug Material " + fehlt);
            fehler("Nicht genug Material " + fehlt);
        }
    });


   
    
});