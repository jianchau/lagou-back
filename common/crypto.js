const crypto = require('crypto');
function getCrypto(password){
    const secret = 'abcdefg';
    const hash = crypto.createHmac('sha256', secret)
                   .update(password)
                   .digest('hex');
    return hash;
}
module.exports = getCrypto;