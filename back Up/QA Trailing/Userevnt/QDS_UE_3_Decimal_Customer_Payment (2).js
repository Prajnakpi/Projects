/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/search', 'N/format', 'N/task', 'N/ui/serverWidget', 'N/redirect', 'N/runtime', 'N/error', 'N/log', 'N/url'],
    function(record, search, format, task, serverWidget, redirect, runtime, error, log, url) {
        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type
         * @param {Form} scriptContext.form - Current form
         * @Since 2015.2
         */
        function paymentBeforeLoadAction(scriptContext) {
            try {
                
                var id = scriptContext.newRecord.id;
                var currentRecord = scriptContext.newRecord;
                
                if (scriptContext.type == 'view' || scriptContext.type == 'edit') {
                     log.debug("scriptContext.type=beforesload in ", scriptContext.type);



 /***** bringing unselected lines on edit******/
            if (scriptContext.type == 'edit') {
                    
                        if(currentRecord.type =='vendorprepaymentapplication'){
                            var applySublist ='bill';
                        }else{
                            var applySublist ='apply';
                        }
                        var lineApplyCount = currentRecord.getLineCount(applySublist);
                        log.debug("lineApplyCount=beforesload inside ", lineApplyCount);
                        for (var k = 0; k < lineApplyCount; k++) {

                            var applydate = currentRecord.getSublistValue({
                                sublistId: applySublist,
                                fieldId: 'applydate',
                                line: k
                            });
                            var refnum = currentRecord.getSublistValue({
                                sublistId: applySublist,
                                fieldId: 'internalid',
                                line: k
                            });
                            var doc = currentRecord.getSublistValue({
                                sublistId: applySublist,
                                fieldId: 'doc',
                                line: k
                            });
                            var applied = currentRecord.getSublistValue({
                                sublistId: applySublist,
                                fieldId: 'apply',
                                line: k
                            });
                            var trantype = currentRecord.getSublistValue({
                                sublistId: applySublist,
                                fieldId: 'trantype',
                                line: k
                            });
                            var recType = getType(doc);
                            var currency = currentRecord.getSublistValue({
                                sublistId: applySublist,
                                fieldId: 'currency',
                                line: k
                            });
                            var invoiceLookup = search.lookupFields({
                                type: recType,
                                id: doc,
                                columns: ['currency', 'custbody_total_amount_3_decimal', 'custbody_amount_due_3_decimal']
                            });

                            var currency = invoiceLookup['currency'][0].value;
                            var total_amount_3_decimal = invoiceLookup['custbody_total_amount_3_decimal'];
                            var amount_due_3_decimal = invoiceLookup['custbody_amount_due_3_decimal'];
                            if(applied != true ){
                              log.debug("k=beforesload inside ", k);  
                            currentRecord.setSublistValue({
                                    sublistId: 'recmachcustrecord_decimal_payment_ref',
                                    fieldId: 'custrecord_decimal_apply',
                                    value: false,
                                    line: k
                                });
                             log.debug("applydate=beforesload inside ", applydate);
                            currentRecord.setSublistValue({
                                sublistId: 'recmachcustrecord_decimal_payment_ref',
                                fieldId: 'custrecord_decimal_date',
                                value: applydate,
                                line: k
                            });
                             log.debug("doc=beforesload inside ", doc);
                            currentRecord.setSublistValue({
                                sublistId: 'recmachcustrecord_decimal_payment_ref',
                                fieldId: 'custrecord_decimal_type',
                                value: doc,
                                line: k
                            });
                             log.debug("refnum=beforesload inside ", refnum);
                            currentRecord.setSublistValue({
                                sublistId: 'recmachcustrecord_decimal_payment_ref',
                                fieldId: 'custrecord_decimal_doc_number',
                                value: refnum,
                                line: k
                            });
                             log.debug("total_amount_3_decimal=beforesload inside ", total_amount_3_decimal);
                            currentRecord.setSublistValue({
                                sublistId: 'recmachcustrecord_decimal_payment_ref',
                                fieldId: 'custrecord_decimal_org_amt',
                                value: total_amount_3_decimal,
                                line: k
                            });
                            log.debug("amount_due_3_decimal=beforesload inside ", amount_due_3_decimal);
                            currentRecord.setSublistValue({
                                sublistId: 'recmachcustrecord_decimal_payment_ref',
                                fieldId: 'custrecord_decimal_amount_due',
                                value: amount_due_3_decimal,
                                line: k
                            });
                            log.debug("currency=beforesload inside ", currency);
                            currentRecord.setSublistValue({
                                sublistId: 'recmachcustrecord_decimal_payment_ref',
                                fieldId: 'custrecord_decimal_currency',
                                value: currency,
                                line: k
                            });
                        }

                        }
                        /**** credits line *****/
                        var lineCreditCount = currentRecord.getLineCount('credit');

                        for (var j = 0; j < lineCreditCount; j++) {

                            var applydate = currentRecord.getSublistValue({
                                sublistId: 'credit',
                                fieldId: 'applydate',
                                line: j
                            });
                            var refnum = currentRecord.getSublistValue({
                                sublistId: 'credit',
                                fieldId: 'refnum',
                                line: j
                            });
                            var doc = currentRecord.getSublistValue({
                                sublistId: 'credit',
                                fieldId: 'doc',
                                line:j
                            });
                            var applied = currentRecord.getSublistValue({
                                sublistId: 'credit',
                                fieldId: 'apply',
                                line: j
                            });
                            var trantype = currentRecord.getSublistValue({
                                sublistId: 'credit',
                                fieldId: 'trantype',
                                line: j
                            });
                            var recType = getType(doc);
                            var amount_due_3_decimal = currentRecord.getSublistValue({
                                sublistId: 'credit',
                                fieldId: 'custbody_amount_due_3_decimal',
                                line: j
                            });
                            var currency = currentRecord.getSublistValue({
                                sublistId: 'credit',
                                fieldId: 'currency',
                                line: j
                            });
                            var invoiceLookup = search.lookupFields({
                                type: recType,
                                id: doc,
                                columns: ['currency', 'custbody_total_amount_3_decimal', 'custbody_3_dec_amount_remaining']
                            });
                       
                            var currency = invoiceLookup['currency'][0].value;
                            var total_amount_3_decimal = invoiceLookup['custbody_total_amount_3_decimal'];
                            var amount_due_3_decimal = invoiceLookup['custbody_3_dec_amount_remaining'];
                            if(applied != true ){
                            currentRecord.setSublistValue({
                                sublistId: 'recmachcustrecord_decimal_credit_payment_ref',
                                fieldId: 'custrecord_credits_date',
                                value: applydate,
                                line: j
                            });
                            currentRecord.setSublistValue({
                                sublistId: 'recmachcustrecord_decimal_credit_payment_ref',
                                fieldId: 'custrecordcredits_decimal_type',
                                value: doc,
                                line: j
                            });
                            currentRecord.setSublistValue({
                                sublistId: 'recmachcustrecord_decimal_credit_payment_ref',
                                fieldId: 'custrecord_decimal_credit_doc_number',
                                value: refnum,
                                line: j
                            });
                            currentRecord.setSublistValue({
                                sublistId: 'recmachcustrecord_decimal_credit_payment_ref',
                                fieldId: 'custrecord_decimal_credit_org_amt',
                                value: total_amount_3_decimal,
                                line: j
                            });
                            currentRecord.setSublistValue({
                                sublistId: 'recmachcustrecord_decimal_credit_payment_ref',
                                fieldId: 'custrecord_decimal_credit_amount_due',
                                value: amount_due_3_decimal,
                                line: j
                            });
                            currentRecord.setSublistValue({
                                sublistId: 'recmachcustrecord_decimal_credit_payment_ref',
                                fieldId: 'custrecord_decimal_credit_currency',
                                value: currency,
                                line: j
                            });
                        }
                    }
                        /**** credits line *****/
            }
 /***** bringing unselected lines on edit******/




                    try {
                    var hideField = scriptContext.form.addField({
                        id: 'custpage_hide_fields',
                        label: 'Hidden',
                        type: serverWidget.FieldType.INLINEHTML
                    });
                    var src = "";
                    src += "jQuery('#tr_newrec361').hide();";
                    src += "jQuery('#attach').hide();";
                    src += "jQuery('.tabBnt').hide();";

                    hideField.defaultValue = "<script>jQuery(function($){require([], function(){" + src + ";})})</script>"; 
                    } catch (e) {
                        log.error('error', e.toString());
                    }
                    
                }
                if (scriptContext.type == 'create' || scriptContext.type == 'copy') {
                    var scriptObj = scriptContext.request.parameters;
                    var inv = scriptObj.inv;
                    var entity = scriptObj.entity;
                    var transform = scriptObj.transform;
                    var bill = scriptObj.bill;
                    if (transform == 'custinvc') { //credit memo
                        var id = scriptObj.id;
                        var recType = getType(id);
                        var invEntity = search.lookupFields({
                            type: recType,
                            id: id,
                            columns: 'entity'
                        });
                        entity = invEntity['entity'][0].value;
                        var recId = id;
                    }
                    if (transform == 'vendbill') { //bill credit
                        var id = scriptObj.id;
                        var recType = getType(id);
                        if(entity){
                            entity = entity;
                        }else{

                        var invEntity = search.lookupFields({
                            type: recType,
                            id: id,
                            columns: 'entity'
                        });
                        entity = invEntity['entity'][0].value;

                        }
                        var recId = id;
                    }
                    if (bill) { //bill payment
                        var id = scriptObj.bill;
                        var recType = getType(id);
                       if(entity){
                            entity = entity;
                        }else{

                        var invEntity = search.lookupFields({
                            type: recType,
                            id: id,
                            columns: 'entity'
                        });
                        entity = invEntity['entity'][0].value;

                        }
                        var recId = id;
                    }
                    if (transform == 'vprep') { //vendor prepayment application
                        var id = scriptObj.id;
                        var recType = getType(id);
                        if(entity){
                            entity = entity;
                        }else{

                        var invEntity = search.lookupFields({
                            type: recType,
                            id: id,
                            columns: 'entity'
                        });
                        entity = invEntity['entity'][0].value;

                        }
                        var recId = id;
                    }

                    if (inv) { //customer payment
                        var id = scriptObj.inv;
                        var recType = getType(id);
                        var recId = id;
                    }

                    if (entity) {
                        if(currentRecord.type =='vendorprepaymentapplication'){
                            var applySublist ='bill';
                        }else{
                            var applySublist ='apply';
                        }
                        var lineApplyCount = currentRecord.getLineCount(applySublist);
                        for (var k = 0; k < lineApplyCount; k++) {

                            var applydate = currentRecord.getSublistValue({
                                sublistId: applySublist,
                                fieldId: 'applydate',
                                line: k
                            });
                            var refnum = currentRecord.getSublistValue({
                                sublistId: applySublist,
                                fieldId: 'internalid',
                                line: k
                            });
                            var doc = currentRecord.getSublistValue({
                                sublistId: applySublist,
                                fieldId: 'doc',
                                line: k
                            });
                            var applied = currentRecord.getSublistValue({
                                sublistId: applySublist,
                                fieldId: 'apply',
                                line: k
                            });
                            var trantype = currentRecord.getSublistValue({
                                sublistId: applySublist,
                                fieldId: 'trantype',
                                line: k
                            });
                           /* if (trantype == 'VendCred') {
                                var recType = "vendorcredit";
                            }
                            if (trantype == 'VendBill') {
                                var recType = "vendorbill";
                            }*/
                            var recType = getType(doc);
                            /*var amount_due_3_decimal = currentRecord.getSublistValue({
                                sublistId: applySublist,
                                fieldId: 'custbody_amount_due_3_decimal',
                                line: k
                            });*/
                            var currency = currentRecord.getSublistValue({
                                sublistId: applySublist,
                                fieldId: 'currency',
                                line: k
                            });
                            var invoiceLookup = search.lookupFields({
                                type: recType,
                                id: doc,
                                columns: ['currency', 'custbody_total_amount_3_decimal', 'custbody_amount_due_3_decimal']
                            });

                            var currency = invoiceLookup['currency'][0].value;
                            var total_amount_3_decimal = invoiceLookup['custbody_total_amount_3_decimal'];
                            var amount_due_3_decimal = invoiceLookup['custbody_amount_due_3_decimal'];

                            if (recId) {
                                if (recId == doc) {
                                    currentRecord.setSublistValue({
                                        sublistId: 'recmachcustrecord_decimal_payment_ref',
                                        fieldId: 'custrecord_decimal_apply',
                                        value: true,
                                        line: k
                                    });

                                    currentRecord.setSublistValue({
                                        sublistId: 'recmachcustrecord_decimal_payment_ref',
                                        fieldId: 'custrecord_dec_payment_amt',
                                        value: amount_due_3_decimal,
                                        line: k
                                    });
                                    try {
                                        currentRecord.setValue({
                                            fieldId: 'custbody_payment_amount_3_decimal',
                                            value: amount_due_3_decimal
                                        });
                                    } catch (e) {
                                        log.error('error', e.toString());
                                    }

                                } else {
                                    currentRecord.setSublistValue({
                                        sublistId: 'recmachcustrecord_decimal_payment_ref',
                                        fieldId: 'custrecord_decimal_apply',
                                        value: false,
                                        line: k
                                    });

                                }
                            }

                            currentRecord.setSublistValue({
                                sublistId: 'recmachcustrecord_decimal_payment_ref',
                                fieldId: 'custrecord_decimal_date',
                                value: applydate,
                                line: k
                            });
                            currentRecord.setSublistValue({
                                sublistId: 'recmachcustrecord_decimal_payment_ref',
                                fieldId: 'custrecord_decimal_type',
                                value: doc,
                                line: k
                            });
                            currentRecord.setSublistValue({
                                sublistId: 'recmachcustrecord_decimal_payment_ref',
                                fieldId: 'custrecord_decimal_doc_number',
                                value: refnum,
                                line: k
                            });
                            currentRecord.setSublistValue({
                                sublistId: 'recmachcustrecord_decimal_payment_ref',
                                fieldId: 'custrecord_decimal_org_amt',
                                value: total_amount_3_decimal,
                                line: k
                            });
                            currentRecord.setSublistValue({
                                sublistId: 'recmachcustrecord_decimal_payment_ref',
                                fieldId: 'custrecord_decimal_amount_due',
                                value: amount_due_3_decimal,
                                line: k
                            });
                            currentRecord.setSublistValue({
                                sublistId: 'recmachcustrecord_decimal_payment_ref',
                                fieldId: 'custrecord_decimal_currency',
                                value: currency,
                                line: k
                            });

                        }
                        /**** credits line *****/
                        var lineCreditCount = currentRecord.getLineCount('credit');

                        for (var j = 0; j < lineCreditCount; j++) {

                            var applydate = currentRecord.getSublistValue({
                                sublistId: 'credit',
                                fieldId: 'applydate',
                                line: j
                            });
                            var refnum = currentRecord.getSublistValue({
                                sublistId: 'credit',
                                fieldId: 'refnum',
                                line: j
                            });
                            var doc = currentRecord.getSublistValue({
                                sublistId: 'credit',
                                fieldId: 'doc',
                                line:j
                            });
                            var applied = currentRecord.getSublistValue({
                                sublistId: 'credit',
                                fieldId: 'apply',
                                line: j
                            });
                            var trantype = currentRecord.getSublistValue({
                                sublistId: 'credit',
                                fieldId: 'trantype',
                                line: j
                            });

                           /* if (trantype == 'CustPymt') {
                                var recType = "customerpayment";
                            }
                            if (trantype == 'Journal') {
                                var recType = "journalentry";
                            }
                            if (trantype == 'CustCred') {
                                var recType = "creditmemo";
                            }*/
                            var recType = getType(doc);
                           
                            var amount_due_3_decimal = currentRecord.getSublistValue({
                                sublistId: 'credit',
                                fieldId: 'custbody_amount_due_3_decimal',
                                line: j
                            });
                            var currency = currentRecord.getSublistValue({
                                sublistId: 'credit',
                                fieldId: 'currency',
                                line: j
                            });
                            var invoiceLookup = search.lookupFields({
                                type: recType,
                                id: doc,
                                columns: ['currency', 'custbody_total_amount_3_decimal', 'custbody_3_dec_amount_remaining']
                            });
                       
                            var currency = invoiceLookup['currency'][0].value;
                            var total_amount_3_decimal = invoiceLookup['custbody_total_amount_3_decimal'];
                            var amount_due_3_decimal = invoiceLookup['custbody_3_dec_amount_remaining'];
                            
                            if (recId) {
                                if (recId == doc) {
                                    currentRecord.setSublistValue({
                                        sublistId: 'recmachcustrecord_decimal_credit_payment_ref',
                                        fieldId: 'custrecord_credits_apply',
                                        value: true,
                                        line: j
                                    });

                                    currentRecord.setSublistValue({
                                        sublistId: 'recmachcustrecord_decimal_credit_payment_ref',
                                        fieldId: 'custrecord_dec_credit_payment_amt',
                                        value: amount_due_3_decimal,
                                        line: j
                                    });
                                    

                                } else {
                                    currentRecord.setSublistValue({
                                        sublistId: 'recmachcustrecord_decimal_credit_payment_ref',
                                        fieldId: 'custrecord_credits_apply',
                                        value: false,
                                        line: j
                                    });

                                }
                            }

                            currentRecord.setSublistValue({
                                sublistId: 'recmachcustrecord_decimal_credit_payment_ref',
                                fieldId: 'custrecord_credits_date',
                                value: applydate,
                                line: j
                            });
                            currentRecord.setSublistValue({
                                sublistId: 'recmachcustrecord_decimal_credit_payment_ref',
                                fieldId: 'custrecordcredits_decimal_type',
                                value: doc,
                                line: j
                            });
                            currentRecord.setSublistValue({
                                sublistId: 'recmachcustrecord_decimal_credit_payment_ref',
                                fieldId: 'custrecord_decimal_credit_doc_number',
                                value: refnum,
                                line: j
                            });
                            currentRecord.setSublistValue({
                                sublistId: 'recmachcustrecord_decimal_credit_payment_ref',
                                fieldId: 'custrecord_decimal_credit_org_amt',
                                value: total_amount_3_decimal,
                                line: j
                            });
                            currentRecord.setSublistValue({
                                sublistId: 'recmachcustrecord_decimal_credit_payment_ref',
                                fieldId: 'custrecord_decimal_credit_amount_due',
                                value: amount_due_3_decimal,
                                line: j
                            });
                            currentRecord.setSublistValue({
                                sublistId: 'recmachcustrecord_decimal_credit_payment_ref',
                                fieldId: 'custrecord_decimal_credit_currency',
                                value: currency,
                                line: j
                            });

                        }
                        /**** credits line *****/

                    }
                }
/***** Amount due calculation on edit******/
                if (scriptContext.type == 'edit') {
                var appr_status = currentRecord.getValue({
                    fieldId: 'approvalstatus'
                });
                if(appr_status != 2){
                var dec_ApplyCount = currentRecord.getLineCount('recmachcustrecord_decimal_payment_ref');
                for (var m = 0; m < dec_ApplyCount; m++) {
                var doc_num = currentRecord.getSublistValue({
                    sublistId: 'recmachcustrecord_decimal_payment_ref',
                    fieldId: 'custrecord_decimal_type',
                    line: m
                });
                var recType = getType(doc_num);
                 var invoiceLookup = search.lookupFields({
                        type: recType,
                        id: doc_num,
                        columns: ['custbody_amount_due_3_decimal']
                    });
                    var custbody_amount_due_3_decimal = invoiceLookup['custbody_amount_due_3_decimal'];
                     currentRecord.setSublistValue({
                            sublistId: 'recmachcustrecord_decimal_payment_ref',
                            fieldId: 'custrecord_decimal_amount_due',
                            value: custbody_amount_due_3_decimal,
                            line: m
                        });
                    }
                    }
            }
 /***** Amount due calculation on edit******/

            } catch (e) {
                log.error('error', e.toString());
            }
        }
        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type
         * @Since 2015.2
         */
        function paymentBeforeSubmitAction(scriptContext) {

                var totalApplied = 0.000;
                var unappliedFlag = true;
                var InvAmountDue = 0.000;
                var amountDueCalculated = 0.000;
                var totalUnappliedAmount = 0.000;
                var applied_payments_sum = 0.000;
                var invoice_total_amount = 0.000;

                var totalCredit = 0.000;
                var creditUnappliedFlag  = true;

                var grosstotalCost=0.000;

                var id = scriptContext.newRecord.id;
                var currentRecord = scriptContext.newRecord;
                var tranType = currentRecord.type;

                /**** sublist apply  ******/
                /*var customer = currentRecord.getValue({
                    fieldId: 'customer',
                });*/
                var entityfieldname = currentRecord.getValue({
                        fieldId: 'entityfieldname',
                });
                var customer = currentRecord.getValue({
                    fieldId: entityfieldname,
                });

                if (scriptContext.type == 'create' || scriptContext.type == 'edit' || scriptContext.type == 'copy') {

                var decimal_payment_count = currentRecord.getLineCount('recmachcustrecord_decimal_payment_ref');
                if(decimal_payment_count > 0){
                for (var k = 0; k < decimal_payment_count; k++) {

                    var decimal_apply = currentRecord.getSublistValue({
                        sublistId: 'recmachcustrecord_decimal_payment_ref',
                        fieldId: 'custrecord_decimal_apply',
                        line: k
                    });

                    if (decimal_apply == true) {

                        var dec_payment_amt = currentRecord.getSublistValue({
                            sublistId: 'recmachcustrecord_decimal_payment_ref',
                            fieldId: "custrecord_dec_payment_amt",
                            line: k
                        });
                        var decimal_inv_ref = currentRecord.getSublistValue({
                            sublistId: 'recmachcustrecord_decimal_payment_ref',
                            fieldId: "custrecord_decimal_type",
                            line: k
                        });
                        var appl_type = getType(decimal_inv_ref);

                        if(appl_type == 'vendorcredit'){
                            dec_payment_amt = Math.round(dec_payment_amt * 1000) / 1000;
                            totalCredit = Number(totalCredit) + Number(dec_payment_amt);  
                        }else{
                            dec_payment_amt = Math.round(dec_payment_amt * 1000) / 1000;
                            totalApplied = Number(totalApplied) + Number(dec_payment_amt);  
                        }
                        

                        var validate_decimal_type = currentRecord.getSublistValue({
                            sublistId: 'recmachcustrecord_decimal_payment_ref',
                            fieldId: "custrecord_decimal_type",
                            line: k
                        });
                        if(currentRecord.type =='vendorprepaymentapplication'){
                            var applySublist ='bill';
                        }else{
                            var applySublist ='apply';
                        }
                        var apply_count = currentRecord.getLineCount(applySublist);
                        if (apply_count) {

                            for (var j = 0; j < apply_count; j++) {

                                var apply_invoice = currentRecord.getSublistValue({
                                    sublistId: applySublist,
                                    fieldId: 'doc',
                                    line: j
                                });

                                if (validate_decimal_type == apply_invoice) {

                                    currentRecord.setSublistValue({
                                        sublistId: applySublist,
                                        fieldId: 'amount',
                                        value: dec_payment_amt,
                                        line: j
                                    });

                                }
                            }
                        }
                        unappliedFlag = false;
                    }
                }
            }

                /////////////////////////////////////////////////////
                var decimal_payment_cr_ct = currentRecord.getLineCount('recmachcustrecord_decimal_credit_payment_ref');
                for (var k = 0; k < decimal_payment_cr_ct; k++) {

                    var credit_apply = currentRecord.getSublistValue({
                        sublistId: 'recmachcustrecord_decimal_credit_payment_ref',
                        fieldId: 'custrecord_credits_apply',
                        line: k
                    });

                    if (credit_apply == true) {

                        var cr_payment_amt = currentRecord.getSublistValue({
                            sublistId: 'recmachcustrecord_decimal_credit_payment_ref',
                            fieldId: "custrecord_dec_credit_payment_amt",
                            line: k
                        });
                        var cr_inv_ref = currentRecord.getSublistValue({
                            sublistId: 'recmachcustrecord_decimal_credit_payment_ref',
                            fieldId: "custrecordcredits_decimal_type",
                            line: k
                        });
                        cr_payment_amt = Math.round(cr_payment_amt * 1000) / 1000;

                        totalCredit = Number(totalCredit) + Number(cr_payment_amt);

                        var validate_cr_type = currentRecord.getSublistValue({
                            sublistId: 'recmachcustrecord_decimal_credit_payment_ref',
                            fieldId: "custrecordcredits_decimal_type",
                            line: k
                        });
                        var credit_count = currentRecord.getLineCount('credit');
                        if (credit_count) {
                            for (var j = 0; j < credit_count; j++) {
                                var apply_cr = currentRecord.getSublistValue({
                                    sublistId: 'credit',
                                    fieldId: 'doc',
                                    line: j
                                });
                                if (validate_cr_type == apply_cr) {
                                    currentRecord.setSublistValue({
                                        sublistId: 'credit',
                                        fieldId: 'amount',
                                        value: cr_payment_amt,
                                        line: j
                                    });
                                }
                            }
                        }
                        creditUnappliedFlag  = false;
                    }
                }

                ////////////////////////////////////////
                
                var lineItemCount = currentRecord.getLineCount('item');
                var lineExCount = currentRecord.getLineCount('expense');
                    if (lineItemCount) {
                        for (var l = 0; l < lineItemCount; l++) {
                            var amount_3_decimal = currentRecord.getSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_gross_amount_3_decimal',
                                line: l
                            });
                            grosstotalCost = Number(grosstotalCost) + Number(amount_3_decimal);
                        }
                    }
                    if (lineExCount) {
                        for (var ll = 0; ll < lineExCount; ll++) {
                            var amount_3_decimal_exp = currentRecord.getSublistValue({
                                sublistId: 'expense',
                                fieldId: 'custcol_gross_amount_3_decimal',
                                line: ll
                            });
                            grosstotalCost = Number(grosstotalCost) + Number(amount_3_decimal_exp);
                        }
                    }

                    if(grosstotalCost && grosstotalCost>0){
                        var payment_amount_for_calc = grosstotalCost;
                    }else{
                        var payment_amount_for_calc = currentRecord.getValue({
                            fieldId: 'custbody_payment_amount_3_decimal',
                        });
                    }
                var applied_amount = totalApplied - totalCredit;
                if (payment_amount_for_calc >= applied_amount) {
                    var totalUnappliedAmount = Number(payment_amount_for_calc) - Number(applied_amount);
                    log.debug("totalUnappliedAmount=beforesubmit=inside condition", totalUnappliedAmount);
                    currentRecord.setValue({
                        fieldId: 'custbody_unapplied_3_decimal',
                        value: totalUnappliedAmount.toFixed(3)
                    });
                    currentRecord.setValue({
                        fieldId: 'custbody_3_dec_amount_remaining',
                        value: totalUnappliedAmount.toFixed(3)
                    });
                    currentRecord.setValue({
                        fieldId: 'custbody_amount_due_3_decimal',
                        value: totalUnappliedAmount.toFixed(3)
                    });
                }
                currentRecord.setValue({
                    fieldId: 'custbody_applied_3_decimal',
                    value: applied_amount.toFixed(3)
                });
                var totalApplyUnapply = Number(totalUnappliedAmount) + Number(applied_amount);
                currentRecord.setValue({
                    fieldId: 'custbody_total_amount_3_decimal',
                    value: -totalApplyUnapply.toFixed(3)
                });
                
                /**** sublist apply  ******/
                /**For removing the lines*/
                if (scriptContext.type == 'edit' || scriptContext.type == 'create' || scriptContext.type == 'copy') {
                    var appr_status = currentRecord.getValue({
                        fieldId: 'approvalstatus'
                    });
                   // if(appr_status == 2){ //Approved
                        var decimal_payment_count1 = currentRecord.getLineCount('recmachcustrecord_decimal_payment_ref');
                        for (var i = 0; i < decimal_payment_count1; i++) {

                            var sel = currentRecord.getSublistValue({
                                sublistId: "recmachcustrecord_decimal_payment_ref",
                                fieldId: "custrecord_decimal_apply",
                                line: i
                            });
                            log.debug("sel=beforesubmit=selected line=",sel);
                            if (sel != true) {
                                currentRecord.removeLine({
                                    sublistId: 'recmachcustrecord_decimal_payment_ref',
                                    line: i,
                                    ignoreRecalc: true
                                });
                                i = i - 1;
                                decimal_payment_count1 = decimal_payment_count1 - 1;
                            }
                        }
                   // }
                }
                if (scriptContext.type == 'create' || scriptContext.type == 'copy') {
                  /*  var decimal_payment_count1 = currentRecord.getLineCount('recmachcustrecord_decimal_payment_ref');
                    for (var i = 0; i < decimal_payment_count1; i++) {
                        var sel = currentRecord.getSublistValue({
                            sublistId: "recmachcustrecord_decimal_payment_ref",
                            fieldId: "custrecord_decimal_apply",
                            line: i
                        });
                        if (sel != true) {
                            currentRecord.removeLine({
                                sublistId: 'recmachcustrecord_decimal_payment_ref',
                                line: i,
                                ignoreRecalc: true
                            });
                            i = i - 1;
                            decimal_payment_count1 = decimal_payment_count1 - 1;
                        }
                    } */

                     var decimal_payment_credit = currentRecord.getLineCount('recmachcustrecord_decimal_credit_payment_ref');
                    // Removing unselected items from sublist
                    for (var ij = 0; ij < decimal_payment_credit; ij++) {
                        var sel_cre = currentRecord.getSublistValue({
                            sublistId: "recmachcustrecord_decimal_credit_payment_ref",
                            fieldId: "custrecord_credits_apply",
                            line: ij
                        });
                        if (sel_cre != true) {
                            currentRecord.removeLine({
                                sublistId: 'recmachcustrecord_decimal_credit_payment_ref',
                                line: ij,
                                ignoreRecalc: true
                            });
                            ij = ij - 1;
                            decimal_payment_credit = decimal_payment_credit - 1;
                        }
                    }
                }
                /**For removing the lines*/
            }
        }
        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type
         * @Since 2015.2
         */
        function paymentAfterSubmitAction(scriptContext) {
            var id = scriptContext.newRecord.id;
            var currentRecord = scriptContext.newRecord;
            var tranType = currentRecord.type;
            var applied_payments_sum = 0.000;
            var invoice_total_amount = 0.000;

            ///////////////////////////////////////////////////////////////////
            if (scriptContext.type == 'create' || scriptContext.type == 'edit' || scriptContext.type == 'copy') {
                
                try {

                    var entityfieldname = currentRecord.getValue({
                        fieldId: 'entityfieldname',
                    });
                    var customer = currentRecord.getValue({
                        fieldId: entityfieldname,
                    });

                    //////////////////////////////////////////////////////////////////////////
                    var decimal_credit_count = currentRecord.getLineCount('recmachcustrecord_decimal_credit_payment_ref');
                    if (decimal_credit_count > 0) {
                        for (var kl = 0; kl < decimal_credit_count; kl++) {

                            var credits_apply = currentRecord.getSublistValue({
                                sublistId: 'recmachcustrecord_decimal_credit_payment_ref',
                                fieldId: 'custrecord_credits_apply',
                                line: kl
                            });

                         //   if (credits_apply == true) {

                                var credit_inv_ref = currentRecord.getSublistValue({
                                    sublistId: 'recmachcustrecord_decimal_credit_payment_ref',
                                    fieldId: "custrecordcredits_decimal_type",
                                    line: kl
                                }); 
                                var credit_payment_amt = currentRecord.getSublistValue({
                                    sublistId: 'recmachcustrecord_decimal_credit_payment_ref',
                                    fieldId: "custrecord_dec_credit_payment_amt",
                                    line: kl
                                });
                                var credit_amount_due = currentRecord.getSublistValue({
                                    sublistId: 'recmachcustrecord_decimal_credit_payment_ref',
                                    fieldId: "custrecord_decimal_credit_amount_due",
                                    line: kl
                                });
                               
                            var cr_type = getType(credit_inv_ref);
                            var crLookup = search.lookupFields({
                                type: cr_type,
                                id: credit_inv_ref,
                                columns: ['custbody_unapplied_3_decimal', 'custbody_applied_3_decimal']
                            });
                       
                            var unapplied_3_decimal = crLookup['custbody_unapplied_3_decimal'];
                            var applied_3_decimal = crLookup['custbody_applied_3_decimal'];

                             var payed_credit = +applied_3_decimal + +credit_payment_amt;
                             var un_payed_credit = +unapplied_3_decimal - +credit_payment_amt;

                                var amountRemain = record.submitFields({
                                    type: cr_type,
                                    id: credit_inv_ref,
                                    values: {
                                        custbody_unapplied_3_decimal: un_payed_credit,
                                        custbody_3_dec_amount_remaining: un_payed_credit,
                                        custbody_applied_3_decimal:payed_credit,
                                        custbody_amount_due_3_decimal:un_payed_credit
                                    },
                                    options: {
                                        enableSourcing: false,
                                        ignoreMandatoryFields : true
                                     }
                                });
                           // }
                        }
                    }
                    ///////////////////////////////////////////////////////////////////////////////

                    /////////////////////////////////////////////
                    var decimal_payment_count = currentRecord.getLineCount('recmachcustrecord_decimal_payment_ref');
                    if (decimal_payment_count > 0) {
                        for (var k = 0; k < decimal_payment_count; k++) {

                            var decimal_apply = currentRecord.getSublistValue({
                                sublistId: 'recmachcustrecord_decimal_payment_ref',
                                fieldId: 'custrecord_decimal_apply',
                                line: k
                            });

                         //   if (decimal_apply == true) {

                                var decimal_inv_ref = currentRecord.getSublistValue({
                                    sublistId: 'recmachcustrecord_decimal_payment_ref',
                                    fieldId: "custrecord_decimal_type",
                                    line: k
                                });

                var searchType = getType(decimal_inv_ref);
                var recType = dbsTrantype(decimal_inv_ref);

                    var invoiceLookup = search.lookupFields({
                        type: searchType,
                        id: decimal_inv_ref,
                        columns: ['custbody_total_amount_3_decimal']
                    });
                    var invoice_total_amount = invoiceLookup['custbody_total_amount_3_decimal'];

                    var columns = [];
                    columns.push(search.createColumn({
                         name: "custrecord_decimal_type"
                    }));
                    columns.push(search.createColumn({
                         name: 'custrecord_dec_payment_amt'
                    }));
                    
                    var filters = [];
                    filters.push(search.createFilter({
                        name: 'custrecord_decimal_type',
                        operator: search.Operator.ANYOF,
                        values: decimal_inv_ref
                    }));

                    var invoiceSearchObj = {};
                    invoiceSearchObj.type = 'customrecord_3_decimal_customer_invoices';
                    invoiceSearchObj.columns = columns;
                    invoiceSearchObj.filters = filters;

                    var invoiceSearch = search.create(invoiceSearchObj);
                    var invoiceSearchSet = invoiceSearch.run();
                    if (invoiceSearchSet) {
                        var res = invoiceSearchSet.getRange(0, 1000);
                        if (res) {
                            applied_payments_sum = 0.000;
                            for (var il = 0; il < res.length; il++) {

                                 var applied_payments = res[il].getValue({ //Grouping status
                                        name: 'custrecord_dec_payment_amt'
                                    });
                                applied_payments_sum = Number(applied_payments_sum) + Number(applied_payments);   
                                }
                                }
                                }
                              //  log.debug("applied_payments_sum=afterSubmit==", applied_payments_sum );
                              //  log.debug("invoice_total_amount=afterSubmit==", invoice_total_amount);
                                amountDueCalculated = Number(invoice_total_amount) - Number(applied_payments_sum);
                                log.debug("amountDueCalculated=afterSubmit==", amountDueCalculated+',=='+decimal_inv_ref);

                                var amountDue = record.submitFields({
                                    type: searchType,
                                    id: decimal_inv_ref,
                                    values: {
                                        custbody_amount_due_3_decimal: amountDueCalculated,
                                        custbody_3_dec_amount_remaining: amountDueCalculated
                                    },
                                    options: {
                                     enableSourcing: false,
                                     ignoreMandatoryFields : true
                                     }
                                });
                           // }
                        }
                    }
                    ///////////////////////////////////////////////////////////////////////////////

                } catch (e) {
                    log.error('error', e.toString());
                }
            }
            //////////////////////////////////////////////////////////////////

        }
         function getType(recid) {
            var rectype = '';
            if (recid != null && recid != '') {
                // rectype = nlapiLookupField('transaction', recid, 'recordtype');
                rectype = search.lookupFields({
                    type: 'transaction',
                    id: recid,
                    columns: 'recordtype'
                });
                rectype = rectype['recordtype'];
            }
            return rectype;
        }
        function dbsTrantype(recid) {
              var dbstype = '';
            if (recid != null && recid != '') {
                dbstype = search.lookupFields({
                    type: 'transaction',
                    id: recid,
                    columns: 'type'
                });
                dbstype = dbstype['type'][0].value;
            }
            return dbstype;
        }
        /* Percentage to number */
        function percentToNumber(percent) {
            var num = 0;
            if (percent) {
                // num = parseFloat(percent.replace(/[^0-9. ]/g, "")).toFixed(2);
                num = parseFloat(percent.replace("%", "")).toFixed(3);
                num = +num / 100;
            } else {
                num = 0;
            }
            return num;
        }

        function numberToDecimal(percent) {
            var num = 0;
            if (percent) {
                num = +percent / 100;
            } else {
                num = 0;
            }
            return num;
        }
             // Code Section : 22
        function hideNormalSublistField(applySublist3Decimal) {
            // log.debug('inside hideNormalSublistField');
            applySublist3Decimal.getField({
                id: 'custrecord_decimal_apply'
            }).updateDisplayType({
                displayType: serverWidget.FieldDisplayType.HIDDEN
            });

            applySublist3Decimal.getField({
                id: 'custrecord_decimal_date'
            }).updateDisplayType({
                displayType: serverWidget.FieldDisplayType.HIDDEN
            });

            applySublist3Decimal.getField({
                id: 'custrecord_decimal_type'
            }).updateDisplayType({
                displayType: serverWidget.FieldDisplayType.HIDDEN
            });
           
            applySublist3Decimal.getField({
                id: 'custrecord_decimal_doc_number'
            }).updateDisplayType({
                displayType: serverWidget.FieldDisplayType.HIDDEN
            });
            applySublist3Decimal.getField({
                id: 'custrecord_decimal_org_amt'
            }).updateDisplayType({
                displayType: serverWidget.FieldDisplayType.HIDDEN
            });
            applySublist3Decimal.getField({
                id: 'custrecord_decimal_payment_ref'
            }).updateDisplayType({
                displayType: serverWidget.FieldDisplayType.HIDDEN
            }); 
            applySublist3Decimal.getField({
                id: 'custrecord_dec_payment_amt'
            }).updateDisplayType({
                displayType: serverWidget.FieldDisplayType.HIDDEN
            });
            applySublist3Decimal.getField({
                id: 'custrecord_decimal_currency'
            }).updateDisplayType({
                displayType: serverWidget.FieldDisplayType.HIDDEN
            });

            return applySublist3Decimal;
        }
        return {
            beforeLoad: paymentBeforeLoadAction,
            beforeSubmit: paymentBeforeSubmitAction,
            afterSubmit: paymentAfterSubmitAction
        };
    });