function pageInit(type) {
    alert("Welcome to Employees information");
}

function fieldChange(type,age) {
    if(age == "custrecord_emp_info_age") {
        var hopName = nlapiGetFieldValue("custrecord_emp_info_age");
        if(hopName==1){
            nlapiSetFieldValue("custrecord_emp_t","9:00 am")
        }
    }
}

function saveRecord(type) {
    alert("Are you sure to Proceed");

    return true;
}

function validateline(type) {

   
    var availbiltyEmp =  nlapiGetCurrentLineItemValue("recmachcustrecord_emp_ref","custrecord_emp_av");
    var requestEmp =  nlapiGetCurrentLineItemValue("recmachcustrecord_emp_ref","custrecord_emp_requested");


    if(availbiltyEmp < requestEmp) {
    
        alert("Requested employee Cannot Be Greater Then Available Quantity");
        
        return false;
    }
 return true;
}

function lineint(type) {

    var detType =  nlapiGetCurrentLineItemValue("recmachcustrecord_emp_ref","custrecord_emp_av");
    
    if(detType = 1) {

        alert("You cannot enter this value");
    }
}
