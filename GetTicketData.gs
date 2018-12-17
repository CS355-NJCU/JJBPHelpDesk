function elements(range,element) {
  
  if(range != undefined){ 
  var elementsArray = range.join().split(',').filter(Boolean); //works as a dillimeter
 
	for (var n= 0; n < elementsArray.length; n++)  //looping code to run through all the data
    
    {
		if (elementsArray[n+1] == element) //function to search for the given requirement
        
        {
			return elementsArray[n] + "," + element + "," + elementsArray[n+2] + "," + elementsArray[n+3];  //prints all the information regarding the first ticket with the requirement
  
		}
	}
	return false; //if no ticket with the given requirement is found
    
    for (var n= 0; n < elementsArray.length; n++) {
		if (elementsArray[n+3] == element)
        {
			return elementsArray[n] + "," + element + "," + elementsArray[n+2]; 
  //by putting in any characteristic such as "close", the function returns the first ticket on the top of the list of tickets 
          // which is first ticket submitted with the given characteristic/requirements
		}
	}
	return false;
    
     
    
    
}
}
