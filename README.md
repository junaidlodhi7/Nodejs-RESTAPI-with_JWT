# Nodejs-RESTAPI-with_JWT
seed project for nodejs resttful api using Json Web tokens
#### Make Sure you run these command in the project folder
in  the command line
npm install express
npm install body-parser
npm install morgan
npm install mongoose
npm install jsonwebtoken

#### Ready to Go 
Type in the Command Line
node server.js

#### HERE You Go TEST IT  



#### Url for Signup : http://localhost:1234/signup
with Parameters: {
	"name":"ali",
	"pass":"1234"
}

#### Url for Login : http://localhost:1234/login
with Parameters : {
	"name":"ali",
	"password":"1234"
	
}


#### Url to get decoded data/ Verify : http://localhost:1234/api/about
With Headrers :
x-access-token : ##Your Generated Token

#### Url to get decoded data/ Verify : http://localhost:1234/api/verify
with Headers : 
Content-Type: application/x-www-form-urlencoded
x-access-token : ****The Token you Generated****

