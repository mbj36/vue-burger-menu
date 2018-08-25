<template>
    <div>
        <div id="sideNav" class="bm-menu">
            <slot></slot>
            <span class="bm-cross-button cross-style" @click="closeButton">
                <span v-for="(x, index) in 2" :key="x" class="bm-cross" :style="{ position: 'absolute', width: '3px', height: '14px',transform: index === 1 ? 'rotate(45deg)' : 'rotate(-45deg)'}">
                </span>
            </span>
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
            document.body.className += 'bm-overlay';
          }
          if (this.right) {
            document.querySelector('.bm-menu').style.left = 'auto';
            document.querySelector('.bm-menu').style.right = '0px';
          }
        },

        closeButton() {
          document.body.className = document.body.className.replace(
            'bm-overlay',
            ''
          );
          this.isSideBarOpen = false;
          document.getElementById('sideNav').style.width = '0px';
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
          document.querySelector('.bm-burger-button').style.left = 'auto';
          document.querySelector('.bm-burger-button').style.right = '36px';
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
    .cross-style {
      position: absolute;
      top: 12px;
      right: 2px;
      cursor: pointer;
    }
    .bm-cross {
      background: #bdc3c7;
    }
    .bm-cross-button {
      height: 24px;
      width: 24px;
    }
    .bm-menu {
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
    .bm-menu a {
      padding: 8px 8px 8px 40px;
      text-decoration: none;
      font-size: 20px;
      color: white;
      display: block;
      transition: 0.3s;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
    }
    .bm-overlay {
      background: rgba(0, 0, 0, 0.3);
    }
</style>

