class Planeten{
    constructor(){
        this.erforscht = [false,false,false,false,false,false,false,false,false,false,false];
        this.sichtbar = false;
        
    }

    planetenSpeichern(){
        var ausgabe = "";
        ausgabe += this.erforscht + ";";
        return ausgabe;
    }

    planetenLaden(erforscht){
        this.erforscht = erforscht;
    }




    erforschen(id){
        switch(id){
            case 0:
                $(".projektID07").removeClass("projektIstVersteckt");
                break;
            case 1:
                forschung.forschungsEffizienz += 0.01;
                break;
            case 2:
                forschung.forschungsEffizienz += 0.01;
                break;
            case 3:
                $(".projektID04").removeClass("projektIstVersteckt");
                break;
            case 4:
                $(".projektID06").removeClass("projektIstVersteckt");
                break;
            case 5:
                forschung.forschungsEffizienz += 0.01;
                break;
            case 6:
                forschung.forschungsEffizienz += 0.01;
                break;
            case 7:
                forschung.forschungsEffizienz += 0.01;
                break;
            case 8:
                forschung.forschungsEffizienz += 0.01;
                break;
            case 9:
                $("#forschungID33").removeClass("forschungIstVersteckt");
                break;
            case 10:
                forschung.forschungsEffizienz += 0.10;
                break;
            default:
        }
    }
}