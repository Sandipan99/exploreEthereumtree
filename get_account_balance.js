//Mozilla Public License 2.0
//As per https://github.com/ethereumjs/ethereumjs-vm/blob/master/LICENSE
//Requires the following packages to run as nodejs file https://gist.github.com/tpmccallum/0e58fc4ba9061a2e634b7a877e60143a

//Getting the requirements
var Trie = require('merkle-patricia-tree/secure');
var levelup = require('levelup');
var leveldown = require('leveldown');
var utils = require('ethereumjs-util');
var BN = utils.BN;
var Account = require('ethereumjs-account');

//Connecting to the leveldb database
var db = levelup('/home/sandipan/.ethereum/geth/chaindata',{db: leveldown});

//Adding the "stateRoot" value from the block so that we can inspect the state root at that block height.
var root = '0xf3d177c2987af6da0f1e96fd08eb50cd7fad346957a7fa6b86c86d90371f0b19';

//Creating a trie object of the merkle-patricia-tree library
var trie = new Trie(db, root);

var address = '0xf42f905231C770F0A406f2B768877fb49eee0F21';
trie.get(address, function (err, raw) {
    if (err) return cb(err)
    //Using ethereumjs-account to create an instance of an account
    var account = new Account(raw)
    console.log('Account Address: ' + address);
    //Using ethereumjs-util to decode and present the account balance
    console.log('Balance: ' + (new BN(account.balance)).toString());
})
