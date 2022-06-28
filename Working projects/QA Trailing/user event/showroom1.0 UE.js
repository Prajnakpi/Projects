function beforeload(type) {
    nlapiSetFieldValue("custrecord_show_add","Mangalore")
}

function beforesubmit(type) {

   var name =  nlapiGetFieldValue("custrecord_show_na");

   name = name+"_bfsubmit"; 

   nlapiSetFieldValue("custrecord_show_na","praj");

}

function aftersubmit(type) { 

    nlapiSendEmail('1700', 'prajna@kpi.co', 'After Submit', 'Data Submitted Successfully', null, null, null, null);

 }