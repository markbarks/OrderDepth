import json
import logging
import random
import pika
import time


def create_depth_feed():
    price_depth = {
        'bids': [
            {'price': 10 + random.uniform(0.8, 1.0), 'volume': random.randint(200, 400)},
            {'price': 10 + random.uniform(0.6, 0.8), 'volume': random.randint(50, 150)},
            {'price': 10 + random.uniform(0.4, 0.6), 'volume': random.randint(50, 100)},
            {'price': 10 + random.uniform(0.2, 0.4), 'volume': random.randint(10, 100)},
            {'price': 10 + random.uniform(0.0, 0.2), 'volume': random.randint(1, 50)},
        ],
        'asks': [
            {'price': 11 + random.uniform(0.0, 0.2), 'volume': random.randint(100, 400)},
            {'price': 11 + random.uniform(0.2, 0.4), 'volume': random.randint(50, 150)},
            {'price': 11 + random.uniform(0.4, 0.6), 'volume': random.randint(50, 100)},
            {'price': 11 + random.uniform(0.6, 0.8), 'volume': random.randint(10, 100)},
            {'price': 11 + random.uniform(0.8, 1.0), 'volume': random.randint(1, 50)},
        ],
    }

    return price_depth


def start_sending_depth_feed():
    while True:
        depth = create_depth_feed()

        depth_json = json.dumps(depth)
        print depth_json
        channel.basic_publish(exchange='',
                              routing_key='mli',
                              properties=pika.BasicProperties(
                                  content_type='application/json',
                              ),
                              body=depth_json)
        time.sleep(1)


if __name__ == '__main__':
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
    channel = connection.channel()
    channel.queue_declare(queue='mli')

    start_sending_depth_feed()

    connection.close()
