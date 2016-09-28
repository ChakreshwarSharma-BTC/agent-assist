AgentAssist.Registration = {
  Validation: {
    registrationValidation: function(){
      jQuery.validator.addMethod("emailvalidation", function (value, element, params) {
        var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-]{2,})+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(value);
      });
      $("#user_form").validate({
        rules: {
          "user[email]":{
            required: true,
            emailvalidation: true
          },
          "user[primary_phone_no]":{
            required:true,
            minlength:10,
            maxlength:10,
            number: true
          },
          "user[personal_info_attributes][first_name]":"required",
          "user[personal_info_attributes][middle_name]":"required",
          "user[personal_info_attributes][last_name]":"required",
          "user[personal_info_attributes][date_of_birth]":"required",
          "user[password]":"required",
          "user[password_confirmation]":{
            required: true,
            equalTo: "#user[password]"
           }
        },
        messages: {
          "user[email]":{
            required: "Please enter email address.",
            emailvalidation: "Please enter valid email address."
          },
          "user[primary_phone_no]":{
            required: "Please enter mobile number.",
            maxlength: "Mobile number must be 10 digit.",
            minlength: "Mobile number must be 10 digit."
          },
          "user[personal_info_attributes][first_name]":"Please enter first name.",
          "user[personal_info_attributes][middle_name]":"Please enter middle name.",
          "user[personal_info_attributes][last_name]":"Please enter last name.",
          "user[personal_info_attributes][date_of_birth]":"Please enter date of birth.",
          "user[password]":"Please enter password.",
          "user[password_confirmation]":{
            required: "Please re-enter password.",
            equalTo: "Password doesn't match"
          }  
        },
        submitHandler: function(form){
          form.submit();
        }
      });
    }
  }
};