AgentAssist.Policy = {
  selectDropDown: function(){
    $(".select").select2().change(function(){
      $(this).valid();
    });
    $("#nominee_detail,#customer,#select2-policy_nominee_attributes_relation-container,#policy_plan_attributes_company_category_id, #user_id, #policy_user_id, #policy_mod_of_payment, #policy_premium_mod, #company_name, #plan_name").select2({});
  },
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
    $('#company_name').on('change', function(){
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
          $('#policy_personal_info_attributes_gender_'+response.personal_info.gender).iCheck('check');          
        }
      });
    });
  },
  emailValidation: function(){
   $('#policy_user_attributes_email').on('change', function(){
      $.ajax({
        type: 'GET',
        url: '/customers/new',
        data: {
          email: $('#policy_user_attributes_email').val()        
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
    $('.buttonCancel').addClass('btn btn-danger');
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
      useCurrent: true
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
  autoCompleteLocationPolicy: function (selector) {
    $(selector).on('focus', function(){
      autocomplete = new google.maps.places.Autocomplete($(selector)[0],
        {
          types: ['geocode'],
          componentRestrictions: {country: 'in'}
        });
      autocomplete.addListener('place_changed', function (){
        AgentAssist.Policy.getAddress(selector);
      });
    });
  },
  getAddress: function (selector) {
    var selector_id = selector.match(/\d+/)[0];
    var address = {
      locality: 'long_name',
      administrative_area_level_1: 'long_name',
      postal_code: 'short_name'
    };
    var place = autocomplete.getPlace();
    if(place != null)
    {
      AgentAssist.Policy.fillAddress(place, address, selector_id);
    }
  },
  fillAddress: function (place, address, selector_id) {
    for (var i = 0; i < place.address_components.length; i++)
    {
      var addressType = place.address_components[i].types[0];
      var val = place.address_components[i][address[addressType]];
      switch(addressType)
      {
        case 'locality':
          $('#policy_address_attributes_'+selector_id+'_city').val(val);
          break;
        case 'administrative_area_level_1':
          $('#policy_address_attributes_'+selector_id+'_state').val(val);
          break;
        case 'postal_code':
          $('#policy_address_attributes_'+selector_id+'_pincode').val(val);
          break;
        default:
          $('#policy_address_attributes_'+selector_id+'_pincode').val('');
          break;
      }
    }
  },
  hidePremiumFields: function(){
    $("#policy_end_date").on("dp.change", function (e) {
      var total_year = AgentAssist.Policy.totalPolicyYear('#policy_start_date', '#policy_end_date');  
      if(total_year <= 1){
        $('div#policy_payment_mode input').prop('disabled', true);
        $('#policy_payment_mode').hide();
      }else{
        $('div#policy_payment_mode input').prop('disabled', false);
        $('#policy_payment_mode').show();
      }
    });
  },
  countPremiumAmount: function() {
    var total_amount = $('#policy_total_amount').val();
    var premium_mod = $('#policy_premium_mod').val();    
    var total_year = AgentAssist.Policy.totalPolicyYear('#policy_start_date', '#policy_end_date');
    var policy_amt = total_amount / total_year
    var val = 0.00;
    if(total_year > 1)
    {
      switch(premium_mod)
      {
        case 'quarterly':
          val =  policy_amt / 4
          break;
        case 'half_year':
          val =  policy_amt / 2
          break;
        case 'yearly':
          val =  policy_amt
          break;
      }
    }
    $('#policy_premium_amount').val(val.toFixed(2));
  },
  totalPolicyYear: function(start_date, end_date){
    var start_date = $('#policy_start_date').val();
    var start_year = new Date(start_date.split('/').reverse().join('/')).getFullYear();
    var end_date = $('#policy_end_date').val();
    var end_year = new Date(end_date.split('/').reverse().join('/')).getFullYear();
    return total_year = end_year - start_year
  },
  premiumAmount: function() {
    $('#policy_premium_mod, #policy_mod_of_payment').on('change',function(){
      AgentAssist.Policy.countPremiumAmount();
    });
    $('#policy_start_date, #policy_end_date').on('dp.change', function (e) {
      AgentAssist.Policy.countPremiumAmount();
    });
    $('#policy_total_amount').on('input',function(){
      AgentAssist.Policy.countPremiumAmount();
    });
  },
  policyValidation: function(){
    $('#policy_policy_number').on('change', function(){
      $.ajax({
        url: '/policies/policy_number',
        data: { policy_number: $('#policy_policy_number').val() }
      });
    });
  },
  searchDateTimePicker: function(){
    $('#date').datetimepicker({
      format: 'DD/MM/YYYY',
      useCurrent: false,
    });
  },
  policyAddressType: function () {
    $('#checkbox_check').on('ifToggled', function() {
      if ($(this).prop('checked')) {
        $('div#checked_form input').prop('disabled', true);
        $('#checked_form').hide();
        $('#policy_address_attributes_0_address_type').val('permanent');
      }
      else {
        $('div#checked_form input').prop('disabled', false);
        $('#policy_address_attributes_1_address_type').val('temporary');
        $('#checked_form').show();
      }
    });
  },
  documentOnReady: function (){
    this.policyCompanies();
    this.showDatePicker();
    this.hidePremiumFields();
    this.wizardSlideSteps();
    this.formSubmit();
    this.userDetails();
    this.buttonSubmit();
    this.policyType();
    this.selectDropDown();
    this.premiumAmount();
    this.emailValidation();
    this.searchDateTimePicker();
    this.policyAddressType();
    this.policyValidation();
  }
};
$(document).ready(function(){
  AgentAssist.Policy.documentOnReady();
});