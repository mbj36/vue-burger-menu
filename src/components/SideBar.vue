<template>
    <div>
        <div id="sideNav" class="sidebar">
            <slot></slot>
        </div>

        <div class="bm-burger-button" @click="openMenu">
            <span class="bm-burger-bars line-style" :style="{top:20 * (index * 2) + '%'}" v-for="(x, index) in 3" :key="index"></span>
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
        },
        noOverlay: {
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
          if (!this.noOverlay) {
            document.body.style.backgroundColor = 'rgba(0,0,0,0.1)';
          }
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
    .bm-burger-button {
      position: fixed;
      width: 36px;
      height: 30px;
      left: 36px;
      top: 36px;
    }
    .bm-burger-bars {
      background-color: #373a47;
    }
    .line-style {
      position: absolute;
      height: 20%;
      left: 0;
      right: 0;
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
      transition: 0.4s; /* 0.5 second transition effect to slide in the sidenav */
    }
    .sidebar .closebtn {
      position: absolute;
      top: 8px;
      right: 12px;
      font-size: 36px;
      margin-left: 50px;
      cursor: pointer;
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

