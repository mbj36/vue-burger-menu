# vue-burger-menu [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)


An off-canvas sidebar Vue component with a collection of effects and styles using CSS transitions and SVG path animations.

## Demo & examples

Live demo - https://vue-burger-menu.netlify.com/ (WIP)

To build the examples locally, run:

```
yarn 
yarn serve
```

Then open [`localhost:8000`](http://localhost:8000) in a browser

## Installation 

```
npm install vue-burger-menu --save
```

```
yarn add vue-burger-menu
```

## Usage

Items should be passed as child elements of the components

```javascript 
import Menu from 'vue-burger-menu'

export default {
    components: {
        Menu // Register your component
    }
}
```

In your template

```
<template>
    <Menu>
        <a href='#'>Home</a>
        <a href='#'>About</a>
        <a href='#'>Contact</a>
    </Menu>
</template>
```

### Position

The menu opens from left by default. To have it open from the right, use the `right` prop. It's just a boolean so you don't need to specify a value. 

```javascript
<Menu right/>
```

### Width 

You can specify the width of the menu with the `width` prop. The default is `300px`

```javascript
<Menu width="400">
```

### Open state

You can control whether the sidebar is open or closed with the `isOpen` prop. This is useful if you need to close the menu after a user clicks on an item in it, for example, or if you want to open the menu from some other button in addition to the standard burger icon. The default value is `false`

```javascript
// To render the menu open

<Menu isOpen>
```

### Close on Escape

By default, the menu will close when the Escape key is pressed. To disable this behavior, you can pass the `disableCloseOnEsc` prop. This is useful in cases where you want the menu to be open all the time, for example if you're implementing a responsive menu that behaves differently depending on the browser width.

``` javascript
<Menu disableEsc />
```

### Overlay

You can turn off the default overlay with `noOverlay`.

``` javascript
<Menu noOverlay />
```

## Author

&#169; [Mohit Bajoria](https://mbj36.xyz)

## License

[MIT](https://github.com/mbj36/vue-burger-menu/blob/master/LICENSE)

Like it ? <img src="https://assets-cdn.github.com/images/icons/emoji/unicode/2b50.png?v8" height="20px" /> it
