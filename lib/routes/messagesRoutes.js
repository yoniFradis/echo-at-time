const messagesController = require('../controllers/messagesController');

module.exports = function(app) {
    app.route('/api/echoAtTime').get(messagesController.echoAtTime);
};