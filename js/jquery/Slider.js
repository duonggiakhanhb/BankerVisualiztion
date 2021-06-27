$(document).on('input', '.input-status', function() {
    changeStatus();
});

$('.back').on( 'click', () => {
    if(tracer.pivot==1) return;
    changeStatus(-1);

});

$('.forward').on('click', () => {
    if(tracer.pivot==tracer.display.length-1) return;
    changeStatus(1);

});

$('.btn.generate-input').click(() => {
    getAvail();
    clear();
    createRequest();
});

$('.btn.generate').click(() => {
    getAvail();
    getValue();
    clear();
    banker();
});

$('.play').on('click', () => {
    if(!play) {
        clearInterval(tracer.interval);
        $('.play').html('Play');
        play = !play;
    }
    else {
        $('.play').html('Pause');
        play = !play;
        tracer.renderTracer();
    }
});

$('.speed-slider').on('input', async () => {
    var val = $('.speed-slider').val();
    $('.speed-value').html('Delay: ' + val);
    await new Promise(resolve => setTimeout(resolve, 100));
    clearInterval(tracer.interval);
    tracer.ms = val;
    if(!play) tracer.renderTracer();
});

function changeStatus(changed= 0){
    var max = $('.input-status').prop('max');
    var val = $('.input-status').val()*1 + changed;
    $('.input-status').val(val);
    var width = val / max * 100;
    $('.status-value').html( (val) + '/' + (max *1) );
    $('.input-status').css('background', `linear-gradient(270deg, #263238 ${100-width}%, #FFED50 0%)`);
    tracer.pivot = val;
    tracer.displayCurrent(tracer.hmtlTrace[val]);
    play = true;
    $('.play').html('Play');
}
$(document).on('click', '.btn.request', function() {
    $('.request.modal').css('display', 'block');
    jq();
});
$(document).on('click', '.request.close', function() {
    $('.request.modal').css('display', 'none');
    jq();
});
$(document).on('click', '.request.add', function() {
    var get = $('.tbl.request').children('tbody');
    get.append(createRow('request', get[0].rows.length));
});




