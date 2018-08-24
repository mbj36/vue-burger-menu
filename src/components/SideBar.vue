<template>
    <div>
        <div id="sideNav" class="sidebar">
            <slot></slot>
            <img class="closebtn" @click="closeButton" height="30px" src="../assets/delete.svg" />
        </div>
        <div>
            <span class="main" @click="openMenu">
                <img src="../assets/ham.svg" height="60px" />
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
      props: {
        isOpen: {
          type: Boolean,
          required: false
        },
        right: {
          type: Boolean,
          required: false
        },
        width: {
          type: [String],
          required: false
        },
        disableEsc: {
          type: Boolean,
          required: false
        }
      },
      methods: {
        openMenu() {
          this.isSideBarOpen = true;
          document.getElementById('sideNav').style.width = this.width
            ? this.width + 'px'
            : '250px';
          document.body.style.backgroundColor = 'rgba(0,0,0,0.1)';
          if (this.right) {
            document.querySelector('.sidebar').style.left = 'auto';
            document.querySelector('.sidebar').style.right = '0px';
          }
        },
        closeButton() {
          this.isSideBarOpen = false;
          document.getElementById('sideNav').style.width = '0px';
          document.body.style.backgroundColor = 'inherit';
        },
        closeMenuOnEsc(e) {
          e = e || window.event;
          if (e.key === 'Escape' || e.keyCode === 27) {
            document.getElementById('sideNav').style.width = '0px';
            document.body.style.backgroundColor = 'inherit';
            this.isSideBarOpen = false;
          }
        }
      },
      mounted() {
        if (this.isOpen) {
          this.openMenu();
        }
        if (this.right) {
          document.querySelector('.main').style.float = 'right';
        }
        if (!this.disableEsc) {
          document.addEventListener('keyup', this.closeMenuOnEsc);
        }
      },
      destroyed: function() {
        document.removeEventListener('keyup', this.closeMenuOnEsc);
      }
    };
</script>

<style>
    .main {
      padding: 16px;
      float: left;
    }
    img:hover {
      opacity: 0.7;
    }
    .sidebar {
      height: 100%; /* 100% Full-height */
      width: 0; /* 0 width - change this with JavaScript */
      position: fixed; /* Stay in place */
      z-index: 1000; /* Stay on top */
      top: 0;
      left: 0;
      background-color: rgb(26, 21, 43); /* Black*/
      overflow-x: hidden; /* Disable horizontal scroll */
      padding-top: 60px; /* Place content 60px from the top */
      transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
    }
    .sidebar .closebtn {
      position: absolute;
      top: 8px;
      right: 12px;
      font-size: 36px;
      margin-left: 50px;
    }
    .sidebar a {
      padding: 8px 8px 8px 40px;
      text-decoration: none;
      font-size: 20px;
      color: white;
      display: block;
      transition: 0.3s;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
    }
</style>

