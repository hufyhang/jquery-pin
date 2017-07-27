# jquery-pin

A JQuery PIN plugin written in Typescript.

## Build

To build jquery-pin, run `webpack --progress` under jquery-pin's directory.

The compiled output will be in `dist` directory.

## Usage

To use jquery-pin, import `dist/pin.js` via `<script>` tag.

The PIN widget is represented by the following DOM structure:

```html
  <div id="pincode" class="pin-code">
    <input class="pincode-mobile-input" type="text" placeholder="PIN...">
    <div class="pincode-inputs-container">
      <input class="pincode-input" type="text" data-digit="1">
      <input class="pincode-input" type="text" data-digit="2">
      <input class="pincode-input" type="text" data-digit="3">
    </div>
  </div>
```

Then, in JS, a PIN widget can be initialized by, for example:

```js
  $('#pincode').PIN(code => {
    alert(`[PIN] ${code}`);
  });
```

The `code` parameter in `PIN` callback refers to the code that user entered.
This callback is to be invoked every time when PIN is entered.


## Example

See `test/example.html` and `src/test.ts`.

## License

MIT
