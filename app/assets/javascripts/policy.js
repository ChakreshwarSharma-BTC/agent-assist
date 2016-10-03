AgentAssist.Policy = {
  policyCategories: function(){
    $('#policy_plan_attributes_company_categories_id').on('change', function(){
      $.ajax({
        type: "GET",
        url: " /policies/category",
        data: {
          category : $('#policy_plan_attributes_company_categories_id').val()
        }
      });
    });
  },
  buttonOfForm: function(){
    $('.buttonNext').addClass('btn btn-success');
    $('.buttonPrevious').addClass('btn btn-primary');
    $('.buttonFinish').addClass('btn btn-default');
  },
  buttonSubmit: function(){
    $('.buttonFinish').on('click', function(){
      $('form').submit();
    })    
  },
  documentOnReady: function (){
    AgentAssist.Policy.policyCategories();
    AgentAssist.Policy.buttonOfForm();
    AgentAssist.Policy.buttonSubmit();
  }
};
$(document).ready(function(){
  AgentAssist.Policy.documentOnReady();
});