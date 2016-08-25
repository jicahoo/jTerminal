//npm install ssh2
var Client = require('ssh2').Client;

var conn = new Client();
conn.on('ready', function() {
    console.log('Client :: ready');
    conn.shell(function(err, stream) {
        if (err) throw err;
        stream.on('close', function() {
            console.log('Stream :: close');
            conn.end();
        }).on('data', function(data) {
            console.log('STDOUT: ' + data);
        }).stderr.on('data', function(data) {
            console.log('STDERR: ' + data);
        });
        stream.end('ls -l\nexit\n');
    });
}).connect({
    host: '10.108.53.81',
    port: 22,
    username: 'root',
    //password:'c4proto!',
//tryKeyboard: true,
    privateKey: require('fs').readFileSync('/home/c4dev/nodejs/workspace/temp_id_rsa')
});
