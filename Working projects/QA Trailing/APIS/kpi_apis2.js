function formWithFieldApi(request, response)
{
   if ( request.getMethod() == 'GET' )
   {
            
                var form = nlapiCreateForm('Visitor Details ');
        form.addSubmitButton('Submit');
         var group = form.addFieldGroup( 'visitorsgroup', 'Employee Details ');
   form.addField('firstname', 'text', 'Name', null,'visitorsgroup');
   form.addField('visitorsname', 'text', 'visitorsname', null, 'visitorsgroup');
   form.addField('PurposeofVisit','text', 'Purpose of visit', null,'visitorsgroup' );
   
        group.setShowBorder(true);
        var b;
        response.writePage(form);
    }
    else{
        dumpResponse(request, response);
        
        var firstname = request.getParameter();
        var visitorsname = request.getParameter();
        var PurposeofVisit = request.getParameter();

        var myrecord=setFieldValue("name,firstname")
        var myrecord=setFieldValue("name,visitorsname")
        var myrecord=setFieldValue("name,PurposeofVisit")

       
        var save = nlapiSubmitRecord();
} 
}