/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 * @NModuleScope SameAccount

 * Module Description
 * Deployment for RECRUITMENT Job Post
 * Includes rentFieldChangedAction
 *
 * Version    Date            Author        Remarks
 * 2.0.0      8 Aug 2021      Sanath       Created for RECRUITMENT Job Post
 
*/

define(['N/log', 'N/search', 'N/format', 'N/runtime', '../Modules/PRSUITE_moments.js'],
    function(log, search, format, runtime, moment) {
        /**
         * Function to be executed after line is selected.
         *
         * @param {Object} scriptContext
         * @param {string} scriptContext.fieldId - Field name
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @since 2015.2
         */
       

        function pageInitAction(scriptContext) {
            var currentReco = scriptContext.currentRecord;
            currentReco.setValue({
                fieldId: 'custrecord1405',
                value: 123

            });
        
        }
        
        /**
         * Function to be executed after line is selected.
         *
         * @param {Object} scriptContext
         * @param {string} scriptContext.fieldId - Field name
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @since 2015.2
         */
        function FieldChangedAction(scriptContext) {
         currentRecord= scriptContext.currentRecord;
            var currentfieldId = scriptContext.fieldId;
    
    
            carrier_value = scriptContext.currentRecord.getValue({
                    fieldId:'custrecord1404'
           
        });
        if(currentfieldId ==='custrecord1404'){
            Place = scriptContext.currentRecord.setValue({
                fieldId:'custrecord1406',
                value:'mangalore'
            })
        }   
    
    }

        /**
         * Function to be executed after line is selected.
         *
         * @param {Object} scriptContext
         * @param {string} scriptContext.fieldId - Field name
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @since 2015.2
         */
        function SaveRecordAction(scriptContext) {
         var   currentRecord= scriptContext.currentRecord; 
             var empPlace = currentRecord.getValue({
                fieldId:'custrecord1406'
            });
            if(empPlace=='')
            {
                alert('Please Enter emp place');
                return false;
            }
            else{
            return true;
        }
    }
        /**  
         * Function to be executed when field is changed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
         * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
         *
         * @since 2015.2
         */
        function PRValidateLineAction(scriptContext) {
            

                // Code section : 1
    
                try {s
    
                    var currentRecord = scriptContext.currentRecord;
    
                    var availbiltyEmp = currentRecord.getCurrentSublistValue({
                        
                        sublistId: scriptContext.sublistId,
    
                        fieldId: 'custrecord_emp_av'
    
                    });
    
                    var requestEmp = currentRecord.getCurrentSublistValue({
    
                        sublistId: scriptContext.sublistId,
    
                        fieldId: 'custrecord_emp_requested'
    
                    });
    
                    if (availbiltyEmp < requestEmp) {
    
                        alert("Requested employee Cannot Be Greater Then Available Quantity");
    
                        currentRecord.setCurrentSublistValue({
    
                            sublistId: scriptContext.sublistId,
    
                            fieldId: 'custrecord_emp_requested',
    
                            value: ""
    
                        });
    
                        return false;
    
                    }
    
                    return true;
    
    
    
    
                } catch (e) {
    
                    log.error('error', e.toString());
    
                }
    
                return true;

        }
        function lineInit(scriptContext) {

            // Code section : 1



             var currentRecord = scriptContext.currentRecord;



            var detType = currentRecord.getCurrentSublistValue({



                            sublistId: "recmachcustrecord_emp_ref",



                            fieldId: "custrecord_emp_dist1",



                        });



                        console.log("dettypw--",detType)



                        if(detType==1){



                            var selectOpt = currentRecord.getSublistField({



                                sublistId: "recmachcustrecord_emp_ref",

           

                                fieldId: "custrecord_emp_dist1",

           

                                line: currentRecord.getCurrentSublistIndex

           

                            });

           

                            selectOpt.isDisabled = true;

                        }



            // var lineCount= currentRecord.getCurrentSublistIndex({



            //                 sublistId:"recmachcustrecord_hcm_roster_det_roster_ref",



            //         })



           

            // return true;



        }

        return {
            pageInit: pageInitAction,
            fieldChanged: FieldChangedAction,
            saveRecord: SaveRecordAction,
            validateLine: PRValidateLineAction,
            lineInit:lineInit,
        };

    });
    