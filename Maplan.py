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

@app.route('/map/<id>')
def get_map():



    return render_template('map.html')

if __name__ == '__main__':
    app.run()
