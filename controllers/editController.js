/**
 * Created by tharaka_ra on 8/9/2017.
 */

const models = require('../models');

module.exports = {
    // getProfileForEdit: async function(req,res){
    //     let user_id = req.user.id;
    //     try {
    //         let stylist = await models.stylist.findOne(
    //             {where: {user_id: user_id}}
    //         );
    //
    //         if(stylist) {
    //             return res.status(200).json(
    //                 {stylist: stylist}
    //             );
    //         }else{
    //             return res.status(404).json({error: "Profile Not found"});
    //         }
    //     }catch (err){
    //         console.log('Error occurred: ', err);
    //         return res.status(500).json({error : "Server error occurred"});
    //     }
    // },
    // updateProfile : async function (req, res) {
        //     //Profile Picture
        //     //Profile Banner Picture
        //     //Profile Description
        //     let user_id = req.user.id;
        //
        //     try {
        //         let result = await models.stylist.update(
        //             {description: description},
        //             {where: {user_id: user_id}}
        //         );
        //
        //         return res.status(200).json({status: 'updated'});
        //     }catch (err){
        //         console.log('Error occurred: ', err);
        //         return res.status(500).json({error : "Server error occurred"});
        //     }
        // },

    getEditProfile: async function(req,res){
        let user_id = req.user.id;
        try {
            let stylists = await models.stylist.findAll({
                where: {user_id: user_id}
            });
            if (stylists) {
                let stylist_id = stylists[0].dataValues.id;
                let jobtypes = await models.user_jobtype.findAll({
                    where: {
                        user_id: stylist_id
                    }
                });
                let skilltypes = await models.user_skill.findAll({
                    where: {
                        user_id: stylist_id
                    }
                });
                return res.status(200).json({
                    jobtypes: jobtypes,
                    skilltypes: skilltypes,
                    stylist:stylists
                });
            }else{
                return res.status(504).json({error : "Bad gateway"});
            }
        }catch (err){
            console.log(err);
            return res.status(500).json({error : "Server error occurred"});
        }
    },

    updateProfile : async function(req, res){
        let user_id = req.user.id;
        let description = req.body.description;

        let user_jobtype_arr = req.body.job_types_arr;
        let user_skilltype_arr = req.body.skill_types_arr;

        //Server validation
        if(typeof user_jobtype_arr==='undefined'){return res.status(400).json({error: 'Jobtype array is required'});}
        if(typeof user_skilltype_arr==='undefined'){return res.status(400).json({error: 'Skilltype array is required'});}
        if(user_jobtype_arr.length===0){return res.status(400).json({error: 'Jobtype array is required'});}
        if(user_skilltype_arr.length===0){return res.status(400).json({error: 'Skilltype array is required'});}

        try {
            let result = await models.stylist.update(
                {description: description},
                {where: {user_id: user_id}}
            );

            let stylist = await models.stylist.findOne(
                {where: {user_id: user_id}}
            );
            if(stylist) {
                // let stylist_id = stylist.dataValues.id;
                // let result, i;
                // result = await models.user_jobtype.destroy({
                //     where: {user_id: stylist_id}
                // });
                // result = await models.user_skill.destroy({
                //     where: {user_id: stylist_id}
                // });
                // let user_skill_obj = [];
                // let job_type_obj = [];
                // for(i=0; i<user_skilltype_arr.length; i++) {
                //     user_skill_obj.push({user_id: stylist_id, skill_id: user_skilltype_arr[i]});
                // }
                // for(i=0; i<user_jobtype_arr.length; i++) {
                //     job_type_obj.push({user_id: stylist_id, job_id: user_jobtype_arr[i][0], price: user_jobtype_arr[i][1]});
                // }
                // let func;
                // func = await models.user_skill.bulkCreate(user_skill_obj);
                // if (func) {console.log('Skills insert success for user: ' + user_id);}
                // func = await models.user_jobtype.bulkCreate(job_type_obj);
                // if (func) {console.log('Jobtypes insert success for user: ' + user_id);}
                return res.status(200).json({status: 'Updated'});
            }
        }catch (err){
            console.log('Error occurred: ', err);
            return res.status(500).json({error : "Server error occurred"});
        }
}};
