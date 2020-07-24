<template>
    <div>
        <Menu ref="sideNav" v-bind="this.$attrs" @open-menu="openMenu" @close-menu="closeMenu">
            <slot></slot>
        </Menu>
    </div>
</template>

<script>
    import Menu from '../Menu';
    export default {
      name: 'bubble',
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
              //this.$emit("open-menu")
              let set= this.$refs.sideNav.$el.querySelector('.bm-menu');
              //console.log(set,"lallan")
              set.style.borderRadius='150% / 70%';
              if(this.$attrs.right){
              set.style.borderTopRightRadius = '0px 900px';
              set.style.borderBottomRightRadius='0px';
              }
              else{
                set.style.borderTopLeftRadius = '0px 900px';
              set.style.borderBottomLeftRadius='0px';
              }
              set.style.transitionTimingFunction='easy-in';
              this.$emit("open-menu");

              setTimeout(function(){
                  set.style.transitionTimingFunction='cubic-bezier(.29, 1.01, 1, -0.68)';
                  set.style.borderRadius='0px'

                  }, 300);
          },
          closeMenu () {
              //this.$emit("close-menu")
            let set= this.$refs.sideNav.$el.querySelector('.bm-menu');
            set.style.transitionTimingFunction=null;
            this.$emit("close-menu")
          }
      }
    };
</script>
