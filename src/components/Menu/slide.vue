<template>
    <div>
        <Menu v-bind="this.$attrs">
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
      }
    };
</script>


