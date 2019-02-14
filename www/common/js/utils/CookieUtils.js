/* cookie management on client side */
define(function() {

    'use strict';

    function CookieUtils(){
        this.name = 'cookieUtils';
    }

    var p = CookieUtils.prototype;

    p.createCookie = function(name, value, days){
        let expires = '';
        if(days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expired=' + date.toGMTString();
        }
        document.cookie = name + '=' + value + expires + ';path=/';
    };

    p.readCookie = function(name){
        let nameEq = name + '=';
        let cookieEntries = document.cookie.split(';');
        for (let i = 0; i < cookieEntries.length; i+=1) {
            let entry = cookieEntries[i];
            while(entry.charAt(0) === ' ') {
                entry = entry.substring(1, entry.length);
            }
            if(entry.indexOf(nameEq) === 0) {
                return entry.substring(nameEq.length, entry.length);
            }
        }
        return null;
    };

    p.deleteCookie = function(name) {
        this.createCookie(name, '', -1);
    };

    return new CookieUtils();
});