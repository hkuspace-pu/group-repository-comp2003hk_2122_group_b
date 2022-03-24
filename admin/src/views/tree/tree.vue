<template>
  <div id="tree" class="bg-dark bg-gradient text-white">
    <div id="tableView" v-show="viewMode === 'table'">
      <div class="header">
        <h1>Tree Page</h1>
        <button class="btn text-white" @click="onAddClick">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-plus-circle"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
            />
          </svg>
        </button>
      </div>
      <table
        class="
          table table-striped table-bordered table-hover table-sm table-dark
        "
        cellspacing="0"
        width="100%"
      >
        <thead>
          <tr>
            <th scope="col" class="title treeId">#</th>
            <th scope="col" class="title name">Name</th>
            <th scope="col" class="title scientificName">Scientific Name</th>
            <th scope="col" class="title familyCode">Family Code</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in treeData"
            :key="index"
            @click="onTreeItemClick(index)"
          >
            <th scope="row" class="item treeId">{{ item.treeId }}</th>
            <th scope="row" class="item name">{{ item.treeName }}</th>
            <th scope="row" class="item scientificName">
              {{ item.scientificName }}
            </th>
            <th scope="row" class="item familyCode">{{ item.familyCode }}</th>
          </tr>
        </tbody>
      </table>
    </div>

    <div id="editMode" v-show="viewMode === 'edit' || viewMode === 'create'">
      <div class="header">
        <button
          type="button"
          class="btn-close btn-close-white"
          @click="onEditBackClick"
        ></button>
        <h2 v-show="viewMode === 'edit'">
          Editing tree #{{ selectedTree.treeId }}
        </h2>
        <h2 v-show="viewMode === 'create'">Create A Tree</h2>
      </div>

      <img :src="selectedTree.treeImage" alt="picked image" v-if="selectedTree.treeImage"  rel="preload">

      <div class="form-group">
        <label>Tree Name</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter Tree Name"
          v-model="selectedTree.treeName"
        />
        <!-- <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          > -->
      </div>
      <div class="form-group">
        <label>Alias</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter Alias Name"
          v-model="selectedTree.treeAlias"
        />
        <!-- <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          > -->
      </div>
      <div class="form-group">
        <label>Scientific Name</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter Scientific Name"
          v-model="selectedTree.scientificName"
        />
        <!-- <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          > -->
      </div>
      <div class="form-group">
        <label>Family Code</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter Family Code"
          v-model="selectedTree.familyCode"
        />
        <!-- <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          > -->
      </div>
      <div class="form-group">
        <label>Ecologic</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter Ecologic"
          v-model="selectedTree.ecologic"
        />
        <!-- <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          > -->
      </div>
      <label>Conservation</label>
      <div id="checkboxGroup">
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            v-model="selectedTree.cap96"
          />
          <label>Cap 96</label>
        </div>
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            v-model="selectedTree.cap586"
          />
          <label>Cap 586</label>
        </div>
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            v-model="selectedTree.hkRare"
          />
          <label>HK Rare</label>
        </div>
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            v-model="selectedTree.cnRare"
          />
          <label>CN Rare</label>
        </div>
      </div>

      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text" id="">Flowering</span>
        </div>
        <input
          type="number"
          class="form-control"
          v-model="selectedTree.floweringStart"
        />
        <input
          type="number"
          class="form-control"
          v-model="selectedTree.floweringEnd"
        />
      </div>

      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text" id="">Fruit</span>
        </div>
        <input
          type="number"
          class="form-control"
          v-model="selectedTree.fruitStart"
        />
        <input
          type="number"
          class="form-control"
          v-model="selectedTree.fruitEnd"
        />
      </div>
      <small class="form-text text-muted"
        >The number represent the mouth, input -1 represent NOT AVAILABLE</small
      >

      <div class="form-group">
        <label>Description</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter Description"
          v-model="selectedTree.treeDesc"
        />
        <!-- <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          > -->
      </div>

      <div class="input-group">
        <span class="input-group-btn">
          <span class="btn btn-primary btn-file">
            Tree Image&hellip; <input type="file" single  @change="handleFiles"/>
          </span>
        </span>
        <input type="text" class="form-control" readonly :value="imageName"/>
        <span class="btn btn-danger" v-if="!!imageName" @click="onRemoveImageClick">Remove</span>
      </div>
      <img :src="imageUrl" alt="picked image" v-if="!!imageUrl">
      
      <div id="editButtonGroup">
        <button class="btn btn-primary" @click="onSubmitClick">Submit</button>
        <button
          class="btn btn-danger"
          @click="onDeleteClick"
          v-show="viewMode === 'edit'"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./tree.ts"/>
<style lang="scss" src="./tree.scss"/> 
