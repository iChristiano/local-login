define(['../common/js/utils/CookieUtils','test'], function(CookieUtils, test){

    'use strict';

    var attempt = 3;

    // set default user data 
    (function setDefaultUsers(){
        localStorage.setItem("users", JSON.stringify([{
                name: 'iChristiano',
                password: '1234'
            },
            {
                name: 'Test',
                password: '1234'
            }
        ]));
    })();

    // display modal dialog if not authentificated
    function displayModal(){
        //var auth = localStorage.getItem("auth", "true");
        var auth = CookieUtils.readCookie('auth');
        if (auth !== "true") {
            document.getElementById("modalId").style.display = "block";
        } else {
            document.getElementById('supersecretId').style.display = "block";
        }
    }

    // validate input
    function validate(){
        var username = document.getElementById("username").value,
            password = document.getElementById("password").value,
            users = JSON.parse(localStorage.getItem('users'));
    
        var validUser = users.filter(function(user){ 
            return user.name === username && user.password === password;
        });

        if (validUser.length > 0) {
            // logged in   
            document.getElementById('supersecretId').style.display = "block";
            document.getElementById('modalId').style.display = "none";
            document.removeEventListener("DOMContentLoaded", displayModal);
            
            // use a cookie here
            //localStorage.setItem("auth", "true");
            CookieUtils.createCookie("auth", "true", 1);

            // Redirecting to other page
            //window.location = "success.html"; 
        }
        else {
            attempt = attempt - 1;
            document.getElementById('attempt').innerHTML = attempt+" attempt left";
            // disabling fields after 3 attempts
            if( attempt === 0){
                document.getElementById("username").disabled = true;
                document.getElementById("password").disabled = true;
                document.getElementById("submit").disabled = true;
                document.getElementById("submit").style.backgroundColor = "rgb(84, 84, 84)";
                document.getElementById("submit").style.color = "#eee";
                document.getElementById('forgotpsw').style.display = "block";
                document.getElementById('attempt').style.display = "none";
            }
        }
    }

    // set up pre-defined environment
    document.getElementById('forgotpsw').style.display = "none";
    document.getElementById('loginFormId').addEventListener('submit',validate);

    // call to action
    displayModal();
});