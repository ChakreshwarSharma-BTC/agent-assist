AgentAssist.Company = {
  Validation: {
    companyValidation: function(){
      $("#company_form").validate({
        rules: {
          "company[name]":"required"
        },
        messages: {
          "company[name]":"Please enter company name."
        },
        submitHandler: function(form){
          form.submit();
        }
      });
    }
  }
};