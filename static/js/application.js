var inbox = new ReconnectingWebSocket("ws://localhost:8000/receive");
//var outbox = new ReconnectingWebSocket("ws://localhost:8000/submit");


long_short_data = [
    {
        key: '1',
        color: '#d62728',
        values: [
            {
                "label": "Bid",
                "value": -1.8746444827653
            },
            {
                "label": "Ask",
                "value": 10.8746444827653
            }
        ]
    },
    {
        key: '2',
        color: '#1f77b4',
        values: [
            {
                "label": "Bid",
                "value": -25.307646510375
            }  ,
            {
                "label": "Ask",
                "value": 10.8746444827653
            }
        ]
    },
    {
        key: '3',
        color: '#2ca02c',
        values: [
            {
                "label": "Bid",
                "value": -25.307646510375
            } ,
            {
                "label": "Ask",
                "value": 10.8746444827653
            }
        ]
    }
];

function createChart(data) {
    var chart;
    nv.addGraph(function () {
        chart = nv.models.multiBarHorizontalChart()
            .x(function (d) {
                return d.label
            })
            .y(function (d) {
                return d.value
            })
            .margin({top: 30, right: 20, bottom: 50, left: 175})
            .showValues(true)
            //.tooltips(false)
            .barColor(d3.scale.category20().range())
            .transitionDuration(250)
            .stacked(true)
            .showControls(false);

        chart.yAxis.tickFormat(d3.format(',.0f'));

        d3.select('#chart svg')
            .datum(long_short_data)
            .call(chart);

        nv.utils.windowResize(chart.update);

        chart.dispatch.on('stateChange', function (e) {
            nv.log('New State:', JSON.stringify(e));
        });

        return chart;
    });
}


inbox.onmessage = function (message) {
    var data = JSON.parse(message.data);

    $("#chart").empty();

    console.log(data);
    createChart(data)
};



inbox.onclose = function () {
    console.log('inbox closed');
    this.inbox = new WebSocket(inbox.url);

};

outbox.onclose = function () {
    console.log('outbox closed');
    this.outbox = new WebSocket(outbox.url);
};
//
//$("#input-form").on("submit", function (event) {
//    event.preventDefault();
//    var handle = $("#input-handle")[0].value;
//    var text = $("#input-text")[0].value;
//    outbox.send(JSON.stringify({ handle: handle, text: text }));
//    $("#input-text")[0].value = "";
//});