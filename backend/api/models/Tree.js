class Tree {

    constructor(data) {
        this.id = data["TreeID"];
        this.name = data["TreeName"];
        this.alias = data["Alias"];
        this.scientificName = data["ScientificName"];
        this.familyCode = data["FamilyCode"];

        this.ecologic = data["Ecologic"];

        this.cap95 = data["Cap95"];
        this.cap586 = data["Cap586"];
        this.hkRare = data["HkRare"];
        this.cnRare = data["CnRare"];

        this.floweringStart = data["FloweringStart"];
        this.floweringEnd = data["FloweringEnd"];
        this.fruitStart = data["FruitStart"];
        this.fruitEnd = data["FruitEnd"];

        this.desc = data["TreeDesc"];
    }
}

module.exports = Tree;
