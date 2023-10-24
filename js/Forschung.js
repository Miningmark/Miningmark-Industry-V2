class Forschung{
    constructor(anzahl){
        this.anzahl = anzahl;
        this.ps = 0;
        this.wissenschaftler = [0,0,0,0,0];
        this.wissenschaftlerPreis = [55,680,1420,14600,33333];
        this.wissenschaftlerUnterhalt = [[0,2],[0,25],[0,97],[0,875],[1,600]];
        this.wissenschaftlerPunkte = [1,10,35,175,450];
        this.wissenschaftlerVersteckt = [false,false,false,false,true];
        this.forschungErworben = [];
        this.forschungVersteckt = [false,true,true,false,false];
        this.forschungKosten = [500,350,3500,7500,4000,5000,6000,1200,1900,1700,
                                4500,7000,8000,9000,4500,12500,4500,35500,150000,15000,
                                65000,12000,32000,165000,10000,11000,12000,13000,14000,15000,
                                5000,7500,10000,1000000,1000000,12500,75000,125000,250000];
        this.projektBonus = 0;

        this.ressourcenEffizienz = 1;
        this.energieEffizienz = 1;
        this.forschungsEffizienz = 1;

        this.forschungInit();

        this.test333 = 123;
    }

    forschungInit(){
        for(var i = 0; i < this.forschungKosten.length; i++){
            this.forschungErworben.push(false);
            if(i > 4){
                this.forschungVersteckt.push(true);
            }
        }
    }


    forschungSpeichern(){
        var speicher = "";
        speicher += this.anzahl + ";";
        speicher += this.wissenschaftler + ";";
        speicher += this.wissenschaftlerPreis + ";";
        speicher += this.wissenschaftlerVersteckt + ";";
        speicher += this.forschungErworben + ";";

        return speicher;
    }

    forschungLaden(anzahl,wissenschaftler,wissenschaftlerPreis,wissenschaftlerVersteckt,forschungErworben,forschungVersteckt,projektBonus,ressourcenEffizienz,energieEffizienz,forschungsEffizienz){
        this.anzahl = anzahl;
        this.wissenschaftler = wissenschaftler;
        this.wissenschaftlerPreis = wissenschaftlerPreis;
        this.wissenschaftlerVersteckt = wissenschaftlerVersteckt;
        this.forschungErworben = forschungErworben;
    }

    erwerben(id){

        switch(id){
            case 0:
                $(".energie").css("display", "block");
                materialListe[1].versteckt = false;
                $("#forschungID01").removeClass("forschungIstVersteckt");
                this.forschungVersteckt[1] = false;
                break;
            case 1:
                $(".treibstoff").css("display", "block");
                $("#forschungID02").removeClass("forschungIstVersteckt");
                $("#forschungID07").removeClass("forschungIstVersteckt");
                $("#forschungID08").removeClass("forschungIstVersteckt");
                $("#forschungID09").removeClass("forschungIstVersteckt");
                $("#forschungID14").removeClass("forschungIstVersteckt");
                $("#forschungID15").removeClass("forschungIstVersteckt");
                $(".projektID01").removeClass("projektIstVersteckt");
                break;
            case 2:
                $(".021").css("display", "block");
                break;
            case 3:
                $("#grossProjekte").css("display", "block");
                break;
            case 4:
                this.ressourcenEffizienz += 0.01;
                $("#forschungID05").removeClass("forschungIstVersteckt");
                break;
            case 5:
                this.ressourcenEffizienz += 0.01;
                $("#forschungID06").removeClass("forschungIstVersteckt");
                break;
            case 6:
                this.ressourcenEffizienz += 0.01;
                $("#forschungID11").removeClass("forschungIstVersteckt");
                break;
            case 7:
                $(".kupfer").css("display", "block");
                $("#forschungID35").removeClass("forschungIstVersteckt");
                if(this.forschungErworben[7] && this.forschungErworben[8] && this.forschungErworben[9]){
                    $("#forschungID10").removeClass("forschungIstVersteckt");
                    $("#forschungID16").removeClass("forschungIstVersteckt");
                }
                break;
            case 8:
                $(".gold").css("display", "block");
                if(this.forschungErworben[7] && this.forschungErworben[8] && this.forschungErworben[9]){
                    $("#forschungID10").removeClass("forschungIstVersteckt");
                    $("#forschungID16").removeClass("forschungIstVersteckt");
                }
                break;
            case 9:
                $(".silizium").css("display", "block");
                $(".011").css("display", "block");
                if(this.forschungErworben[7] && this.forschungErworben[8] && this.forschungErworben[9]){
                    $("#forschungID10").removeClass("forschungIstVersteckt");
                    $("#forschungID16").removeClass("forschungIstVersteckt");
                }
                break;
            case 10:
                $(".schaltkreise").css("display", "block");
                $(".projektID03").removeClass("projektIstVersteckt");
                $(".062").css("display", "block");
                $("#forschungID21").removeClass("forschungIstVersteckt");
                $(".projektID05").removeClass("projektIstVersteckt");
                break;
            case 11:
                this.ressourcenEffizienz += 0.01;
                $("#forschungID12").removeClass("forschungIstVersteckt");
                break;
            case 12:
                this.ressourcenEffizienz += 0.01;
                $("#forschungID13").removeClass("forschungIstVersteckt");
                break;
            case 13:
                $("#forschungID24").removeClass("forschungIstVersteckt");
                this.ressourcenEffizienz += 0.01;
                break;
            case 14:
                $(".titan").css("display", "block");
                break;
            case 15:
                $(".uran").css("display", "block");
                $(".013").css("display", "block");
                break;
            case 16:
                $(".031").css("display", "block");
                $(".071").css("display", "block");
                $(".081").css("display", "block");
                $(".091").css("display", "block");
                $(".111").css("display", "block");
                $(".121").css("display", "block");
                if(projekt.erworben[3]){
                    $("#forschungID17").removeClass("forschungIstVersteckt");
                }
                break;
            case 17:
                $(".032").css("display", "block");
                $(".072").css("display", "block");
                $(".082").css("display", "block");
                $(".092").css("display", "block");
                $(".112").css("display", "block");
                $(".122").css("display", "block");
                break;
            case 18:
                $(".033").css("display", "block");
                $(".073").css("display", "block");
                $(".083").css("display", "block");
                $(".093").css("display", "block");
                $(".113").css("display", "block");
                $(".123").css("display", "block");
                break;
            case 19:
                $(".022").css("display", "block");
                $(".042").css("display", "block");
                $(".052").css("display", "block");
                $(".063").css("display", "block");
                break;
            case 20:
                $(".023").css("display", "block");
                $(".043").css("display", "block");
                $(".053").css("display", "block");
                break;
            case 21:
                $("#forschungID22").removeClass("forschungIstVersteckt");
                $(".101").css("display", "block");
                break;
            case 22:
                $("#forschungID23").removeClass("forschungIstVersteckt");
                $(".102").css("display", "block");
                break;
            case 23:
                $(".103").css("display", "block");
                break;
            case 24:
                this.ressourcenEffizienz += 0.01;
                $("#forschungID25").removeClass("forschungIstVersteckt");
                break;
            case 25:
                this.ressourcenEffizienz += 0.01;
                $("#forschungID26").removeClass("forschungIstVersteckt");
                break;
            case 26:
                this.ressourcenEffizienz += 0.01;
                $("#forschungID27").removeClass("forschungIstVersteckt");
                break;
            case 27:
                this.ressourcenEffizienz += 0.01;
                $("#forschungID28").removeClass("forschungIstVersteckt");
                break;
            case 28:
                this.ressourcenEffizienz += 0.01;
                $("#forschungID29").removeClass("forschungIstVersteckt");
                break;
            case 29:
                this.ressourcenEffizienz += 0.01;
                break;
            case 30:
                this.forschungsEffizienz += 0.01;
                $("#forschungID31").removeClass("forschungIstVersteckt");
                break;
            case 31:
                this.forschungsEffizienz += 0.01;
                $("#forschungID32").removeClass("forschungIstVersteckt");
                break;
            case 32:
                this.forschungsEffizienz += 0.01;
                break;
            case 33:
                $(".projektID10").removeClass("projektIstVersteckt");
                break;
            case 34:
                $(".projektID11").removeClass("projektIstVersteckt");
                break;
            case 35:
                $(".0111").css("display", "block");
                $("#forschungID37").removeClass("forschungIstVersteckt");
                break;
            case 36:
                $(".131").css("display", "block");
                break;
            case 37:
                $(".0112").css("display", "block");
                break;
            case 38:
                $(".0113").css("display", "block");
                break;
            default:
        }
    }
}

