/**

 * @NApiVersion 2.0

 * @NScriptType UserEventScript

 * @NModuleScope SameAccount

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

         var recId = curRec.id;

         var  subsidiary= curRec.getValue({

            fieldId: 'subsidiary'  
        
        })

       

         if (scriptContext.type == "view")

            if (subsidiary==4 ||subsidiary==3){

        

             scriptContext.form.addButton({



                 id: 'custpage_print_pdf',



                 label: 'Print',



                 functionName: 'window.open(\'/app/site/hosting/scriptlet.nl?script=829&deploy=1&recordID=' + recId + '&end=true\')'



             });
            }

     }

     return {

         beforeLoad: BeforeLoadAction

     };

 });

