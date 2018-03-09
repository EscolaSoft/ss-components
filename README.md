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

## API Documentation

[Documentation](docs/Components.md)

## Website 

[SS Components github pages](https://qunabucom.github.io/ss-components/)