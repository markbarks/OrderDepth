from Queue import Queue
import threading
from flask import Flask, render_template
from flask.ext.sockets import Sockets
import pika


app = Flask(__name__)

sockets = Sockets(app)


@app.route('/')
def order_depth():
    return render_template('order_depth.html')


q = Queue()


@sockets.route('/receive')
def outbox(ws):
    while ws.socket is not None:
        item = q.get(block=True)
        ws.send(item)


def receive_command():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
    channel = connection.channel()
    channel.queue_declare(queue='mli')

    def callback_rabbit(ch, method, properties, body):
        q.put(body)

    channel.basic_consume(callback_rabbit, queue='mli', no_ack=True)
    channel.start_consuming()


def start_consumer():
    t = threading.Thread(target=receive_command)
    t.setDaemon(True)
    t.start()


consumer_thread = start_consumer()

