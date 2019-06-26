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
      name: 'scalerotate',
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
          let width = this.$attrs.width ? this.$attrs.width + 'px' : '100px';

          this.bodyOldStyle = document.body.getAttribute('style') || '';
          document.body.style.overflowX = 'hidden';

          if (this.$attrs.right) {
            document.querySelector(
              '#page-wrap'
            ).style.transform = `translate3d(-${width}, 0px, -600px ) rotateY(20deg)`;
          } else {
            document.querySelector(
              '#page-wrap'
            ).style.transform = `translate3d(${width}, 0px, -600px ) rotateY(-20deg)`;
          }

          document.querySelector('#page-wrap').style.transformStyle = 'preserve-3d';

          document.querySelector('#page-wrap').style.transition =
            'all 0.5s ease 0s';

          document.querySelector('#page-wrap').style.overflow = 'hidden';
          this.appOldStyle = document.querySelector('#app').getAttribute('style') || '';

          document.querySelector('#app').style.perspective = '1500px';
          document.querySelector('#app').style.overflow = 'hidden';
          document.querySelector('#app').style.height = '100%';
        },
        pull() {
          this.closeMenu()
          document.querySelector('#page-wrap').style.transition =
            'all 0.5s ease 0s';
          document.querySelector('#page-wrap').style.transform = '';
          document.querySelector('#page-wrap').style.transformStyle = '';
          document.querySelector('#page-wrap').style.transformOrigin = '';
          document.querySelector('#page-wrap').style.overflow = 'auto';

          document.querySelector('#app').setAttribute('style', this.appOldStyle);
          document.body.setAttribute('style', this.bodyOldStyle);
        }
      }
    };
</script>


