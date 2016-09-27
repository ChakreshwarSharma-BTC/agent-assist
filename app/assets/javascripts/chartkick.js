! function(t) {
    "use strict";

    function e(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }

    function n(t) {
        return t instanceof Function
    }

    function a(t) {
        return !n(t) && t instanceof Object
    }

    function r(t, n) {
        var i;
        for (i in n) a(n[i]) || e(n[i]) ? (a(n[i]) && !a(t[i]) && (t[i] = {}), e(n[i]) && !e(t[i]) && (t[i] = []), r(t[i], n[i])) : void 0 !== n[i] && (t[i] = n[i])
    }

    function i(t, e) {
        var n = {};
        return r(n, t), r(n, e), n
    }

    function o(t) {
        var e, n, a, r, i, o, s, c, l, u, d;
        return u = Object.prototype.toString.call(t), "[object Date]" === u ? t : "[object String]" === u ? (a = t.match(U), a ? (d = parseInt(a[1], 10), o = parseInt(a[3], 10) - 1, e = parseInt(a[5], 10), n = parseInt(a[7], 10), i = a[9] ? parseInt(a[9], 10) : 0, l = a[11] ? parseInt(a[11], 10) : 0, r = a[12] ? 1e3 * parseFloat(Z + a[12].slice(1)) : 0, c = Date.UTC(d, o, e, n, i, l, r), a[13] && a[14] && (s = 60 * a[15], a[17] && (s += parseInt(a[17], 10)), s *= "-" === a[14] ? -1 : 1, c -= 60 * s * 1e3), new Date(c)) : void 0) : void 0
    }

    function s(t) {
        var e, n, a;
        for (e = 0; e < t.length; e++)
            for (a = t[e].data, n = 0; n < a.length; n++)
                if (a[n][1] < 0) return !0;
        return !1
    }

    function c(t, e, n, a, r, o, c) {
        return function(l, u, d) {
            var h = i({}, t);
            return h = i(h, d || {}), u.hideLegend && e(h), "min" in u ? n(h, u.min) : s(l) || n(h, 0), u.max && a(h, u.max), "stacked" in u && r(h, u.stacked), u.colors && (h.colors = u.colors), u.xtitle && o(h, u.xtitle), u.ytitle && c(h, u.ytitle), h = i(h, u.library || {})
        }
    }

    function l(t, e) {
        document.body.innerText ? t.innerText = e : t.textContent = e
    }

    function u(t, e) {
        l(t, "Error Loading Chart: " + e), t.style.color = "#ff0000"
    }

    function d(t, e, n) {
        h(e, n, function(e, n, a) {
            var r = "string" == typeof a ? a : a.message;
            u(t, r)
        })
    }

    function h(e, n, a) {
        var r = t.jQuery || t.Zepto || t.$;
        if (r) r.ajax({
            dataType: "json",
            url: e,
            success: n,
            error: a
        });
        else {
            var i = new XMLHttpRequest;
            i.open("GET", e, !0), i.setRequestHeader("Content-Type", "application/json"), i.onload = function() {
                200 === i.status ? n(JSON.parse(i.responseText), i.statusText, i) : a(i, "error", i.statusText)
            }, i.send()
        }
    }

    function f(t, e) {
        try {
            e(t)
        } catch (n) {
            throw u(t.element, n.message), n
        }
    }

    function p(t, e) {
        "string" == typeof t.dataSource ? d(t.element, t.dataSource, function(n, a, r) {
            t.data = n, f(t, e)
        }) : (t.data = t.dataSource, f(t, e))
    }

    function m(t) {
        return "" + t
    }

    function g(t) {
        return parseFloat(t)
    }

    function v(t) {
        var e, n, a, r;
        if ("object" != typeof t)
            if ("number" == typeof t) t = new Date(1e3 * t);
            else {
                if (e = t.match(Y)) return n = parseInt(e[1], 10), a = parseInt(e[3], 10) - 1, r = parseInt(e[5], 10), new Date(n, a, r);
                var i = t.replace(/ /, "T").replace(" ", "").replace("UTC", "Z");
                t = o(i) || new Date(t)
            }
        return t
    }

    function x(t) {
        if (!e(t)) {
            var n, a = [];
            for (n in t) t.hasOwnProperty(n) && a.push([n, t[n]]);
            t = a
        }
        return t
    }

    function C(t, e) {
        return t[0].getTime() - e[0].getTime()
    }

    function y(t, e) {
        return t - e
    }

    function b() {
        !J && "Highcharts" in t && (J = new function() {
            var e = t.Highcharts;
            this.name = "highcharts";
            var n = {
                    chart: {},
                    xAxis: {
                        title: {
                            text: null
                        },
                        labels: {
                            style: {
                                fontSize: "12px"
                            }
                        }
                    },
                    yAxis: {
                        title: {
                            text: null
                        },
                        labels: {
                            style: {
                                fontSize: "12px"
                            }
                        }
                    },
                    title: {
                        text: null
                    },
                    credits: {
                        enabled: !1
                    },
                    legend: {
                        borderWidth: 0
                    },
                    tooltip: {
                        style: {
                            fontSize: "12px"
                        }
                    },
                    plotOptions: {
                        areaspline: {},
                        series: {
                            marker: {}
                        }
                    }
                },
                a = function(t) {
                    t.legend.enabled = !1
                },
                r = function(t, e) {
                    t.yAxis.min = e
                },
                o = function(t, e) {
                    t.yAxis.max = e
                },
                s = function(t, e) {
                    t.plotOptions.series.stacking = e ? "normal" : null
                },
                l = function(t, e) {
                    t.xAxis.title.text = e
                },
                u = function(t, e) {
                    t.yAxis.title.text = e
                },
                d = c(n, a, r, o, s, l, u);
            this.renderLineChart = function(t, n) {
                n = n || "spline";
                var a = {};
                "areaspline" === n && (a = {
                    plotOptions: {
                        areaspline: {
                            stacking: "normal"
                        },
                        series: {
                            marker: {
                                enabled: !1
                            }
                        }
                    }
                });
                var r, i, o, s = d(t.data, t.options, a);
                s.xAxis.type = t.options.discrete ? "category" : "datetime", s.chart.type || (s.chart.type = n), s.chart.renderTo = t.element.id;
                var c = t.data;
                for (i = 0; i < c.length; i++) {
                    if (r = c[i].data, !t.options.discrete)
                        for (o = 0; o < r.length; o++) r[o][0] = r[o][0].getTime();
                    c[i].marker = {
                        symbol: "circle"
                    }
                }
                s.series = c, new e.Chart(s)
            }, this.renderScatterChart = function(t) {
                var n = {},
                    a = d(t.data, t.options, n);
                a.chart.type = "scatter", a.chart.renderTo = t.element.id, a.series = t.data, new e.Chart(a)
            }, this.renderPieChart = function(t) {
                var a = {};
                t.options.colors && (a.colors = t.options.colors);
                var r = i(i(n, a), t.options.library || {});
                r.chart.renderTo = t.element.id, r.series = [{
                    type: "pie",
                    name: t.options.label || "Value",
                    data: t.data
                }], new e.Chart(r)
            }, this.renderColumnChart = function(t, n) {
                n = n || "column";
                var a, r, i, o, s = t.data,
                    c = d(s, t.options),
                    l = [];
                for (c.chart.type = n, c.chart.renderTo = t.element.id, a = 0; a < s.length; a++)
                    for (i = s[a], r = 0; r < i.data.length; r++) o = i.data[r], l[o[0]] || (l[o[0]] = new Array(s.length)), l[o[0]][a] = o[1];
                var u = [];
                for (a in l) l.hasOwnProperty(a) && u.push(a);
                c.xAxis.categories = u;
                var h = [];
                for (a = 0; a < s.length; a++) {
                    for (o = [], r = 0; r < u.length; r++) o.push(l[u[r]][a] || 0);
                    h.push({
                        name: s[a].name,
                        data: o
                    })
                }
                c.series = h, new e.Chart(c)
            };
            var h = this;
            this.renderBarChart = function(t) {
                h.renderColumnChart(t, "bar")
            }, this.renderAreaChart = function(t) {
                h.renderLineChart(t, "areaspline")
            }
        }, K.push(J)), !q && t.google && (t.google.setOnLoadCallback || t.google.charts) && (q = new function() {
            var e = t.google;
            this.name = "google";
            var n = {},
                a = [],
                r = function() {
                    for (var t, n, r = 0; r < a.length; r++) t = a[r], n = e.visualization && ("corechart" === t.pack && e.visualization.LineChart || "timeline" === t.pack && e.visualization.Timeline), n && (t.callback(), a.splice(r, 1), r--)
                },
                o = function(i, o) {
                    if (o || (o = i, i = "corechart"), a.push({
                            pack: i,
                            callback: o
                        }), n[i]) r();
                    else {
                        n[i] = !0;
                        var s = {
                            packages: [i],
                            callback: r
                        };
                        X.language && (s.language = X.language), t.google.setOnLoadCallback ? e.load("visualization", "1", s) : e.charts.load("current", s)
                    }
                },
                s = {
                    chartArea: {},
                    fontName: "'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif",
                    pointSize: 6,
                    legend: {
                        textStyle: {
                            fontSize: 12,
                            color: "#444"
                        },
                        alignment: "center",
                        position: "right"
                    },
                    curveType: "function",
                    hAxis: {
                        textStyle: {
                            color: "#666",
                            fontSize: 12
                        },
                        titleTextStyle: {},
                        gridlines: {
                            color: "transparent"
                        },
                        baselineColor: "#ccc",
                        viewWindow: {}
                    },
                    vAxis: {
                        textStyle: {
                            color: "#666",
                            fontSize: 12
                        },
                        titleTextStyle: {},
                        baselineColor: "#ccc",
                        viewWindow: {}
                    },
                    tooltip: {
                        textStyle: {
                            color: "#666",
                            fontSize: 12
                        }
                    }
                },
                l = function(t) {
                    t.legend.position = "none"
                },
                u = function(t, e) {
                    t.vAxis.viewWindow.min = e
                },
                d = function(t, e) {
                    t.vAxis.viewWindow.max = e
                },
                h = function(t, e) {
                    t.hAxis.viewWindow.min = e
                },
                f = function(t, e) {
                    t.hAxis.viewWindow.max = e
                },
                p = function(t, e) {
                    t.isStacked = !!e
                },
                m = function(t, e) {
                    t.hAxis.title = e, t.hAxis.titleTextStyle.italic = !1
                },
                v = function(t, e) {
                    t.vAxis.title = e, t.vAxis.titleTextStyle.italic = !1
                },
                x = c(s, l, u, d, p, m, v),
                y = function(t, n) {
                    var a, r, i, o, s, c = [];
                    for (a = 0; a < t.length; a++)
                        for (i = t[a], r = 0; r < i.data.length; r++) o = i.data[r], s = "datetime" === n ? o[0].getTime() : o[0], c[s] || (c[s] = new Array(t.length)), c[s][a] = g(o[1]);
                    var l, u = [],
                        d = !0;
                    for (a in c) c.hasOwnProperty(a) && ("datetime" === n ? (l = new Date(g(a)), d = d && T(l)) : l = "number" === n ? g(a) : a, u.push([l].concat(c[a])));
                    "datetime" === n && u.sort(C);
                    var h = new e.visualization.DataTable;
                    for (n = "datetime" === n && d ? "date" : n, h.addColumn(n, ""), a = 0; a < t.length; a++) h.addColumn("number", t[a].name);
                    return h.addRows(u), h
                },
                b = function(e) {
                    t.attachEvent ? t.attachEvent("onresize", e) : t.addEventListener && t.addEventListener("resize", e, !0), e()
                };
            this.renderLineChart = function(t) {
                o(function() {
                    var n = x(t.data, t.options),
                        a = y(t.data, t.options.discrete ? "string" : "datetime");
                    t.chart = new e.visualization.LineChart(t.element), b(function() {
                        t.chart.draw(a, n)
                    })
                })
            }, this.renderPieChart = function(t) {
                o(function() {
                    var n = {
                        chartArea: {
                            top: "10%",
                            height: "80%"
                        }
                    };
                    t.options.colors && (n.colors = t.options.colors);
                    var a = i(i(s, n), t.options.library || {}),
                        r = new e.visualization.DataTable;
                    r.addColumn("string", ""), r.addColumn("number", "Value"), r.addRows(t.data), t.chart = new e.visualization.PieChart(t.element), b(function() {
                        t.chart.draw(r, a)
                    })
                })
            }, this.renderColumnChart = function(t) {
                o(function() {
                    var n = x(t.data, t.options),
                        a = y(t.data, "string");
                    t.chart = new e.visualization.ColumnChart(t.element), b(function() {
                        t.chart.draw(a, n)
                    })
                })
            }, this.renderBarChart = function(t) {
                o(function() {
                    var n = {
                            hAxis: {
                                gridlines: {
                                    color: "#ccc"
                                }
                            }
                        },
                        a = c(s, l, h, f, p, m, v)(t.data, t.options, n),
                        r = y(t.data, "string");
                    t.chart = new e.visualization.BarChart(t.element), b(function() {
                        t.chart.draw(r, a)
                    })
                })
            }, this.renderAreaChart = function(t) {
                o(function() {
                    var n = {
                            isStacked: !0,
                            pointSize: 0,
                            areaOpacity: .5
                        },
                        a = x(t.data, t.options, n),
                        r = y(t.data, t.options.discrete ? "string" : "datetime");
                    t.chart = new e.visualization.AreaChart(t.element), b(function() {
                        t.chart.draw(r, a)
                    })
                })
            }, this.renderGeoChart = function(t) {
                o(function() {
                    var n = {
                            legend: "none",
                            colorAxis: {
                                colors: t.options.colors || ["#f6c7b6", "#ce502d"]
                            }
                        },
                        a = i(i(s, n), t.options.library || {}),
                        r = new e.visualization.DataTable;
                    r.addColumn("string", ""), r.addColumn("number", t.options.label || "Value"), r.addRows(t.data), t.chart = new e.visualization.GeoChart(t.element), b(function() {
                        t.chart.draw(r, a)
                    })
                })
            }, this.renderScatterChart = function(t) {
                o(function() {
                    var n = {},
                        a = x(t.data, t.options, n),
                        r = y(t.data, "number");
                    t.chart = new e.visualization.ScatterChart(t.element), b(function() {
                        t.chart.draw(r, a)
                    })
                })
            }, this.renderTimeline = function(t) {
                o("timeline", function() {
                    var n = {
                        legend: "none"
                    };
                    t.options.colors && (n.colors = t.options.colors);
                    var a = i(i(s, n), t.options.library || {}),
                        r = new e.visualization.DataTable;
                    r.addColumn({
                        type: "string",
                        id: "Name"
                    }), r.addColumn({
                        type: "date",
                        id: "Start"
                    }), r.addColumn({
                        type: "date",
                        id: "End"
                    }), r.addRows(t.data), t.element.style.lineHeight = "normal", t.chart = new e.visualization.Timeline(t.element), b(function() {
                        t.chart.draw(r, a)
                    })
                })
            }
        }, K.push(q)), !Q && "Chart" in t && (Q = new function() {
            var e = t.Chart;
            this.name = "chartjs";
            var n = {
                    maintainAspectRatio: !1,
                    animation: !1
                },
                a = {
                    scales: {
                        yAxes: [{
                            ticks: {
                                maxTicksLimit: 4
                            },
                            scaleLabel: {
                                fontSize: 16,
                                fontColor: "#333"
                            }
                        }],
                        xAxes: [{
                            gridLines: {
                                drawOnChartArea: !1
                            },
                            scaleLabel: {
                                fontSize: 16,
                                fontColor: "#333"
                            },
                            time: {},
                            ticks: {}
                        }]
                    },
                    legend: {}
                },
                r = ["#3366CC", "#DC3912", "#FF9900", "#109618", "#990099", "#3B3EAC", "#0099C6", "#DD4477", "#66AA00", "#B82E2E", "#316395", "#994499", "#22AA99", "#AAAA11", "#6633CC", "#E67300", "#8B0707", "#329262", "#5574A6", "#3B3EAC"],
                o = function(t) {
                    t.legend.display = !1
                },
                s = function(t, e) {
                    null !== e && (t.scales.yAxes[0].ticks.min = e)
                },
                l = function(t, e) {
                    t.scales.yAxes[0].ticks.max = e
                },
                u = function(t, e) {
                    null !== e && (t.scales.xAxes[0].ticks.min = e)
                },
                d = function(t, e) {
                    t.scales.xAxes[0].ticks.max = e
                },
                h = function(t, e) {
                    t.scales.xAxes[0].stacked = !!e, t.scales.yAxes[0].stacked = !!e
                },
                f = function(t, e) {
                    t.scales.xAxes[0].scaleLabel.display = !0, t.scales.xAxes[0].scaleLabel.labelString = e
                },
                p = function(t, e) {
                    t.scales.yAxes[0].scaleLabel.display = !0, t.scales.yAxes[0].scaleLabel.labelString = e
                },
                v = function(t, n, a, r) {
                    t.element.innerHTML = "<canvas></canvas>";
                    var i = t.element.getElementsByTagName("CANVAS")[0];
                    t.chart = new e(i, {
                        type: n,
                        data: a,
                        options: r
                    })
                },
                x = function(t, e) {
                    var n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
                    return n ? "rgba(" + parseInt(n[1], 16) + ", " + parseInt(n[2], 16) + ", " + parseInt(n[3], 16) + ", " + e + ")" : t
                },
                C = function(t, e, n) {
                    var a = Math.ceil(t.element.offsetWidth / 4 / e.labels.length);
                    a > 25 && (a = 25), n.scales.xAxes[0].ticks.callback = function(t) {
                        return t = m(t), t.length > a ? t.substring(0, a - 2) + "..." : t
                    }
                },
                b = c(i(n, a), o, s, l, h, f, p),
                A = function(t, e, n) {
                    var a, o, s, c, l, u, d = [],
                        h = [],
                        f = t.options.colors || r,
                        p = !0,
                        m = !0,
                        v = !0,
                        C = !0,
                        b = !0,
                        A = !0,
                        D = ("line" === n || "area" === n) && !t.options.discrete,
                        O = t.data,
                        E = [],
                        j = [];
                    for (o = 0; o < O.length; o++)
                        for (c = O[o], s = 0; s < c.data.length; s++) l = c.data[s], u = D ? l[0].getTime() : l[0], j[u] || (j[u] = new Array(O.length)), j[u][o] = g(l[1]), -1 === E.indexOf(u) && E.push(u);
                    D && E.sort(y);
                    var B = [];
                    for (s = 0; s < O.length; s++) B.push([]);
                    var I, M;
                    for (M = 0; M < E.length; M++)
                        for (o = E[M], D ? (I = new Date(g(o)), p = p && T(I), a || (a = I.getDay()), m = m && k(I, a), v = v && z(I), C = C && L(I), b = b && S(I), A = A && w(I)) : I = o, h.push(I), s = 0; s < O.length; s++) B[s].push(j[o][s]);
                    for (o = 0; o < O.length; o++) {
                        c = O[o];
                        var F = "line" !== n ? x(f[o], .5) : f[o],
                            P = {
                                label: c.name,
                                data: B[o],
                                fill: "area" === n,
                                borderColor: f[o],
                                backgroundColor: F,
                                pointBackgroundColor: f[o],
                                borderWidth: 2
                            };
                        d.push(i(P, c.library || {}))
                    }
                    if (D && h.length > 0) {
                        var W = h[0].getTime(),
                            N = h[0].getTime();
                        for (o = 1; o < h.length; o++) I = h[o].getTime(), W > I && (W = I), I > N && (N = I);
                        var H = (N - W) / 864e5;
                        if (!e.scales.xAxes[0].time.unit) {
                            var R;
                            if (C || H > 3650 ? (e.scales.xAxes[0].time.unit = "year", R = 365) : v || H > 300 ? (e.scales.xAxes[0].time.unit = "month", R = 30) : p || H > 10 ? (e.scales.xAxes[0].time.unit = "day", R = 1) : b ? (e.scales.xAxes[0].time.unit = "hour", R = 1 / 24) : A && (e.scales.xAxes[0].time.displayFormats = {
                                    minute: "h:mm a"
                                }, e.scales.xAxes[0].time.unit = "minute", R = 1 / 24 / 60), R && H > 0) {
                                var G = Math.ceil(H / R / (t.element.offsetWidth / 100));
                                m && 1 === R && (G = 7 * Math.ceil(G / 7)), e.scales.xAxes[0].time.unitStepSize = G
                            }
                        }
                        e.scales.xAxes[0].time.tooltipFormat || (p ? e.scales.xAxes[0].time.tooltipFormat = "ll" : b ? e.scales.xAxes[0].time.tooltipFormat = "MMM D, h a" : A && (e.scales.xAxes[0].time.tooltipFormat = "h:mm a"))
                    }
                    var V = {
                        labels: h,
                        datasets: d
                    };
                    return V
                };
            this.renderLineChart = function(t, e) {
                var n = {};
                !t.options.max && O(t.data) && (t.options.max = 1);
                var a = b(t.data, i(n, t.options)),
                    r = A(t, a, e || "line");
                a.scales.xAxes[0].type = t.options.discrete ? "category" : "time", v(t, "line", r, a)
            }, this.renderPieChart = function(t) {
                for (var e = i(n, t.options.library || {}), a = [], o = [], s = 0; s < t.data.length; s++) {
                    var c = t.data[s];
                    a.push(c[0]), o.push(c[1])
                }
                var l = {
                    labels: a,
                    datasets: [{
                        data: o,
                        backgroundColor: t.options.colors || r
                    }]
                };
                v(t, "pie", l, e)
            }, this.renderColumnChart = function(t, e) {
                var r;
                r = "bar" === e ? c(i(n, a), o, u, d, h, f, p)(t.data, t.options) : b(t.data, t.options);
                var s = A(t, r, "column");
                C(t, s, r), v(t, "bar" === e ? "horizontalBar" : "bar", s, r)
            };
            var D = this;
            this.renderAreaChart = function(t) {
                D.renderLineChart(t, "area")
            }, this.renderBarChart = function(t) {
                D.renderColumnChart(t, "bar")
            }, this.renderScatterChart = function(t) {
                for (var e = b(t.data, t.options), n = t.options.colors || r, a = [], i = t.data, o = 0; o < i.length; o++) {
                    for (var s = i[o], c = [], l = 0; l < s.data.length; l++) c.push({
                        x: g(s.data[l][0]),
                        y: g(s.data[l][1])
                    });
                    a.push({
                        label: s.name,
                        showLine: !1,
                        data: c,
                        borderColor: n[o],
                        backgroundColor: n[o],
                        pointBackgroundColor: n[o]
                    })
                }
                var u = {
                    datasets: a
                };
                e.scales.xAxes[0].type = "linear", e.scales.xAxes[0].position = "bottom", v(t, "line", u, e)
            }
        }, K.unshift(Q))
    }

    function A(t, e) {
        var a, r, i, o;
        for (i = "render" + t, o = e.options.adapter, b(), a = 0; a < K.length; a++)
            if (r = K[a], (!o || o === r.name) && n(r[i])) return r[i](e);
        throw new Error("No adapter found")
    }

    function w(t) {
        return 0 === t.getMilliseconds() && 0 === t.getSeconds()
    }

    function S(t) {
        return w(t) && 0 === t.getMinutes()
    }

    function T(t) {
        return S(t) && 0 === t.getHours()
    }

    function k(t, e) {
        return T(t) && t.getDay() === e
    }

    function z(t) {
        return T(t) && 1 === t.getDate()
    }

    function L(t) {
        return z(t) && 0 === t.getMonth()
    }

    function D(t) {
        return !isNaN(v(t)) && m(t).length >= 6
    }

    function O(t) {
        var e, n, a;
        for (e = 0; e < t.length; e++)
            for (a = t[e].data, n = 0; n < a.length; n++)
                if (0 != a[n][1]) return !1;
        return !0
    }

    function E(t) {
        var e, n, a;
        for (e = 0; e < t.length; e++)
            for (a = x(t[e].data), n = 0; n < a.length; n++)
                if (!D(a[n][0])) return !0;
        return !1
    }

    function j(t, n, a) {
        var r;
        for (!e(t) || "object" != typeof t[0] || e(t[0]) ? (t = [{
                name: n.label || "Value",
                data: t
            }], n.hideLegend = !0) : n.hideLegend = !1, (null === n.discrete || void 0 === n.discrete) && (n.discrete = E(t)), n.discrete && (a = "string"), r = 0; r < t.length; r++) t[r].data = tt(x(t[r].data), a);
        return t
    }

    function B(t) {
        var e, n = x(t);
        for (e = 0; e < n.length; e++) n[e] = [m(n[e][0]), g(n[e][1])];
        return n
    }

    function I(t) {
        var e;
        for (e = 0; e < t.length; e++) t[e][1] = v(t[e][1]), t[e][2] = v(t[e][2]);
        return t
    }

    function M(t) {
        t.data = j(t.data, t.options, "datetime"), A("LineChart", t)
    }

    function F(t) {
        t.data = j(t.data, t.options, "string"), A("ColumnChart", t)
    }

    function P(t) {
        t.data = B(t.data), A("PieChart", t)
    }

    function W(t) {
        t.data = j(t.data, t.options, "string"), A("BarChart", t)
    }

    function N(t) {
        t.data = j(t.data, t.options, "datetime"), A("AreaChart", t)
    }

    function H(t) {
        t.data = B(t.data), A("GeoChart", t)
    }

    function R(t) {
        t.data = j(t.data, t.options, "number"), A("ScatterChart", t)
    }

    function G(t) {
        t.data = I(t.data), A("Timeline", t)
    }

    function V(t, e, n, a, r) {
        var i;
        if ("string" == typeof e && (i = e, e = document.getElementById(e), !e)) throw new Error("No element with id " + i);
        t.element = e, t.options = a || {}, t.dataSource = n, t.getElement = function() {
            return e
        }, t.getData = function() {
            return t.data
        }, t.getOptions = function() {
            return a || {}
        }, t.getChartObject = function() {
            return t.chart
        }, $.charts[e.id] = t, p(t, r)
    }
    var $, U, Z, q, J, Q, X = t.Chartkick || {},
        K = [],
        Y = /^(\d\d\d\d)(\-)?(\d\d)(\-)?(\d\d)$/i;
    U = /(\d\d\d\d)(\-)?(\d\d)(\-)?(\d\d)(T)?(\d\d)(:)?(\d\d)?(:)?(\d\d)?([\.,]\d+)?($|Z|([\+\-])(\d\d)(:)?(\d\d)?)/i, Z = String(1.5).charAt(1);
    var _ = function(t, e) {
            return t = "number" === e ? g(t) : "datetime" === e ? v(t) : m(t)
        },
        tt = function(t, e) {
            var n, a, r = [];
            for (a = 0; a < t.length; a++) n = _(t[a][0], e), r.push([n, g(t[a][1])]);
            return "datetime" === e && r.sort(C), r
        };
    $ = {
        LineChart: function(t, e, n) {
            V(this, t, e, n, M)
        },
        PieChart: function(t, e, n) {
            V(this, t, e, n, P)
        },
        ColumnChart: function(t, e, n) {
            V(this, t, e, n, F)
        },
        BarChart: function(t, e, n) {
            V(this, t, e, n, W)
        },
        AreaChart: function(t, e, n) {
            V(this, t, e, n, N)
        },
        GeoChart: function(t, e, n) {
            V(this, t, e, n, H)
        },
        ScatterChart: function(t, e, n) {
            V(this, t, e, n, R)
        },
        Timeline: function(t, e, n) {
            V(this, t, e, n, G)
        },
        charts: {},
        configure: function(t) {
            for (var e in t) t.hasOwnProperty(e) && (X[e] = t[e])
        }
    }, "object" == typeof module && "object" == typeof module.exports ? module.exports = $ : t.Chartkick = $
}(window);