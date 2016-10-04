AgentAssist.Policy = {
  policyCategories: function(){
    $('#policy_plan_attributes_company_category_id').on('change', function(){
      $.ajax({
        type: "GET",
        url: " /policies/category",
        data: {
          category : $('#policy_plan_attributes_company_category_id').val()
        }
      });
    });
  },
  userDetails: function(){
    $('#policy_user_id').on('change', function(){
      $.ajax({
        type: "GET",
        url: " /policies/user_list",
        data: {
          user : $('#policy_user_id').val()
        }
      });
    });
  },
  wizardSlideSteps: function(){
    $('#wizard').smartWizard();
      $('#wizard_verticle').smartWizard({
      transitionEffect: 'slide'
    });
  },
  formSubmit: function(){
    $('.buttonNext').addClass('btn btn-success');
    $('.buttonPrevious').addClass('btn btn-primary');
    $('.buttonFinish').addClass('btn btn-default');
  },
  buttonSubmit: function(){
    $('.buttonFinish').on('click', function(){
      $('form').submit();
    })    
  },
   showDatePicker: function(){
    $('#policy_personal_info_attributes_date_of_birth').datetimepicker({
      format: "DD/MM/YYYY"
    });
    $('#policy_start_date').datetimepicker({
      format: "DD/MM/YYYY",
      useCurrent: true,
      minDate: moment()
    });
    $('#policy_end_date').datetimepicker({
      format: "DD/MM/YYYY",
      useCurrent: false,
    });
    $("#policy_start_date").on("dp.change", function (e) {
        $('#policy_end_date').data("DateTimePicker").minDate(e.date);
    });
    $("#policy_end_date").on("dp.change", function (e) {
        $('#policy_start_date').data("DateTimePicker").maxDate(e.date);
    });
  },
  documentOnReady: function (){
    AgentAssist.Policy.policyCategories();
    AgentAssist.Policy.showDatePicker();
    AgentAssist.Policy.wizardSlideSteps();
    AgentAssist.Policy.formSubmit();
    AgentAssist.Policy.userDetails();
  }
};
$(document).ready(function(){
  AgentAssist.Policy.documentOnReady();
});