AgentAssist.Register = {
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
    $('.buttonFinish').on('click', function(){
      $('form').submit();
    })
  },
  autoCompleteLocation: function (selector) {
    $(selector).on('focus', function(){
      autocomplete = new google.maps.places.Autocomplete($(selector)[0],
        {
          types: ['geocode'],
          componentRestrictions: {country: 'in'}
        });
      autocomplete.addListener('place_changed', function (){
        AgentAssist.Register.getAddress(selector);
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
      AgentAssist.Register.fillAddress(place, address, selector_id);
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
          $('#user_address_attributes_'+selector_id+'_city').val(val);
          break;
        case 'administrative_area_level_1':
          $('#user_address_attributes_'+selector_id+'_state').val(val);
          break;
        case 'postal_code':
          $('#user_address_attributes_'+selector_id+'_pincode').val(val);
          break;
        default:
          $('#user_address_attributes_'+selector_id+'_pincode').val('');
          break;
      }
    }
  },
  addressType: function () {
    $('#checkbox_check').on('ifToggled', function() {
      if ($(this).prop('checked')) {
        $('div#checked_form input').prop('disabled', true);
        $('#checked_form').hide();
        $('#user_address_attributes_0_address_type').val('permanent');
      }
      else {
        $('div#checked_form input').prop('disabled', false);
        $('#user_address_attributes_0_address_type').val('temporary');
        $('#checked_form').show();
      }
    });
  },
  validateForm: function (selector){
    $(selector).on('click', function(){
      $('form').valid();
    });
  },
  selectDropDown: function(){
    $(".select").select2().change(function(){
      $(this).valid();
    });
    $("#customer").select2({});
  },
  Email_validation: function(){
   // $('#user_email').on('change', function(){
   //    $.ajax({
   //      type: 'GET',
   //      url: '/customers/new',
   //      data: {
   //        email: $('#user_email').val()
   //      }
   //    });
   //  });
  },
  documentOnReady: function (){
    this.autoCompleteLocation('#user_address_attributes_0_city');
    this.autoCompleteLocation('#user_address_attributes_1_city');
    this.selectDropDown();
    this.addressType();
    this.wizardSlideSteps();
    this.formSubmit();
    this.Email_validation();
  }
};
$(document).ready(function(){
  AgentAssist.Register.documentOnReady();
  $("#user_primary_phone_no").inputmask("9999999999");
  $("#user_address_attributes_0_pincode").inputmask("999999");
  $("#user_address_attributes_1_pincode").inputmask("999999");
  $("#email").fadeIn().text("Name required.");
});