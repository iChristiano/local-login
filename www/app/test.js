define(['../common/js/utils/CookieUtils'], function(CookieUtils){

    'use strict';

    var test = {
        name: 'test'
    };

    console.log(CookieUtils.readCookie('auth'));

    return test;
    

});