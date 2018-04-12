var item = chrome.contextMenus.create({
    'title': 'Paste clean text',
    'id': 'citation killa',
    'contexts': ['editable'],
});

function cleanText(txt){ //strips bracketed text from wikipedia pastes.
	while (txt.indexOf(']') != -1){
		if (txt.indexOf(']') == 0){
			txt = txt.slice(1,txt.length);
		}
		var a = txt.indexOf('[');
		var b = txt.indexOf(']') + 1;
		var c = txt.length;
		var temp1 = txt.slice(0,a);
		var temp2 = txt.slice(b,c);
		txt = temp1 + temp2;
	}
	console.log("cleanText accessed");
	return txt;
}

function findCitation(txt){ //accepts text *from between brackets* finds if citation OR wiki template
	var isCitation = false;
	//wikipedia templates: https://en.wikipedia.org/wiki/Category:Inline_cleanup_templates
	//note that this is NOT all-inclusive since you can just create whatever template you want really so this will probably be a setting
	var templates = new Array("quantify", "citation needed", "ambiguous", "attribution needed", "anachronism", "awkward", 
								"bare URL", "buzzword", "by how much?", "name?", "check quotation syntax", "Chinese script needed",
								"clarification needed", "clarify", "timeframe?", "conflicted source?", "compared to?", "contentious label", 
								"context?", "needs copy edit", "copyright violation?", "may be outdated", "Data unknown/missing.", 
								"dead link", "when defined as?", "definition needed", "details removed", "disambiguation needed", 
								"example needed", "expand acronym", "further explanation needed", "a fact or an opinion?", "sentence fragment",
								"how?", "how often?", "Caution: Huge file", "more detail", "image reference needed", "example's importance?",
								"importance?", "incomprehensible", "inconsistent", "Like whom?", "excessive quote", "unbalanced opinon?", 
								"link currently leads to a wrong person", "needs IPA", "non sequitur", "in English?", 
								"relevant to this section? – discuss", "relevant to this paragraph? – discuss", "old info", "opinion", 
								"over-explained", "excessive detail?", "peacock term", "POV? – discuss", "pronunciation?", "relevant? – discuss",
								"romanization needed", "sarcasm", "scientific citation needed", "SIA disambiguation needed", 
								"improper synthesis?", "to be determined", "jargon", "unreliable source?", "until when?", "needs update", 
								"vague", "weasel words", "when?", "coordinates?", "which?", "who?", "whose translation?", "why?", "year needed");
	//isNaN(x) returns true if x is NOT a number
	for (i = 0; i < templates.length; i++){
		if (txt == templates[i]){
			isCitation = true;
		}
	}
	
	if (!(isNaN(txt))){
		isCitation = true;
	}
	
	return isCitation;
}

function cleanPaste(info,tab) {
	console.log("cleanPaste accessed");
	var clean = cleanText(paste());
	console.log(clean);
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) { //finds active tab
		chrome.tabs.sendMessage(tabs[0].id, {data: clean}); //sends message to content script giving it text to insert
	});
}

chrome.contextMenus.onClicked.addListener(function (info, tab) {
	cleanPaste();
	console.log("menu item clicked");
});

function paste() { //returns clipboard value
	var result = "";
	document.getElementById("sandbox").value = '';
	document.getElementById("sandbox").focus();
    var sandbox = document.getElementById("sandbox");
    if (document.execCommand('paste')) {
        result = sandbox.value;
    }
    return result;
}