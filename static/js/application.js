var inbox = new ReconnectingWebSocket("ws://localhost:8000/receive");
nv.dev = false

function addChart() {
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
            .barColor(d3.scale.category20c().range())
            .transitionDuration(250)
            .stacked(true)
            .showLegend(false)
            .showControls(false);

        chart.yAxis.tickFormat(d3.format(',.0f'));
        chart.forceY([-6000, 6000]);

        d3.select('#chart svg')
            .datum(data)
            .call(chart);

        return chart;
    });
}


// Initialize data container
var data = new Array(30);
for (var x = 0; x < data.length; ++x) {
    data[x] = { key: x, values: [
        { label: 'Bid', value: 0},
        { label: 'Ask', value: 0}
    ]
    }
}

inbox.onmessage = function (message) {
    var update = JSON.parse(message.data);
    update['bids'].forEach(function (bid) {
        data[bid.index].values[0] = { label: 'Bid', value: bid.volume};
    });
    update['asks'].forEach(function (ask) {
        data[ask.index].values[1] = { label: 'Ask', value: ask.volume};
    });
    addChart()
};

