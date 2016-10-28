AgentAssist.Customer = {
  existingMember: function(){
    $('#existing_member').on('ifToggled', function(){
      if($('#existing_member').prop('checked')){
        $.ajax({
          url: '/customers/existing_member/members'
        });
      } else{
        $('#members').html('');
        $('#family_members').html('');
      }
    });
  },
  familyMembers: function(){
    $('#search_customer').on('change', function(){
      var customer = $(this).val();
      if(customer){
        $.ajax({
          url: '/customers/existing_member/family_members', data: {id: customer}
        });
      }
    });
  },
  familyMember: function(){
    $('#family_member').on('change', function(){
      var member = $(this).val();
      var customer = $('#search_customer').val();
      if(member && customer){
        $.ajax({
          url: '/customers/existing_member/member',
          data: { member_id: member, id: customer },
          success: function(response){
            AgentAssist.Common.fillUserPersonalInfo('user', response);
            AgentAssist.Common.getUserAddress('user', response);
          }
        });
      }
    });
  },
  documentOnReady: function(){
    this.existingMember();
  }
}
$(document).ready(function(){
  $('select').select2();
  AgentAssist.Customer.documentOnReady();
});
 
