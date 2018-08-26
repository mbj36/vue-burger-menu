<template>
    <div>
        <Menu>
            <slot></slot>
        </Menu>
    </div>
</template>

<script>
    import Menu from '../Menu';
    export default {
      components: {
        Menu: Menu
      }
    };
</script>
