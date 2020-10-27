var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var recognition = new SpeechRecognition();
recognition.lang='en-US';

var message = document.querySelector('#message');

var instructions = $('#instructions');

recognition.onresult = function(event) {
    var last = event.results.length - 1;
    var command = event.results[last][0].transcript;
    message = 'Voice Input : '+ command + '.';
    document.getElementById("p1").innerHTML = message;
    $('#p1').fadeIn('normal',function(){
        $('#p1').delay(10000).fadeOut();
    }
        );

    if(command.indexOf("pause") != -1){
        document.getElementById('pause').click();
    }

    if(command.indexOf("play") != -1 || command.indexOf("resume") != -1) {
        document.getElementById('play').click();
    }

    if(command.indexOf("next") != -1) {
        document.getElementById('next').click();
    }

    if(command.indexOf("previous") != -1) {
        document.getElementById('previous').click();
    }

    if(command.indexOf("mute") != -1) {
        document.getElementById('mute').click();
    }

    if(command.indexOf("up") != -1 || command.indexOf("raise") != (-1) || command.indexOf("increase") != -1 ) {
        document.getElementById('upvolume').click();
    }

    if(command.indexOf("down") != -1 || command.indexOf("decrease") != (-1)) {
        document.getElementById('downvolume').click();
    }
};

recognition.onspeechend = function() {
    instructions.text("The recognition turned itself off")
    recognition.stop();
    $('#instructions').fadeIn('normal', function(){
        $('#instructions').delay(5000).fadeOut();
    });
};

recognition.onerror = function(event) {
    message = 'Error occured in recognition: ' + event.error;
    instructions.text(message);
    $('#instructions').fadeIn('normal', function(){
        $('#instructions').delay(5000).fadeOut();
    });
};

$('#start-microphone').on('click', function(){
    recognition.start();
});
