# ss-components
Straight forward JavaScript component. Designed to work with SilverStripe but can be used anywhere

## to install 

`npm i ss-components -s`

## Example 

```javascript
import Components from "ss-components";

// standard components
import SideMenu from "./js/components/SideMenu.js";
import Title from "./js/components/Title.js";

// diagram components types 
import BarDiagram from './js/components/BarDiagram.js';

// register components
Components.register('side-menu', SideMenu);
Components.register('tooltip', Tooltip);

// register diagrams
Components.register('BarDiagram', BarDiagram);

//attaching all components
Components.attach();
```

this would be called for HTML nodes 

```html
<div id="diagram1" data-component="BarDiagram" data-json="1.json">...</div>
<nav id="sidemenu" data-component="side-menu">...</nav>
<nav id="tooltip"  data-component="tooltip">...</nav>
```

## Another example. Banner

```html
<!-- index.html -->
<div id="banner" data-component="Banner" data-sample="hello">
    <nav>
        <button class="left"></button> 
        <button class="right"></button> 
    </nav>
    <ul class="slides">
        <li class="slide">...</li>
        <li class="slide">...</li>
        <li class="slide">...</li>
    </ul>
</div>

<button data-component="BannerButton" data-index="1">First slide</button>
<button data-component="BannerButton" data-index="2">Second slide</button>
<button data-component="BannerButton" data-index="3">Third slide</button>

```

```javascript

// Banner.js

class Banner {

    constructor(el, data) {
      
        this.el = el;
        this.data = data;
        this._currentIndex = 0;
        this._length = this.querySelectorAll('.slide').length;

        this._interval = 0;

        this.initListeners();
     
    }

    destory() {
        
        this.querySelector('button.left').removeEventListner('click', this._onLeftButtonClick);
        this.querySelector('button.right').removeEventListner('click', this._onRightButtonClick);

        clearInterval(this._interval);

    }

    initListeners() {

        this._onLeftButtonClick = this.onLeftClick.bind(this);
        this._onRightButtonClick = this.onRightClick.bind(this);
        
        this.querySelector('button.left').addEventListner('click', this._onLeftButtonClick);
        this.querySelector('button.right').addEventListner('click', this._onRightButtonClick);

        this._interval = setInterval(this.nextSlide.bind(this), 10000);

    }
    
    get index() {
      return this._currentIndex;
    }

    set index(i) {
      this.showSlide(i);
    }
   
    onLeftClick (e=null) {

      this.showSlide(this._currentIndex == this._length - 1 ? 0 : this._currentIndex + 1);

    }

    onRightClick (e=null) {

      this.showSlide(this._currentIndex == 0 ? this._length - 1: this._currentIndex - 1);

    }
    nextSlide () {

      this.onRightClick();

      this._interval = setInterval(this.nextSlide.bind(this), 10000);

    }
    showSlide(i) {

      i = typeof i == 'number' ? i : this._currentIndex;
      if (i > this._length - 1 || i < 0) {
        throw new Error('index out of range');
      }

      //...
    }
  }

  Components.register('Banner', Banner);

```

```javascript
// BannerButton.js 

import Components from 'ss-components';

class BannerButton {

    constructor(el, data) {
        this.el = el;
        this.data = data;

        this.initListeners();
    }

    destory() {
        
        this.el.removeEventListner('click', this._onClick);

    }

    initListeners() {

        this._onClick = this.onClick.bind(this);
        
        this.el.addEventListner('click', this._onClick);

    }

    onClick(e) {

        let banner = Components.getById('banner');
        /**
         * Other options that would return banner instance
         * let banner = Components.getByEl(document.getElementById('banner'));
         * let banner = Components.getByType('Banner')[0];
         * let banner = Components.getByName('banner')[0];
         */
        if (banner) {
            banner.showSlide(this.data.index);// from html data- 
        }


    }
}

Components.register('BannerButton', BannerButton);
```

## Destroying components 

See examples above, once you have removed component from the DOM you can all `Components.dettachFromDOM();` 

## API Documentation

[Documentation](docs/Components.md)

## Website 

[SS Components github pages](https://qunabucom.github.io/ss-components/)