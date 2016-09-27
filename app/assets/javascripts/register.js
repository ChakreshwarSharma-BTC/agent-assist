AgentAssist.Register = {
  autoCompleteLocation: function (selector) {
    $(selector).on('focus', function(){
      autocomplete = new google.maps.places.Autocomplete($(selector)[0],
        {types: ['geocode']});      
      autocomplete.addListener('place_changed', AgentAssist.Register.getAddress);
    });
  },
  getAddress: function () {
    var place = autocomplete.getPlace();
    if(place!=null){
      var address = place.address_components;
      var type = address[address.length - 1].types[0];
      var split_address = $('#user_address_attributes_city').val().split(',');
      $('#user_address_attributes_city').val(split_address[0]);
      $('#user_address_attributes_state').val(split_address[1]);
      if(type == 'postal_code'){
        var zipcode = address[address.length - 1].long_name;
        $('#user_address_attributes_pincode').val(zipcode);
      } 
      else
      {
        $('#user_address_attributes_pincode').val('');
      }
    }
  }
};