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
          $('#policy_personal_info_attributes_gender').val(response.personal_info.gender);          
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
      autocomplete.addListener('place_changed', AgentAssist.Policy.getAddress);
    });
  },
  getAddress: function () {
    var address = {
      locality: 'long_name',
      administrative_area_level_1: 'long_name',
      postal_code: 'short_name'
    };
    var place = autocomplete.getPlace();
    if(place != null)
    {
      AgentAssist.Policy.fillAddress(place, address);
    }
  },
  fillAddress: function (place, address) {
    for (var i = 0; i < place.address_components.length; i++)
    {
      var addressType = place.address_components[i].types[0];
      var val = place.address_components[i][address[addressType]];
      switch(addressType)
      {
        case 'locality':
          $('#policy_address_attributes_city').val(val);
          break;
        case 'administrative_area_level_1':
          $('#policy_address_attributes_state').val(val);
          break;
        case 'postal_code':
          $('#policy_address_attributes_pincode').val(val);
          break;
        default:
          $('#policy_address_attributes_pincode').val('');
          break;
      }
    }
  },
  premiumAmount: function() {
    $('#policy_premium_mod').on('change',function(){

      var start_date = $('#policy_start_date').val();
      var start_year = new Date(start_date.split('/').reverse().join('/')).getFullYear();
      var end_date = $('#policy_end_date').val();
      var end_year = new Date(end_date.split('/').reverse().join('/')).getFullYear()
      var total_amount = $('#policy_total_amount').val();
      var premium_mod = $(this).val();

      var total_year = end_year - start_year
      var policy_amt = total_amount / total_year

      console.log(premium_mod);
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
    });
  },
  searchDateTimePicker: function(){
    $('#date').datetimepicker({
      format: 'DD/MM/YYYY',
      useCurrent: false,
    });
  },
  documentOnReady: function (){
    this.policyCompanies();
    this.showDatePicker();
    this.wizardSlideSteps();
    this.formSubmit();
    this.userDetails();
    this.buttonSubmit();
    this.policyType();
    this.autoCompleteLocationPolicy('#policy_address_attributes_city');
    this.selectDropDown();
    this.premiumAmount();
    this.emailValidation();
    this.searchDateTimePicker();
  }
};
$(document).ready(function(){
  AgentAssist.Policy.documentOnReady();
});