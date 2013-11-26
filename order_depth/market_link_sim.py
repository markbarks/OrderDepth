import json
import logging
import random
import pika
import time


def create_depth_feed(bid_updates, ask_updates):
    price_depth = dict(bids=[], asks=[])

    for bid_update in bid_updates:
        price_depth['bids'].append(dict(price=10 - bid_update * 0.1,
                                        volume=random.randint(200, 400),
                                        index=bid_update))

    for ask_update in ask_updates:
        price_depth['asks'].append(dict(price=10 + ask_update * 0.1,
                                        volume=random.randint(200, 400),
                                        index=ask_update))

    return price_depth


def send_depth_feed(depth):
    depth_json = json.dumps(depth)
    print depth_json
    channel.basic_publish(exchange='',
                          routing_key='mli',
                          properties=pika.BasicProperties(
                              content_type='application/json',
                          ),
                          body=depth_json)
    time.sleep(0.3)


def start_sending_depth_feed():

    depth = create_depth_feed(range(0, 17), range(0, 17))
    send_depth_feed(depth)

    while True:
        bid_updates = set([random.randint(0, 17) for p in range(0, random.randint(1, 9))])
        ask_updates = set([random.randint(0, 17) for p in range(0, random.randint(1, 9))])
        depth = create_depth_feed(bid_updates, ask_updates)

        send_depth_feed(depth)


if __name__ == '__main__':
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
    channel = connection.channel()
    channel.queue_declare(queue='mli')

    start_sending_depth_feed()

    connection.close()


