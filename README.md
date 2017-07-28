# jquery-pin

A JQuery PIN plugin written in Typescript.

## Build

To build jquery-pin, run `npm run build`.

The compiled output will be in `dist` directory.

## Usage

To use jquery-pin, import `dist/pin.js` via `<script>` tag.

The PIN widget is represented by the following DOM structure:

```html
  <div id="pincode" class="pin-code"></div>
```

Then, in JS, a PIN widget can be initialized by, for example:

```js
  $('#pincode').PIN({
    placeholder: 'PIN...', // Placeholder to be shown on small size screen.
    digit: 3, // PIN's digit.
    type: 'password', // Input type.
    callback: (code) => alert(`[PIN] ${code}`) // PIN entered callback.
  });
```

The `code` parameter in `PIN` callback refers to the code that user entered.
This callback is to be invoked every time when PIN is entered.

Once the PIN widget is initialized, you'll get the following DOM structure:

```html
  <div id="pincode" class="pin-code">
    <input class="pincode-mobile-input" type="text" placeholder="PIN...">
    <div class="pincode-inputs-container">
      <input class="pincode-input" type="password" data-digit="1">
      <input class="pincode-input" type="password" data-digit="2">
      <input class="pincode-input" type="password" data-digit="3">
    </div>
  </div>
```


## Example

See `test/example.html` and `src/test.ts`.

## License

MIT
