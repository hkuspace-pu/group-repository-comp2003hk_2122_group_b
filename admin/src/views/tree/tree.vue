<template>
  <div id="tree" class="bg-dark bg-gradient text-white">
    <div id="tableView" v-show="viewMode === 'table'">
      <h1>Tree Page</h1>
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
            <th scope="col" class="title scientificName">Scientific Nam</th>
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

    <div id="editMode" v-show="viewMode === 'edit'">
      <div id="header">
        <button
          type="button"
          class="btn btn-primary btn-sm"
          @click="onEditBackClick"
        >
          Back
        </button>
        <h2>Editing tree #{{ selectedTree.treeId }}</h2>
      </div>

      <form>
        <div class="form-group">
          <label for="inputTee">Tree Name</label>
          <input
            type="text"
            class="form-control"
            id="inputTree"
            placeholder="Enter Tree Name"
            :value="selectedTree.treeName"
          />
          <!-- <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          > -->
        </div>
        <div class="form-group">
          <label for="inputAlias">Alias</label>
          <input
            type="text"
            class="form-control"
            id="inputAlias"
            placeholder="Enter Alias Name"
            :value="selectedTree.alias"
          />
          <!-- <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          > -->
        </div>
        <div class="form-group">
          <label for="inputScientificName">Scientific Name</label>
          <input
            type="text"
            class="form-control"
            id="inputScientificName"
            placeholder="Enter Scientific Name"
            :value="selectedTree.scientificName"
          />
          <!-- <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          > -->
        </div>
        <div class="form-group">
          <label for="inputFamilyCode">Family Code</label>
          <input
            type="text"
            class="form-control"
            id="inputFamilyCode"
            placeholder="Enter Family Code"
            :value="selectedTree.familyCode"
          />
          <!-- <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          > -->
        </div>
        <div class="form-group">
          <label for="inputEcologic">Ecologic</label>
          <input
            type="text"
            class="form-control"
            id="inputEcologic"
            placeholder="Enter Ecologic"
            :value="selectedTree.ecologic"
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
              id="exampleCheck1"
              v-model="selectedTree.cap95"
            />
            <label class="form-check-label" for="exampleCheck1">Cap 95</label>
          </div>
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
              v-model="selectedTree.cap586"
            />
            <label class="form-check-label" for="exampleCheck1">Cap 586</label>
          </div>
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
              v-model="selectedTree.hkRare"
            />
            <label class="form-check-label" for="exampleCheck1">HK Rare</label>
          </div>
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
              v-model="selectedTree.cnRare"
            />
            <label class="form-check-label" for="exampleCheck1">CN Rare</label>
          </div>
        </div>

        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="">Flowering</span>
          </div>
          <input
            type="text"
            class="form-control"
            :value="selectedTree.floweringStart"
          />
          <input
            type="text"
            class="form-control"
            :value="selectedTree.floweringEnd"
          />
        </div>

        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="">Fruit</span>
          </div>
          <input
            type="text"
            class="form-control"
            :value="selectedTree.fruitStart"
          />
          <input
            type="text"
            class="form-control"
            :value="selectedTree.fruitEnd"
          />
        </div>

        <div class="form-group">
          <label for="inputDesc">Description</label>
          <input
            type="text"
            class="form-control"
            id="inputDesc"
            placeholder="Enter Description"
            :value="selectedTree.treeDesc"
          />
          <!-- <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          > -->
        </div>
        
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" src="./tree.ts"/>
<style lang="scss" src="./tree.scss"/> 
