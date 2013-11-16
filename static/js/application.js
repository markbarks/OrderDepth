var inbox = new ReconnectingWebSocket("ws://localhost:8000/receive");
var outbox = new ReconnectingWebSocket("ws://localhost:8000/submit");

var palette = new Rickshaw.Color.Palette();


inbox.onmessage = function (message) {
    var data = JSON.parse(message.data);

    $("#chart").empty();

    console.log(data.bids[0].volume);

    var graph = new Rickshaw.Graph({
        element: document.querySelector("#chart"),
        renderer: 'bar',
        series: [
            {
                data: [
                    { x: 0, y: data.bids[0].volume },
                    { x: 1, y: data.asks[0].volume }
                ],
                color: 'DarkBlue'
            },
            {
                data: [
                    { x: 0, y: data.bids[1].volume },
                    { x: 1, y: data.asks[1].volume }
                ],
                color: 'LightGreen'
            },
            {
                data: [
                    { x: 0, y: data.bids[2].volume },
                    { x: 1, y: data.asks[2].volume }
                ],
                color: 'NavajoWhite'
            },
            {
                data: [
                    { x: 0, y: data.bids[3].volume },
                    { x: 1, y: data.asks[3].volume }
                ],
                color: 'SandyBrown'
            },
            {
                data: [
                    { x: 0, y: data.bids[4].volume },
                    { x: 1, y: data.asks[4].volume }
                ],
                color: 'FireBrick'
            }
        ]
    });

//    graph.setSeries(seriesDataArr);
//    graph.update();

    graph.render();
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