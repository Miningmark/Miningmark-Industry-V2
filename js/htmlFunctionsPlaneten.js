$(document).ready(function(){

//Start Bedingungen
    var aktInfo = "00";
    $("#" + aktInfo + "PlanetenTab").toggleClass("active");
    $("#" + aktInfo + "PlanetenInfo").css("display", "block");


//Ressourcen Auswahl wechsel
    $(document).on("click", ".planetenAuswahl", function(){
        var id = this.id.substring(0, 2);
        if(id != aktInfo){
            switchInfo(id);
        }
    });

    function switchInfo(info){
        $("#" + aktInfo + "PlanetenInfo").css("display", "none");
        $("#" + info + "PlanetenInfo").css("display", "block");
        $("#" + aktInfo + "PlanetenTab").toggleClass("active");
        $("#" + info + "PlanetenTab").toggleClass("active");
        aktInfo = info;
    }


//Planeten Erforschen
    $(document).on("click", ".planetErforschen", function(){
        var i = this.id.substring(0, 2) * 1;
        var id = ""
        if(i < 10){
            id = "0" + i;
        }else{
            id = "" + i;
        }
        if(materialListe[5].anzahl > planetenKosten[i]){
            planeten.erforscht[i] = true;
            planeten.erforschen(i);
            materialListe[5].anzahl -= planetenKosten[i];
            guiupdateSonnensystem();
            statistik.planeten ++;
        }else{
            console.log("Zu wenig Treibstoff");
            fehler("Zu wenig Treibstoff");
        }
        
    });

    

});