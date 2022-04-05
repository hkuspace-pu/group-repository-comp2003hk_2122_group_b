export default class Tree {
    treeId: number;
    treeNameEn: string = "";
    treeNameCn: string = "";
    treeAlias: string = "";
    scientificName: string = "";
    familyCode: string = "";
    ecologic: string = "";

    cap96: boolean = false;
    cap586: boolean = false;
    hkRare: boolean = false;
    cnRare: boolean = false;

    flowering: boolean[] = [];
    fruit: boolean[] = [];

    treeDescEn: string = "";
    treeDescCn: string = "";

    treeImage: string = "";

    constructor(json: any) {
        this.treeId = json["treeId"];
        this.treeNameEn = json["treeNameEn"];
        this.treeNameCn = json["treeNameCn"];
        this.treeAlias = json["alias"];
        this.scientificName = json["scientificName"];

        this.familyCode = json["familyCode"];

        this.ecologic = json["ecologic"];
        this.cap96 = json["cap96"] === 1;
        this.cap586 = json["cap586"] === 1;
        this.hkRare = json["hkRare"] === 1;
        this.cnRare = json["cnRare"] === 1;

        let floweringStr = json["flowering"] || "",
            floweringArr = floweringStr.split('') as [],
            floweringMapped = floweringArr.map(i => i === "1");
        let fruitStr = json["fruit"] || "",
            fruitArr = fruitStr.split('') as [],
            fruitMapped = fruitArr.map(i => i === "1")

        this.flowering = floweringMapped;
        this.fruit = fruitMapped;

        this.treeDescEn = json["treeDescEn"];
        this.treeDescCn = json["treeDescCn"];

        this.treeImage = json["treeImage"];
    }

    convertToString(target: string): string {
        let result = "",
            arr: boolean[] = [];
        if(target === "flowering") {
            arr = this.flowering;
        }
        if(target === "fruit") {
            arr = this.fruit;
        }

        if(arr.length <= 0) {
            return "";
        }

        arr.forEach(item => {
            result += item ? "1" : "0";
        });

        return result;
    }
}