import '../style/main.styl';

$.fn.PIN = function (option: PINOption) {
  const PIN_DIGITS = option.digit || 3;

  (<JQueryBasic.JQueryObject>this).each(function () {
    const $this: JQueryBasic.JQueryObject = $(this);
    const fragment = document.createDocumentFragment();

    const mobileInput = document.createElement('input');
    mobileInput.className = 'pincode-mobile-input';
    mobileInput.setAttribute('type', option.type || 'text');
    mobileInput.setAttribute('placeholder', option.placeholder || '');
    fragment.appendChild(mobileInput);

    const inputContainer = document.createElement('div');
    inputContainer.className = 'pincode-inputs-container';
    for (let index = 0; index !== PIN_DIGITS; ++index) {
      let inputNode = document.createElement('input');
      inputNode.className = 'pincode-input';
      inputNode.setAttribute('data-digit', `${ index + 1 }`);
      inputContainer.appendChild(inputNode);
    }
    fragment.appendChild(inputContainer);

    this.appendChild(fragment);

    const $mobileInput = $this.find('.pincode-mobile-input');
    const $inputsContainer = $this.find('.pincode-inputs-container');
    const $inputs = $inputsContainer.find('.pincode-input');


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

        if (code.length === PIN_DIGITS && typeof option.callback === 'function') {
          option.callback(code);
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

          if (code.length === PIN_DIGITS && typeof option.callback === 'function') {
            option.callback(code);
          } else if (code.length < PIN_DIGITS) {
            $inputs.removeClass('active');
            $($inputs.get(code.length)).focus().addClass('active');
          }
        }, 0);
      });
  });
  return this;
};

