const app = require('express');
const UserModel = require('../../models/user.model');
const Database = require('../database');

const router = app.Router();

router.post("/", async (req, res) => {
    const { email, displayname, avatar} = req.body;
    try {
        let allUser = await Database.instance.User.getAllUser();
        for (let i = 0; i < allUser.length; i++) {
            if (email == (allUser[i]).email) {
                res.send({
                    message: 'This email is already existed',
                });
                return;
            }
        }
        let user = await Database.instance.User.createUser(new UserModel(email, displayname, avatar));
        res.send({
            message: user,
        });
    } catch (err) {
        res.send({
            message: 'Can not create account',
        })
    }
});

//create account for user use gmail
router.post("/email", async (req, res) => {
    const { email, avatar } = req.body;
    try {
        let allUser = await Database.instance.User.getAllUser();
        for (let i = 0; i < allUser.length; i++) {
            if (email == (allUser[i]).email) {
                res.send({
                    message: 'This email is already existed',
                });
                return;
            }
        }
        let displayname ='';
        let user = await Database.instance.User.createUser(new UserModel(email, displayname, avatar));
        res.send({
            message: user,
        });
    } catch (err) {
        res.send({
            message: 'Can not create account',
        })
    }
});

//get all user from database
router.get("/", async (req, res) => {
    let getUser = await Database.instance.User.getAllUser();
    res.send({
        getUser: getUser
    });
});

//get user by email
router.get("/getByEmail", async (req, res) => {
    const { email } = req.query;
    let getByEmail = await Database.instance.User.getUserByEmail(email);
    res.send({
        getByEmail: getByEmail
    });
});

//update user info
router.put("/updateUser", async (req, res) => {
    const { id, email, displayname, avatar, status } = req.body;
    try {
        await Database.instance.User.updateProfile(id, email, displayname, avatar, status);
        res.send({
            message: "Update successfully"
        });
    } catch (erro) {
        res.status(400).send({
            message: `Cannot Update`
        });
    }

});

//delete account
router.delete("/", async (req, res) => {
    const { email } = req.body;
    try {
        await Database.instance.User.deleteUser(email);
        res.send({
            message: "Delete account successfully",
        });
    } catch (error) {
        res.send({
            message: "Can not delete account",
        });
    }
});

// router.get("/getUser", async (req, res) => {
//     const {
//         email
//     } = req.query;
//     let getUser = await Database.instance.getUser();
//     res.send({
//         getUser: getUser
//     });
// });

// router.get("/getemail", async (req, res) => {
//     const { email } = req.body;
//     let getemail = await Database.instance.getUserMail(email);
//     res.send({
//         message: getemail
//     });
// });



module.exports = router;