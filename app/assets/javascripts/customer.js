AgentAssist.Customer = {
  existingMember: function(){
    $('#existing_member').on('ifToggled', function(){
      if($('#existing_member').prop('checked'))
      {
        $.ajax({
          type:'GET',
          url: '/customers/existing_member/members'
        });
      }
      else
      {
        $('#members').html('');
        $('#family_members').html('');
      }
    });
  },
  familyMembers: function(){
    $('#search_customer').on('change', function(){
      var customer = $(this).val();
      if(customer != '')
      {
        $.ajax({
          type:'GET',
          url: '/customers/existing_member/family_members',
          data: {id: customer}
        });
      }
    });
  },
  familyMember: function(){
    $('#family_member').on('change', function(){
      var member = $(this).val();
      var customer = $('#search_customer').val();
      if($(this).val() != ''){
        $.ajax({
          type:'GET',
          url: '/customers/existing_member/family_member',
          data: { member_id: member, customer_id: customer },
          success: function(response)
          {
            AgentAssist.Common.fillUserPersonalInfo('user', response);
            AgentAssist.Common.getUserAddress('user', response);
            $("#wizard").smartWizard('disableStep', 2);
          }
        });
      }
    });
  },
  addFamily: function(){
    $('#family_member').on('change', function(){
      var member = $(this).val();
      if($(this).val() != ''){
        $.ajax({
          type:'GET',
          url: '/customers/existing_member/family_member',
          data: { member_id: member },
          success: function(response)
          {
            AgentAssist.Common.fillUserPersonalInfo('user', response);
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
 
