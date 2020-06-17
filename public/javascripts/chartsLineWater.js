$(document).ready(function () {

    /**默认参数 */
    var xAxisData = ["13:00", "13:05", "13:10", "13:15", "13:20", "13:25", "13:30", "13:35"];
    var seriesData01 = [170, 182, 191, 215, 195, 210, 178, 210];
    var seriesData02 = [120, 110, 125, 145, 122, 165, 122, 215];
    var seriesData03 = [156, 167, 178, 185, 166, 280, 133, 260];
    var seriesData04 = [145, 136, 146, 156, 134, 178, 167, 132];
    var seriesData05 = [];
    var seriesData06 = [];
    var seriesData07 = [];
    var seriesData08 = [];
    var seriesData09 = [];

    var setData = async () => {
        await $.ajax({
            type: 'GET',
            datatype: 'JSON',
            url: 'http://39.99.213.143:8888/dash/getRealTimeWaterProduction',
            success: (results) => {
                // console.table(results)
                let keys = Object.keys(results[0])
                let time = []
                let data = []
                seriesData01 = []
                seriesData02 = []
                seriesData03 = []
                seriesData04 = []
                // console.log(keys)
                results.forEach((item) => {
                    // console.log(DT)
                    time.push(toBeijingTime(item.dt))
                    seriesData01.push(item[keys[1]])
                    seriesData02.push(item[keys[2]])
                    seriesData03.push(item[keys[3]])
                    seriesData04.push(item[keys[4]])
                    seriesData05.push(item[keys[5]])
                    seriesData06.push(item[keys[6]])
                    seriesData07.push(item[keys[7]])
                    seriesData08.push(item[keys[8]])
                    seriesData09.push(item[keys[9]])
                })
                xAxisData = time
            }
        })
        draw()
    }
    setData()

    setInterval(setData, 10000)

    var draw = () => {
        var theChart = echarts.init(document.getElementById('chartsLineWater'));
        option = {
            "backgroundColor": "RGBA(0,0,0,0)",
            "title": {
                "left": "center",
                "text": "实时产水量",
                "textStyle": {
                    "color": "#fff",
                    "fontFamily": 'PingFangSC',
                    "fontWight": 'bold'
                }
            },
            "tooltip": {
                "trigger": "axis",
                "axisPointer": {
                    "lineStyle": {
                        "color": "#57617B"
                    }
                }
            },
            "grid": {
                "top": "16%",
                "left": "4%",
                "right": "3%",
                "bottom": "2%",
                "containLabel": true
            },
            "xAxis": [{
                "type": "category",
                "boundaryGap": false,
                "axisLine": {
                    "lineStyle": {
                        "color": "#B7B7B7"
                    }
                },
                "data": xAxisData
            }],
            "yAxis": [{
                "type": "value",
                "name": "单位（m3）",
                "axisTick": {
                    "show": false
                },
                "axisLine": {
                    "lineStyle": {
                        "color": "#B7B7B7"
                    }
                },
                "axisLabel": {
                    "margin": 10,
                    "textStyle": {
                        "fontSize": 14
                    }
                },
                "splitLine": {
                    "lineStyle": {
                        "color": "#57617B"
                    }
                }
            }],
            "series": [{
                "name": "启蒙",
                "type": "line",
                "smooth": true,
                "symbol": "circle",
                "symbolSize": 5,
                "showSymbol": false,
                "lineStyle": {
                    "normal": {
                        "width": 3
                    }
                },
                "areaStyle": {
                    "normal": {
                        "color": {
                            "x": 0,
                            "y": 0,
                            "x2": 1,
                            "y2": 0,
                            "type": "linear",
                            "global": false,
                            "colorStops": [{
                                "offset": 0,
                                "color": "#9BBCFC"
                            },
                            {
                                "offset": 1,
                                "color": "#00A7FA"
                            }]
                        },
                        "shadowColor": "rgba(0, 0, 0, 0.1)",
                        "shadowBlur": 10
                    }
                },
                "itemStyle": {
                    "normal": {
                        "color": {
                            "x": 0,
                            "y": 0,
                            "x2": 1,
                            "y2": 0,
                            "type": "linear",
                            "global": false,
                            "colorStops": [{
                                "offset": 0,
                                "color": "rgba(16,97,204,1)"
                            },
                            {
                                "offset": 1,
                                "color": "rgba(17,235,210,1)"
                            }
                            ]
                        }
                    },
                    "emphasis": {
                        "color": "rgb(0,196,132)",
                        "borderColor": "rgba(0,196,132,0.2)",
                        "extraCssText": "box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);",
                        "borderWidth": 10
                    }
                },
                "data": seriesData01,
            },
            {
                "name": "平略",
                "type": "line",
                "smooth": true,
                "symbol": "circle",
                "symbolSize": 5,
                "showSymbol": false,
                "lineStyle": {
                    "normal": {
                        "width": 3
                    }
                },
                "areaStyle": {
                    "normal": {
                        "color": {
                            "x": 0,
                            "y": 0,
                            "x2": 0,
                            "y2": 1,
                            "type": "linear",
                            "global": false,
                            "colorStops": [{
                                "offset": 0,
                                "color": "#9BBCFC"
                            },
                            {
                                "offset": 1,
                                "color": "#00A7FA"
                            }]
                        },
                        "shadowColor": "rgba(0, 0, 0, 0.1)",
                        "shadowBlur": 10
                    }
                },
                "itemStyle": {
                    "normal": {
                        "color": {
                            "x": 0,
                            "y": 0,
                            "x2": 1,
                            "y2": 0,
                            "type": "linear",
                            "global": false,
                            "colorStops": [{
                                "offset": 0,
                                "color": "#9BBCFC"
                            },
                            {
                                "offset": 1,
                                "color": "#00A7FA"
                            }]
                        }
                    },
                    "emphasis": {
                        "color": "rgb(99,250,235)",
                        "borderColor": "rgba(99,250,235,0.2)",
                        "extraCssText": "box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);",
                        "borderWidth": 10
                    }
                },
                "data": seriesData02
            },
            {
                "name": "茅坪",
                "type": "line",
                "smooth": true,
                "symbol": "circle",
                "symbolSize": 5,
                "showSymbol": false,
                "lineStyle": {
                    "normal": {
                        "width": 3
                    }
                },
                "areaStyle": {
                    "normal": {
                        "color": {
                            "x": 0,
                            "y": 0,
                            "x2": 0,
                            "y2": 1,
                            "type": "linear",
                            "global": false,
                            "colorStops": [{
                                "offset": 0,
                                "color": "rgba(205,52,42, 0.5)"
                            },
                            {
                                "offset": 0.8,
                                "color": "rgba(235,235,21, 0)"
                            }
                            ]
                        },
                        "shadowColor": "rgba(0, 0, 0, 0.1)",
                        "shadowBlur": 10
                    }
                },
                "itemStyle": {
                    "normal": {
                        "color": {
                            "x": 0,
                            "y": 0,
                            "x2": 1,
                            "y2": 0,
                            "type": "linear",
                            "global": false,
                            "colorStops": [{
                                "offset": 0,
                                "color": "#9BBCFC"
                            },
                            {
                                "offset": 1,
                                "color": "#00A7FA"
                            }]
                        }
                    },
                    "emphasis": {
                        "color": "#6BC98A",
                        "borderColor": "rgba(20,250,35,0.2)",
                        "extraCssText": "box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);",
                        "borderWidth": 10
                    }
                },
                "data": seriesData03
            },
            {
                "name": "平秋",
                "type": "line",
                "smooth": true,
                "symbol": "circle",
                "symbolSize": 5,
                "showSymbol": false,
                "lineStyle": {
                    "normal": {
                        "width": 3
                    }
                },
                "areaStyle": {
                    "normal": {
                        "color": {
                            "x": 0,
                            "y": 0,
                            "x2": 1,
                            "y2": 0,
                            "type": "linear",
                            "global": false,
                            "colorStops": [{
                                "offset": 0,
                                "color": "rgba(16,97,204, 0.3)"
                            },
                            {
                                "offset": 0.8,
                                "color": "rgba(17,235,210, 0)"
                            }
                            ]
                        },
                        "shadowColor": "rgba(0, 0, 0, 0.1)",
                        "shadowBlur": 10
                    }
                },
                "itemStyle": {
                    "normal": {
                        "color": {
                            "x": 0,
                            "y": 0,
                            "x2": 1,
                            "y2": 0,
                            "type": "linear",
                            "global": false,
                            "colorStops": [{
                                "offset": 0,
                                "color": "#9BBCFC"
                            },
                            {
                                "offset": 1,
                                "color": "#00A7FA"
                            }
                            ]
                        }
                    },
                    "emphasis": {
                        "color": "rgb(0,196,132)",
                        "borderColor": "rgba(0,196,132,0.2)",
                        "extraCssText": "box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);",
                        "borderWidth": 10
                    }
                },
                "data": seriesData04
            },
            {
                "name": "新化",
                "type": "line",
                "smooth": true,
                "symbol": "circle",
                "symbolSize": 5,
                "showSymbol": false,
                "lineStyle": {
                    "normal": {
                        "width": 3
                    }
                },
                "areaStyle": {
                    "normal": {
                        "color": {
                            "x": 0,
                            "y": 0,
                            "x2": 1,
                            "y2": 0,
                            "type": "linear",
                            "global": false,
                            "colorStops": [{
                                "offset": 0,
                                "color": "rgba(16,97,204, 0.3)"
                            },
                            {
                                "offset": 0.8,
                                "color": "rgba(17,235,210, 0)"
                            }
                            ]
                        },
                        "shadowColor": "rgba(0, 0, 0, 0.1)",
                        "shadowBlur": 10
                    }
                },
                "itemStyle": {
                    "normal": {
                        "color": {
                            "x": 0,
                            "y": 0,
                            "x2": 1,
                            "y2": 0,
                            "type": "linear",
                            "global": false,
                            "colorStops": [{
                                "offset": 0,
                                "color": "#9BBCFC"
                            },
                            {
                                "offset": 1,
                                "color": "#00A7FA"
                            }
                            ]
                        }
                    },
                    "emphasis": {
                        "color": "rgb(0,196,132)",
                        "borderColor": "rgba(0,196,132,0.2)",
                        "extraCssText": "box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);",
                        "borderWidth": 10
                    }
                },
                "data": seriesData05
            },
            {
                "name": "大同",
                "type": "line",
                "smooth": true,
                "symbol": "circle",
                "symbolSize": 5,
                "showSymbol": false,
                "lineStyle": {
                    "normal": {
                        "width": 3
                    }
                },
                "areaStyle": {
                    "normal": {
                        "color": {
                            "x": 0,
                            "y": 0,
                            "x2": 1,
                            "y2": 0,
                            "type": "linear",
                            "global": false,
                            "colorStops": [{
                                "offset": 0,
                                "color": "rgba(16,97,204, 0.3)"
                            },
                            {
                                "offset": 0.8,
                                "color": "rgba(17,235,210, 0)"
                            }
                            ]
                        },
                        "shadowColor": "rgba(0, 0, 0, 0.1)",
                        "shadowBlur": 10
                    }
                },
                "itemStyle": {
                    "normal": {
                        "color": {
                            "x": 0,
                            "y": 0,
                            "x2": 1,
                            "y2": 0,
                            "type": "linear",
                            "global": false,
                            "colorStops": [{
                                "offset": 0,
                                "color": "#9BBCFC"
                            },
                            {
                                "offset": 1,
                                "color": "#00A7FA"
                            }
                            ]
                        }
                    },
                    "emphasis": {
                        "color": "rgb(0,196,132)",
                        "borderColor": "rgba(0,196,132,0.2)",
                        "extraCssText": "box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);",
                        "borderWidth": 10
                    }
                },
                "data": seriesData06
            },
            {
                "name": "钟灵",
                "type": "line",
                "smooth": true,
                "symbol": "circle",
                "symbolSize": 5,
                "showSymbol": false,
                "lineStyle": {
                    "normal": {
                        "width": 3
                    }
                },
                "areaStyle": {
                    "normal": {
                        "color": {
                            "x": 0,
                            "y": 0,
                            "x2": 1,
                            "y2": 0,
                            "type": "linear",
                            "global": false,
                            "colorStops": [{
                                "offset": 0,
                                "color": "rgba(16,97,204, 0.3)"
                            },
                            {
                                "offset": 0.8,
                                "color": "rgba(17,235,210, 0)"
                            }
                            ]
                        },
                        "shadowColor": "rgba(0, 0, 0, 0.1)",
                        "shadowBlur": 10
                    }
                },
                "itemStyle": {
                    "normal": {
                        "color": {
                            "x": 0,
                            "y": 0,
                            "x2": 1,
                            "y2": 0,
                            "type": "linear",
                            "global": false,
                            "colorStops": [{
                                "offset": 0,
                                "color": "#9BBCFC"
                            },
                            {
                                "offset": 1,
                                "color": "#00A7FA"
                            }
                            ]
                        }
                    },
                    "emphasis": {
                        "color": "rgb(0,196,132)",
                        "borderColor": "rgba(0,196,132,0.2)",
                        "extraCssText": "box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);",
                        "borderWidth": 10
                    }
                },
                "data": seriesData07
            },
            {
                "name": "铜鼓",
                "type": "line",
                "smooth": true,
                "symbol": "circle",
                "symbolSize": 5,
                "showSymbol": false,
                "lineStyle": {
                    "normal": {
                        "width": 3
                    }
                },
                "areaStyle": {
                    "normal": {
                        "color": {
                            "x": 0,
                            "y": 0,
                            "x2": 1,
                            "y2": 0,
                            "type": "linear",
                            "global": false,
                            "colorStops": [{
                                "offset": 0,
                                "color": "rgba(16,97,204, 0.3)"
                            },
                            {
                                "offset": 0.8,
                                "color": "rgba(17,235,210, 0)"
                            }
                            ]
                        },
                        "shadowColor": "rgba(0, 0, 0, 0.1)",
                        "shadowBlur": 10
                    }
                },
                "itemStyle": {
                    "normal": {
                        "color": {
                            "x": 0,
                            "y": 0,
                            "x2": 1,
                            "y2": 0,
                            "type": "linear",
                            "global": false,
                            "colorStops": [{
                                "offset": 0,
                                "color": "#9BBCFC"
                            },
                            {
                                "offset": 1,
                                "color": "#00A7FA"
                            }
                            ]
                        }
                    },
                    "emphasis": {
                        "color": "rgb(0,196,132)",
                        "borderColor": "rgba(0,196,132,0.2)",
                        "extraCssText": "box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);",
                        "borderWidth": 10
                    }
                },
                "data": seriesData08
            },
            {
                "name": "长岭",
                "type": "line",
                "smooth": true,
                "symbol": "circle",
                "symbolSize": 5,
                "showSymbol": false,
                "lineStyle": {
                    "normal": {
                        "width": 3
                    }
                },
                "areaStyle": {
                    "normal": {
                        "color": {
                            "x": 0,
                            "y": 0,
                            "x2": 1,
                            "y2": 0,
                            "type": "linear",
                            "global": false,
                            "colorStops": [{
                                "offset": 0,
                                "color": "rgba(16,97,204, 0.3)"
                            },
                            {
                                "offset": 0.8,
                                "color": "rgba(17,235,210, 0)"
                            }
                            ]
                        },
                        "shadowColor": "rgba(0, 0, 0, 0.1)",
                        "shadowBlur": 10
                    }
                },
                "itemStyle": {
                    "normal": {
                        "color": {
                            "x": 0,
                            "y": 0,
                            "x2": 1,
                            "y2": 0,
                            "type": "linear",
                            "global": false,
                            "colorStops": [{
                                "offset": 0,
                                "color": "#9BBCFC"
                            },
                            {
                                "offset": 1,
                                "color": "#00A7FA"
                            }]
                        }
                    },
                    "emphasis": {
                        "color": "rgb(0,196,132)",
                        "borderColor": "rgba(0,196,132,0.2)",
                        "extraCssText": "box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);",
                        "borderWidth": 10
                    }
                },
                "data": seriesData09
            }
            ]
        };
        theChart.setOption(option);
    }
})


function toBeijingTime(time) {
    let btime = new Date(time)
    let bticket = (btime.getTime())
    let newTime = new Date(bticket)

    let thisYear = newTime.getFullYear()
    let thismonth = newTime.getMonth() + 1
    let thisDay = newTime.getDay()

    let thisHour = (newTime.getHours() > 9 ? newTime.getHours() : ('0' + newTime.getHours()))
    let thisMin = (newTime.getMinutes() > 9 ? newTime.getMinutes() : ('0' + newTime.getMinutes()))
    let thisSec = (newTime.getSeconds() > 9 ? newTime.getSeconds() : ('0' + newTime.getSeconds()))

    return `${thisYear}-${thismonth}-${thisDay} ${thisHour}:${thisMin}:${thisSec}`
}