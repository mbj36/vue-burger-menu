<template>
    <div>
        <Menu v-bind="this.$attrs" @openMenu="push" @closeMenu="pull">
            <slot></slot>
        </Menu>
    </div>
</template>

<script>
    import Menu from '../Menu';
    export default {
      name: 'push',
      data() {
        return {
          bodyOldStyle: ''
        };
      },
      components: {
        Menu: Menu
      },
      methods: {
        openMenu () {
            this.$emit("openMenu")
        },
        closeMenu () {
            this.$emit("closeMenu")
        },
        push() {
          this.openMenu()
          let width = this.$attrs.width ? this.$attrs.width + 'px' : '300px';

          this.bodyOldStyle = document.body.getAttribute('style') || '';
          document.body.style.overflowX = 'hidden';

          if (this.$attrs.right) {
            document.querySelector(
              '#page-wrap'
            ).style.transform = `translate3d(-${width}, 0px, 0px )`;
          } else {
            document.querySelector(
              '#page-wrap'
            ).style.transform = `translate3d(${width}, 0px, 0px )`;
          }

          document.querySelector('#page-wrap').style.transition =
            'all 0.5s ease 0s';
        },
        pull() {
          this.closeMenu()
          document.querySelector('#page-wrap').style.transition =
            'all 0.5s ease 0s';
          document.querySelector('#page-wrap').style.transform = '';
          document.body.setAttribute('style', this.bodyOldStyle);
        }
      }
    };
</script>


