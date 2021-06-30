
var MAXTIME = Number.MAX_VALUE;
var error = '';
var P = 5;
var R = 3;
var avail = [3, 3, 2];
var request;
var max = [
    [7, 5, 3],
    [3, 2, 2],
    [9, 0, 2],
    [2, 2, 2],
    [4, 3, 3]
];
var allocation = [
    [0, 1, 0],
    [2, 0, 0],
    [3, 0, 2],
    [2, 1, 1],
    [0, 0, 2]
];
var need = new Array (P);

var tracer = new Tracer();
var play = true;
var ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


// creating all cells
function createMatrix(label, arr){
    // get the reference for the body
    var matrix = document.getElementById(label);

    // creates a <table> element and a <tmatrix> element
    var tbl = document.createElement("table");
    tbl.setAttribute('id', "tbl");
    tbl.setAttribute('class', "tbl "+ label);
    var tblBody = document.createElement("tbody");

    var row = document.createElement("tr");
    row.setAttribute("id", 'r-0');
    row.setAttribute("class", 'row '+ label +" 0");
    for(var i=0; i <= R; i++ ) {
        var cell = document.createElement("td");
        cell.setAttribute("id", label +'-0-'+i);
        cell.setAttribute("class", 'cell ' +label +' 0-'+i);
        cell.style.cssText = 'border: none; background: none';
        cell.innerHTML = ABC[i-1];
        row.appendChild(cell);
    }
    tblBody.appendChild(row);
    delete row;
    for (var i = 1; i <= P; i++) {
        // creates a table row
        var row = document.createElement("tr");
        row.setAttribute("id", 'r-'+i);
        row.setAttribute("class", 'row '+ label +" "+i);

        var cell = document.createElement("td");
        cell.setAttribute("id", label +"-"+i+'-'+j);
        cell.setAttribute("class", 'cell ' +label +" " + i+'-0');
        row.appendChild(cell);

        row.appendChild(cell);
        for (var j = 1; j <= R ; j++) {
            var cell = document.createElement("td");
            var input = document.createElement('input');
            input.id = label + '-' + i + '-' + j;
            input.type = "text";
            input.value = arr[i-1][j-1] ?? 0;
            cell.appendChild(input);
            cell.setAttribute("id", label +"-"+i+'-'+j);
            cell.setAttribute("class", 'cell ' +label +" " + i+'- '+j);

            row.appendChild(cell);
        }

        // add the row to the end of the table body

        tblBody.appendChild(row);
    }

// put the <tbody> in the <table>
    tbl.appendChild(tblBody);
// appends <table> into <body>
    matrix.appendChild(tbl);

    for(var i=0; i <= P; i++ ) {
        var get = tblBody.getElementsByClassName(`row ${label} ${i}`)[0];
        get = get.getElementsByClassName('cell')[0];
        get.style.cssText = 'border: none; background: none';
        get.innerHTML = "P" + i;
    }
    $(`#${label}-0-0`).empty();
}
function createAvailable(){
    var tblVal = document.getElementById('available');
    var tbl = document.createElement("table");
    tbl.setAttribute('class', "tbl available");
    var tblBody = document.createElement("tbody");
    // creates a table row
    var row = document.createElement("tr");
    row.setAttribute("id", 'a-r');
    row.setAttribute("class", 'row');
    for (var i = 0; i < R; i++) {
        var cell = document.createElement("td");
        cell.setAttribute("id", 'a-'+i);
        cell.setAttribute("class", 'cell');
        cell.innerHTML = ABC[i];

        row.appendChild(cell);
    }
    // add the row to the end of the table body
    tblBody.appendChild(row);
    delete row;
    var row = document.createElement("tr");
    row.setAttribute("id", 'a-r-a');
    row.setAttribute("class", 'row');
    for (var i = 0; i < R; i++) {
        var cell = document.createElement("td");
        var input = document.createElement('input');
        input.id = 'a-i-'+ i;
        input.type = "text";
        input.value = avail[i] ?? 0;
        cell.appendChild(input);
        cell.setAttribute("id", 'a-c-'+i);
        cell.setAttribute("class", 'cell');
        /*var cellText = document.createTextNode(val[i]);
        cell.appendChild(cellText);*/
        row.appendChild(cell);
    }
    // add the row to the end of the table body
    tblBody.appendChild(row);
    tbl.appendChild(tblBody);
    tblVal.appendChild(tbl);
    for(var i=0; i < R; i++ ) {
        $(`#a-${i}`).css({
            'border': 'none',
            'background': 'none',
        });
    }

}

