
const $linesarea = document.getElementById("linesarea")
const $log = document.getElementById("log")

const defaultText = `default test text;
You should fill in the textarea above!`
let isPlayToStop = true
let sayTimeout = null;

function clearSpeech({ all=false }={}){
	htmllog(`🆑 clearing, stop all = `+  all)
	if (all===true) isPlayToStop = true
	// cancel the current utterance
	if (speechSynthesis.speaking) speechSynthesis.cancel()
}

function getText(){
	return $linesarea.value.trim() || defaultText
}

function cuePlay({ 
	splitMode = 'lines',
}={}){
	htmllog(`cuePlay`)
	// We'll assume there is a synth to stop;
	// checking is wonky with cued Promices
	htmllog(`🛑 cancel synth in play`)
	const timeout = (splitMode==='letters') ? 444 : 255
	isPlayToStop = true
	speechSynthesis.cancel()
	// Make sure we don't create more than one timeout...
	if (sayTimeout !== null) clearTimeout(sayTimeout)
	sayTimeout = setTimeout(function(){ play({ splitMode }); }, timeout )
	htmllog(`sayTimeout ⏱️ `+ timeout +`ms`)
}

async function play({
	textInput = getText(),
	splitMode = 'lines',
}={}){
	let textOutput = []
	const splitMap = new Map([
		['join', ''],
		['letters', ''],
		['lines', '\n'],
		['noop', '[]'],
		['words', ' '],
	])

	htmllog(`split mode 📐 `+ splitMode +` with input:
`+ textInput)
	if (splitMode === 'join'){
		textOutput.push( textInput.replace(/(\r\n|\n|\r)/gm, "") )
	} else {
		textOutput = textInput.split( splitMap.get(splitMode) )
	}
	
	htmllog(`🍳 prepare for speaking:
`+ textOutput)
	isPlayToStop = false
	speakLoopArray(textOutput)
}

async function speakLoopArray( arr ){
	for ( i = 0; ( (i < arr.length) && !isPlayToStop) ; i++ ){
		if (isPlayToStop) break
		htmllog( `cueing # `+ i +` :
👄 `+ arr[i] )  
		await getNextAudio(arr[i])
		htmllog( `line `+ i +` done ✔️` )
	}
}

async function getNextAudio( sentence ){
	let audio = new SpeechSynthesisUtterance(sentence)
	window.speechSynthesis.speak(audio)

	return new Promise( resolve =>{
		audio.onend = resolve
	})
} 

function htmllog( t ){
	$log.value += `\n\n`+ t
	$log.scrollTop = $log.scrollHeight
}