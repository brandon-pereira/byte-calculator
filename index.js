const $input = document.querySelector("[data-input]");
const $rawBytes = document.querySelector("[data-raw-bytes]");
const $formattedSize = document.querySelector("[data-formatted-bytes]");
const $formattedUnit = document.querySelector("[data-formatted-unit]");

// over-engineered but I wanted to try web workers :D
const stringToSize = new Worker("worker.js");

render();
$input.addEventListener("keyup", (e) => {
  render();
});

$input.addEventListener("focus", (e) => {
  e.target.select();
});

function render() {
  stringToSize.postMessage($input.value);
  stringToSize.onmessage = (e) => {
    updateUI(e.data);
  };
}

function formatNumber(num) {
  return new Intl.NumberFormat().format(num);
}

function updateUI(size) {
  $rawBytes.innerText = formatNumber(size.bytes);
  $formattedSize.innerText = size.formattedSize;
  $formattedUnit.innerText = size.formattedUnit;
}
