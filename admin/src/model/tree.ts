export default class Tree {
    treeId: number;
    treeName: string = "";
    alias: string = "";
    scientificName: string = "";
    familyCode: string = "";
    ecologic: string = "";

    cap95: boolean = false;
    cap586: boolean = false;
    hkRare: boolean = false;
    cnRare: boolean = false;

    floweringStart: number = -1;
    floweringEnd: number = -1;
    fruitStart: number = -1;
    fruitEnd: number = -1;

    treeDesc: string = "";

    constructor(json: any) {
        this.treeId = json["treeId"];
        this.treeName = json["treeName"];
        this.alias = json["alias"];
        this.scientificName = json["scientificName"];
        
        this.familyCode = json["familyCode"];

        this.ecologic = json["ecologic"];
        this.cap95 = json["cap95"] === 1;
        this.cap586 = json["cap586"] === 1;
        this.hkRare = json["hkRare"] === 1;
        this.cnRare = json["cnRare"] === 1;

        this.floweringStart = json["floweringStart"] || -1;
        this.floweringEnd = json["floweringEnd"] || -1;
        this.fruitStart = json["fruitStart"] || -1;
        this.fruitEnd = json["fruitEnd"] || -1;
        
        this.treeDesc = json["treeDesc"];
    }
}