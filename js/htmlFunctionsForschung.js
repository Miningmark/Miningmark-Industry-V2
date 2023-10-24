$(document).ready(function(){

    

    $(document).on("click", ".forschungFreischalten", function(){
        var i = this.id.substring(0, 2) * 1;
        var id = ""
        if(i < 10){
            id = "0" + i;
        }else{
            id = "" + i;
        }
        if(forschung.anzahl >= forschung.forschungKosten[i]){
            $("#"+id+"forschungErwerbenInfo").css("display", "none");
            $("#check"+ id).css("display", "block");
            forschung.forschungErworben[i] = true;
            forschung.erwerben(i);
            forschung.anzahl -= forschung.forschungKosten[i];
            statistik.forschungen ++;
            $("#forschungAnzahl").html(zahlenAusgabeKonvention(forschung.anzahl));
            if(id == 3){
                statistik.reiter++;
            }
        }else{
            console.log("Zu wenig Forschungspunkte");
            fehler("Zu wenig Forschungspunkte");
        }
    });

    $(".forscherEinstellen").on("click", function(e){
        var id = this.id.substring(0, 2) * 1;
        if(materialListe[0].anzahl >= forschung.wissenschaftlerPreis[id]){
            forschung.wissenschaftler[id] ++;
            forschung.ps += forschung.wissenschaftlerPunkte[id];
            materialListe[0].anzahl -= forschung.wissenschaftlerPreis[id];
            forschung.wissenschaftlerPreis[id] = Math.floor(forschung.wissenschaftlerPreis[id] * 1.05);
            guiupdateForschung();
        }else{
            console.log("Zu wenig Geld");
            fehler("Zu wenig Geld");
        }

    });

    $(".forscherEntlassen").on("click", function(e){
        var id = this.id.substring(0, 2) * 1;
        if(forschung.wissenschaftler[id] > 0){
            forschung.wissenschaftler[id] --;
            forschung.ps -= forschung.wissenschaftlerPunkte[id];
            forschung.wissenschaftlerPreis[id] = Math.floor(forschung.wissenschaftlerPreis[id] / 1.05);
            guiupdateForschung();
        }else{
            console.log("Keine Forscher Angestellt.");
            fehler("Keine Forscher Angestellt.");
        }

    });



    
    
});