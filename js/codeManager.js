

exports.bootCodeMirror = function() {

    var myCodeMirror = CodeMirror.fromTextArea( document.getElementById("codingWindow"),
		{
		lineNumbers: true, 
		mode:  "javascript"
		});
	myCodeMirror.setValue('function genBeat(oldBeat, currentTimestep){\n\n  return oldBeat;\n};');
    return myCodeMirror;	
};



