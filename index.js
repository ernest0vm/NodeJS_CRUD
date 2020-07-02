const express = require("express");
const bodyParser = require('body-parser');
const app = express(); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

let user = {
    email: '',
    password: '',
    name: '',
    lastname: '',
    phone: '',
    birthday: '',
    profession: '',
    professionDescription: '',
    pricePerHour: ''
}; 

let response = {
    error: false,
    code: 200,
    message: ''
}; 

app.get('/', function (req, res) {
    response = {
        error: true,
        code: 200,
        message: 'root'
    };
    res.send(response);
}); 

app.route('/user')
    .get(function (req, res) {
        response = {
            error: false,
            code: 200,
            message: ''
        };
        if (user.name === '' || user.lastname === '') {
            response = {
                error: true,
                code: 501,
                message: 'user has not been created'
            };
        } else {
            response = {
                error: false,
                code: 200,
                message: 'user response',
                data: user
            };
        }
        res.send(response);
    })
    .post(function (req, res) {
        if (!req.body.name || !req.body.lastname) {
            response = {
                error: true,
                code: 502,
                message: 'name and lastname parameters are required'
            };
        } else {
            if (user.name !== '' || user.lastname !== '') {
                response = {
                    error: true,
                    code: 503,
                    message: 'user was created previously'
                };
            } else {
                user = {
                    name: req.body.name,
                    lastname: req.body.lastname
                };
                response = {
                    error: false,
                    code: 200,
                    message: 'user created',
                    data: user
                };
            }
        }

        res.send(response);
    })
    .put(function (req, res) {
        if (!req.body.name || !req.body.lastname) {
            response = {
                error: true,
                code: 502,
                message: 'name and lastname parameters are required'
            };
        } else {
            if (user.name === '' || user.lastname === '') {
                response = {
                    error: true,
                    code: 501,
                    message: 'user has not been created'
                };
            } else {
                user = {
                    name: req.body.name,
                    lastname: req.body.lastname
                };
                response = {
                    error: false,
                    code: 200,
                    message: 'user updated',
                    data: user
                };
            }
        }

        res.send(response);
    })
    .delete(function (req, res) {
        if (user.name === '' || user.lastname === '') {
            response = {
                error: true,
                code: 501,
                message: 'user has not been created'
            };
        } else {
            response = {
                error: false,
                code: 200,
                message: 'user deleted'
            };
            user = {
                name: '',
                lastname: ''
            };
        }
        res.send(response);
    }); 
    
    app.use(function (req, res, next) {
        response = {
            error: true,
            code: 404,
            message: 'URL not found'
        };
        res.status(404).send(response);
    }); 
    
    app.listen(3000, () => {
        console.log("Server is running at http://localhost:3000");
    });