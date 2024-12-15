
const toReplace = ["7","C","A","Q","P","O","N","L","G","T","J","D","F","Y","t"];
const replaceWith = ["V7","I7","H7","S7","R7","Q7","P7","O7","L7","N7","M7","J7","K7","U7","T7"];

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("frm1").addEventListener("submit", function(e) {
        e.preventDefault() // Cancel the default action
        processSubmit();
    });
});

function processSubmit(){
    let userTranscript = document.getElementsByName('userInput')[0].value;
    let output = convertToSlotter(userTranscript);
    document.getElementById('result-p').innerHTML=output;
    document.getElementById('result').style.visibility='visible';
}
function convertToSlotter(transcript){
    transcript = replaceOther(transcript);
    transcript = replaceShorthand(transcript);
    transcript = replaceNewLine(transcript);
    transcript = cleanUpSlotter(transcript);
    return transcript;
}

function replaceOther(transcript){
    let result="";
    let group="";
    for(let x=0; x<transcript.length;x++){
        let curr = transcript[x];
        isCurrShorthand = isThisShorthand(curr);
        if(isCurrShorthand){ //my letter is shorthand!!
            if(result.length>0){
                result = result+"&";
            }
            if(group.length>0){
                result= result+"\""+group+"\"&";
                group="";
            }
            result=result+curr;
        }
        else{ //my letter isnt shorthand!!
            if(curr=="_"){
                curr="□";
            }
            group=group+curr;
            if(x==transcript.length-1){
                if(result.length>0){
                    result = result+"&";
                }
                result= result+"\""+group+"\"";
                group="";
            }
        }
    }
    return result;
}

function replaceShorthand(transcript){
    let shorthandToReplace;
    let replaceShorthandWith;
    for(let a = 0; a<toReplace.length;a++){
        shorthandToReplace = new RegExp(`[${toReplace[a]}]`,"g");
        replaceShorthandWith = replaceWith[a];
        transcript = transcript.replaceAll(shorthandToReplace, replaceShorthandWith);
    }
    return transcript;
}

function replaceNewLine(transcript){
    //regex replace "\n" with "CHAR(10)&"
    transcript = transcript.replace(/\n/g,"CHAR(10)&");
    return transcript;
}

function cleanUpSlotter(transcript){
    //if CHAR(10)& is surrounded by quotes then make it normal
    //transcript = transcript.replaceAll("\"CHAR(10)&\"&", "CHAR(10)&");

    transcript = transcript.replaceAll("&\"CHAR(10)", "&CHAR(10)");
    transcript = transcript.replaceAll("CHAR(10)&\"&", "CHAR(10)&");

    //if it ends in an '&' then chop it off
    if(transcript[transcript.length-1] == "&"){
        transcript = transcript.slice(0,-1);
    }

    //surround with '=(' ')'
    transcript = "=(" + transcript + ")";
    return transcript;
}

function isThisShorthand(letter){
    if(toReplace.includes(letter)){
        return true;
    }
    else{
        return false;
    }
}