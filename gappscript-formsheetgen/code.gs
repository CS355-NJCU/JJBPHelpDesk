function generateForm() 
{
  //Generates form for ticket submission and spreadsheet to store responses.
  var form = FormApp.create('submissionForm')
    .setTitle("Ticket Submission Form");
  var ss = SpreadsheetApp.create('ticketSpreadsheet');
  
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  //Adds 4 questions for responses, requiring Name, EmployeeID, Subject, and Description.
  var q0 = form.addTextItem()
    .setTitle('Enter Your Name.')
    .setRequired(true);
  var idValidation = FormApp.createTextValidation()
    .setHelpText("Your ID should be 6 digits (0-9) long.")
    .requireTextMatchesPattern('[0-9]{6}')
    .build();
  var q1 = form.addTextItem()
    .setTitle('Enter your Employee ID')
    .setRequired(true)
    .setValidation(idValidation);
  var q2 = form.addTextItem()
    .setTitle('What is the nature of your support request?')
    .setRequired(true);
  var q3 = form.addParagraphTextItem()
    .setTitle('Please give more detail, if available.');
}
