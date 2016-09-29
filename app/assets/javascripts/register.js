AgentAssist.Register = {
  autoCompleteLocation: function (selector) {
    $(selector).on('focus', function(){
      autocomplete = new google.maps.places.Autocomplete($(selector)[0],
        {types: ['geocode']});      
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
    $('#checkbox_check').on('click', function() {
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
  }
};