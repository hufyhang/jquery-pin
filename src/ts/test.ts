$(() => {
  $('#pincode').PIN(code => {
    alert(`[PIN] ${code}`);
  });
});
