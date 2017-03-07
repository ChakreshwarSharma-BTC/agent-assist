AgentAssist = {};
AgentAssist.Common = {
  Flash_message: function(){
    $(".flash_msg").delay(5000).slideUp(3000).fadeOut();
  },
  applyLoader: function () {
    $.blockUI({css:{
      border: 'none',
      padding: '15px',
      backgroundColor: '#000',
      '-webkit-border-radius': '10px',
      '-moz-border-radius': '10px',
      opacity: .5,
      color: '#fff'
    }});
  },
  ajaxLoader: function () {
    $(document).ajaxStart(function () {
      AgentAssist.Common.applyLoader();
    }).ajaxStop(function () {
      $.unblockUI();
    });
  },
  notification: function(){
    $('#notification_checked').on('ifToggled', function(){
      var notification_value = $(this).is(':checked');
      $.ajax({
        type:'GET',
        url: 'policies/update_notification',
        data: {notification: notification_value}
      });
      $('#modal').modal('hide');
    });
  },
  dateTimePicker: function(){
    $('.date_picker').datetimepicker({
      format: 'DD/MM/YYYY',
      useCurrent: false
    });
  },
  birthDatePicker: function(){
    $('.bday_picker').datetimepicker({
      format: 'DD/MM/YYYY',
      maxDate: new Date(),
      useCurrent: false
    });
  },
  showDatePicker: function(){
    $('.date_picker').each(function(index, date_picker){
      var db_date = $(this).attr('value');
      if(db_date != null)
      {
        var set_date =  db_date.split('-').reverse().join('/');
        $(this).val(set_date);
      }
    });
    AgentAssist.Common.dateTimePicker();
  },
  validateFields: function(){
    $('form input').on('focusout', function(){
      $(this).valid();
    });
  },
  bindIcheck: function () {
    $('input').iCheck({
      checkboxClass: 'icheckbox_square-green',
      radioClass: 'iradio_square-green',
      increaseArea: '20%'
    });
  },
  bindMaskedInput: function(selector, maskedValue){
    $(selector).inputmask(maskedValue, { "clearIncomplete": true }).bind('blur.mask', function () {
      $(this).change().focusout();
    });
  },
  fillUserPersonalInfo: function(selector, response){
    $("input[name='"+selector+"[personal_info_attributes][first_name]']").val(response.personal_info.first_name);
    $("input[name='"+selector+"[personal_info_attributes][middle_name]']").val(response.personal_info.middle_name);  
    $("input[name='"+selector+"[personal_info_attributes][last_name]']").val(response.personal_info.last_name);  
    $("input[name='"+selector+"[personal_info_attributes][date_of_birth]']").val(response.personal_info.date_of_birth);    
    $("[id='"+selector+"_personal_info_attributes_"+response.personal_info.gender+"']").iCheck('check');
  },
  getUserAddress: function(selector, response){
    if(response.address.length == 1)
    {   
      $('#checkbox_check').iCheck('check');
    }
    var permanent_address = response.address[0];
    var temp_address = response.address[1];

    var permanent_address_fields = { street_1: "#"+selector+"_address_attributes_0_street_1",
                                street_2: "#"+selector+"_address_attributes_0_street_2",
                                city:     "#"+selector+"_address_attributes_0_city",
                                state:    "#"+selector+"_address_attributes_0_state",
                                pincode:  "#"+selector+"_address_attributes_0_pincode",
                              };
    var temp_address_fields = { street_1: "#"+selector+"_address_attributes_1_street_1",
                                street_2: "#"+selector+"_address_attributes_1_street_2",
                                city:     "#"+selector+"_address_attributes_1_city",
                                state:    "#"+selector+"_address_attributes_1_state",
                                pincode:  "#"+selector+"_address_attributes_1_pincode",
                              };

    if(permanent_address)
    {
      AgentAssist.Common.fillUserAddress(permanent_address, permanent_address_fields)
    }
    if(temp_address)
    {
      AgentAssist.Common.fillUserAddress(temp_address, temp_address_fields)
    }
  },
  fillUserAddress: function(address_type, address_fields){
    $.each(address_type, function(field, value){
      $(address_fields[field]).val(value);
    });
  },
  documentOnReady: function (){
    this.Flash_message();
    this.ajaxLoader();
    this.showDatePicker('.date_picker');
    this.bindIcheck();
    this.notification();
  }
};
$(document).ready(function(){
  AgentAssist.Common.documentOnReady();
});