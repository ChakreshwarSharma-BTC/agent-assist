AgentAssist.Register = {
  autoCompleteLocation: function (selector) {
    $(selector).on('focus', function(){
      autocomplete = new google.maps.places.Autocomplete($(selector)[0],
        {types: ['geocode']});      
      autocomplete.addListener('place_changed', AgentAssist.Register.getAddress);
    });
  },
  getAddress: function () {
    var address = {
      locality: 'long_name',
      administrative_area_level_1: 'long_name',
      postal_code: 'short_name'
    };
    var place = autocomplete.getPlace();
    if(place!=null)
    {
      for (var i = 0; i < place.address_components.length; i++)
      {
        var addressType = place.address_components[i].types[0];
        var val = place.address_components[i][address[addressType]];
        switch(addressType)
        {
          case 'locality':
            $('#user_address_attributes_city').val(val);
            break;
          case 'administrative_area_level_1':
            $('#user_address_attributes_state').val(val);
            break;
          case 'postal_code':
            $('#user_address_attributes_pincode').val(val);
            break;
          default:
        	$('#user_address_attributes_pincode').val('');
            break;
        } 
      }
    }
  }
};