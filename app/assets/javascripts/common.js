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
      maxDate: moment(),
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