<template>
    <div>
        <Menu v-bind="propsToPass">
            <slot></slot>
        </Menu>
    </div>
</template>

<script>
    import Menu from '../Menu';
    export default {
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
            noOverlay: this.$attrs.noOverlay
          }
        };
      }
    };
</script>
