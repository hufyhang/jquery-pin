import '../style/main.styl';

$.fn.PIN = function (callback: (code: string) => void) {
  (<JQueryBasic.JQueryObject>this).each(function () {
    const $this: JQueryBasic.JQueryObject = $(this);
    const $mobileInput = $this.find('.pincode-mobile-input');
    const $inputsContainer = $this.find('.pincode-inputs-container');
    const $inputs = $inputsContainer.find('.pincode-input');
    const PIN_DIGITS = $inputs.length;

    $mobileInput
      .on('keypress', function (evt) {
        const $this = $(this);
        if ((<string>$this.val()).trim().length === PIN_DIGITS) {
          evt.preventDefault();
          return false;
        }
      })
      .on('change input paste', function () {
        const $this = $(this);
        const code = (<string>$this.val()).trim();
        if (code === '') {
          return false;
        }

        if (code.length === PIN_DIGITS && typeof callback === 'function') {
          callback(code);
        }
      });

    $inputsContainer
      .on('mousedown', '.pincode-input', evt => evt.preventDefault())
      .on('click', '.pincode-input', () => {
        const digits: string[] = [];
        $inputs.each(function() {
          digits.push((<string>$(this).val()).trim());
        });

        const code = digits.join('');
        let index = code.length;
        if (index >= PIN_DIGITS) {
          index = PIN_DIGITS - 1;
        }

        $inputs.removeClass('active');
        const $elemnt = $($inputs.get(index));
        $elemnt.focus().addClass('active');
      })
      .on('keydown', '.pincode-input', function (evt: KeyboardEvent) {
        const $this = $(this);
        let $active = $inputsContainer.find('.active');
        let digit = parseInt($active.attr('data-digit'), 10);

        if (digit === PIN_DIGITS) {
          if (evt.keyCode === 8) {
            evt.preventDefault();
          } else if ((<string>$this.val()).trim() !== '') {
            evt.preventDefault();
            return false;
          }
        }

        setTimeout(() => {
          const digits: string[] = [];
          $inputs.each(function () {
            digits.push((<string>$(this).val()).trim());
          });

          let code = digits.join('');
          if (evt.keyCode === 8) {
            const $active = $inputsContainer.find('.active');
            let digit = parseInt($active.attr('data-digit'), 10);
            if (digit === PIN_DIGITS && (<string>$active.val()).trim() !== '') {
              $active.val('');
              return;
            }

            let index = code.length;
            if ((<string>$active.val()).trim() === '') {
              code = code.substring(0, code.length - 1);
              index -= 1;
              if (index < 0) {
                index = 0;
              }
            }
            $inputs.removeClass('active');
            $($inputs.get(index)).focus().addClass('active');
          }

          if (code.length === PIN_DIGITS && typeof callback === 'function') {
            callback(code);
          } else if (code.length < PIN_DIGITS) {
            $inputs.removeClass('active');
            $($inputs.get(code.length)).focus().addClass('active');
          }
        }, 0);
      });
  });
  return this;
};

