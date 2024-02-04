console.log('content.js loaded');

const uniqueId = "custom-selection-div";

document.addEventListener("selectionchange", (event) => {
  var text = window.getSelection().toString().trim();
  text = text.replace(/,/g, '')
  if (text.length === 0) {
    // 삭제
    var existingDiv = document.getElementById(uniqueId);
    if (existingDiv) {
      existingDiv.parentNode.removeChild(existingDiv);
    }
    return;
  }
  console.log("Selected text: " + text);

  // unix인지 확인
  if (!isNaN(parseInt(text))) {
    showPopup(unixToISOString(parseInt(text)));
    return
  }
});

function showPopup(result) {
  var selection = window.getSelection();
  var range = selection.getRangeAt(0);
  var rect = range.getBoundingClientRect();

  // div 엘리먼트 생성
  var div = document.createElement("div");
  div.id = uniqueId
  div.textContent = result;
  div.style.position = "fixed";
  div.style.top = rect.bottom + "px";
  div.style.left = rect.left + "px";
  div.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
  div.style.padding = "10px";
  div.style.border = "1px solid #ccc";

  document.body.appendChild(div);
}

function unixToISOString(unix) {
  const date = new Date(unix*1000);
  var tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? '+' : '-',
    pad = function(num) {
        return (num < 10 ? '0' : '') + num;
    };

  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    dif + pad(Math.floor(Math.abs(tzo) / 60)) +
    ':' + pad(Math.abs(tzo) % 60);
}
