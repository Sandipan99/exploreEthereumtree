var Trie = require('merkle-patricia-tree'),
  rlp = require('rlp'),
  levelup = require('levelup');

var db = levelup('/home/sandipan/.ethereum/geth/chaindata');
var root = "0xf3d177c2987af6da0f1e96fd08eb50cd7fad346957a7fa6b86c86d90371f0b19"
var trie = new Trie(db, root);

//get a read stream object
var stream = trie.createReadStream();

stream.on('data', function (data) {
  console.log('inside stream')	
  console.log('key:' + data.key.toString('hex'));

  //accouts are rlp encoded
  var decodedVal = rlp.decode(data.value);
  console.log(decodedVal);
});

stream.on('end', function (val) {
  console.log('done reading!');
});
