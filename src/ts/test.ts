$(() => {
  $('#pincode').PIN({
    placeholder: 'PIN...',
    digit: 3,
    type: 'password',
    callback: (code: string) => alert(`[PIN] ${code}`)
  });
});
