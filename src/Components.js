/** 
 * Straight forward JavaScript Components. Designed to work with SilverStripe but can be used anywhere 
 */
class Components {

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

    static register(type, classObj) {
        this._classNames[type] = classObj;
    }

    /**
     *  attaches all registred components and creates new classes, attached components will be omited 
     */
    static attach() {
        let elementList = Array.prototype.slice.call(document.querySelectorAll('[data-component]'));

        elementList.forEach(element => {
            let data = element.dataset;

            if (data.attached) {
                return
            } else {
                element.dataset.attached = true;
            }

            /** FIXME 
             * potential memory leak 
             * find a way to remove elements out of DOM
             */
            if (this._classNames[data.component]) {
                let n = this._components.length;
                let id = element.id;
                let component = new this._classNames[data.component](element, data);
                component.id = id;
                component.__el = element;
                this._components[n] = component;
                if (id) {
                    this._componentsIds[id] = component;
                }
            } else {
                console.log(data.component + ' component is missing');
            }
        });

    }


    /**
     * Returns all registered class names as object, key is name, value is class
     */
    static get classNames() {
        return this._classNames;
    }

    /**
     * Returns all attached components
     */
    static get components() {
        return this._components;
    }


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
    static getById(id) {
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
    static getByName(name) {

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
    static getByType(type) {

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

    static getByEl(el) {
        for (var key in this._components) {
            if (this._components[key].__el == el) {
                return this._components[key];
            }
        }
    }

}

Components._components = [];
Components._componentsIds = {};
Components._classNames = {}

export default Components;
module.exports = Components;