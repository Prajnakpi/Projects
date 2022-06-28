function formWithFieldGroup(request, response)
{
   if ( request.getMethod() == 'GET' )
   {
        var form = nlapiCreateForm('DETAILS');
        form.addSubmitButton('Submit');
         var group = form.addFieldGroup( 'empdetailsgroup', 'Employee Details ');
   form.addField('firstname', 'text', 'First Name', null,'empdetailsgroup');
   form.addField('lastname', 'text', 'Last Name', null, 'empdetailsgroup');
   form.addField('agefield','text', 'Age', null,'empdetailsgroup' );
   form.addField('datefield','date', 'Date Of Birth', null,'empdetailsgroup');
         form.addField('textarea','textarea', 'Address', null,'empdetailsgroup');
        form.addField('emailfield','email', 'Email', null,'empdetailsgroup' );
    form.addField('orgtypelabel','label','which task assigned to you?').setLayoutType('startrow');
         form.addField('orgtype', 'radio', 'form creation', 'fc');
         form.addField('orgtype', 'radio','website design','wd');
         form.addField('orgtype', 'radio','mobile app development','mobile');
    var select = form.addField('selectfield', 'select', 'COURSE');
    select.addSelectOption('','');
        select.addSelectOption('a', 'MECHANICAL');
        select.addSelectOption('b', 'CIVIL');
        select.addSelectOption('c', 'CS');
        select.addSelectOption('d', 'IS');
        
        select.addSelectOption('e', 'AERO');
        var sublist = form.addSubList("qualification", "inlineeditor", "QUALIFICATION")
        sublist.addField("programmingskills", "text", "Programming Skills");
        sublist.addField("course", "text", "course");
        sublist.addField("level", "text", "Levels");
        sublist.addField("skills", "textarea", "Skills");
        group.setShowBorder(true);
        response.writePage(form);
    }
    else
        dumpResponse(request, response);
}
