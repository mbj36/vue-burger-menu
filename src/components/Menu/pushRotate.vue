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
      name: 'pushrotate',
      components: {
        Menu: Menu
      },
      data() {
        return {
          bodyOldStyle: '',
          appOldStyle: ''
        };
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
            ).style.transform = `translate3d(-${width}, 0px, 0px ) rotateY(15deg)`;
            document.querySelector('#page-wrap').style.transformOrigin =
              '100% 50% 0px';
          } else {
            document.querySelector(
              '#page-wrap'
            ).style.transform = `translate3d(${width}, 0px, 0px ) rotateY(-15deg)`;
            document.querySelector('#page-wrap').style.transformOrigin =
              '0% 50% 0px';
          }

          document.querySelector('#page-wrap').style.transformStyle = 'preserve-3d';

          document.querySelector('#page-wrap').style.transition =
            'all 0.5s ease 0s';
          this.appOldStyle = document.querySelector('#app').getAttribute('style') || '';

          document.querySelector('#app').style.perspective = '1500px';
          document.querySelector('#app').style.overflow = 'hidden';
        },
        pull() {
          this.closeMenu()
          document.querySelector('#page-wrap').style.transition =
            'all 0.5s ease 0s';
          document.querySelector('#page-wrap').style.transform = '';
          document.querySelector('#page-wrap').style.transformStyle = '';
          document.querySelector('#page-wrap').style.transformOrigin = '';

          document.querySelector('#app').setAttribute('style', this.appOldStyle);
          document.body.setAttribute('style', this.bodyOldStyle);
        }
      }
    };
</script>


