<a name="Components"></a>

## Components
Straight forward JavaScript Components. Designed to work with SilverStripe but can be used anywhere 

Example
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

along with HTML code 

```html
<div id="diagram1" data-component="BarDiagram" data-json="1.json">...</div>
<nav id="sidemenu" data-component="side-menu">...</nav>
<nav id="tooltip"  data-component="tooltip">...</nav>
```

**Kind**: global class  

* [Components](#Components)
    * _instance_
        * [.dettachFromDOM()](#Components+dettachFromDOM)
    * _static_
        * [.classNames](#Components.classNames)
        * [.components](#Components.components)
        * [.register(type, classObj)](#Components.register)
        * [.attach()](#Components.attach)
        * [.getById(id)](#Components.getById) ⇒ <code>object</code>
        * [.getByName(id)](#Components.getByName) ⇒ <code>array</code>
        * [.getByType(id)](#Components.getByType) ⇒ <code>array</code>
        * [.getByEl(el)](#Components.getByEl) ⇒ <code>object</code>

<a name="Components+dettachFromDOM"></a>

### components.dettachFromDOM()
Performs a test `window.document.contains(component.el)` and removes all references to 
components, so it would garbage collectored. 
If component has method `destory`, it will be called

**Kind**: instance method of [<code>Components</code>](#Components)  
<a name="Components.classNames"></a>

### Components.classNames
Returns all registered class names as object, key is name, value is class

**Kind**: static property of [<code>Components</code>](#Components)  
<a name="Components.components"></a>

### Components.components
Returns all attached components

**Kind**: static property of [<code>Components</code>](#Components)  
<a name="Components.register"></a>

### Components.register(type, classObj)
Attach name of component to class.

**Kind**: static method of [<code>Components</code>](#Components)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | name of component. |
| classObj | <code>class</code> | this is a value. |

**Example**  
```js
import Components from "ss-components";

class Banner {
  constructor(el, data) { 
    console.log(el, data);
  }
}

Components.register('banner', Banner);
Components.attach();

//now each <div data-component="banner" data-index="1">...</div>
//will be attached, and console.log woudl return <div> and object { data:"banner", index:1 }
```
<a name="Components.attach"></a>

### Components.attach()
attaches all registred components and creates new classes, attached components will be omited

**Kind**: static method of [<code>Components</code>](#Components)  
<a name="Components.getById"></a>

### Components.getById(id) ⇒ <code>object</code>
Returns component by node id

**Kind**: static method of [<code>Components</code>](#Components)  
**Returns**: <code>object</code> - class instance  

| Param | Type |
| --- | --- |
| id | <code>string</code> | 

**Example**  
```js
import Components from "ss-components";

class Banner {
  constructor(el, data) { 
    console.log(el, data);
  }
}

Components.register('banner', Banner);
Components.attach();

//lets assume there is and `<div id="banner-1" data-component="banner">...</div>`

let banner1 = Components.getById('banner-1'); //returns an instance of banner 
```
<a name="Components.getByName"></a>

### Components.getByName(id) ⇒ <code>array</code>
Returns components list by class name

**Kind**: static method of [<code>Components</code>](#Components)  
**Returns**: <code>array</code> - all instances by class name  

| Param | Type |
| --- | --- |
| id | <code>string</code> | 

**Example**  
```js
import Components from "ss-components";

class Banner {
  constructor(el, data) { 
    console.log(el, data);
  }
}

Components.register('banner', Banner);
Components.attach();

//lets assume there are  
`<div id="banner-1" data-component="banner">...</div>`
`<div id="banner-2" data-component="banner">...</div>`
`<div id="banner-3" data-component="banner">...</div>`

let banners = Components.getByName('banner'); //returns an instances of `data-component="banner"`
```
<a name="Components.getByType"></a>

### Components.getByType(id) ⇒ <code>array</code>
Returns components list by class name

**Kind**: static method of [<code>Components</code>](#Components)  
**Returns**: <code>array</code> - all instances by type name  

| Param | Type |
| --- | --- |
| id | <code>string</code> | 

**Example**  
```js
import Components from "ss-components";

class Banner {
  constructor(el, data) { 
    console.log(el, data);
  }
}

Components.register('banner', Banner);
Components.attach();

//lets assume there are  
`<div id="banner-1" data-component="banner">...</div>`
`<div id="banner-2" data-component="banner">...</div>`
`<div id="banner-3" data-component="banner">...</div>`

let banners = Components.getById('Banners'); //returns an instances of `Banner` class
```
<a name="Components.getByEl"></a>

### Components.getByEl(el) ⇒ <code>object</code>
Returns component by node element

**Kind**: static method of [<code>Components</code>](#Components)  
**Returns**: <code>object</code> - class instance  

| Param | Type |
| --- | --- |
| el | <code>Element</code> | 

**Example**  
```js
import Components from "ss-components";

class Banner {
  constructor(el, data) { 
    console.log(el, data);
  }
}

Components.register('banner', Banner);
Components.attach();

//lets assume there is and `<div id="banner-1" data-component="banner">...</div>`

let node = document.getElementById('banner-1');
let banner1 = Components.getByEl(node); //returns an instance of banner 
```
