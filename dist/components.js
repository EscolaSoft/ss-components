'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** 
 * Straight forward JavaScript Components. Designed to work with SilverStripe but can be used anywhere 
 * 
 * Example
 * ```javascript
 * import Components from "ss-components";
 * 
 * // standard components
 * import SideMenu from "./js/components/SideMenu.js";
 * import Title from "./js/components/Title.js";
 * 
 * // diagram components types 
 * import BarDiagram from './js/components/BarDiagram.js';
 * 
 * // register components
 * Components.register('side-menu', SideMenu);
 * Components.register('tooltip', Tooltip);
 * 
 * // register diagrams
 * Components.register('BarDiagram', BarDiagram);
 * 
 * //attaching all components
 * Components.attach();
 * ```
 * 
 * along with HTML code 
 * 
 * ```html
 * <div id="diagram1" data-component="BarDiagram" data-json="1.json">...</div>
 * <nav id="sidemenu" data-component="side-menu">...</nav>
 * <nav id="tooltip"  data-component="tooltip">...</nav>
 * ```
 */
var Components = function () {
    function Components() {
        _classCallCheck(this, Components);
    }

    _createClass(Components, null, [{
        key: 'register',


        /**
         * Attach name of component to class. 
         * @example
         * import Components from "ss-components";
         * 
         * class Banner {
         *   constructor(el, data) { 
         *     console.log(el, data);
         *   }
         * }
         * 
         * Components.register('banner', Banner);
         * Components.attach();
         * 
         * //now each <div data-component="banner" data-index="1">...</div>
         * //will be attached, and console.log woudl return <div> and object { data:"banner", index:1 }
         * @param {string} type - name of component.
         * @param {class} classObj - this is a value.
         */

        value: function register(type, classObj) {
            this._classNames[type] = classObj;
        }

        /**
         *  attaches all registred components and creates new classes, attached components will be omited 
         */

    }, {
        key: 'attach',
        value: function attach() {
            var _this = this;

            var elementList = Array.prototype.slice.call(document.querySelectorAll('[data-component]'));

            elementList.forEach(function (element) {
                var data = element.dataset;

                if (data.attached) {
                    return;
                } else {
                    element.dataset.attached = true;
                }

                /** FIXME 
                 * potential memory leak 
                 * find a way to remove elements out of DOM
                 */
                if (_this._classNames[data.component]) {
                    var n = _this._components.length;
                    var _id = element.id;
                    var component = new _this._classNames[data.component](element, data);
                    component.id = _id;
                    component.__el = element;
                    _this._components[n] = component;
                    if (_id) {
                        _this._componentsIds[_id] = component;
                    }
                } else {
                    console.log(data.component + ' component is missing');
                }
            });
        }

        /**
         * Returns all registered class names as object, key is name, value is class
         */

    }, {
        key: 'getById',


        /**
         * Returns component by node id 
         * @param {string} id 
         * @return {object} class instance  
         * @example
         * import Components from "ss-components";
         * 
         * class Banner {
         *   constructor(el, data) { 
         *     console.log(el, data);
         *   }
         * }
         * 
         * Components.register('banner', Banner);
         * Components.attach();
         * 
         * //lets assume there is and `<div id="banner-1" data-component="banner">...</div>`
         * 
         * let banner1 = Components.getById('banner-1'); //returns an instance of banner 
         * 
         */
        value: function getById(id) {
            return this._componentsIds[id];
        }

        /**
        * Returns components list by class name 
        * @param {string} id 
        * @return {array} all instances by class name 
        * @example
        * import Components from "ss-components";
        * 
        * class Banner {
        *   constructor(el, data) { 
        *     console.log(el, data);
        *   }
        * }
        * 
        * Components.register('banner', Banner);
        * Components.attach();
        * 
        * //lets assume there are  
        * `<div id="banner-1" data-component="banner">...</div>`
        * `<div id="banner-2" data-component="banner">...</div>`
        * `<div id="banner-3" data-component="banner">...</div>`
        * 
        * let banners = Components.getByName('banner'); //returns an instances of `data-component="banner"`
        * 
        */

    }, {
        key: 'getByName',
        value: function getByName(name) {

            var results = [];
            for (var key in this._components) {
                if (this._components[key].data.component === name) {
                    results.push(this._components[key]);
                }
            }
            return results;
        }

        /**
        * Returns components list by class name 
        * @param {string} id 
        * @return {array} all instances by type name 
        * @example
        * import Components from "ss-components";
        * 
        * class Banner {
        *   constructor(el, data) { 
        *     console.log(el, data);
        *   }
        * }
        * 
        * Components.register('banner', Banner);
        * Components.attach();
        * 
        * //lets assume there are  
        * `<div id="banner-1" data-component="banner">...</div>`
        * `<div id="banner-2" data-component="banner">...</div>`
        * `<div id="banner-3" data-component="banner">...</div>`
        * 
        * let banners = Components.getById('Banners'); //returns an instances of `Banner` class
        * 
        */

    }, {
        key: 'getByType',
        value: function getByType(type) {

            var results = [];
            for (var key in this._components) {
                if (this._components[key].constructor.name === type) {
                    results.push(this._components[key]);
                }
            }
            return results;
        }

        /**
         * Returns component by node element
         * @param {Element} el 
         * @return {object} class instance 
         * @example
         * import Components from "ss-components";
         * 
         * class Banner {
         *   constructor(el, data) { 
         *     console.log(el, data);
         *   }
         * }
         * 
         * Components.register('banner', Banner);
         * Components.attach();
         * 
         * //lets assume there is and `<div id="banner-1" data-component="banner">...</div>`
         * 
         * let node = document.getElementById('banner-1');
         * let banner1 = Components.getByEl(node); //returns an instance of banner 
         * 
         */

    }, {
        key: 'getByEl',
        value: function getByEl(el) {
            for (var key in this._components) {
                if (this._components[key].__el == el) {
                    return this._components[key];
                }
            }
        }

        /**
         * Performs a test `window.document.contains(component.el)` and removes all references to 
         * components, so it would garbage collectored. 
         * If component has method `destory`, it will be called 
         */

    }, {
        key: 'dettachFromDOM',
        value: function dettachFromDOM() {
            var _this2 = this;

            this._components = this._components.filter(function (component) {

                var test = window.document.contains(component.el);

                if (!test) {
                    if ( /* component.hasOwnProperty('destroy') && */typeof component.destroy === 'function') {
                        component.destroy();
                    }
                    if (component.id) {
                        _this2._componentsIds[id] = null;
                        delete _this2._componentsIds[id];
                    }
                }

                return test;
            });
        }
    }, {
        key: 'classNames',
        get: function get() {
            return this._classNames;
        }

        /**
         * Returns all attached components
         */

    }, {
        key: 'components',
        get: function get() {
            return this._components;
        }
    }]);

    return Components;
}();

Components._components = [];
Components._componentsIds = {};
Components._classNames = {};

exports.default = Components;

module.exports = Components;

//# sourceMappingURL=components.js.map