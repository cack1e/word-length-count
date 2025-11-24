const squeak = new Audio("media/speak.mp3");

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("frm1").addEventListener("submit", function (e) {
        e.preventDefault(); // Cancel the default action
        processSubmit();
    });
    document.getElementById("octo").addEventListener("click", function (e) {
        playSqueak();
    });
});

function processSubmit() {
    let userTranscript = document.getElementsByName('userInput')[0].value;
    let output = convertToWordLength(userTranscript);
    let copyButton = document.getElementById("copyButton");
    copyButton.value = "Copy text";
    document.getElementById('result-p').innerHTML = output;
    document.getElementById('result').style.visibility = 'visible';
}

function convertToWordLength(transcript) {
    transcript = cleanInput(transcript);
    let result = "";
    let group = "";
    for (let n = 0; n < transcript.length; n++) {
        let curr = transcript[n];
        if ((curr.charCodeAt() != 10) && (curr != " ")) { //if its not a linebreak or space
            group += curr;
        }
        else {
            if (group.length > 0) {
                if (result.length > 0) {
                    result += " ";
                }
                result += group.length;
                group = "";
            }
        }
        if (n == transcript.length - 1) {
            if (result.length > 0) {
                result += " ";
            }
            result += group.length;
            group = "";
        }
    }
    return (result);
}

function cleanInput(uncleanText) {
    let lastCharacter = uncleanText[uncleanText.length - 1];
    let cleanedText = uncleanText;
    while (lastCharacter.charCodeAt() == 10) { //if last character is a linebreak then delete it
        cleanedText = cleanedText.slice(0, -1);
        lastCharacter = cleanedText[cleanedText.length - 1];
    }
    let firstCharacter = cleanedText[0];
	if ((firstCharacter.charCodeAt() == 34) && (lastCharacter.charCodeAt() == 34)){ //if first last character and last characters are quotes get rid of them
        cleanedText = cleanedText.substr(1, cleanedText.length - 2);
	}
    return cleanedText;
}

function copyText() { //shoutout w3 schools https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
    let textToCopy = document.getElementById("result-p");
    let copyButton = document.getElementById("copyButton");
    textToCopy.select();
    textToCopy.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(textToCopy.value);
    copyButton.value = "Copied!";
}

function playSqueak() {
    squeak.currentTime = 0;
    squeak.play();
}