function createNeed(){
    for(var i = 0; i < P; i++){
        need[i] = new Array(R);
        for(var j = 0; j < R; j++){
            need[i][j] = max[i][j] - allocation[i][j];
        }
    }
    createMatrix('need', need);
}

function createRequest(){
    $('.request.modal').children('.tbl.request').remove();
    var matrix = document.getElementsByClassName('request modal');

    // creates a <table> element and a <tmatrix> element
    var tbl = document.createElement("table");
    tbl.setAttribute('id', "tbl");
    tbl.setAttribute('class', "tbl request");
    var tblBody = document.createElement("tbody");

    var row = document.createElement("tr");
    row.setAttribute("id", 'r-0');
    row.setAttribute("class", 'row request' +" 0");
    for(var i=0; i <= R; i++ ) {
        var cell = document.createElement("td");
        cell.setAttribute("id",  'request-0-'+i);
        cell.setAttribute("class", 'cell request' +' 0-'+i);
        cell.style.cssText = 'border: none; background: none';
        cell.innerHTML = ABC[i-1];
        row.appendChild(cell);
    }
    tblBody.appendChild(row);
    tbl.appendChild(tblBody);
    matrix[0].insertBefore(tbl, matrix[0].childNodes[2]);
    $(`#request-0-0`).empty();

}
function createRow(label, i){
    var row = document.createElement("tr");
    row.setAttribute("id", 'r-'+i);
    row.setAttribute("class", 'row '+ label +" "+i);


    for (var j = 0; j <= R ; j++) {
        var cell = document.createElement("td");
        var input = document.createElement('input');
        input.id = label + '-' + i + '-' + j;
        input.type = "text";
        input.value = 0;
        if(j==0){
            input.value = 'P'+i;
            cell.style.cssText = 'border: none; background: none';
        }
        cell.appendChild(input);
        cell.setAttribute("id", label + "-" + i + '-' + j);
        cell.setAttribute("class", 'cell ' + label + " " + i + '- ' + j);

        row.appendChild(cell);
    }
    return row;
}


