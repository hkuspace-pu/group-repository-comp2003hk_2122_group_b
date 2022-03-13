import { defineComponent } from "vue";
import axios from "axios";
import Tree from "./../../model/tree"


export default defineComponent({
    name: 'tree',
    data() {
        return {
            url: "https://7ipwaamd2b.execute-api.us-east-1.amazonaws.com/test/trees",
            viewMode: "table" as string,
            treeData: [] as Tree[],
            selectedTree: {} as Tree
        }
    },
    created() {
        axios
            .get(this.url)
            .then(response => {
                let data = response.data as [];
                this.treeData = data.map(row => new Tree(row));
                console.log('starLog data', this.treeData);

            });
    },
    methods: {
        onTreeItemClick(index: number) {
            this.selectedTree = this.treeData[index];
            this.viewMode = "edit";
        },
        onEditBackClick() {
            this.selectedTree = new Tree({});
            this.viewMode = "table";
        },
        onAddClick() {
            this.selectedTree = new Tree({});
            this.viewMode = "create";
        },
        onSubmitClick() {
            console.log('starLog submit clicked', this.selectedTree);
            if (this.viewMode === "create") {
                this.createTree();
            }
        },
        onDeleteClick() {
            axios.delete(this.url, {
                data: {
                    treeID: this.selectedTree.treeId
                }
            }).then(res => {
                console.log('starLog response', res); 
            });
        },
        createTree() {
            axios
                .put(
                    this.url,
                    {
                        "treeName": this.selectedTree.treeName,
                        "alias": this.selectedTree.alias,
                        "scientificName": this.selectedTree.scientificName,
                        "familyCode": this.selectedTree.familyCode,
                        "ecologic": this.selectedTree.ecologic,

                        "cap95": this.selectedTree.cap95,
                        "cap586": this.selectedTree.cap586,
                        "hkRare": this.selectedTree.hkRare,
                        "cnRare": this.selectedTree.cnRare,

                        "floweringStart": this.selectedTree.floweringStart,
                        "floweringEnd": this.selectedTree.floweringEnd,
                        "fruitStart": this.selectedTree.fruitStart,
                        "fruitEnd": this.selectedTree.fruitEnd,

                        "treeDesc": this.selectedTree.treeDesc
                    })
                .then(res => {
                    console.log('starLog response', res);

                })
        }
    }
})
