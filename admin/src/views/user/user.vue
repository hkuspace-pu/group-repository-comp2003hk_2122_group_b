<template>
  <div id="user" class="bg-dark bg-gradient text-white">
    <div id="tabelView" v-show="viewMode === 'table'">
      <div class="header">
        <h1>Users</h1>
        <!-- <button class="btn text-white" @click="onAddClick">
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
        </button> -->
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
            <th scope="col" class="title userId">#</th>
            <th scope="col" class="title userName">Name</th>
            <th scope="col" class="title email">Email</th>
            <th scope="col" class="title membership">Membership</th>
            <!-- <th scope="col" class="title password">Password</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in userData" :key="index">
            <th scope="row" class="item userId" @click="onUserItemClick(index)">
              {{ item.userId }}
            </th>
            <th
              scope="row"
              class="item userName"
              @click="onUserItemClick(index)"
            >
              {{ item.userName }}
            </th>
            <th scope="row" class="item email" @click="onUserItemClick(index)">
              {{ item.email }}
            </th>
            <th
              scope="row"
              class="item membership"
              @click="onUserItemClick(index)"
            >
              {{ item.membershipTxt }}
            </th>
            <!-- <th scope="row" class="item password">
              <button class="btn btn-primary" @click="onPasswordClick(index)">
                Change
              </button>
            </th> -->
          </tr>
        </tbody>
      </table>
    </div>

    <div id="editMode" v-show="viewMode === 'create'">
      <div class="header">
        <button
          type="button"
          class="btn-close btn-close-white"
          @click="onBackButtonClick"
        ></button>
        <h2>Create A User</h2>
      </div>

      <div class="form-group">
        <label>User Name</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter User Name"
          v-model="selectedUser.userName"
        />
      </div>

      <div class="form-group">
        <label>Email</label>
        <input
          type="email"
          class="form-control"
          placeholder="Enter Email"
          v-model="selectedUser.email"
        />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input
          type="password"
          class="form-control"
          placeholder="Enter Password"
          v-model="newPassword"
        />
      </div>

      <div class="form-group">
        <label>Confirm Password</label>
        <input
          type="password"
          class="form-control"
          placeholder="Re-enter Password"
          v-model="confirmPassword"
        />
      </div>

      <label>Membership</label>
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ selectedUser.membershipTxt }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li
            v-for="(item, index) in memberships"
            :key="index"
            @click="onMembershipItemClick(index)"
          >
            <a class="dropdown-item">{{ item }}</a>
          </li>
        </ul>
      </div>

      <div id="createButtonGroup">
        <button class="btn btn-primary" @click="onCreateClick">Submit</button>
      </div>
    </div>

    <div id="editMode" v-show="viewMode === 'edit'">
      <div class="header">
        <button
          type="button"
          class="btn-close btn-close-white"
          @click="onBackButtonClick"
        ></button>
        <h2>Editing user #{{ selectedUser.userId }}</h2>
      </div>

      <div class="form-group">
        <label>User Name</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter User Name"
          v-model="selectedUser.userName"
        />
      </div>

      <div class="form-group">
        <label>Email</label>
        <input
          type="email"
          class="form-control"
          placeholder="Enter Email"
          v-model="selectedUser.email"
        />
      </div>

      <label>Membership</label>
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ selectedUser.membershipTxt }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li
            v-for="(item, index) in memberships"
            :key="index"
            @click="onMembershipItemClick(index)"
          >
            <a class="dropdown-item">{{ item }}</a>
          </li>
        </ul>
      </div>

      <div id="editButtonGroup">
        <button class="btn btn-primary" @click="onUpdateClick">Submit</button>
        <button class="btn btn-danger" @click="onDeleteClick">Delete</button>
      </div>
    </div>

    <div id="passwordMode" v-show="viewMode === 'password'">
      <div class="header">
        <button
          type="button"
          class="btn-close btn-close-white"
          @click="onBackButtonClick"
        ></button>
        <h2>Change password: user #{{ selectedUser.userId }}</h2>
      </div>

      <div>
        <label>User Name:</label>
        <label>{{ selectedUser.userName }}</label>
      </div>
      <div>
        <label>Email:</label>
        <label>{{ selectedUser.email }}</label>
      </div>
      <div>
        <label>Memebership:</label>
        <label>{{ selectedUser.membershipTxt }}</label>
      </div>

      <div class="form-group">
        <label>Old Password</label>
        <input
          type="password"
          class="form-control"
          placeholder="Enter old Password"
          v-model="oldPassword"
        />
      </div>

      <div class="form-group">
        <label>New Password</label>
        <input
          type="password"
          class="form-control"
          placeholder="Enter new Password"
          v-model="newPassword"
        />
      </div>

      <div class="form-group">
        <label>Confirm Password</label>
        <input
          type="password"
          class="form-control"
          placeholder="Re-enter Password"
          v-model="confirmPassword"
        />
      </div>

      <div id="passwordButtonGroup">
        <button class="btn btn-primary" @click="onPasswordConfirmClick">Submit</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./user.ts"/>
<style lang="scss" src="./user.scss"/> 
