from flask import Flask
from flask import render_template
from firebase import firebase

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('home.html')
    #return 'Hello World!'

@app.route('/main')
def main_page():
    return render_template('main.html')

@app.route('/map/<mapid>')
def get_map(mapid):
    f = firebase.FirebaseApplication('https://coolmap.firebaseIO.com', None)
    map = f.get('/map/' + mapid, None)

    print map

    return 'hello'

if __name__ == '__main__':
    app.run()
