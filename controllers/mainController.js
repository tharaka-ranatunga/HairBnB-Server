/**
 * Created by tharaka_ra on 7/4/2017.
 */
module.exports= {
    getView: function (req, res) {
        res.render('', { title: 'Express' });

    },
    test : function (req,res) {
        return res.send(req.user.first_name);
    }

};
