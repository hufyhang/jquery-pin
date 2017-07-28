declare interface PINOption {
  callback: (code: string) => void;
  digit: number;
  placeholder?: string;
  type?: string;
}

declare namespace JQueryBasic {
  interface JQueryObject {
    /**
     * Initialize jquery-pin widget.
     * @param {function} callback - The callback function to be invoked on PIN entered.
     * @return Jquery object.
     */
    PIN(option: PINOption): JQueryObject;
}
}

interface JQueryFnObject {
  PIN: (option: PINOption) => void;
}
