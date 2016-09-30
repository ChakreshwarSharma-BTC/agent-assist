AgentAssist = {};
AgentAssist.Common = {
  showDatePicker: function(){
    $('#dob,#policy_start_date,#policy_end_date,#policy_personal_info_attributes_date_of_birth').datetimepicker({
          format: "DD/MM/YYYY"
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
  formSubmit: function(){
    $('.buttonNext').addClass('btn btn-success');
    $('.buttonPrevious').addClass('btn btn-primary');
    $('.buttonFinish').addClass('btn btn-default');
    $('.buttonFinish').on('click', function(){
      $('form').submit();
    })
  },
  documentOnReady: function (){
    AgentAssist.Common.showDatePicker();
    AgentAssist.Common.wizardSlideSteps();
    AgentAssist.Common.selectDropDown();
    AgentAssist.Common.formSubmit();
  }
};
$(document).ready(function(){
  AgentAssist.Common.documentOnReady();
});