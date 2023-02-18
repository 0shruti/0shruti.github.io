"use strict";

//IIFE - Immediately Invoked Function Expression
//AKA - Anonymous Self-Executing Function


(function(){

    /**
     * instantiate and contactto local storage
     * @param {string }fullName
     * @param {string } contactNumber
     * @param {string } emailAddress
     */
    function AddContact(fullName, contactNumber,emailAddress){
        let contact = new Contact(fullName.value, contactNumber.value, emailAddress.value);
        if(contact.serialize()){
            let key = contact.FullName.substring(0,1)+ Date.now();
            localStorage.stItem(key, contact.serialize());
        }
    }

    function Start()
    {
        console.log("App Started !!")

        AjaxRequest("GET","header.html",LoadHeader);
        switch (document.title){
            case "Home":
                DisplayHomePage();
                break;
            case "Products":
                DisplayProductsPage();
                break;
            case"Services":
                DisplayServicesPage();
                break;
            case "About Us":
                DisplayAboutUsPage();
                break;
            case "Contact ":
                DisplayContactPage();
                break;
            case "Edit Contact":
                DisplayEditPage();
        }

    }
    window.addEventListener("load",Start)


    function AjaxRequest(method,url,callback){
        let xhr = new XHRHttpRequest();
        xhr.addEventListener("readyStatechange",()=>{

            if(xhr.readyState===4 && xhr.status===200){
                if(typeof callback=="function"){
                    //console.log(xhr.responseText);
                    callback(xhr.responseText);
                }
                else{
                    console.error("Error:Please provide a valid function for call back.")
                }

            }
        });

        xhr.open(method,url);
        xhr.send();
    }

    function LoadHeader(data){
        $("header").html(data);
        $(`li>a:contains(${document.title})`).addClass("active");

    }
    function DisplayHomePage(){
       console.log("Home Page");

      // AjaxRequest("GET","header.html",LoadHeader);

        // applying jQuery to the code.

        $("#AboutUsBtn").on("click", () =>{
            location.href ="aboutUs.html"
        });

        $("main").append('<p id="MainParagraph" class="mt-3"> This is my main paragraph </p>');
        $("body").append('<artile class="container">' +
            '            <p id="ArticleParagraph" class="mt-3">This is my article paragraph</p></artile>')
    }

    function DisplayProductsPage(){

        // add console log in all functions.
    }

    function DisplayServicesPage(){

    }

    function DisplayAboutUsPage(){

    }

    function DisplayContactPage(){
    console.log("Display Contact page");

        ContactFormValidation();

    let sendButton = document.getElementById("sendButton");
    let subscribeCheckbox = document.getElementById("subscribeCheckbox");

    sendButton.addEventListener("click", function(mou){
      if(subscribeCheckbox.checked){
        AddContact(fullName.value,conatctNumber.value,emailAddress.value)
      }

    });

    }

    function DisplayEditPage(){

        console.log("Display edit page");

        ContactFormValidation();

        let page = location.hash.substring(1)
        switch (page){
            case "add" :
                $("main>h1").text("Add Contact");
                $("#editButton").html('<i class="fa-solid fa-pencil"></i> Add')

                $(#editButton).on("click",(evt)=>{
                    // add contact
                    event.preventDefault();
                    AddContact(fullName.value,conatctNumber.value,emailAddress.value)
                    location.href="contact-list.html"
                });

                $(#cancelButton).on("click",()=>{
                    location.href="contact-list.html";
                });
                break;
            default :
                //edit
                let contact = new Conatct();
                contact.deserialize(localStorage.getItem(page));
                $("#fullName").val(contact.FullName);
                $("#contactNumber").val(contact.ContactNUmber);
                $("#emailAddress").val(contact.EmailAddress);

                $(#editButton).on("click",(evt)=>{
                    // add contact
                    event.preventDefault();
                    contact.FullName =$("#fullName").val();
                    contact.EmailAdsress =$("#emailAddress").val();

                    localStorage.setItem((page,contact.serialize()));
                    location.href="contact-list.html";

                });


                $(#cancelButton).on("click",()=>{
                    location.href="contact-list.html";
                });


        }

    }

    // not being used
    function DisplayContactListPage(){

        console.log("Display Contact List ");
        if(localStorage.length >0){
            let contactList = document.getElementById("#contactList");
            let data="";
            let keys=Object.keys(localStorage);

            let index=1;
            for(const key of keys){
                let contactData = localStorage.getItem(key);
                let contact = new Contact();
                contact.deserialize(contactData);
                data += <tr><th scope="row" className="text-center">$(index)
                </th>
                    <td> $(contact.FullName)</td>
                    <td> $(contact.ContactNumber)</td>
                    <td> $(contact.EmailAddress)</td>

                    <td className="text-center">
                        <button value="$("key")" className="btn btn-primary btn-sm edit">
                        <i className="fas fa-edit fa-sm"></i> Edit
                        </button>
                    </td>

                    <td className="text-center">
                        <button value="$("key")" className="btn btn-danger btn-sm delete">
                            <i className="fa-solid fa-delete-left"> </i> Delete
                        </button>
                    </td>
                </tr>;

                index ++;
            }

        contactList.innerHTML = data;

        $("#addButton").on("click",() => {
            location.href="edit.html#add"
        });

        $("button.delete").on("click", function () {
            if(confirm("Delete contact, please confirm")){
                localStorage.removeItem($(this).val())
            }

                location.href="contact-list.html"
        });

            $("button.edit").on("click",function(){

                location.href="edit.html+ "+ $(this).val();
            });
        }

    }



    function ValidateField(input_field_id, regular_expression, error_message){
        let messageArea=   $("#messageArea");
      //  let contactNumberPattern = /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/;

        $(input_field_id).on("blur", function(){
            let inputFieldText =   $(this).val();
            if(!regular_expression.test(inputFieldText)){
                //fail validation
                $(this).trigger("focus"); // go back to the fullName texr
                $(this).trigger("select"); // highlight the input text
                messageArea.addClass("alert alert-danger");
                messageArea.text(error_message);
                messageArea.show();
            }

            else {
                // pass validation
                messageArea.removeAttr("class");
                messageArea.hide();
            }
        });
    }




    function ContactFormValidation(){
        //TestFullName();
        ValidateField("#fullName",/^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,
            "Invalid name: Please enter something valid.");

        ValidateField("#contactNumber",/^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "Invalid number: Please enter something valid.");

        ValidateField("#emailAddress",/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Invalid email: Please enter something valid.");


    }

    function DisplayLoginPage(){

        console.log("Login page");

        let messageArea= $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click", function(){
            let success= false;
            let newUser = new core.User();

            $.get("./data/user.json",function(){

                for(const u of data.users){
                    if(username.value===u.UserName&& password.valueOf()===u.Password){
                        success= true;
                        newUser.fromJSON(u);
                        break;
                    }
                }

                if(success){
                    sessionStorage.setItem("user",newUser.serialize());
                    messageArea.removeAttr("class").hide();
                    location.href="contact-list.html"
                }
                else{
                    //fail authentication
                    $("#username").trigger("focus").trigger("select")
                    message.addClass("alert alert-danger").text("Error, failed to do authentication.")
                }
            });
        });

        $("#cancelButton").on("click",function(){

            // in picture
        })
    }

    function CheckLogin(){
        if(sessionStorage.getItem("user")){
            $("#login").html(` <a class="nav-link" href="#"> <i class="fa-solid fa-sign-out-alt"></i>  Logout</a>`)
        }
    }
})();