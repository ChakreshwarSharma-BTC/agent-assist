AgentAssist = {};  
AgentAssist.Common = {
showDatePicker: function(){
  $('#dob').datetimepicker({
        format: "DD/MM/YYYY"
      });
},
partialHideShow: function(){
    $('#policy_plan_attributes_company_categories_id').on('change',function(){
      var x= $('#policy_plan_attributes_company_categories_id').val();
      if (x == 1){
        $('.vehicle').remove();
        $('.lic').add();
      } 
      else if (x == 2){
        $('.lic').remove();
        $('.vehicle').add();
      }
    });
},
wizardSlideSteps: function(){
  $('#wizard').smartWizard();
    $('#wizard_verticle').smartWizard({
    transitionEffect: 'slide'
  });
},
selectDropDown: function(){
  $(".select").select2().change(function(){
    $(this).valid();
  });
  $("#policy_plan_attributes_company_categories_id, #policy_plan_id").select2({});
},
buttonOfForm: function(){
  $('.buttonNext').addClass('btn btn-success');
  $('.buttonPrevious').addClass('btn btn-primary');
  $('.buttonFinish').addClass('btn btn-default');
  $('.buttonFinish').on('click', function(){
    $('form').submit();
  })
},
documentOnReady: function (){
  AgentAssist.Common.showDatePicker();
  AgentAssist.Common.partialHideShow();
  AgentAssist.Common.wizardSlideSteps();
  AgentAssist.Common.selectDropDown();
  AgentAssist.Common.buttonOfForm();
}
};
$(document).ready(function(){
   AgentAssist.Common.documentOnReady();
});