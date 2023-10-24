(function(){
    materialInitiieren();
    
})();

    

function materialInitiieren(){
    energieSpeicher = new EnergieSpeicher();
    forschung = new Forschung(0);
    projekt = new Projekt();
    planeten = new Planeten();
    evakuieren = new Evakuieren();
    statistik = new Status();
    materialListe2 = [];
    materialListe2.push(forschung);
    materialListe = [];
    materialListe.push(geld = new Geld(0));

    materialListe.push(energie = new Material(01,"energie","Energie",0,500,0,false,true,0,false,[0,0,0,0,0],[false,true,false,true,true],[[5,true],[2,false],[7,true],[140,true],[1050,true]],[[[6,2]],[],[[4,3]],[[12,3]],[[13,5]]],[[[0,900],[3,550]],[[0,950],[2,250],[9,175]],[[0,1350],[3,880]],[[0,35000],[3,5500],[11,4500]],[[0,65000],[3,35500],[11,24500],[10,9500]]]));

    materialListe.push(holz = new Material(02,"holz","Holz",0,50,1,true,false,0,false,[0,0,0,0],[false,true,true,true],[[1,false],[15,true],[80,true],[450,true]],[[],[[5,1]],[[5,5]],[[1,23],[13,1]]],[[[0,25]],[[0,1500],[3,850]],[[0,5500],[3,3620]],[[0,19500],[11,6500],[10,1950]]]));

    materialListe.push(metall = new Material(03,"metall","Metall",0,50,2,true,false,0,false,[0,0,0,0],[false,true,true,true],[[1,false],[7,true],[86,true],[283,true]],[[],[[5,2]],[[1,15]],[[1,32],[13,1]]],[[[0,150]],[[0,950],[3,520],[2,175]],[[0,3300],[3,2450],[10,520]],[[0,7580],[11,3500],[10,4540]]]));

    materialListe.push(ol = new Material(04,"ol","Öl",0,50,4,false,false,0,false,[0,0,0,0],[false,true,true,true],[[3,false],[9,true],[74,true],[359,true]],[[],[[1,3]],[[1,22]],[[1,88],[13,2]]],[[[0,500],[3,250]],[[0,750],[3,630],[10,56]],[[0,5600],[3,4500],[10,355]],[[0,16500],[3,17500],[11,9800],[10,2990]]]));

    materialListe.push(treibstoff = new Material(05,"treibstoff","Treibstoff",0,50,8,false,true,0,false,[0,0,0,0],[false,true,true,true],[[3,true],[10,true],[75,true],[350,true]],[[[1,3],[4,6]],[[1,8],[4,18]],[[1,45],[4,105]],[[1,150],[4,400],[13,2]]],[[[0,1000],[3,300]],[[0,2500],[3,750],[10,35]],[[0,13500],[3,3960],[10,265]],[[0,33000],[3,7500],[11,5600],[10,685]]]));

    materialListe.push(holzkohle = new Material(06,"holzkohle","Holzkohle",0,50,2,false,false,0,false,[0,0,0,0],[false,false,true,true],[[2,true],[9,true],[76,true],[363,true]],[[[2,4]],[[2,15],[4,1]],[[2,110],[1,15]],[[2,380],[1,25]]],[[[0,250],[2,350]],[[0,800],[2,1100],[3,300]],[[0,4000],[2,3500],[3,2100],[10,44]],[[0,18500],[3,13600]]]));

    materialListe.push(kupfer = new Material(07,"kupfer","Kupfer",0,50,7,false,true,0,false,[0,0,0,0],[false,true,true,true],[[3,true],[9,true],[69,true],[211,true]],[[[5,3]],[[5,4]],[[1,35]],[[1,69],[13,2]]],[[[0,830],[2,250],[3,350]],[[0,1450],[2,350],[3,835]],[[0,6500],[3,2690],[10,560]],[[0,16000],[3,2600],[10,2330],[11,1700]]]));

    materialListe.push(gold = new Material(08,"gold","Gold",0,50,10,false,true,0,false,[0,0,0,0],[false,true,true,true],[[3,true],[9,true],[63,true],[225,true]],[[[5,3]],[[5,7]],[[1,36]],[[1,160],[13,3]]],[[[0,830],[2,310],[3,425]],[[0,2100],[2,530],[3,990]],[[0,9600],[3,5230],[10,685]],[[0,23500],[3,9500],[11,13000],[10,6500]]]));

    materialListe.push(silizium = new Material(09,"silizium","Silizium",0,50,8,false,true,0,false,[0,0,0,0],[false,true,true,true],[[4,true],[12,true],[89,true],[299,true]],[[[5,3]],[[5,7]],[[1,34]],[[1,270],[13,3]]],[[[0,725],[3,375]],[[0,1635],[3,999]],[[0,6700],[3,4900],[10,785]],[[0,31000],[3,11000],[11,7500],[10,9500]]]));

    materialListe.push(schaltkreise = new Material(10,"schaltkreise","Schaltkreise",0,50,25,false,true,0,false,[0,0,0,0],[false,true,true,true],[[5,true],[27,true],[93,true],[326,true]],[[[1,3],[7,3],[8,2],[9,2]],[[1,9],[7,9],[8,7],[9,7]],[[1,40],[7,38],[8,32],[9,42]],[[1,180],[7,97],[8,108],[9,130]]],[[[0,2500],[3,635]],[[0,6500],[3,1500]],[[0,29500],[3,7700],[11,1690]],[[0,108000],[3,19800],[11,7800]]]));

    materialListe.push(titan = new Material(11,"titan","Titan",0,50,11,false,true,0,false,[0,0,0,0],[false,true,true,true],[[3,true],[12,true],[112,true],[335,true]],[[[1,3]],[[1,9]],[[1,95]],[[1,245],[13,4]]],[[[0,3500],[3,1250],[10,520]],[[0,8500],[3,2500],[11,520],[10,1225]],[[0,23600],[3,3360],[11,3600],[10,7450]],[[0,45300],[11,6500],[10,13650]]]));

    materialListe.push(uran = new Material(12,"uran","Uran",0,50,18,false,true,0,false,[0,0,0,0],[false,true,true,true],[[1,true],[4,true],[45,true],[210,true]],[[[5,3]],[[1,12]],[[1,68]],[[1,205],[13,12]]],[[[0,2200],[2,520],[3,1250]],[[0,5390],[2,630],[3,3175],[10,315]],[[0,46000],[3,25600],[10,2960]],[[0,95000],[3,36200],[11,26000],[10,7620]]]));

    materialListe.push(helium3 = new Material(13,"helium3","Helium-3",0,50,55,false,true,0,false,[0,0],[false,true],[[2,true],[17,true]],[[[1,100]],[[1,850]]],[[[0,25000],[11,9500],[10,6500]],[[0,195000],[11,75000],[10,56000]]]));

}

