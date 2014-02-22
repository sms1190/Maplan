from flask import Flask
from flask import render_template

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('home.html')
    #return 'Hello World!'


@app.route('/map/<id>')
def get_map():
    return render_template('map.html')

if __name__ == '__main__':
    app.run()
