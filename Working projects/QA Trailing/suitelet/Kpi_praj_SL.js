/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */


 define(['N/runtime','N/ui/serverWidget','N/record','N/http'],
 function(runtime,serverWidget,record,http) {
    /**
     * Definition of the Suitelet script trigger point.
     *
     * @param {Object} context
     * @param {ServerRequest} context.request - Encapsulation of the incoming request
     * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
     * @param {Form} context.form - Current form
     * @Since 2015.2
     */
    function onRequest(context) {

        if(context.request.method == 'GET') {

            var form = serverWidget.createForm({
                title: 'Visitors information'
            });
            form.addFieldGroup({
                id: '_examplefieldgroup',
                label: 'Visitor Details'
            });
            var fname = form.addField({
                id: 'f_name',
                type: serverWidget.FieldType.TEXT,
                label: 'Name',
                container: '_examplefieldgroup'
            });

               
            var vname = form.addField({
                id: 'v_name',
                type: serverWidget.FieldType.TEXT,
                label: 'Visitor Name',
                container: '_examplefieldgroup'
            });
          
            var visitpurpose = form.addField({
                id: 'visitpurpose',
                type: serverWidget.FieldType.TEXT,
                label: 'Purpose of Visit',
                container: '_examplefieldgroup'
            });
            var sublist = form.addSublist({
                id: 'sublist',
                type: serverWidget.SublistType.INLINEEDITOR,
                label: ' visitors details'
                });
                sublist.addField({
                    id: 'sublist1',
                    type: serverWidget.FieldType.TEXT,
                    label: 'visitor address'
                    });
                    sublist.addField({
                        id: 'sublist3',
                        type: serverWidget.FieldType.TEXT,
                        label: 'visitor phonenumber'
                        });
                        
                        // sublist.setSublistValue({

                        //     sublistId: 'recmachsublist',
                        //     fieldId:"sublist1",

                            

                        //     value:'kadri'

                           
                        

               

                        // //     value:'mangalore'

                        //  });
                 
        form.addSubmitButton({
            label: "Submit"
        });
        


        context.response.writePage(form);

        } 
        
        else {

            var request = context.request.parameters.request;
            var currentUser = runtime.getCurrentUser().id;
            var fname = context.request.parameters.f_name;
            var vname = context.request.parameters.v_name;
            var purpose = context.request.parameters.visitpurpose;
         
            var myRecord = record.create({
                type: 'customrecord1432',
                isDynamic:true,
            });
            myRecord.setValue({
                fieldId: "name",
                value: fname,
            });
            
            myRecord.setValue({
                fieldId: "custrecord1400",
                value: vname,
            });
            myRecord.setValue({
                fieldId: "custrecord1403",
                value: purpose,
            });

           var recordId=myRecord.save({
               enableSourcing:false,
              ignoreMandatoryFields:false 
           });
            
           
           
     context.response.write('Data Inserted in Monthly Visitors Information Record');


        }
    }

    return {
        onRequest: onRequest,
    };
});
