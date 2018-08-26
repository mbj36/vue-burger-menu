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
            isOpen: this.isOpen,
            right: this.right,
            width: this.width,
            disableEsc: this.disableEsc,
            noOverlay: this.noOverlay
          }
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
          required: false
        },
        disableEsc: {
          type: Boolean,
          required: false
        },
        noOverlay: {
          type: Boolean,
          required: false
        }
      }
    };
</script>
