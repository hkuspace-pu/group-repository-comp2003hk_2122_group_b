import { defineComponent } from "vue";
import axios from "axios";
import Tree from "./../../model/tree"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default defineComponent({
    name: 'tree',
    data() {
        return {
            url: "https://7ipwaamd2b.execute-api.us-east-1.amazonaws.com/test/trees",
            viewMode: "table" as string,
            treeData: [] as Tree[],
            selectedTree: {} as Tree,
            // image related
            imageFile: {} as any,
            imageName: "" as string,
            imageUrl: "" as string,
        }
    },
    created() {
        axios
            .get(this.url)
            .then(response => {
                console.log('starLog raw data', response.data);

                const data = response.data as [];
                this.treeData = data.map(row => new Tree(row));
                // console.log('starLog data', this.treeData);
            });
    },
    methods: {
        onTreeItemClick(index: number) {
            this.selectedTree = this.treeData[index];
            this.viewMode = "edit";
        },
        onEditBackClick() {
            this.selectedTree = new Tree({});
            this.imageFile = {};
            this.imageName = "";
            this.imageUrl = "";
            this.viewMode = "table";
        },
        onRemoveImageClick() {
            this.imageFile = {};
            this.imageName = "";
            this.imageUrl = "";
        },
        onAddClick() {
            this.selectedTree = new Tree({});
            this.viewMode = "create";
        },
        onSubmitClick() {
            // console.log('starLog submit clicked', this.selectedTree);
            if (this.viewMode === "create") {
                this.createTree();
            }
            if (this.viewMode === "edit") {
                this.updateTree();
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
        handleFiles(element: any) {
            if (element.target.files.length <= 0) return;
            const reader = new FileReader();
            const file = element.target.files[0];
            // console.log('starLog file picked', file);

            this.imageFile = file;
            this.imageName = file.name;
            this.imageUrl = URL.createObjectURL(file);
        },
        uploadImage(callback: any) {
            const storage = getStorage();
            const imageHash = Math.floor(Math.random() * 10000);

            // Create the file metadata
            /** @type {any} */
            const metadata = {
                contentType: 'image/jpeg'
            };

            // Upload file and metadata to the object 'images/mountains.jpg'
            const storageRef = ref(storage, 'images/' + this.imageFile.name + imageHash);
            const uploadTask = uploadBytesResumable(storageRef, this.imageFile, metadata);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;

                        // ...

                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        callback(downloadURL);
                    });
                }
            );
        },
        createTree() {
            let self = this;
            let uploadCallback = function (downloadUrl: string) {
                axios
                    .put(
                        self.url,
                        {
                            "treeName": self.selectedTree.treeName,
                            "treeAlias": self.selectedTree.treeAlias,
                            "scientificName": self.selectedTree.scientificName,
                            "familyCode": self.selectedTree.familyCode,
                            "ecologic": self.selectedTree.ecologic,

                            "cap95": self.selectedTree.cap95,
                            "cap586": self.selectedTree.cap586,
                            "hkRare": self.selectedTree.hkRare,
                            "cnRare": self.selectedTree.cnRare,

                            "floweringStart": self.selectedTree.floweringStart,
                            "floweringEnd": self.selectedTree.floweringEnd,
                            "fruitStart": self.selectedTree.fruitStart,
                            "fruitEnd": self.selectedTree.fruitEnd,

                            "treeDesc": self.selectedTree.treeDesc,
                            "treeImage": downloadUrl
                        })
                    .then(res => {
                        console.log('starLog response', res);

                    })
            };
            this.uploadImage(uploadCallback);
        },
        updateTree() {
            let self = this;
            let uploadCallback = function(downloadUrl: string) {
                axios.post(self.url, {
                    "treeID": self.selectedTree.treeId,
                    "treeName": self.selectedTree.treeName,
                    "treeAlias": self.selectedTree.treeAlias,
                    "scientificName": self.selectedTree.scientificName,
                    "familyCode": self.selectedTree.familyCode,
                    "ecologic": self.selectedTree.ecologic,
    
                    "cap95": self.selectedTree.cap95,
                    "cap586": self.selectedTree.cap586,
                    "hkRare": self.selectedTree.hkRare,
                    "cnRare": self.selectedTree.cnRare,
    
                    "floweringStart": self.selectedTree.floweringStart,
                    "floweringEnd": self.selectedTree.floweringEnd,
                    "fruitStart": self.selectedTree.fruitStart,
                    "fruitEnd": self.selectedTree.fruitEnd,
    
                    "treeDesc": self.selectedTree.treeDesc,
                    "treeImage": downloadUrl
                }).then(res => {
                    console.log('starLog response', res);
                })
            };
           self.uploadImage(uploadCallback); 
        }
    }
})
