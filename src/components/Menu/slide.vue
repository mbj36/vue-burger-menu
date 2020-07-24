<template>
    <div>
        <Menu v-bind="this.$attrs" @open-menu="openMenu" @close-menu="closeMenu">
            <slot></slot>
        </Menu>
    </div>
</template>

<script>
    import Menu from '../Menu';
    export default {
      name: 'slide',
      components: {
        Menu: Menu
      },
      methods: {
        openMenu() {
          this.$emit('open-menu');
        },
        closeMenu() {
          this.$emit('close-menu');
        }
      }
    };
</script>


