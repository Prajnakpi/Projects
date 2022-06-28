/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 * Module Description
 * Deployment for RECRUITMENT Job Post
 * Includes rentFieldChangedAction
 *
 * Version    Date            Author        Remarks
 * 2.0.0      8 Aug 2021   Sanath       Created for RECRUITMENT Job Post
 
*/

define(['N/log', 'N/search', 'N/format', 'N/runtime'],
    function(log, search, format, runtime) {
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

            var currentRecord = scriptContext.currentRecord;
        var name=currentRecord.getField({

                fieldId:'custrecord_prajna_address',    


            });

            name.isMandatory = true;

            var name=currentRecord.setValue({

                fieldId:'custrecord_prajna_address',

                value:'Mangalore'

               

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

        function FieldChangedAction(context) {            
            currentRecord= context.currentRecord;
            var currentfieldId= context.fieldId;
            carrier_value=context.currentRecord.getValue({
                fieldId: 'custrecord_working'

            });
            
            if(currentfieldId == "custrecord_working")
            {

                var name=currentRecord.getField({
                    fieldId: 'custrecord_description',     
                   
                });
                name.isMandatory = true;
               
                var name=currentRecord.setValue({
                    fieldId: 'custrecord_description',
                    value:'very good'
                   
                });
               
            }
           
        }
       var l;

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
            alert("Do You Wanna Proceed");
            return true;
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
        function lineInit(scriptContext) {
           
            var currentRecord = scriptContext.currentRecord;

            var detType = currentRecord.getCurrentSublistValue({

                            sublistId: "recmachcustrecord_refere",
                            fieldId: "custrecord_pla",

                        });

                        console.log("dettypw--",detType)

                        if(detType==2){

                            var selectOpt = currentRecord.getSublistField({

                                sublistId:"recmachcustrecord_refere",
                                fieldId: "custrecord_pla",

            
                                line: currentRecord.getCurrentSublistIndex
            
                            });
            
                            selectOpt.isDisabled = true;
                        }

            // var lineCount= currentRecord.getCurrentSublistIndex({

            //                 sublistId:"recmachcustrecord_hcm_roster_det_roster_ref",

            //         })

           
            return true;

        }
                       

        function validateLine(scriptContext) {
            {

                var currentRecord = scriptContext.currentRecord;
                var pincode = currentRecord.getCurrentSublistValue({

                    sublistId: scriptContext.sublistId,
                    fieldId: 'custrecord_pincod'
                });

                if (pincode == '') {

                    alert("Fill the Mandtoary Feild");
                   
                    return false;
                }
            return true;
        }
    }




        return {
            pageInit: pageInitAction,
            fieldChanged: FieldChangedAction,
            saveRecord: SaveRecordAction,
            lineInit: lineInit,
            validateLine:validateLine,
        };

    });