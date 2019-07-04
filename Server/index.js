var express = require('express')
var bodyparser = require('body-parser')
var session = require('express-session')
var bcrypt = require('bcrypt')
var app = express()
const saltRounds = 10;
var mongoose = require('mongoose')
var cors = require('cors');
// var path = require('path')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
    
  }))

mongoose.Promise = Promise

mongoose.connect('mongodb://localhost:27017/demoapp')
.then( () => console.log("Successfully DB connect "))

const User = require('./Models/user')
const upload = require('./middleware/fileupload');
const userController = require('./controller/usercontroller');
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/images', express.static('./Images/'));
app.use(cors());
app.post('/api/login', async (req, res) => {
    const { username ,password } = req.body
    console.log(username,password)
    if (resp3 = await username == "admin@gmail.com" && password == "Admin@123"){  
        if(!resp3){
        
            res.json({
                success: false,
                message:"Incorrect details"
            })
        } else {
        res.json({
            success: true,
            message: " Logging Sucessfully",
            role: "Admin"
        })
        req.session.user = username
            req.session.save()
            role = "Admin"
            console.log(role)
            return role
        }
        }
        if(resp = User.findOne({username})){
            if(!resp){
                console.log("Incorrect details")
                            res.json({
                                success: false,
                                message:"Incorrect details"
                            })
            }
            else{
         await User.findOne({username})
        // console.log(username)
        .then(function(users) {
            return bcrypt.compare(password, users.password);
        })
        .then(function(samePassword) {
            if(!samePassword) {
                console.log("Incorrect Password")
                        res.json({
                            success: false,
                            message:"Incorrect Password"
                        })
            }
                    res.json({
                    success: true,
                    message:" Logging Sucessfully",
                    role : "User",
                    // id: data._id
                })
                req.session.user = username
                req.session.save()
                role = "User"
                console.log(role)
                return role
                console.log(" Logging Sucessfully ")     
            //res.send();
        })
        
        
        .catch(function(error){
            console.log("Incorrect details")
                    res.json({
                        success: false,
                        message:"Incorrect details"
                    })
        //     console.log(error);
        //    // next();
        });
        }
        }
});

// app.post('/api/login',userController.login);

app.post('/api/register', upload.single('image') , async (req, res) => {   

     bcrypt.hash(req.body.password , saltRounds , async function(err , hash){
         // User.create({

         console.log('PATH => ', __dirname + '/Images ');
         
            
             var a = req.file.path;
              console.log("aa", a);
             firstname = req.body.firstname ,
             lastname = req.body.lastname ,
             image =  a,
             username = req.body.username ,
             password = hash
            // var { firstName,  lastName , username } = req.body;

            // var userData = {
               
            //     firstName: firstName,
            //     lastName: lastName,
            //     image: req.files[0].path,   
            //     username: username,
            //     password:hash                        
                
            // };


         // }).then(function (data){
             const exit =  await User.findOne({username})
 
     if(exit){
         res.json({
             success: false,
             message: "username Allready Use"
             })
         return
         } 
 
     const user = new User({
         firstname,
         lastname,
         image,
         username,
         password

        //  userData
     })
 
     const result = await user.save()
         console.log(result)    
         res.json({
             success: true,
             message:"Welcome!"
         })
         })
     })

app.get('/api/isLoggedIn' ,(req, res) => {
    res.json({
        status: !!req.session.user
    })
});

// app.put('/api/updatedata' , upload.single('image') ,async (req , res ) =>{
//     console.log(req.session.user )
//     const user = await User.findOne({username: req.session.user})
//     if(!user){
//         res.json({
//             success: false,
//             message:"Incorrect details"
//         })
//       return
//     }
//     // var { firstName, lastName, username, password,  } = req.body;
//     // var a = req.file.path;
//     // var userData = {
//     //     firstName: firstName,
//     //     lastName: lastName,
//     //     username : username,
//     //     // image : a,
//     //     // password : hash
       
//     // };
//     //          console.log("Aaaaaaaaaa--",a)
//     //         if (req.file.fieldname == "image") {
//     //             userData['image'] = a;
//     //         }
//     // if (password) {
//     //     userData['password'] = bcrypt.hashSync(password,saltRounds );
//     // }
//     // else {
//     //     console.log("Else", password);
//     // }
//   console.log("UserData ------" , userData);
//     await User.update({username: req.session.user}, { $set: {  }})
//     res.json({
//          success: true
//     })

// });

// app.get('/api/data:userId',userController.getUserById);
 
// async (req, res) => {
//     console.log(req.session)
//   res.send('user =>'+req.session.user)
    // await User.findOne({username : req.session.user}).then((data) => {
    //     console.log(data);
    //     res.send({ status: 200, data : data });
    // }).catch((err) => {
    //     res.send({ status: 400, message: err.message });
    // });
//     if(!user){
//         res.json({
//             status: false,
//             message: "User was deleted"
//         })
//         return
//     }
//     console.log("user data" , user);

//    res.json({
//        status:true,
//        username: req.session.user,
//        firstname: user.firstname,
//        lastname : user.lastname,
//        image : user.image,
//     //    password : user.password
//    })
    
// })
// app.get('/api/data/:userId',userController.getData);

app.get('/api/data', async (req , res) =>{
    console.log(req.session);
    const user = await User.findOne({username: req.session.user})
    if(!user){
                res.json({
                    status: false,
                    message: "User was deleted"
                })
                return
            }
            console.log("user data" , user);
        
         return   res.json({ data : user
            //    status:true,
            //    username: req.session.user,
            //    firstname: user.firstname,
            //    lastname : user.lastname,
            //    image : user.image,
            //    id: user._id
            //    password : user.password
           })
//     await User.findOne({username : req.session.user}).then((data) => {
//             console.log(data);
//             res.send({ status: 200, data : data });
//         }).catch((err) => {
//             res.send({ status: 400, message: err.message });
//         });
 });

 app.put('/api/updatedata' , upload.single('image') , async (req, res) => {
    console.log(req.session.user, req.body)
    var { firstname,  lastname, username , password  } = req.body;
    console.log('PATH => ', __dirname + '/Images ');
         
            
    var a = req.file.path;
     console.log("aa", a);
    var userData = {
       
        firstname: firstname,
        lastname: lastname,
        username : username 
    };
    // if (req.file.length > 0) {
        // if (req.file.length == 1) {
            userData['image'] = a;
           
        // }
        // else {
            // if (req.files[0].fieldname == "image") {
            //     userData['image'] = req.files[0].path;
            // }
          
        // }     
        if (password) {
            userData['password'] = bcrypt.hashSync(password, 10);
        }
        else {
            console.log("-Else  ====", password);
        } 
    // }   
    const user = await User.findOne({email: req.session.user})

    if(!user){
        return   res.json({
            success: false,
            message:"Incorrect details"
        })
     
    }
//     await User.update({ username : req.session.user}, { $set: { userData }})
//    return res.send({
//         // 
//         status: 200
//     })
console.log("USERRRRR________", userData)
await User.updateOne({ username : req.session.user }, { $set: userData }).then((data) => {
    res.send({ status: 200, data: data });
}).catch((err) => {
    res.send({ status: 400, message: err.message });
})


 })

// app.put('/api/updatedata/:userId' , upload.single('image') ,userController.findByIdAndUpdate );
//  {
//     console.log(req.session.user , req.body.value)
//     const user = await User.findOne({username: req.session.user})

//     if(!user){
//         res.json({
//             success: false,
//             message:"Incorrect details"
//         })
//       return
//     }
   
// }


app.listen(1802 , () =>
{  console.log("Server  listening at 1802 ");
});
