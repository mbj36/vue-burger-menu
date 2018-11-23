<template>
    <div>
        <div class="bm-menu" :class="{ right: right, open: isSideBarOpen }" :style="{ width: currentWidth + 'px'}">
            
            <slot></slot>
            
            <span class="bm-cross-button cross-style" @click="closeMenu" v-if="this.crossIcon">
                <span v-for="(x, index) in 2" :key="x" class="bm-cross" :style="{ position: 'absolute', width: '3px', height: '14px',transform: index === 1 ? 'rotate(45deg)' : 'rotate(-45deg)'}">
                </span>
            </span>
        </div>

        <div class="bm-burger-button" :class="{ right: right }" @click="openMenu" v-if="this.burgerIcon">
            <span class="bm-burger-bars line-style" :style="{top:20 * (index * 2) + '%'}" v-for="(x, index) in 3" :key="index"></span>
        </div>

        <transition name="fade">
            <div class="bm-overlay" @click="closeMenu" v-if="isSideBarOpen && !this.noOverlay"></div>
        </transition>

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
        openMenu() {
          this.$emit('openMenu');
          this.isSideBarOpen = true;
        },

        closeMenu() {
          this.$emit('closeMenu');
          this.isSideBarOpen = false;
        },

        closeMenuOnEsc(e) {
          e = e || window.event;
          if (e.key === 'Escape' || e.keyCode === 27) {
            this.isSideBarOpen = false;
          }
        }
      },
      computed: {
        currentWidth: function() {
          return this.isSideBarOpen ? this.width : 0;
        }
      },
      mounted() {
        if (!this.disableEsc) {
          document.addEventListener('keyup', this.closeMenuOnEsc);
        }
      },
      destroyed: function() {
        document.removeEventListener('keyup', this.closeMenuOnEsc);
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
        }
      }
    };
</script>

<style scoped>
    .bm-burger-button {
      position: absolute;
      width: 36px;
      height: 30px;
      left: 36px;
      top: 36px;
      cursor: pointer;
    }
    .bm-burger-button.right {
      right:36px;
      left:auto;
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
      height: 100%;
      width: 0;
      position: fixed;
      z-index: 1000;
      top: 0;
      left: 0;
      background-color: #3f3f41;
      overflow-x: hidden;
      padding-top: 60px;
      transition: 0.5s;
    }
    .bm-menu.right {
      left:auto;
      right:0px;
    }
    .bm-overlay {
      position: fixed;
      z-index:999;
      top:0;
      bottom:0;
      right:0;
      left:0;
      background: rgba(0, 0, 0, 0.3);
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .25s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
</style>
