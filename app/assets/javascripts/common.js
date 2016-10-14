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
    $('#notification_checked').on('change', function(){
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
  documentOnReady: function (){
    AgentAssist.Common.Flash_message();
    AgentAssist.Common.ajaxLoader();
    AgentAssist.Common.showDatePicker('.date_picker');
  }
};
$(document).ready(function(){
  AgentAssist.Common.documentOnReady();
});