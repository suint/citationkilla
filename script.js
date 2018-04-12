function cleanText(){ //strips bracketed text from wikipedia pastes.
	var txt = document.getElementById('lint').value;
	while (txt.indexOf(']') != -1){
		if (txt.indexOf(']') == 0){
			txt = txt.slice(1,txt.length);
		}
		var a = txt.indexOf('[');
		var b = txt.indexOf(']') + 1;
		var c = txt.length;
		var bracketTxt = txt.slice((a+1),(b-1));
	}
	document.getElementById("lint").value=txt;
}
//todo: make array of coordinates of each
function cleanTextv2(){
	
	if (findCitation(bracketTxt)){
		var temp1 = txt.slice(0,a);
		var temp2 = txt.slice(b,c);
		txt = temp1 + temp2;
	}
}

function clickHandler(e){
	cleanText();
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', clickHandler);
});