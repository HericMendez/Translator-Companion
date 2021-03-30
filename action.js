function getTextA() {

  return lineBreak("#original-text");
}

function getTextB() {
  return lineBreak("#edited-text");
}

function clearAll() {

  var n = confirm("Clear all input fields?");
  if (n == true) {
    document.getElementById("original-text").value = "";
    document.getElementById("edited-text").value = "";
    document.getElementById("show-result").innerHTML = "";
    window.alert("All clear, Boss!");
  }

}


function clearString(text) {
  document.getElementById(text).value = '';
}


function copyText(element) {

  var copyText = document.getElementById(element);
  copyText.select();

  document.execCommand("copy");
  alert(`The text:\n"${copyText.value}"\nwas copied to clipboard!`);
}


function lineBreak(txt) {

  var lines = $(txt).val().split(/\n/);
  var texts = []
  for (var i = 0; i < lines.length; i++) {
    // only push this line if it contains a non whitespace character.
    if (/\S/.test(lines[i])) {
      texts.push($.trim(lines[i]));
    }
  }
  return texts;

}

function compareString(txtA, txtB, line) {
  var compMsg = '';
  var a=1;

    if(txtA.length>txtB.length){ 
      compMsg += `<strong>Line ${line}</strong> is <strong class="red">${txtA.length - txtB.length}</strong> chars smaller than original.<br>`
    }else if(txtA.length<txtB.length){
      compMsg += `<strong>Line ${line}</strong> exceeds original in <strong class="red">${txtB.length - txtA.length}</strong> chars.<br>`
    }else{
      compMsg = `<strong>Line ${line}</strong> equals original number of characters.<br>`
    }
  
  return compMsg;

  
}

function maxChar(txtSize, line) {

  var n = document.getElementById("max-char").value;
  var warning = '';

  if (txtSize <= n) {

    warning += ''//`<strong>Line ${line} is within max. limit.</strong><br>`;
  } else {
    warning += `<strong class="red">WARNING!</strong><strong> Line ${line} exceeds max. limit in <strong class="red">${txtSize - n}</strong> chars.</strong><br>`
    //warning += `Mod: ${txtA.length-txtB.length} <br>`
  }

  return warning;

}

function alertMsg(status){
  var a = [];
  a = getTextA();
  var b = [];
  b = getTextB();

  var alert = '';

for(var i=0; i<status.length; i++){
  if (a.length == b.length) {
    alert += compareString(a[i], b[i], i+1);
    alert += `${maxChar(status[i].length, i+1)}`
  } else {
    status.length = 1;
  
    alert += `<strong class="red">WARNING!</strong><strong> Number of lines between the texts is not equal!</strong><br>`
  }
  

}

return alert;
}

function showResult(msg) {
  var status = ""; n = 1;
  var a = [];
  a = getTextA();
  var b = [];
  b = getTextB();

  for (var i = 0; i < msg.length; i++) {

    var blank = (msg[i].match(/ /g) || []).length;

    status += `<strong>Line ${n}</strong> has <strong>${msg[i].length}</strong> characters, `
    status += ` <strong>${msg[i].split(' ').length}</strong> words and`
    status += ` <strong>${blank}</strong> empty spaces. <br>`
   
    n++
  }

  return status;

}

function tagLess(element) {

  for (var i = 0; i < element.length; i++) {
    var noTag = element[i].replace(/(<([^>]+)>)/gi, "");
  }
  return noTag;
}


function stringSize() {

  //const checkBox = document.querySelector("#ignore-tag").checked;

  var originalText = getTextA();
  var editedText = getTextB();


  var status1 = '', status2 = '';

  status1 += showResult(originalText);
  status2 += showResult(editedText);
  status2 +='<hr>'
  status2 += alertMsg(editedText);

  document.getElementById("show-result").innerHTML = `
    <fieldset id="result">
    <legend><strong>Result:</strong></legend>
        <p>
        <strong>Original:</strong><br>${status1}
        </p>
        <p>
        <strong>Edited:</strong><br>${status2}
        </p>
    </fieldset>
    `;
}

