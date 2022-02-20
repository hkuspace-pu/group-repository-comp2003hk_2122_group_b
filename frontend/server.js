require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());

var mysql = require('mysql2');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "752372",
  database: "tree_project_test",
  port: 3307
  
});

var register_username ="";

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


app.post("/login", async (req, res,next) => {

// output and update "your profile page" 

var outputresult = {
  "username": "",
  "password": "",
  "name": ""
}

const { username, password } = req.body;

         console.log("User Try to Login:" + username)
         con.promise().query("SELECT username,password, name FROM users where username='" + username + "' and password='" + password + "'")
            .then( ([rows,fields]) => {
            recordno = rows.length
            console.log("Search whether " + username + " and password matches in database. Result:" + recordno + " record(s) found");            

            if (recordno == 0 ) {                    
               console.log("Datbase Feedback:" +  username + " and password not matched.") ;  
               res.status(403);
               const user = {
         	          id: 0,
                          name: "",
                          username: "",
                    };
               res.json({
                     user,
                     message: "wrong login information",
               });
             } else {
               console.log("Datbase Feedback:" +  username + " and password matched.") ;  
	       const user = {
	          id: 1,
                  name: rows[0].name,
                  username: rows[0].username,
               };
               const token = jwt.sign(user, process.env.JWT_KEY);
               res.json({
	          token,
	          user,
               });
               
             } 
             
         })
         .catch((err)  => {
                    console.log("Other Error:" + err + " " + register_username) ;
                    const user = {
         	          id: 0,
                          name: "",
                          username: "",
                    };
                    res.json({
                       user,
       	               register_result: "Back Failed:" + err
                    }) 
         })
         
      

});


app.post("/register", async (req, res,next) => {

// output and update "your profile page" 

var recordno ;

const { register_username, register_password, register_name, register_email } = req.body;
         console.log("New register user Request:" + register_username)
         con.promise().query("SELECT username FROM users where username='" + register_username + "'")
            .then( ([rows,fields]) => {
            recordno = rows.length
            console.log("Search whether " + register_username + " in database. Result:" + recordno + " record(s) found");            

            if (recordno == 0 ) {                    
               console.log("Datbase Feedback:" +  register_username + " is not exists.") ;  
               console.log("Action: Create a new user:" +  register_username); 
               console.log("INSERT INTO users (username,password,name,email,verification_code,role) VALUES('" + register_username + "','" + register_password + "','" + register_name + "','" + register_email + "','" + register_password + "123','N')");

               con.promise().query("INSERT INTO users (username,password,name,email,verification_code,role) VALUES('" + register_username + "','" + register_password + "','" + register_name + "','" + register_email + "','" + register_password + "123','N')")
              .then( ([rows,fields]) => {
               console.log("Insert result:" + rows);
                  res.json({
       	            register_result: "Create Success:" + register_username
                  });
	       })
              .catch(  (err)  => {
                    console.log("Database Feedback: Insert Failed for new user:" + register_username) ;
                    res.json({
       	               register_result: "Insert Failed:" + register_username
                    }) 
               })
             
                     		 
   	    } else {
               console.log("Datbase Feedback:" + register_username + " is already exists.") ;                                     	  
               res.json({
       	           register_result: "Exist:" + register_username
               });
           } 
             
         })
         .catch((err)  => {
                    console.log("Other Error:" + err + " " + register_username) ;
                    res.json({
       	               register_result: "Back Failed:" + err
                    }) 
         })
         
      

});




                
               