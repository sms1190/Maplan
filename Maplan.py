import requests
from flask import Flask, request
from flask import render_template
from firebase import firebase

app = Flask(__name__)
setattr(app, 'auth_token', '')
setattr(app, 'uname', '')
setattr(app, 'email', '')


@app.route('/')
def hello_world():
    if app.auth_token is '':
        return render_template('index.html')
    else:
        return render_template('main.html', name=app.uname, email=app.email)

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/authorize')
def authorize():
    return render_template('authorize.html')


@app.route('/savetoken', methods=['POST'])
def save_token():
    app.auth_token = request.form['q']
    app.uname = request.form['name']
    app.email = request.form['email']
    return 'success'


@app.route('/map/<mapid>')
def get_map(mapid):
    if app.auth_token == '':
        return render_template('index.html')
    else:
        f = firebase.FirebaseApplication('https://coolmap.firebaseIO.com', None)
        map = f.get('/map/' + mapid, None)
        print map

        return render_template('map.html', mapid=mapid, name='vaibbhav')

@app.route('/map/view_maps')
def get_all_maps():
    return render_template('view_maps.html')

if __name__ == '__main__':
    app.run()
