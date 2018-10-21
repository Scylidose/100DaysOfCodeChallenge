const express = require('express');
const fs = require('fs');

const app = express();

var zmq = require('zmq'),
    publisher = zmq.socket('pub'),
    subscriber = zmq.socket('sub');