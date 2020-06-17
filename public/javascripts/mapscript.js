$(document).ready(function () {
    var markersPosition = []; //标注点
    var address = [];
    $(document).ready(function () {
        function getMarkers() {
            $.ajax({
                type: "GET",
                url: 'http://39.99.213.143:8888/request/markers',
                success: (result) => {
                    //  address = [];
                    $("#select01").empty();
                    result.forEach(function (item, index) {
                        $("#select01").append("<option class='opt' value='" + item.name + "'>" + item.name + "</option>");
                        let Point = new BMap.Point(item.longitude, item.latitude);
                        let marker = new BMap.Marker(Point);
                        marker.setTitle(item.name);
                        address.push(item.name);
                        map.addOverlay(marker); // 将标注添加到地图中
                        //marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                        marker.addEventListener("click", function (e) {
                            alert(`当前站点:${e.currentTarget.z.title} \n设备编号:${item.infoCode} \n处理量:${item.processingCapacity} \n联系人:${item.contacts} \n联系电话:${item.contactNumber} \n所属公司:${item.company} \n当前设备状态: ${item.status}`);
                            console.table(item)
                            window.parent.postMessage({
                                msg: e.currentTarget.z.title
                            }, '*')
                            // console.log(e.currentTarget.z.title+e.point.lng+e.point.lat);
                        });
                    })
                }
            })
        }


        function getMarkerInfo() {
            $.ajax({
                type: "GET",
                url: 'http://39.99.213.143:8888/request/info',
                success: (result) => {
                    if (address !== []) {
                        for (let number in address) {
                            var tableHTML = "<table><tr>" + address[number] + "</tr>";
                            result.forEach(function (item, index) {
                                if (item.address === address[number]) {
                                    tableHTML = tableHTML + "<tr><td width=100px>" + //width=100px
                                        item.variable +
                                        "</td><td width=100px>" +
                                        item.value +
                                        "</td></tr>";
                                }
                            })
                            tableHTML = tableHTML + "</table>";
                            var allOverlay = map.getOverlays();
                            for (var i = 0; i < allOverlay.length; i++) {
                                if (allOverlay[i].toString() === "[object Marker]") {
                                    if (allOverlay[i].getTitle() == address[number]) {
                                        map.removeOverlay(allOverlay[i].getLabel());
                                        // 变量表格label属性
                                        var tableOpts = {
                                            position: Point, // 经纬度位置
                                            offset: new BMap.Size(0, 0), // 偏移量
                                            enableMassClear: false // 调用map.clearOverlays时不清除此覆盖物
                                        }

                                        var offsetSize = new BMap.Size(-45, 30);
                                        var labelStyle = {
                                            color: "#00bdaa",
                                            backgroundColor: "rgba(255, 255, 255, .25)",
                                            border: "0",
                                            fontSize: "20px",
                                            opacity: "1",
                                            width: "180px",
                                            verticalAlign: "center",
                                            borderRadius: "20px",
                                            borderRadius: "30px",
                                            whiteSpace: "normal",
                                            wordWrap: "break-word",
                                            padding: "7px",
                                            textAlign: "center",
                                            fontWeight: "bold",
                                            margin: "0",
                                            padding: "0"
                                        }
                                        //var spanA = "<span class='angle'><span>";

                                        var infoLabel = new BMap.Label(tableHTML, {
                                            offset: offsetSize
                                        });
                                        infoLabel.setStyle(labelStyle);
                                        allOverlay[i].setLabel(infoLabel);
                                    }
                                }
                            }
                        }
                    }
                }
            })
        }

        function labelStatus(zoom) {
            let allOverlay = map.getOverlays();
            for (var i = 0; i < allOverlay.length - 1; i++) {
                if (allOverlay[i].toString() === "[object Marker]") {
                    if (zoom < 13) {
                        allOverlay[i].hide();
                    } else {
                        allOverlay[i].show();
                    }
                }
            }
        }

        var scrollFunc = function () {
            let zoom = map.getZoom();
            console.log(zoom);
            labelStatus(zoom)
        }
        document.addEventListener('DOMMouseScroll', scrollFunc, false);
        window.onmousewheel = document.onmousewheel = scrollFunc;

        function getBoundary(stringCity) {
            var bdary = new BMap.Boundary();
            bdary.get(stringCity, function (rs) { //获取行政区域
                //map.clearOverlays(); //清除地图覆盖物       
                var count = rs.boundaries.length; //行政区域的点有多少个
                if (count === 0) {
                    alert('未能获取当前输入行政区域');
                    return;
                }
                var pointArray = [];
                for (var i = 0; i < count; i++) {
                    var ply = new BMap.Polygon(rs.boundaries[i], {
                        strokeWeight: 2,
                        strokeColor: "#ffcc00"
                    }); //建立多边形覆盖物
                    map.addOverlay(ply); //添加覆盖物
                    pointArray = pointArray.concat(ply.getPath());
                }
                map.setViewport(pointArray); //调整视野  
            });
        }

        function setMapInfo() {
            var cr = new BMap.CopyrightControl({
                anchor: BMAP_ANCHOR_TOP_RIGHT
            }); //设置版权控件位置
            //添加版权控件
            function addYourCopyright() {
                map.addControl(cr);
            }
            var bs = map.getBounds(); //返回地图可视区域
            cr.addCopyright({
                id: 1,
                content: "<a href='#' style='font-size:20px;background:yellow'>我是自定义版权控件</a>",
                bounds: bs
            });
        }

        getMarkers();
        setInterval(getMarkerInfo, 1000);
    })
})