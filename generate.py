#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Nov 12 21:53:09 2020

@author: halidziya
"""

import os
os.environ['CUDA_VISIBLE_DEVICES'] = '-1'
import tensorflow.keras.layers as kl
from tensorflow.keras.models import Model
import numpy as np
import matplotlib.pyplot as plt
from flask import Flask



def generate():
    lin = kl.Input((None,2))
    lstm = kl.LSTM(2, activation='tanh')(lin)
    model = Model(lin, lstm)
    x=[np.random.rand(2)]
    for i in range(20): 
        x.append( np.array(x[-1]) + model.predict(np.array(x)[np.newaxis])[0])
    x = np.array(x).tolist()
    return x


app = Flask(__name__)
@app.route('/generate')
def get_generation():
    return str(generate())

@app.route('/')
def main():
    with open('index.html') as fil:
        html = fil.read()
    return html

@app.route('/grapher.js')
def script():
    with open('grapher.js') as fil:
        html = fil.read()
    return html