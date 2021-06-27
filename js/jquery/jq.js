function jq() {
    $(function () {
        zoomDraggable('.tbl.need');
        zoomDraggable('.tbl.max');
        zoomDraggable('.tbl.allocation');
        zoomDraggable('.tbl.available');
        zoomDraggable('.request.modal');
    })
};
function zoomDraggable(id){
    $(id).draggable();
    $(id).bind('wheel mousewheel', function (e) {
        var delta;
        if (e.originalEvent.wheelDelta !== undefined)
            delta = e.originalEvent.wheelDelta;
        else
            delta = e.originalEvent.deltaY * -1;

        if (delta > 0) {
            $(this).css("height", "+=5%");
            $(this).css("width", $(this).css('height'));
        } else {
            $(this).css("height", "-=5%");
            $(this).css("width", $(this).css('height'));
        }
    });
}