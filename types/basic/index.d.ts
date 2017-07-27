declare function $(selector: string): JQueryBasic.JQueryObject;
declare function $(element: HTMLElement): JQueryBasic.JQueryObject;
declare function $(callback: () => any): void;

interface JQueryFn {
  PIN: (callback?: (code?: string) => any) => JQueryBasic.JQueryObject;
}

declare namespace $ {
  export let fn: JQueryFn;
}

declare namespace JQueryBasic {
  interface JQueryObject {
    [key: number]: any;
    length: number;

    /**
     * Iterate through a set of JQuery elements.
     */
    each: (fn: (index: number, element: Element) => void) => JQueryObject;

    /**
     * Selector an/a set of element(s).
     * @param selector - Element query selector.
     * @return JQuery object(s).
     */
    find: (selector: string) => JQueryObject;

    /**
     * Set/get inner HTML of an element.
     * @param {string} [html] - HTML to be set to the element.
     * @return Element's inner HTML or jquery object.
     */
    html(html?: string): string | JQueryObject;

    /**
     * Bind an event to element.
     * @param {string} eventName - Event's name(s).
     * @param {function} callback - Event callback function.
     * @return Jquery object.
     */
    on(eventName: string, callback: (evt: Event) => boolean | void): JQueryObject;

    on(eventName: string, selector: string, callback: (evt: Event) => boolean | void): JQueryObject;

    /**
     * Set/get element's value.
     * @param {string|number} value - New value.
     */
    val(value?: string|number): JQueryObject|string;

    addClass(className: string): JQueryObject;
    removeClass(className: string): JQueryObject;

    get(index: number): HTMLElement;
    focus(): JQueryObject;

    attr(name: string): string;
    attr(name: string, value: string): JQueryObject;
  }
}

declare namespace JQueryBasic {
  interface JQueryObject {
    PIN(callback: (code: string) => void): JQueryBasic.JQueryObject;
  }
}
