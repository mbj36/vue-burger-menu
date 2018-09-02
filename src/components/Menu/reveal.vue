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
      name: 'reveal',
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
            : '300px';

          document.body.style.overflowX = 'hidden';

          if (this.propsToPass.right != undefined) {
            document.querySelector(
              '#page-wrap'
            ).style.transform = `translate3d(-${width}, 0px, 0px )`;
          } else {
            document.querySelector(
              '#page-wrap'
            ).style.transform = `translate3d(${width}, 0px, 0px )`;
          }

          document.querySelector('#page-wrap').style.position = 'relative';
          document.querySelector('#page-wrap').style.transition =
            'all 0.5s ease 0s';
        },
        pull() {
          document.querySelector('#page-wrap').style.transition =
            'all 0.5s ease 0s';
          document.querySelector('#page-wrap').style.transform = '';
          document.querySelector('#page-wrap').style.position = '';
          document.body.removeAttribute('style');
        }
      }
    };
</script>


