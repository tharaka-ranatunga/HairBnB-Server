/**
 * Created by tharaka_ra on 7/25/2017.
 */
var model = require('../models');


module.exports = function () {
    return model.user.findOne({
            where: {
                email: "tharaka.kamal@gmail.com"
    }})
}