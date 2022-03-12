export default class Tree {
    treeId: number;
    treeName: string;
    alias: string;
    scientificName: string;
    familyCode: string;
    ecologic: string;

    cap95: boolean;
    cap586: boolean;
    hkRare: boolean;
    cnRare: boolean;

    floweringStart: number;
    floweringEnd: number;
    fruitStart: number;
    fruitEnd: number;

    treeDesc: string;

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

        this.floweringStart = json["floweringStart"];
        this.floweringEnd = json["floweringEnd"];
        this.fruitStart = json["fruitStart"];
        this.fruitEnd = json["fruitEnd"];
        
        this.treeDesc = json["treeDesc"];
    }
}