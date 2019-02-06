<template>
    <div>
        <Menu ref="sideNav" v-bind="this.$attrs" @openMenu="openMenu" @closeMenu="closeMenu">
            <slot></slot>
        </Menu>
    </div>
</template>

<script>
    import Menu from '../Menu';
    export default {
      name: 'elastic',
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
      methods : {
          openMenu () {
            this.$emit("openMenu")
            let width = this.$attrs.width ? this.$attrs.width + 'px' : '300px';
            this.$refs.sideNav.$el.querySelector('.bm-menu').style.overflowY = 'hidden';
            document.body.style.overflowX = 'hidden';
            this.$refs.sideNav.$el.querySelector('.bm-menu').style.transition='0.5s';

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

            this.$nextTick(() => {
              this.$refs.sideNav.$el.querySelector('.bm-menu').style.height='100%';
              });

          },
          closeMenu () {
            this.$emit("closeMenu")
            document.querySelector('#page-wrap').style.transition =
            'all 0.5s ease 0s';
            document.querySelector('#page-wrap').style.transform = '';
            document.body.removeAttribute('style');
            this.$refs.sideNav.$el.querySelector('.bm-menu').style.height='0px';

          }
      },
      mounted () {
        this.$refs.sideNav.$el.querySelector('.bm-menu').style.height='0px';
      }
    };
</script>
