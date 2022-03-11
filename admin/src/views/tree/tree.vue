<template>
  <div id="tree" class="bg-dark bg-gradient text-white">
    <h1>Tree Page</h1>
    <table
      class="table table-striped table-bordered table-hover table-sm table-dark"
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
        <tr v-for="(item, index) in treeData" :key="index">
          <th scope="row" class="item treeId">{{ item.treeId }}</th>
          <th scope="row" class="item name">{{ item.treeName }}</th>
          <th scope="row" class="item scientificName">{{ item.scientificName }}</th>
          <th scope="row" class="item familyCode">{{ item.familyCode }}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" src="./tree.ts"/>
<style lang="scss" src="./tree.scss"/> 
