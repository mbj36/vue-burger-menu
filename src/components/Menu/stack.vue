<template>
    <div>
        <Menu v-bind="propsToPass" openMenu="openMenu" @closeMenu="closeMenu">
            <slot></slot>
        </Menu>
    </div>
</template>

<script>
    import Menu from '../Menu';
    export default {
      name: 'stack',
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
          },
          closeMenu () {
              this.$emit("closeMenu")
          }
      }
    };
</script>



