<template>
    <div id="app">
        <component :is="currentMenu" :right="side === 'right' ? true: false">
            <a href="#">
                <i class="fa fa-fw fa-star-o"></i>
                <span>Favourites</span>
            </a>
            <a href="#">
                <i class="fa fa-fw fa-bell-o"></i>
                <span>Alerts</span>
            </a>
            <a href="#">
                <i class="fa fa-fw fa-envelope-o"></i>
                <span>Messages</span>
            </a>
            <a href="#">
                <i class="fa fa-fw fa-comment-o"></i>
                <span>Comments</span>
            </a>
            <a href="#">
                <i class="fa fa-fw fa-bar-chart-o"></i>
                <span>Analytics</span>
            </a>
            <a href="#">
                <i class="fa fa-fw fa-newspaper-o"></i>
                <span>Reading</span>
            </a>
        </component>
        <main id="page-wrap">
            <img src="https://img.shields.io/npm/dt/vue-burger-menu.svg" /> &emsp;
            <img src="https://img.shields.io/github/stars/mbj36/vue-burger-menu.svg" />
            <h1>
                <a href="https://github.com/mbj36/vue-burger-menu">vue-burger-menu</a> <br/>
            </h1>
            <a :class="{ sideButton: true, left: true, active: this.side === 'left' }" @click="changeSide('left')">Left</a>
            <a :class="{sideButton: true, right: true, active: this.side === 'right' }" @click="changeSide('right')">Right</a>

            <h2 class="description">An off-canvas sidebar vue component with a collection of effects and styles using CSS transitions and SVG path animations.</h2>

            <nav class="demo-buttons">
                <span v-for="(menu, index) in menus" :key="index">
                    <span>
                        <a :class="currentMenu === menu.buttonText.replace(/ +/g, '').toLowerCase() ? {currentDemo:true}: {currentDemo:false}" @click="changeMenu(menu.buttonText)">
                            {{menu.buttonText}}
                        </a>
                    </span>
                </span>
            </nav>
            Inspired by
            <a href="https://github.com/codrops/OffCanvasMenuEffects">Off-Canvas Menu Effects</a> and
            <a href="https://github.com/codrops/SidebarTransitions">Sidebar Transitions</a> by Codrops
        </main>
    </div>
</template>

<script>
    import slide from './components/Menu/slide';
    import bubble from './components/Menu/bubble';
    import elastic from './components/Menu/elastic';
    import falldown from './components/Menu/fallDown';
    import push from './components/Menu/push';
    import pushrotate from './components/Menu/pushRotate';
    import reveal from './components/Menu/reveal';
    import scaledown from './components/Menu/scaleDown';
    import scalerotate from './components/Menu/scaleRotate';
    import stack from './components/Menu/stack';
    import Menu from './components/Menu';

    export default {
      data() {
        return {
          menus: {
            slide: { buttonText: 'Slide' },
            push: { buttonText: 'Push' },
            pushRotate: { buttonText: 'Push Rotate' },
            reveal: { buttonText: 'Reveal' },
            scaleDown: { buttonText: 'Scale Down' },
            scaleRotate: { buttonText: 'Scale Rotate' },
            // elastic: { buttonText: 'Elastic - (WIP)' },
            // stack: { buttonText: 'Stack - (WIP)' },
            bubble: { buttonText: 'Bubble' },
            fallDown: { buttonText: 'Fall Down' }
          },
          side: 'left',
          currentMenu: 'slide'
        };
      },
      components: {
        slide,
        bubble,
        elastic,
        push,
        pushrotate,
        scaledown,
        scalerotate,
        reveal,
        stack,
        falldown,
        Menu
      },
      methods: {
        changeMenu(menu) {
          this.currentMenu = menu.replace(/ +/g, '').toLowerCase();
          return this.currentMenu;
        },
        changeSide(side) {
          this.side = side;
        }
      }
    };
