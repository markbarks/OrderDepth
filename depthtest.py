import json
import random
import time


price_depth = {
    'bids': [
        {'price': 10.0, 'volume': 100},
        {'price': 10.0, 'volume': 100}
    ],
    'asks': [
        {'price': 10.0, 'volume': 100},
        {'price': 10.0, 'volume': 100}
    ],
}

while True:
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

    time.sleep(0.5)
    print json.dumps(price_depth)
