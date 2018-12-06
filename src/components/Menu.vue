<template>
    <div>
        <div id="sideNav" class="bm-menu">
            <nav class="bm-item-list">
                <slot></slot>
            </nav>
            <span class="bm-cross-button cross-style" :class="{ hidden: !crossIcon }">
                <span class="bm-cross" :style="{ position: 'absolute', width: '3px', height: '14px',transform: 'rotate(-45deg)'}"></span>
                <span class="bm-cross" :style="{ position: 'absolute', width: '3px', height: '14px',transform: 'rotate(45deg)'}"></span>
            </span>
        </div>

        <div class="bm-burger-button" :class="{ hidden: !burgerIcon }">
            <span class="bm-burger-bars line-style" :style="{top:'0%'}"></span>
            <span class="bm-burger-bars line-style" :style="{top:'40%'}"></span>
            <span class="bm-burger-bars line-style" :style="{top:'80%'}"></span>
        </div>

    </div>
</template>

<script>
    export default {
      name: 'menubar',
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
          required: false,
          default: '300'
        },
        disableEsc: {
          type: Boolean,
          required: false
        },
        noOverlay: {
          type: Boolean,
          required: false
        },
        onStateChange: {
          type: Function,
          required: false
        },
        burgerIcon: {
          type: Boolean,
          required: false,
          default: true
        },
        crossIcon: {
          type: Boolean,
          required: false,
          default: true
        }
      },
      methods: {
        openMenu(e) {
          if (e){
            e.stopPropagation();
            e.preventDefault();
          }

          if (this.isSideBarOpen){
            return false;
          }

          this.$emit('openMenu');
          this.isSideBarOpen = true;

          if (!this.noOverlay) {
            document.body.className += 'bm-overlay';
          }
          if (this.right) {
            const burgerMenu = document.querySelector('.bm-menu');
            burgerMenu.style.left = 'auto';
            burgerMenu.style.right = '0px';
          }
          this.$nextTick(function() {
            document.getElementById('sideNav').style.width = this.width
              ? this.width + 'px'
              : '300px';
          });
          return false;
        },

        closeMenu(e) {
          if (e){
            e.stopPropagation();
            e.preventDefault();
          }
          if (!this.isSideBarOpen){
            return false;
          }

          this.$emit('closeMenu');
          this.isSideBarOpen = false;
          document.body.className = document.body.className.replace(
            'bm-overlay',
            ''
          );
          document.getElementById('sideNav').style.width = '0px';
          return false;
        },

        closeMenuOnEsc(e) {
          e = e || window.event;
          if (e.key === 'Escape' || e.keyCode === 27) {
            document.getElementById('sideNav').style.width = '0px';
            document.body.style.backgroundColor = 'inherit';
            this.isSideBarOpen = false;
          }
        },
        documentClick(e) {
          const element = this.getBurgerButton();
          let target = e.target;
          if (
            element !== target &&
            !element.contains(target) &&
            e.target.className !== 'bm-menu' &&
            this.isSideBarOpen
          ) {
            this.closeMenu();
          }
        },
        getBurgerButton(){
          return document.querySelector('.bm-burger-button');
        },
        getCloseButton(){
          return document.querySelector('.bm-cross-button');
        }
      },
      mounted() {
        if (!this.disableEsc) {
          document.addEventListener('keyup', this.closeMenuOnEsc);
        }

        const burgerButton = this.getBurgerButton();
        const closeButton = this.getCloseButton();
        burgerButton.addEventListener('touchstart', this.openMenu);
        burgerButton.addEventListener('click', this.openMenu);
        closeButton.addEventListener('click', this.closeMenu);
        closeButton.addEventListener('touchstart', this.closeMenu);

      },
      created: function() {
        document.addEventListener('click', this.documentClick);
      },
      destroyed: function() {
        document.removeEventListener('keyup', this.closeMenuOnEsc);
        document.removeEventListener('click', this.documentClick);
        const burgerButton = this.getBurgerButton();
        const closeButton = this.getCloseButton();
        burgerButton.removeEventListener('touchstart', this.openMenu);
        burgerButton.removeEventListener('click', this.openMenu);
        closeButton.removeEventListener('click', this.closeMenu);
        closeButton.removeEventListener('touchstart', this.closeMenu);
      },
      watch: {
        isOpen: {
          deep: true,
          immediate: true,
          handler(newValue, oldValue) {
            if (!oldValue && newValue) {
              this.openMenu()
            }
            if (oldValue && !newValue) {
              this.closeMenu()
            }
          }
        },
        right: {
          deep: true,
          immediate: true,
          handler(oldValue, newValue) {
            if (oldValue) {
              this.$nextTick(() => {
                const burgerButton = this.getBurgerButton();
                const burgerMenu = document.querySelector('.bm-menu');
                burgerButton.style.left = 'auto';
                burgerButton.style.right = '36px';
                burgerMenu.style.left = 'auto';
                burgerMenu.style.right = '0px';
              });
            }
            if (newValue) {
              if (
                this.getBurgerButton().hasAttribute('style')
              ) {
                this.getBurgerButton().removeAttribute('style');
                document.getElementById('sideNav').style.right = 'auto';
              }
            }
          }
        }
      }
    };
</script>

<style>
    html {
      height: 100%;
    }
    .bm-burger-button {
      position: absolute;
      width: 36px;
      height: 30px;
      left: 36px;
      top: 36px;
      cursor: pointer;
    }
    .bm-burger-button.hidden {
      display: none;
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
    .bm-cross-button.hidden {
      display: none;
    }
    .bm-menu {
      height: 100%; /* 100% Full-height */
      width: 0; /* 0 width - change this with JavaScript */
      position: fixed; /* Stay in place */
      z-index: 1000; /* Stay on top */
      top: 0;
      left: 0;
      background-color: rgb(63, 63, 65); /* Black*/
      overflow-x: hidden; /* Disable horizontal scroll */
      padding-top: 60px; /* Place content 60px from the top */
      transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
    }

    .bm-overlay {
      background: rgba(0, 0, 0, 0.3);
    }
    .bm-item-list {
      color: #b8b7ad;
      margin-left: 10%;
      font-size: 20px;
    }
    .bm-item-list > * {
      display: flex;
      text-decoration: none;
      padding: 0.7em;
    }
    .bm-item-list > * > span {
      margin-left: 10px;
      font-weight: 700;
      color: white;
    }
</style>

