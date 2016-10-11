AgentAssist.Policy = {
  policyCompanies: function(){
    $('#policy_plan_attributes_company_category_id').on('change', function(){
      if($(this).prop('selectedIndex') == 0)
      {
        $('#companies').html('');
        $('#plans').html('');
      }
      else
      { 
        $.ajax({
          type: 'GET',
          url: '/policies/companies',
          data: {
            category: $(this).val()
          }
        });
      }
    });
  },
  policyPlans: function(){
    $('#comapny_name').on('change', function(){
      if($(this).prop('selectedIndex') == 0)
      {
        $('#plans').html('');
      }
      else
      {
        $.ajax({
          type: 'GET',
          url: '/policies/plans',
          data: {
            category: $('#policy_plan_attributes_company_category_id').val(),
            company: $(this).val()
          }
        });
      }
    });
  },
  userDetails: function(){
    $('#policy_user_id').on('change', function(){
      $.ajax({
        type: "GET",
        url: "/policies/customer_list",
        data: {
          id : $(this).val()
        },
        success: function (response) {
          $('#policy_user_attributes_email').val(response.user.email);
          $('#policy_user_attributes_primary_phone_no').val(response.user.primary_phone_no);
          $('#policy_personal_info_attributes_first_name').val(response.personal_info.first_name);
          $('#policy_personal_info_attributes_last_name').val(response.personal_info.last_name);
          $('#policy_personal_info_attributes_middle_name').val(response.personal_info.middle_name);
          $('#policy_personal_info_attributes_date_of_birth').val(response.personal_info.date_of_birth);
          $('#policy_personal_info_attributes_gender').val(response.personal_info.gender);          
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
  policySearch: function(){
    $('#search_tag').on('click', function(){
      $.ajax({
        type: "GET",
        url: "/policies/search",
        cache: false,
        dataType: 'script',
        data: {
          search : $('#search').val()
        }
      });
    });
  },
  policySerachEnterKeyPressEvent: function(){
    $("#search").keyup(function(event) {
      if (event.keyCode == 13) {
        $("#search_tag").click();
        }
    });
  },
  policyType: function (){
    $('div#vehicle_fields input').prop('disabled', true);
    $('#vehicle_fields').hide();
    $('div#lic_fields input').prop('disabled', true);
    $('#lic_fields').hide();
    $('#policy_plan_attributes_company_category_id').on('change', function(){
      if($(this).val() == 1)
      { 
        $('div#lic_fields input').prop('disabled', false);
        $('#lic_fields').show();
        $('div#vehicle_fields input').prop('disabled', true);
        $('#vehicle_fields').hide();
      }
      if($(this).val() == 2)
      {
        $('div#vehicle_fields input').prop('disabled', false);
        $('#vehicle_fields').show();
        $('div#lic_fields input').prop('disabled', true);
        $('#lic_fields').hide();
      }
    });
  },
  documentOnReady: function (){
    AgentAssist.Policy.policyCompanies();
    AgentAssist.Policy.showDatePicker();
    AgentAssist.Policy.wizardSlideSteps();
    AgentAssist.Policy.formSubmit();
    AgentAssist.Policy.userDetails();
    AgentAssist.Policy.buttonSubmit();
    AgentAssist.Policy.policyType();
  }
};
$(document).ready(function(){
  AgentAssist.Policy.documentOnReady();
});