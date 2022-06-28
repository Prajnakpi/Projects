/**
 *@NApiVersion 2.0
 *@NModuleScope Public
 *@NScriptType Suitelet
 
 * Module Description
 * Deployment for RENTEGRATE_BulkPreview_suitelet on ROBD Details action
 * Includes rentOnRequestAction
 *
 * Version    Date            Author        Remarks
 * 1.0.0      08 Jul 2020     Sanath        Created for employee profile
 */
 define(['N/log', 'N/ui/serverWidget', 'N/record', 'N/search', 'N/task', 'N/redirect', 'N/runtime', '../Modules/PRSUITE_module.js'],

 function(log, serverWidget, record, search, task, redirect, runtime, prsuite) {

     /**
      * Definition of the Suitelet script trigger point.
      *
      * @param {Object} context
      * @param {ServerRequest} context.request - Encapsulation of the incoming request
      * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
      * @Since 2015.2
      */  function OnRequestAction(context) {
        if (context.request.method == 'GET') {

            var currentUserId = runtime.getCurrentUser().id;
            log.debug("currentUserId",currentUserId)


            var form = serverWidget.createForm({
                title: 'Employee Information'
            });
            form.addFieldGroup({
                id: '_examplefieldgroup',
                label: 'Employee Details'
            });

                var emp_name = form.addField({
                id: 'custpage__name',
                type: serverWidget.FieldType.TEXT,
                label: 'Employee_Name',
                source:'custrecord_emp_name',
                container: '_examplefieldgroup'
            });
            var emp_id = form.addField({  
                id: 'custpage__id',
                type: serverWidget.FieldType.TEXT,
                label: 'Employee_Id',
                container: '_examplefieldgroup' 
            });
            var dateofbirth = form.addField({
                id: 'custpage_dateof_birth',
                type: serverWidget.FieldType.DATE,
                label: 'DateOfBirth',
                container: '_examplefieldgroup' 
            });
            var age = form.addField({
                id: 'custpage_age',
                type: serverWidget.FieldType.INTEGER,
                label: 'Age',
                container: '_examplefieldgroup'
            });
            var address = form.addField({
                id: 'custpage_address',
                type: serverWidget.FieldType.TEXTAREA,
                label: 'Address',
                container: '_examplefieldgroup'
            });
            form.addFieldGroup({
                id: '_examplefieldgroupeducation',
                label: 'Education Details'
            });
            var qualification = form.addField({
                id: 'custpage_account_branch',
                type: serverWidget.FieldType.SELECT,
                label: 'Qualification',
                container: '_examplefieldgroupeducation'
            });
            qualification.isMandatory = true;
            
            qualification.addSelectOption({
                value: '0',
                text: '',
                isSelected: true
            });
            qualification.addSelectOption({
                value: '1',
                text: 'BE'
            });
            qualification.addSelectOption({
                value: '2',
                text: 'ME'
            });
            qualification.addSelectOption({
                value: '3',
                text: 'BCA'
            });
            qualification.addSelectOption({
                value: '4',
                text: 'MCA',
                isSelected: true
            });
            var percentage = form.addField({
                id: 'custpage_account_num',
                type: serverWidget.FieldType.TEXT,
                label: 'Percentage',
                container: '_examplefieldgroupeducation'
            });
            var cgpa = form.addField({
                id: 'custpage_branch_loc',
                type: serverWidget.FieldType.TEXT,
                label: 'CGPA',
                container: '_examplefieldgroupeducation'
            });
    
            qualification.isMandatory = true;

            form.addFieldGroup({
                id: '_examplefieldgroupcontactdetails',
                label: 'Contact Details'
            });
            var contact_name = form.addField({
                id: 'custpage_contact_name',
                type: serverWidget.FieldType.TEXT,
                label: 'Contact Name',
                container: '_examplefieldgroupcontactdetails'
            });
         
            var dateofbirth = form.addField({
                id: 'custpage_customer_dateof_birth',
                type: serverWidget.FieldType.DATE,
                label: 'Date Of Birth',
                container: '_examplefieldgroupcontactdetails'
            });
            var contactid = form.addField({
                id: 'custpage_customer_id',
                type: serverWidget.FieldType.TEXT,
                label: 'Contact ID',
                container: '_examplefieldgroupcontactdetails'
            });
            var customerphone = form.addField({
                id: 'custpage_customer_phone',
                type: serverWidget.FieldType.TEXT,
                label: 'Phone',
                container: '_examplefieldgroupcontactdetails'
            });
            var sublist = form.addSublist({
                id: 'sublist',
                type: serverWidget.SublistType.INLINEEDITOR,
                label: 'BANK DETAILS'
                });
                sublist.addField({
                    id: 'sublist1',
                    type: serverWidget.FieldType.TEXT,
                    label: 'IFSC CODE'
                    });
                    sublist.addField({
                        id: 'sublist3',
                        type: serverWidget.FieldType.EMAIL,
                        label: 'Bank Email id'
                        });
                        
                        record.setSublisttext({
                            sublistId: 'customrecord_vist_1',
                            fieldId: 'custrecord_emp_add',
                            text:'mangalore'
                             });
        //                 var employeeLookup = search.lookupFields({

        //                     type: 'customrecord_emp_leave_details',//custom record id from where you want to fetch the data
        
        //                     id: currentUserId,
        
        //                     columns: ['custrecord_emp_id']

                            
        
        //                 });
                      
        //                                      var employeename = employeeLookup["custrecord_emp_name"];
        //                      
        //                    
        //                   if (employeename) {
        
        //                     emp_name.defaultValue = employeename;
        
        //                 }
               /**    var empRecType = 'customrecord_bankcustdet';
                  var columns = [];
                  columns.push(search.createColumn({
                    name: 'custrecord_custnam',
                }));

                columns.push(search.createColumn({
                    name: 'custrecord_custiid',
                    
                }));
                var filters = [];
                 form.addSubmitButton({
                     label:"submit"
                 })   */

            
            context.response.writePage(form);

         }
  
        }
      
      return {
        onRequest: OnRequestAction
    };

});

