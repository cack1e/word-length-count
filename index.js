
const shorthandCharas = ["7","C","A","Q","P","O","N","L","G","T","J","D","F","Y","t"];
const sheetCells = ["X7","K7","J7","U7","T7","S7","R7","Q7","N7","P7","O7","L7","M7","W7","V7"];
const squeak = new Audio("media/speak.mp3");

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("frm1").addEventListener("submit", function(e) {
        e.preventDefault(); // Cancel the default action
        processSubmit();
    });
    document.getElementById("octo").addEventListener("click", function(e) {
        playSqueak();
    });
});

function processSubmit(){
    let userTranscript = document.getElementsByName('userInput')[0].value;
    let output = convertToSlotter(userTranscript);
    let copyButton = document.getElementById("copyButton");
    copyButton.value="Copy text";
    document.getElementById('result-p').innerHTML=output;
    document.getElementById('result').style.visibility='visible';
}

function convertToSlotter(transcript){
    let result="";
    let group="";
    for(let n=0; n<transcript.length;n++){
        let curr = transcript[n];
        if(shorthandCharas.includes(curr)){ //if current letter is shorthand
            if(result.length>0){
                result = result+"&";
            }
            if(group.length>0){
                result= result+"\""+group+"\"&";
                group="";
            }
            result=result+sheetCells[shorthandCharas.indexOf(curr)];
        }
        else{
            if(curr.charCodeAt()==10){ //new line char code
                if(group.length>0){
                    result= result+"\""+group+"\"";
                    group="";
                }
                if(result.length>0){
                    result = result+"&";
                }
                result = result+"CHAR(10)";
            }
            else if(curr.charCodeAt()==13){ //return char code
                if(group.length>0){
                    result= result+"\""+group+"\"";
                    group="";
                }
                if(result.length>0){
                    result = result+"&";
                }
                result = result+"CHAR(13)";
            }
            else{ //we add it to the group thats in quotes
                if(curr=="_"){
                    curr="□"; //if we put an underscore in the shorthand text, that means we probably can't read the actual letter. to stop it being confused with un-slotteed shorthand, we're gonna make it this square symbol :]
                }
                group=group+curr;
                if(n==transcript.length-1){
                    if(result.length>0){
                        result = result+"&";
                    }
                    if(group.length>0){
                        result= result+"\""+group+"\"";
                        group="";
                    }
                }
            }
        }
    }
    result="=("+result+")";
    return(result);
}

function copyText(){ //shoutout w3 schools https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
    let textToCopy = document.getElementById("result-p");
    let copyButton = document.getElementById("copyButton");
    textToCopy.select();
    textToCopy.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(textToCopy.value);
    copyButton.value="Copied!";
}

function playSqueak(){
    squeak.currentTime=0;
    squeak.play();
}