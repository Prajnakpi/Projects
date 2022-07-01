/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 
 * Module Description
 *
 * Version    Date            Author        Remarks
 * 1.0.0      1 jul 2022      Prajna    

 */
define(['N/record', 'N/log', 'N/search', 'N/task', 'N/redirect', 'N/ui/serverWidget', 'N/error', 'N/format', 'N/url'],

    function (record, log, search, task, redirect, serverWidget, error, format, url) {

        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type
         * @param {Form} scriptContext.form - Current form
         * @Since 2015.2
         */
        function BeforeLoadAction(scriptContext) {
            var curRec = scriptContext.newRecord;
            var recordID = curRec.id;
          
            if (scriptContext.type == "view")

                scriptContext.form.addButton({

                    id: 'custpage_print_pdf',

                    label: 'Print', 

                    functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=243&deploy=1&recordID=' + recordID + '&end=true\')'

                });
        }
        return {
            beforeLoad: BeforeLoadAction
        };
    });