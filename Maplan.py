import requests
from flask import Flask, request
from flask import render_template
from firebase import firebase

app = Flask(__name__)
setattr(app, 'auth_token', '')
setattr(app, 'uname', '')


@app.route('/')
def hello_world():
    if app.auth_token is '':
        return render_template('index.html')
    else:
        print app.uname
        return render_template('main.html', name=app.uname)


@app.route('/authorize')
def authorize():
    return render_template('authorize.html')


@app.route('/savetoken', methods=['POST'])
def save_token():
    print 'here'
    app.auth_token = request.form['q']
    app.uname = request.form['name']
    #print request.form['q']
    return 'success'


@app.route('/map/<mapid>')
def get_map(mapid):
    f = firebase.FirebaseApplication('https://coolmap.firebaseIO.com', None)
    map = f.get('/map/' + mapid, None)
    print map

    return 'hello'

if __name__ == '__main__':
    app.run()
