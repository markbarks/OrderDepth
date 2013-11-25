var inbox = new ReconnectingWebSocket("ws://localhost:8000/receive");

function addChart(data) {
    var chart;
    nv.addGraph(function () {
        var width = 500,
            height = 150;

        chart = nv.models.multiBarHorizontalChart()
            .width(width)
            .height(height)
            .x(function (d) {
                return d.label
            })
            .y(function (d) {
                return d.value
            })
            .margin({top: 30, right: 20, bottom: 50, left: 30})
            .showValues(true)
            .tooltips(false)
            .barColor(d3.scale.category20().range())
            .transitionDuration(250)
            .stacked(true)
            .showLegend(false)
            .showControls(false);

        chart.yAxis.tickFormat(d3.format(',.0f'));
        chart.forceY([-800, 800])

        d3.select('#chart svg')
            .datum(data)
            .call(chart);

        return chart;
    });
}


inbox.onmessage = function (message) {
    var data = JSON.parse(message.data);
    addChart(data)
};