</script>

 <style lang="less">
    *,
    *:after,
    *:before {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }

    html {
      height: 100%;
    }

    body {
      height: 100%;
      color: #fffce1;
      font-family: 'Raleway', Arial, sans-serif;
      margin: 0px;
    }

    #app {
      height: 100%;
    }

    a {
      color: #4e4a46;
      text-decoration: none;

      &:hover,
      &:focus {
        color: #c94e50;
      }
    }

    main {
      height: 100%;
      padding: 3em 2em;
      text-align: center;
      background: #b4bad2;
      overflow: auto;
    }

    h1 {
      font-weight: 800;
      font-size: 3.75em;
    }

    .description {
      max-width: 20em;
      margin: 1.2em auto 1em;
      line-height: 1.3em;
      font-weight: 400;
    }

    .demo-buttons {
      font-size: 1em;
      max-width: 1200px;
      margin: 2em auto 3em;
      padding: 0 10em;

      a {
        display: inline-block;
        margin: 0.75em;
        padding: 1.35em 1.1em;
        width: 15em;
        background: #fffce1;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: 800;
        border-top-left-radius: 20px 50px;
        border-top-right-radius: 20px 50px;
        border-bottom-right-radius: 20px 50px;
        border-bottom-left-radius: 20px 50px;
        cursor: pointer;

        &.currentDemo {
          background: #c94e50;
          color: #fffce1;
        }
      }
    }

    .sideButton {
      display: inline-block;
      width: 5em;
      height: 2.5em;
      line-height: 2.5em;
      cursor: pointer;
      background: #fffce1;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 0.8em;
      font-weight: 800;

      &.left {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }

      &.right {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }

      &.active {
        background: #c94e50;
        color: #fffce1;
      }
    }

    @media screen and (max-width: 40em) {
      main {
        font-size: 80%;
      }

      h1 {
        padding-top: 1em;
        font-size: 2.5em;
      }

      .demo-buttons {
        max-width: 900px;
        padding: 0 2em;
      }
    }

    //
    // Burger menu custom styles
    //
    .bm-burger-button {
      position: absolute;
      width: 36px;
      height: 30px;
      left: 36px;
      top: 36px;
    }

    .right .bm-burger-button {
      left: initial;
      right: 36px;
    }

    .bm-burger-bars {
      background: #373a47;
    }

    .bm-morph-shape {
      fill: #373a47;
    }

    .bm-menu {
      background: #373a47;

      a {
        color: #b8b7ad;

        &:hover,
        &:focus {
          color: #c94e50;
        }
      }
    }

    //
    // Mixins
    //
    .menu-1 {
      .bm-cross {
        background: #bdc3c7;
      }

      .bm-menu {
        padding: 2.5em 1.5em 0;
        font-size: 1.15em;
      }
    }

    .menu-2 {
      .bm-cross {
        background: #999;
      }

      .bm-menu {
        padding: 3.4em 1em 0;
      }

      a {
        padding: 1em;
      }

      i {
        font-size: 1.7em;
        vertical-align: middle;
        color: #282a35;
      }
    }

    .menu-3 {
      .bm-cross {
        background: #888;
      }

      .bm-menu {
        padding: 2em 1em;
        font-size: 1.15em;
      }

      i {
        opacity: 0.5;
      }

      span {
        text-transform: uppercase;
        letter-spacing: 1px;
        font-size: 0.75em;
      }
    }

    .menu-4 {
      .bm-cross {
        background: #888;
      }

      h2 {
        margin: 0 auto;
        padding: 2em 1em;
        color: rgba(0, 0, 0, 0.4);
        box-shadow: inset 0 -1px rgba(0, 0, 0, 0.2);

        i {
          margin-left: 0.2em;
        }

        span {
          font-size: 1.6em;
          font-weight: 700;
        }
      }

      a {
        padding: 1em;
        text-transform: uppercase;
        transition: background 0.3s, box-shadow 0.3s;
        box-shadow: inset 0 -1px rgba(0, 0, 0, 0.2);

        span {
          letter-spacing: 1px;
          font-weight: 400;
        }

        &:hover,
        &:focus {
          background: rgba(0, 0, 0, 0.2);
          box-shadow: inset 0 -1px rgba(0, 0, 0, 0);
          color: #b8b7ad;
        }
      }
    }
</style>
