//content script for citation killa

function insertText(txt){
	console.log("content script attempting to insert text");
	var el = document.activeElement; //get active element
	var val = el.value; //find value of active element
	var endIndex;
	var range;
	var doc = el.ownerDocument; //document object (top-level document)
	if (typeof el.selectionStart === 'number' && //if something is selected 
		typeof el.selectionEnd === 'number'){ 
		endIndex = el.selectionEnd;
		el.value = val.slice(0, endIndex) + txt + val.slice(endIndex);
		el.selectionStart = el.selectionEnd = endIndex + txt.length; //moves cursor to end of text (i think)
	} else if (doc.selection !== 'undefined' && doc.selection.createRange){ //if nothing is selected
		el.focus(); //focuses active element
		range = doc.selection.createRange();
		range.collapse(false);
		range.text = txt; 
		range.select();
	}
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log("message received by content script!");
	if (request.data){
		insertText(request.data);
	}
})