const input = document.querySelector("#input");
const surrounderOpen = document.querySelector("#surrounderOpen");
const surrounderClose = document.querySelector("#surrounderClose");
const direction = document.querySelector("#format");
const output = document.querySelector("#output");
const delimeter = document.querySelector("#delimeter");
const filter = document.querySelector("#filter");
const capitalise = document.querySelector("#capitalise");
const uppercase = document.querySelector("#uppercase");
const clearButton = document.querySelector("#clearButton");
const clipboard = document.querySelector("#clipboard");


clipboard.addEventListener("click", copyToClipboard);
input.addEventListener("keyup", process);
delimeter.addEventListener("keyup", process);
surrounderOpen.addEventListener("keyup", process);
surrounderClose.addEventListener("keyup", process);
filter.addEventListener("keyup", process);
direction.addEventListener('change', process);
capitalise.addEventListener('change', process);
uppercase.addEventListener('change', process);
clearButton.addEventListener('click', () => {
    input.value = "";
    output.innerHTML = "";
});

function copyToClipboard() {
    var range = document.createRange();
    range.selectNode(output);
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect
}

function process(ev) {
    var strArr = new Array();
    var strArr2 = new Array();
    var strArr3 = new Array();
    ev.preventDefault();
    output.innerHTML = "<h3>processing</h3>";
    var str = input.value;
    if (!direction.checked) {
        str = str.replace(/\n/g, " ");
    }
    else {
        str = str.replace(/\n/g, "\n");
    }

    strArr = str.split(" ");
    if (capitalise.checked) {
        strArr = strArr.map(x => {
            return x.charAt(0).toUpperCase() + x.substring(1);
        })
    }

    if (uppercase.checked) {
        strArr = strArr.map(x => {
            return x.toUpperCase();
        })
    }

    strArr2 = strArr.filter(x => {
        return x !== filter.value;
    })
    strArr3 = strArr2.map(function (x) { return (x = "" + surrounderOpen.value + x + surrounderClose.value + delimeter.value + " "); });
    var completedProcessing = strArr3.join("");
    completedProcessing = completedProcessing.replace(/</g, '&lt;');
    completedProcessing = completedProcessing.replace(/>/g, '&gt;');
    completedProcessing = completedProcessing.slice(0, -(surrounderClose.value.length + 1 + delimeter.textContent.length));
    output.innerHTML = "<tt>" + completedProcessing + "</tt>";
    console.log(completedProcessing);
}
;
