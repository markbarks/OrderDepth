import json


def convert_ob(ob_str):
    ob = json.loads(ob_str)
    inv = list()
    colours = ['DarkBlue', 'LightGreen', 'NavajoWhite', 'SandyBrown', 'FireBrick']
    c = 1
    for b, a in zip(ob['bids'], ob['asks']):
        level = {'key': c,
                 'color': colours[c - 1],
                 'values': [
                     {'label': 'Bid',
                      'value': b['volume']},
                     {'label': 'Ask',
                      'value': -1 * a['volume']},
                 ]}
        inv.append(level)
        c += 1

    return json.dumps(inv)