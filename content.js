const uniqueId = "custom-selection-div";
const numericRegex = /^[0-9]+$/;

document.addEventListener("selectionchange", (event) => {
  // 이미 있던 애들을 정리한다
  document.querySelectorAll(`[id="${uniqueId}"]`).forEach((e) => {
    e.parentNode.removeChild(e);
  });

  const selectedText = window.getSelection().toString();
  const refinedText = selectedText.trim().replace(/,/g, '');
  if (!numericRegex.test(refinedText)) {
    return
  }
  // console.log("Selected text: " + refinedText);

  // unix인지 확인
  if (!isNaN(parseInt(refinedText))) {
    const unix = parseInt(refinedText);
    if (isConvertableUnix(unix)) {
      showPopup(unixToISOString(unix));
    }
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

function isConvertableUnix(unix) {
  const date = new Date(unix*1000);
  const year = date.getFullYear();
  if (year < 2010 || 2040 < year) {
    return false;
  }
  return true;
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
