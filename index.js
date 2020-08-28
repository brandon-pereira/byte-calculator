import bytes from "bytes";

const $input = document.querySelector("[data-input]");
const $rawBytes = document.querySelector("[data-raw-bytes]");
const $formattedSize = document.querySelector("[data-formatted-bytes]");
const $formattedUnit = document.querySelector("[data-formatted-unit]");

render();
$input.addEventListener("keyup", (e) => {
  render();
});

$input.addEventListener("focus", (e) => {
  e.target.select();
});

function render() {
  updateUI(bytesToSize(stringToBytes($input.value)));
}

function formatNumber(num) {
  return new Intl.NumberFormat().format(num);
}

function updateUI(size) {
  $rawBytes.innerText = formatNumber(size.bytes);
  $formattedSize.innerText = size.formattedSize;
  $formattedUnit.innerText = size.formattedUnit;
}

function bytesToSize(_bytes) {
  const [formattedSize, formattedUnit] = bytes(_bytes, {
    unitSeparator: ":",
    thousandsSeparator: ",",
  }).split(":");

  return {
    bytes: _bytes,
    formattedSize,
    formattedUnit,
  };
}

function stringToBytes(str) {
  return new Blob([str]).size;
}
