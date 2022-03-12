import { defineComponent } from "vue";
import axios from "axios";
import Tree from "./../../model/tree"


export default defineComponent({
    name: 'tree',
    data() {
        return {
            viewMode: "table",
            treeData: [] as any,
            selectedTree: {}
        }
    },
    created() {
        axios
        .get("https://7ipwaamd2b.execute-api.us-east-1.amazonaws.com/test/trees")
        .then(response => {
            let data = response.data as [];
            this.treeData = data.map(row => new Tree(row));
            console.log('starLog data', this.treeData);
            
        });
    },
    methods: {
        onTreeItemClick(index: number) {
            this.viewMode = "edit";
            this.selectedTree = this.treeData[index];
        },
        onEditBackClick() {
            this.selectedTree = {};
            this.viewMode = "table";
        }
    }
})
