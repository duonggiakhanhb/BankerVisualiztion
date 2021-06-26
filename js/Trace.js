
class Tracer {
    constructor() {
        this.state = {};
        this.interval = null;
        this.display = [];
        this.pivot = 1;
        this.hmtlTrace = [];
        this.ms = 500;
        this.selected = [];
    }
    select(i, j, type){
        $(`#${type}-${i+1}-${j+1}`).css('background-color', '#2962ff');
        if( typeof this.state.select === 'undefined') this.state.select = [];
        this.state.select.push([ i, j, type ]);
    }
    deSelect(i, j, type){
        $(`#${type}-${i+1}-${j+1}`).css('background-color', '#393939');
        if( typeof this.state.deSelect === 'undefined') this.state.deSelect = [];
        this.state.deSelect.push([ i, j, type ]);
    }
    patch(i, j, type, value){
        $(`#${type}-${i+1}-${j+1}`).css('background-color', '#c51162').val(value);
        if( typeof this.state.patch === 'undefined') this.state.patch = [];
        this.state.patch.push( [ i, j, type, value ] );
    }
    dePatch(i, j, type){
        $(`#${type}-${i+1}-${j+1}`).css('background-color', '#393939');
        if( typeof this.state.dePatch === 'undefined') this.state.dePatch = [];
        this.state.dePatch.push( [ i, j, type ] );
    }
    selectRow(i, type, color){
        $(`.row.${type}.${i}`).css('background-color', color);
        $(`.cell.${type}.${i}-`).css('background', 'none');
        if( typeof this.state.selectRow === 'undefined') this.state.selectRow = [];
        this.state.selectRow.push([ i,"'"+ type +"'", "'"+ color +"'" ]);
    }
    deSelectRow(i, type){
        $(`.row.${type}.${i}`).css('background', 'none');
        $(`.cell.${type}.${i}-`).css('background-color', '#393939');
        if( typeof this.state.deSelectRow === 'undefined') this.state.deSelectRow = [];
        this.state.deSelectRow.push([ i, "'"+ type +"'" ]);
    }
    setZero(i, type){
        for(var j = 1; j <= R; j++){
            $(`#${type}-${i}-${j}`).children('input').val('0');
            if( typeof this.state.setZero === 'undefined') this.state.setZero = [];
            this.state.setZero.push([ i,"'"+ type +"'" ]);
        }
    }
    setValue(type, arr){
        for(var i = 0; i < R; i++){
            $(`#${type}-i-${i}`).val(arr[i]);
        }
        $('#a-r-a').children('.cell').css('background-color', '#600c86');
        if( typeof this.state.setValue === 'undefined') this.state.setValue = [];
        this.state.setValue.push(["'"+ type +"'", "["+ arr +"]"]);
    }


    delay() {
        this.display.push(this.state);
        this.state = {};
        this.hmtlTrace.push([
            document.getElementsByClassName('tbl need')[0].cloneNode(true),
            document.getElementsByClassName('tbl max')[0].cloneNode(true),
            document.getElementsByClassName('tbl allocation')[0].cloneNode(true),
            document.getElementsByClassName('tbl available')[0].cloneNode(true)
        ]);
    }

    displayCurrent(dp){
        if(this.interval != null) clearInterval(this.interval);
        dp[0].style.cssText = document.getElementsByClassName('tbl need')[0].style.cssText;
        dp[1].style.cssText = document.getElementsByClassName('tbl max')[0].style.cssText;
        dp[2].style.cssText = document.getElementsByClassName('tbl allocation')[0].style.cssText;
        dp[3].style.cssText = document.getElementsByClassName('tbl available')[0].style.cssText;

        document.getElementById('max').innerHTML = '';
        document.getElementById('allocation').innerHTML = '';
        document.getElementById('need').innerHTML = '';
        document.getElementById('available').innerHTML = '';

        document.getElementById('need').appendChild(dp[0]);
        document.getElementById('max').appendChild(dp[1]);
        document.getElementById('allocation').appendChild(dp[2]);
        document.getElementById('available').appendChild(dp[3]);
        jq();
    }

    runDP(dp){
        for ( const [ key, value ] of Object.entries(dp)){
            for (var i=0; i<value.length; i++){
                var func ='this.' + key + `(${value[i]})`;
                eval(func);
            }
        }
    }

    renderTracer(){
        if(this.pivot >= this.display.length) return true;

        if(this.displayCurrent(this.hmtlTrace[this.pivot])) return;

        this.interval = setInterval(() => {
            if(this.pivot >= this.display.length) {
                play = !play;
                $('.play').html('Play');
                return;
            }
            this.runDP(this.display[this.pivot]);
            var max = $('.input-status').prop('max');
            $('.input-status').val(this.pivot);
            var width = this.pivot / max * 100;
            $('.status-value').html( (this.pivot) + '/' + (max *1) );
            $('.input-status').css('background', `linear-gradient(270deg, #666666 ${100-width}%, #FFED50 0%)`);
            this.pivot++;
        }, this.ms);

    }
    clear(){
        if(this.interval != null) clearInterval(this.interval);
        this.state = {};
        this.interval = null;
        this.display = [];
        this.pivot = 0;
        this.hmtlTrace = [];
        this.selected = [];
    }
}