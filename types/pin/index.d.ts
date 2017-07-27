declare namespace JQueryBasic {
  interface JQueryObject {
    /**
     * Initialize jquery-pin widget.
     * @param {function} callback - The callback function to be invoked on PIN entered.
     * @return Jquery object.
     */
    PIN(callback: (code: string) => void): JQueryObject;
}
}

interface JQueryFnObject {
  PIN: (callback: (code: string) => void) => void;
}
