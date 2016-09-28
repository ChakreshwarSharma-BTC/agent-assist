AgentAssist.Nominee = {
  nomineeValidation: {
    $("#nominee_form").validation({
      rules:{
        "nominee[first_name]":"required",
        "nominee[middle_name]":"required",
        "nominee[last_name]":"required",
        "nominee[date_of_birth]":"required",
        "nominee[gender]":"required",
        "nominee[relation]":"required",
      },
      messages: {
        "nominee[first_name]":"Please enter nominee first name."
        "nominee[middle_name]":"Please enter nominee middle name."
        "nominee[last_name]":"Please enter nominee last name."
        "nominee[date_of_birth]":"Please enter date of birth."
        "nominee[gender]":"Please enter gender."
        "nominee[relation]":"Please enter relation with nominee."
      }
    })
  }
}