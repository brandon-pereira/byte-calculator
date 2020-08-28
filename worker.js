import bytes from "bytes";

onmessage = function (e) {
  const _bytes = stringToBytes(e.data);
  const _size = bytesToSize(_bytes);
  postMessage(_size);
};

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
