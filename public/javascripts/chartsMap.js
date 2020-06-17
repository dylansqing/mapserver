$(document).ready(async () => {

    /**默认参数 */
    var mapData =
        [
            { addrName: '四川', value: 1, location: [103.9526, 30.7617] },
            { addrName: '贵州', value: 2, location: [106.7166, 26.5666] },
            { addrName: '重庆', value: 3, location: [107.7539, 30.1904] },
            { addrName: '河南', value: 4, location: [113.6500, 34.7666] }
        ]

    var mapJson = []
    await $.ajax({
        type: 'GET',
        datatype: 'JSON',
        url: 'http://39.99.213.143:8888/dash/getMarkerCounts',
        success: (results) => {
            // console.log(results)
            results.forEach(item => {
                mapJson.push({
                    addrName: item.addr,
                    value: item.total,
                    location: [item.longitude, item.latitude]
                })
            })
            // console.log(mapJson)
            mapData = mapJson
        }
    })


    var data = []
    var geoCoordMap = {}
    var toolTipData = []
    mapData.forEach(item => {
        data.push({
            name: item.addrName,
            value: item.value
        })
        geoCoordMap[item.addrName] = item.location
        toolTipData.push({
            name: item.addrName,
            value: [{
                name: '设备数',
                value: item.value
            }]
        })
    })

    var theChart = echarts.init(document.getElementById('chartsMap'));

    var mapName = "china";
    var title_Color = "rgb(55, 75, 113)";
    var title_FontFamily = "等线";

    /*获取地图数据*/
    theChart.showLoading();
    var mapFeatures = echarts.getMap(mapName).geoJson.features;
    theChart.hideLoading();
    mapFeatures.forEach(function (v) {
        // 地区名称
        var name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp;

    });

    var max = 480,
        min = 9; // todo 
    var maxSize4Pin = 100,
        minSize4Pin = 20;

    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value),
                });
            }
        }
        return res;
    };
    option = {
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                if (typeof (params.value)[2] == "undefined") {
                    var toolTiphtml = ''
                    for (var i = 0; i < toolTipData.length; i++) {
                        if (params.name == toolTipData[i].name) {
                            toolTiphtml += toolTipData[i].name + '：<br>'
                            for (var j = 0; j < toolTipData[i].value.length; j++) {
                                toolTiphtml += toolTipData[i].value[j].name + '：' + toolTipData[i].value[j].value + "<br>"
                            }
                        }
                    }
                    return toolTiphtml;
                } else {
                    var toolTiphtml = ''
                    for (var i = 0; i < toolTipData.length; i++) {
                        if (params.name == toolTipData[i].name) {
                            toolTiphtml += toolTipData[i].name + '：<br>'
                            for (var j = 0; j < toolTipData[i].value.length; j++) {
                                toolTiphtml += toolTipData[i].value[j].name + '：' + toolTipData[i].value[j].value + "<br>"
                            }
                        }
                    }
                    return toolTiphtml;
                }
            }
        },
        grid: {
            right: '1%',
            top: '15%',
            bottom: '10%',
        },
        geo: {
            show: true,
            map: mapName,
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false,
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#031525', //默认显示区域
                    borderColor: '#3B5077', //#3B5077
                },
                emphasis: {
                    areaColor: '#2B91B7', //进入之后的样式
                }
            }
        },
        series: [{
            name: '散点',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function (val) {
                return val[2] / 10;
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#05C3F9' //#409EFF  #05C3F9
                }
            }
        },

        {
            type: 'map',
            map: mapName,
            geoIndex: 0,
            aspectScale: 1, //长宽比
            zoom: 4,
            showLegendSymbol: false, // 存在legend时显示
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#031525',
                    borderColor: '#3B5077',
                },
                emphasis: {
                    areaColor: '#2B91B7'
                }
            },
            animation: false,
            data: data
        },
        {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 5)),
            symbolSize: function (val) {
                return val[2] / 5;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: 'yellow',
                    shadowBlur: 10,
                    shadowColor: 'yellow'
                }
            },
            zlevel: 1
        },
        {
            name: '点',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin', //气泡
            symbolSize: function (val) {
                var a = (maxSize4Pin - minSize4Pin) / (max - min);
                var b = minSize4Pin - a * min;
                b = maxSize4Pin - a * max;
                console.log(a, b)
                return a * val[2] + b * 1.2;
            },
            label: {
                normal: {
                    //formatter: '{b}',
                    //position: 'right',
                    formatter: '{@[2]}',
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 9,
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#F62157', //标志颜色
                }
            },
            zlevel: 6,
            data: convertData(data),
        },
        ]
    };
    theChart.setOption(option);
})