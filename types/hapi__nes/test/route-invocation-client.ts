// from https://github.com/hapijs/nes#route-invocation

import Nes = require('@hapi/nes');

var client = new Nes.Client('ws://localhost');
client.connect().then(() => {

    return client.request('hello');
});

// Added in addition to nes doc example code

import NesClient = require('@hapi/nes/client');

var client = new NesClient('ws://localhost');
client.connect().then(() => {

    return client.request('hello');
});
