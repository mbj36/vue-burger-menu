<template>
    <div>
        <div id="sideNav" class="sidebar">
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
            <img class="closebtn" @click="closeButton" src="../assets/delete.svg" />
        </div>
        <div>
            <span @click="openMenu">
                <img src="../assets/ham.svg" />
            </span>
        </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          isSideBarOpen: false
        };
      },
      methods: {
        openMenu() {
          this.isSideBarOpen = true;
          document.getElementById('sideNav').style.width = '250px';
          document.body.style.backgroundColor = 'rgba(0,0,0,0.4)';
        },
        closeButton() {
          this.isSideBarOpen = false;
          document.getElementById('sideNav').style.width = '0px';
          document.body.style.backgroundColor = 'inherit';
        }
      }
    };
</script>

<style>
    img:hover {
      opacity: 0.7;
    }
    .sidebar {
      height: 100%; /* 100% Full-height */
      width: 0; /* 0 width - change this with JavaScript */
      position: fixed; /* Stay in place */
      z-index: 1; /* Stay on top */
      top: 0;
      left: 0;
      background-color: rgb(40, 23, 88); /* Black*/
      overflow-x: hidden; /* Disable horizontal scroll */
      padding-top: 60px; /* Place content 60px from the top */
      transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
    }
    .sidebar .closebtn {
      position: absolute;
      top: 0;
      right: 25px;
      font-size: 36px;
      margin-left: 50px;
    }
    .sidebar a {
      padding: 8px 8px 8px 32px;
      text-decoration: none;
      font-size: 25px;
      color: #818181;
      display: block;
      transition: 0.3s;
    }
</style>

