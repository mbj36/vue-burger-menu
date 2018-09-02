<template>
    <div>
        <Menu v-bind="propsToPass" @openMenu="push" @closeMenu="pull">
            <slot></slot>
        </Menu>
    </div>
</template>

<script>
    import Menu from '../Menu';
    export default {
      name: 'scaledown',
      components: {
        Menu: Menu
      },
      data() {
        return {
          propsToPass: {
            isOpen: this.$attrs.isOpen,
            right: this.$attrs.right,
            width: this.$attrs.width,
            disableEsc: this.$attrs.disableEsc,
            noOverlay: this.$attrs.noOverlay,
            onStateChange: this.$attrs.onStateChange
          }
        };
      },
      methods: {
        push() {
          let width = this.propsToPass.width
            ? this.propsToPass.width + 'px'
            : '100px';

          document.body.style.overflowX = 'hidden';

          if (this.propsToPass.right != undefined) {
            document.querySelector(
              '#page-wrap'
            ).style.transform = `translate3d(-${width}, 0px, -600px ) `;
          } else {
            document.querySelector(
              '#page-wrap'
            ).style.transform = `translate3d(${width}, 0px, -600px ) `;
          }

          document.querySelector('#page-wrap').style.transformStyle = 'preserve-3d';

          document.querySelector('#page-wrap').style.transition =
            'all 0.5s ease 0s';

          document.querySelector('#page-wrap').style.overflow = 'hidden';

          document.querySelector('#app').style.perspective = '1500px';
          document.querySelector('#app').style.overflow = 'hidden';
          document.querySelector('#app').style.height = '100%';
        },
        pull() {
          document.querySelector('#page-wrap').style.transition =
            'all 0.5s ease 0s';
          document.querySelector('#page-wrap').style.transform = '';
          document.querySelector('#page-wrap').style.transformStyle = '';
          document.querySelector('#page-wrap').style.transformOrigin = '';

          document.body.removeAttribute('style');
        }
      }
    };
</script>


