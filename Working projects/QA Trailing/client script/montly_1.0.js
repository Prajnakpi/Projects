function pageInit(type) {
    alert("Welcome to Our showroom");
}

function fieldChange(type,name) {
    if(name == "custrecord1400") {
        var eName = nlapiGetFieldValue("custrecord1400");
        if(eName!=0){
            nlapiSetFieldValue("custrecord1403","Meeting")
        }
    }
}

function saveRecord(type) {
    alert("Are you sure to Proceed");

    return true;
}

function lineInit(type) {

    var detType =  nlapiGetCurrentLineItemValue("recmachcustrecord_ref_0","custrecord_emp_add");


    if(detType!=0){
        alert("Are you sure to Proceed");
       
    }
    return true;
}

function validateLine(type) {

    var name =  nlapiGetCurrentLineItemValue("recmachcustrecord_ref_0","custrecord_no_of_visitors");
   var num=100;
    
    if (name == num) {

        alert("Not Accept");
        //nlapiSetCurrentLineItemValue("recmachcustrecord_companyref","custrecord_custname","T");
        return false;
    }
    
 
   return true;
    
  }

