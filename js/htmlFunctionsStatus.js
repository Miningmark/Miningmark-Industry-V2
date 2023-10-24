$(document).ready(function(){

    var modal = document.getElementById("wirklichLoschen");

//Start Bedingungen
    var aktStatus = "01";
    $("#" + aktStatus + "StatusTab").toggleClass("active");
    $("#" + aktStatus + "Status").css("display", "block");


    //Ressourcen Auswahl wechsel
    $(document).on("click", ".statusAuswahl", function(){
        var id = this.id.substring(0, 2);
        if(id != aktStatus){
            switchInfo(id);
        }
    });

    function switchInfo(neuStatus){
        $("#" + aktStatus + "Status").css("display", "none");
        $("#" + neuStatus + "Status").css("display", "block");
        $("#" + aktStatus + "StatusTab").toggleClass("active");
        $("#" + neuStatus + "StatusTab").toggleClass("active");
        aktStatus = neuStatus;
    }


    $("#spielSpeichern").click(function(){
        console.log("Spiel Speichern");
        speichern();    
    });

    $("#spielLaden").click(function(){
        console.log("Spiel Laden");
        laden();

    });

    $("#spielLoschen").click(function(){
        modal.style.display = "block";
    });

//Modal BTN

    $(document).on("click", "#modalSchliesen", function(){
        modal.style.display = "none";
    });

    $(document).on("click", "#modalAbbrechen", function(){
        modal.style.display = "none";
    });

    $(document).on("click", "#modalbestatigen", function(){
        modal.style.display = "none";
        localStorage.clear();
        location.reload(); 
        console.log("Spielstand gelöschen");
    });

//Export Import

    $("#spielExportieren").click(function(){
        exportieren();

    });

    $("#spielImportieren").click(function(){
        importieren();
    });



});