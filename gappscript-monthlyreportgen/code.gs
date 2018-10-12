function myFunction() 
{
    //Gets current spreadsheet data and and makes a copy of the monthly report template.
    var sheet = SpreadsheetApp.getActiveSheet();
    var data = sheet.getDataRange().getValues();
    var templateId = '1bEUNm1E_WcOgp_1lSzR9CRy6-PHSETf0GdT_hnBTaDg';
    var documentId = DriveApp.getFileById(templateId).makeCopy().getId();
    
    //Code for getting the current date, name of current month and the month of the report, as well as a regular expression to verify that the ticket was submitted during the report month.
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var currentMonth = new Date().getMonth() + 1;
    var reportMonth = currentMonth - 1;
    var reportMonthName = monthNames[new Date().getMonth()];
    var monthRegEx = new RegExp(reportMonth + '\\/([0-3]?[0-9])\\/(19|20)\\d\\d');
    
    DriveApp.getFileById(documentId).setName('Help Desk Monthly Report For ' + reportMonthName);
    
    //Code for testing that the data is being retrieved properly from the spreadsheet, displays in logs (Commented out because its not used in normal operation).
    /*for (var i = 1; i < data.length; i++) 
    {
      var formattedDate = Utilities.formatDate(new Date(data[i][0]), "GMT-4", "MM/dd/yyyy");
      Logger.log('Date: ' + formattedDate);
      Logger.log('Name: ' + data[i][1]);
      Logger.log('Employee ID: ' + data[i][2]);
      Logger.log('Department: ' + data[i][3]);
      Logger.log('Issue: ' + data[i][4]);
      Logger.log('Description: ' + data[i][5]);
      Logger.log('Priority: ' + data[i][6]);
      Logger.log('---------------------------');
      
    }
    */
    
    //Calculates the number of tickets in spreadsheet submitted during the month that the report is generated for.
    var monthlyTickets = 0;
    for (var i = 1; i < data.length; i++)
    {
      var formattedDate = Utilities.formatDate(new Date(data[i][0]), "GMT-4", "MM/dd/yyyy");
      if (monthRegEx.test(formattedDate) == true)
      {
        monthlyTickets++;
        Logger.log(monthlyTickets);
      }
    }
    
    //Breaks down the number of tickets submitted during the month by department, type of issue, and priority.
    var financeTickets = 0;
    var salesTickets = 0;
    var custrelationsTickets = 0;
    var hrTickets = 0;
    
    for (var i = 1; i < data.length; i++)
    {
      if (data[i][3] == 'Finance')
      {
        financeTickets++;
      }
      if (data[i][3] == 'Sales')
      {
        salesTickets++;
      }
      if (data[i][3] == 'Customer Relations')
      {
        custrelationsTickets++;
      }
      if (data[i][3] == 'Human Resources')
      {
        hrTickets++;
      }
    }
    
    var issue1Tickets = 0;
    var issue2Tickets = 0;
    var issue3Tickets = 0;
    var issue4Tickets = 0;
    var otherissueTickets = 0;
    
    for (var i = 1; i < data.length; i++)
    {
      if (data[i][4] == 'Employee Account Login Problem')
      {
        issue1Tickets++;
      }
      if (data[i][4] == 'Computer Workstation Problem')
      {
        issue2Tickets++;
      }
      if (data[i][4] == 'Office Equipment Problem (i.e. Printer/Scanner, etc)')
      {
        issue3Tickets++;
      }
      if (data[i][4] == 'Network Problem (Internet)')
      {
        issue4Tickets++;
      }
      else
      {
        otherissueTickets++;
      }
    }
    
    var lowPTickets = 0;
    var mediumPTickets = 0;
    var highPTickets = 0;
    var noPTickets = 0;
    
    for (var i = 1; i < data.length; i++)
    {
      if (data[i][6] == 'Low')
      {
        lowPTickets++;
      }
      if (data[i][6] == 'Normal')
      {
        mediumPTickets++;
      }
      if (data[i][6] == 'High')
      {
        highPTickets++;
      }
      else
      {
        noPTickets++;
      }
    }
    
    //Replaces the placeholders in the report with the data calculated from the spreadsheet
    var body = DocumentApp.openById(documentId).getBody();
    
    body.replaceText('##MONTH##', reportMonthName);
    body.replaceText('##MONTHLYTKTS##', monthlyTickets);
    body.replaceText('##FINANCETKTS##', financeTickets);
    body.replaceText('##SALESTKTS##', salesTickets);
    body.replaceText('##CUSTRELTKTS##', custrelationsTickets);
    body.replaceText('##HRTKTS##', hrTickets);
    
    body.replaceText('##ISSUE1TKTS##', issue1Tickets);
    body.replaceText('##ISSUE2TKTS##', issue2Tickets);
    body.replaceText('##ISSUE3TKTS##', issue3Tickets);
    body.replaceText('##ISSUE4TKTS##', issue4Tickets);
    body.replaceText('##OTHERTKTS##', otherissueTickets);
    
    body.replaceText('##LOWPTKTS##', lowPTickets);
    body.replaceText('##NORMALPTKTS##', mediumPTickets);
    body.replaceText('##HIGHPTKTS##', highPTickets);
    body.replaceText('##NOPTKTS##', noPTickets);

    
}
