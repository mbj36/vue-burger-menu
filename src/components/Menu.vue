<template>
    <div>
        <div ref="sideNav" class="bm-menu">
            <nav class="bm-item-list">
                <slot></slot>
            </nav>
            <span class="bm-cross-button cross-style" @click="closeMenu" :class="{ hidden: !crossIcon }">
                <span v-for="(x, index) in 2" :key="x" class="bm-cross" :style="{ position: 'absolute', width: '3px', height: '14px',transform: index === 1 ? 'rotate(45deg)' : 'rotate(-45deg)'}">
                </span>
            </span>
        </div>

        <div ref="bmBurgerButton" class="bm-burger-button" @click="openMenu" :class="{ hidden: !burgerIcon }">
            <span class="bm-burger-bars line-style" :style="{top:20 * (index * 2) + '%'}" v-for="(x, index) in 3" :key="index"></span>
        </div>

    </div>
</template>

<script>
    import { nextTick, onMounted, onUnmounted, ref, toRefs, watch  } from 'vue';
    export default {
      name: 'menubar',
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
        },
        disableOutsideClick: {
          type: Boolean,
          required: false,
          default: false
        },
        closeOnNavigation: {
          type: Boolean,
          required: false,
          default: false
        }
      },
      setup(props, { emit }) {
        const bmBurgerButton = ref(null);
        const isSideBarOpen = ref(false);
        const sideNav = ref(null);
        const { isOpen, right, width } = toRefs(props);

        const closeMenu = () => {
          emit('closeMenu');
          isSideBarOpen.value = false;
          document.body.classList.remove('bm-overlay');
          sideNav.value.style.width = '0px';
        };

        const closeMenuOnEsc = (e) => {
          e = e || window.event;
          if (e.key === 'Escape' || e.keyCode === 27) {
            closeMenu();
          }
        };

        const documentClick = (e) => {
          let element = bmBurgerButton;
          let target = null;
          if (e && e.target) {
            target = e.target;
          }
          if (
            element.value &&
            element.value !== target &&
            !element.value.contains(target) &&
            !hasClass(target,'bm-menu') &&
            isSideBarOpen.value &&
            !props.disableOutsideClick
          ) {
            closeMenu();
          } else if (
            element.value &&
            hasClass(target,'bm-menu') &&
            isSideBarOpen.value &&
            props.closeOnNavigation
          ) {
            closeMenu();
          }
        };

        const hasClass = (element, className) => {
          do {
            if (element.classList && element.classList.contains(className)) {
              return true;
            }
            element = element.parentNode;
          } while (element);
          return false;
        };

        const openMenu = () => {
          emit('openMenu');
          isSideBarOpen.value = true;
          if (!props.noOverlay) {
            document.body.classList.add('bm-overlay');
          }
          if (props.right) {
            sideNav.value.style.left = 'auto';
            sideNav.value.style.right = '0px';
          }
          nextTick(() => {
            sideNav.value.style.width = width.value
              ? width.value + 'px'
              : '300px';
          });
        };

        // Run created life cycle hook code
        document.addEventListener('click', documentClick);

        onMounted(() => {
          if (!props.disableEsc) {
            document.addEventListener('keyup', closeMenuOnEsc);
          }
        });

        onUnmounted(() => {
          if (!props.disableEsc) {
            document.removeEventListener('keyup', closeMenuOnEsc);
          }
          document.removeEventListener('click', documentClick);
        });

        watch(isOpen.value, (isOpen, prevIsOpen) => {
          nextTick(() => {
            if (!prevIsOpen && isOpen) {
              openMenu();
            }
            if (prevIsOpen && !isOpen) {
              closeMenu();
            }
          })
        }, {deep: true, immediate: true});

        watch(right.value, (right, prevRight) => {
          if (prevRight) {
            nextTick(() => {
              bmBurgerButton.value.style.left = 'auto';
              bmBurgerButton.value.style.right = '36px';
              sideNav.value.style.left = 'auto';
              sideNav.value.style.right = '0px';
              document.querySelector('.bm-burger-button').style.left = 'auto';
              document.querySelector('.bm-burger-button').style.right = '36px';
              document.querySelector('.bm-menu').style.left = 'auto';
              document.querySelector('.bm-menu').style.right = '0px';
              document.querySelector('.cross-style').style.right='250px';
            });
          }
          if (right) {
            if (
              bmBurgerButton.value && bmBurgerButton.value.hasAttribute('style')
            ) {
              bmBurgerButton.value.removeAttribute('style');
              sideNav.value.style.right = 'auto';
              document
                .querySelector('.bm-burger-button')
                .removeAttribute('style');
              document.getElementById('sideNav').style.right = 'auto';
              document.querySelector('.cross-style').style.right='0px';
            }
          }
        }, {deep: true, immediate: true});

        return {
          bmBurgerButton,
          closeMenu,
          closeMenuOnEsc,
          documentClick,
          hasClass,
          isSideBarOpen,
          openMenu,
          sideNav,
        };
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

