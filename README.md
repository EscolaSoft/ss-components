# ss-components
Straight forward JavaScript component. Designed to work with SilverStripe but can be used anywhere

## to install 

`npm i ss-components -s`

## Example 

```javascript
import Components from "ss-components";

//components
import SlidePage from "./js/components/SliderPage.js";
import SideMenu from "./js/components/SideMenu.js";
import SideMenuButton from "./js/components/SideMenuButton.js";
import SideMenuGroup from "./js/components/SideMenuGroup.js";
import Instructions from "./js/components/Instructions.js";
import Title from "./js/components/Title.js";
import Tooltip from "./js/components/Tooltip.js";

//Diagram types 
import BarDiagram from './js/components/BarDiagram.js';
import DonutDiagram from './js/components/DonutDiagram.js';
import GridDiagram from './js/components/GridDiagram.js';
import AlluvialDiagram from './js/components/AlluvialDiagram.js';
import DotDistributionChart from './js/components/DotDistributionChart.js';
import DotBarDistributionChart from './js/components/DotBarDistributionChart.js';
import RadialDiagram from './js/components/RadialDiagram.js';

//special types 
import TwoDiagrams from './js/components/TwoDiagrams.js';

//registering components
//const components = new Components();
Components.register('slider-page', SlidePage);
Components.register('side-menu', SideMenu);
Components.register('side-menu-button', SideMenuButton);
Components.register('side-menu-group', SideMenuGroup);
Components.register('instructions', Instructions);
Components.register('title', Title);
Components.register('tooltip', Tooltip);

//regsiter abstract diagrams
Components.register('BarDiagram', BarDiagram);
Components.register('DonutDiagram', DonutDiagram);
Components.register('GridDiagram', GridDiagram);
Components.register('AlluvialDiagram', AlluvialDiagram);
Components.register('DotDistributionChart', DotDistributionChart);
Components.register('DotBarDistributionChart', DotBarDistributionChart);
Components.register('RadialDiagram', RadialDiagram);

Components.register('TwoDiagrams', TwoDiagrams);

//attaching all components
Components.attach();
```

this would be called for HTML nodes 

```html
<div data-component="BarDiagram" data-json="1.json">...</div>
<nav id="sidemenu" data-component="side-menu">...</nav>
```