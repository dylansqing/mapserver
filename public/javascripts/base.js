$(document).ready(function () {
    $('#button-addon2').on('click', function () {
        var keywords = $('#select01').val();
        var allOverlay = map.getOverlays();
        var stringCat = true;
        for (var i = 0; i < allOverlay.length; i++) {
            if (allOverlay[i].toString() === "[object Marker]") {
                if (keywords === allOverlay[i].z.title) {
                    map.centerAndZoom(allOverlay[i].point, 12);
                    stringCat = false;
                }
            }
        }
    })
})