//Just importing the requirements
var Trie = require('merkle-patricia-tree/secure');
var levelup = require('levelup');
var leveldown = require('leveldown');
var level = require('level')
var RLP = require('rlp');
var assert = require('assert');

//Connecting to the leveldb database
var db = level('/home/sandipan/.ethereum/geth/chaindata');

//Adding the "stateRoot" value from the block so that we can inspect the state root at that block height.
var root = '';

//Creating a trie object of the merkle-patricia-tree library
var trie = new Trie(db, root);

//Creating a nodejs stream object so that we can access the data
var stream = trie.createReadStream()

//Turning on the stream (because the node js stream is set to pause by default)
stream.on('data', function (data){
  //printing out the keys of the "state trie"
  console.log(data.key);
});