const express = require('express');
const fs = require('fs');

const app = express();

var zmq = require('zmq'),
    publisher = zmq.socket('pub'),
    subscriber = zmq.socket('sub');

subscriber.subscribe("temperature");
subscriber.subscribe("humidity");
subscriber.subscribe("weather");
subscriber.subscribe("wind");

subscriber.connect('tcp://*:7777');