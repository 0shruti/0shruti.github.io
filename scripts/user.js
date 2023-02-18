"use strict";

(function (core){
    class user{
        constructor(displayName = "", emailAddress = "" , password = "") {
            this.DisplayName = displayName;
          this.UserName= userName;
          this.Password= password;
            this.EmailAddress = emailAddress;
        }
        //Serialize utility method
        serialize(){
            if(this.FullName !== "" && this.ContactNumber !== "" && this.EmailAddress !==""){
                return `${this.FullName}, ${this.ContactNumber}, ${this.EmailAddress}`;
            }
            console.error("One or more of the properties of the contact object are missing or invalid");
            return null;
        }
        //deserialize utility method.
        deserialize(data){
            let propertyArray = data.split(",");
            this.FullName = propertyArray[0];
            this.ContactNumber = propertyArray[1];
            this.EmailAddress = propertyArray[2];
        }

        //getters and setters
        get DispalyName(){
            return this.m_displayName;
        }

        get EmailAddress(){
            return this.m_emailAddress;
        }
        set DisplayName(fullName){
            this.m_fullName = fullName;
        }

        set EmailAddress(emailAddress){
            this.m_emailAddress = emailAddress;
        }
        toString(){
            return `FullName: ${this.FullName}\n 
        Contact number: ${this.ContactNumber}\n
         Email address: ${this.EmailAddress}`;
        }


    }

    toJASON(){
        return {
            "DisplayName": this.DisplayName,
            "EmailAddress": this.EmailAddress,
            "Username": this.UserName,
            "Password": this.Password,

        }
    }

    fromJASON(){
        this.
    }


    core.User= User;

})(core||(core ={}));