function banker(){
    createNeed();
    tracer.delay();
    tracer.delay();
    if(getRequest()){
        if(!runRequest()){
            var result = error;
            resultDisplay(result);
            return;
        }
    }

    var f = new Array(P);
    var ans = new Array(P);
    var index = 0;
    for(var i = 0; i < P; i++){
        f[i] = false;
    }
    for (var k = 0; k < P; k++) {
        for (var i = 0; i < P; i++) {
            if (!f[i]) {
                tracer.deSelectAvailable();
                tracer.selectRow(i+1, 'max', '#2962ff');
                tracer.selectRow(i+1, 'allocation', '#2962ff');
                tracer.selectRow(i+1, 'need', '#2962ff');
                tracer.delay();
                var flag = false;
                for (var j = 0; j < R; j++) {
                    if (need[i][j] > avail[j]){
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    tracer.selectRow(i+1, 'max', '#0b7b12');
                    tracer.selectRow(i+1, 'allocation', '#0b7b12');
                    tracer.selectRow(i+1, 'need', '#0b7b12');
                    tracer.delay();
                    ans[index++] = i;
                    for (var j = 0; j < R; j++)
                        avail[j] += allocation[i][j];
                    f[i] = true;
                    tracer.setZero(i+1, 'allocation');
                    tracer.setZero(i+1, 'need');
                    tracer.delay();

                    tracer.setValue('a', avail);
                    tracer.delay();
                    $('#a-r-a').children('.cell').css('background-color', '#393939');
                    tracer.delay();
                }
                else {
                    tracer.deSelectAvailable();
                    tracer.deSelectRow(i+1, 'max');
                    tracer.deSelectRow(i+1, 'allocation');
                    tracer.deSelectRow(i+1, 'need');
                    tracer.delay();
                }
            }
        }
    }
    var result = '';
    for(var i = 0; i < P-1; i++){
        result+= 'P' + ans[i] +" -> ";
    }
    result+= 'P' + ans[P-1];
    if(!ans[P-1]) result = "DEADLOCK!!!";
    resultDisplay(result);

}

function resultDisplay(result){
    $('.output.result').children('p').html('Result: ' + result);
    tracer.displayCurrent(tracer.hmtlTrace[1]);
    $('.input-status').val(1);
    $('.input-status').prop('max', tracer.display.length-1);
    var width = 1 / (tracer.display.length-1) * 100;
    $('.status-value').html( 1 + '/' + (tracer.display.length-1) );
    $('.input-status').css('background', `linear-gradient(270deg, #263238 ${100-width}%, #FFED50 0%)`);

}

function runRequest(){
    for (var i = 0; i < request.length; i++){
        tracer.selectRow(i+1, 'request', '#d0aa1d')
        tracer.delay();
        var p = parseInt(request[i][0].slice(1));
        var needT = new Array(R);
        var availT = new Array(R);
        tracer.selectRow(p, 'need', '#2962ff');
        tracer.deSelectAvailable();
        tracer.delay();
        for (var j = 1; j <= R; j++){
            tracer.selectRow(p, 'need', '#2962ff');
            tracer.delay();
            var num = parseInt(request[i][j]);
            if(num > need[p-1][j-1]){
                tracer.selectRow(p, 'need', '#b60018');
                tracer.delay();
                tracer.deSelectRow(p, 'need');
                tracer.delay();
                error = "The process has exceeded its maximum claim."
                return false;
            }
            needT[j-1] = need[p-1][j-1] - num;

            if( num > avail[j-1]){
                tracer.setValue('a', availT, '#b60018');
                tracer.delay();
                error = `P${p} must wait, since the resources are not available.`;
                return false;
            }
            availT[j-1] = avail[j-1] - num;
        }
        tracer.setValueRow(p, 'need', needT);
        tracer.selectRow(p, 'need', '#0b7b12');
        tracer.delay();
        tracer.setValue('a', availT);
        tracer.delay();
        tracer.deSelectRow(p, 'need');
        tracer.deSelectAvailable();
        tracer.deSelectRow(i+1, 'request');
        tracer.delay();
        need[p-1] = needT;
        avail = availT;
    }
    console.log(need, availT);
    return true;
}

function getValue(){
    R = parseInt($('.input.-R').val());
    P = parseInt($('.input.-P').val());

    getAvail();
    max = getValueMatrix('max');
    allocation = getValueMatrix('allocation');
}
function getAvail(){
    avail = new Array(R);
    for(var i = 0; i < R; i++){
        avail[i] = parseInt($("#a-i-"+i).val());
        if(isNaN(avail[i])) avail[i] = 0;
    }
}
function getRequest(){
    var get = $('.tbl.request').children('tbody');
    var length = get[0].rows.length-1;
    if(length == 0) return false;
    request = new Array(length)
    for(var i = 1; i <= length; i++){
        request[i-1] = new Array(R);
        for (var j = 0; j <= R; j++){
            request[i-1][j] = $(`#request-${i}-${j}`).children('input').val();
        }
    }
    return true;
}

function getValueMatrix(type){
    try {
        arr = new Array(P);
        for (var i = 0; i < P; i++) {
            arr[i] = new Array(R);
            for (var j = 0; j < R; j++) {
                arr[i][j] = parseInt($(`#${type}-${i + 1}-${j + 1}`).children('input').val());
                if(isNaN(arr[i][j])) arr[i][j] = 0;
            }
        }
        return arr;
    }
    catch (e){
        alert("Input in " + type + " is a number");
    }
}

function clear(){
    $('#max').empty();
    $('#allocation').empty();
    $('#need').empty();
    $('#available').empty();

    R = parseInt($('.input.-R').val());
    P = parseInt($('.input.-P').val());

    createAvailable();
    createMatrix('max', max);
    createMatrix('allocation', allocation);
    getValue();



    tracer.clear();
    jq();

}
$('.input.-R').val(R);
$('.input.-P').val(P);
clear();
createRequest();
banker();
jq();

