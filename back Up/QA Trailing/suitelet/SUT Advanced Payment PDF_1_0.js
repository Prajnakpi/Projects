    // BEGIN SCRIPT DESCRIPTION BLOCK  ==================================

    /*
    		Script Name:	SUT Advanced Payment PDF_1_0.js
    		Author: 		Anukaran
    		Company:		Inspirria Cloudtech Pvt Ltd
    		Created Date:	23 Sep 2019
    		Description:	Script generate the pdf on the basis on checkbox checked or not on the invoice and advance payment is entered on the record.
    		                IF both fields is filled then pdf will generate.


    		Script Modification Log:

    		-- Date --		-- Modified By --			--Requested By--				-- Description --



    }*/
    // END SCRIPT DESCRIPTION BLOCK  ====================================
    function createAdvPaymentPDF(request, response) {
        var remainUsage;
        var attn;
        var itemtaxRate = '';
        //retrieve the record id passed to the Suitelet
        var recId = request.getParameter('id');
        nlapiLogExecution('DEBUG', 'Invoice_Log', 'Invoice Interanl id =' + recId);

        // load the record
        var recInv = nlapiLoadRecord('invoice', recId);

        var inv_no = recInv.getFieldValue('tranid');
        nlapiLogExecution('DEBUG', 'Invoice_Log', 'Invoice No =' + inv_no);

        var inv_remove_header = recInv.getFieldValue('custbody_afaq_remove_header');


        var inv_trandate = recInv.getFieldValue('trandate');
        nlapiLogExecution('DEBUG', 'Invoice_Log', 'Date  =' + inv_trandate);

        var salesMan = recInv.getFieldText('salesrep');
        nlapiLogExecution('DEBUG', 'Invoice_Log', 'Salesrep =' + salesMan);

        var rec_currency_val = recInv.getFieldValue('currency');
        nlapiLogExecution('DEBUG', 'rec_currency=== =' + rec_currency_val);

        var rec_currency = recInv.getFieldText('currency');
        nlapiLogExecution('DEBUG', 'Invoice_Log', 'Currency =' + rec_currency);

        var exRate = recInv.getFieldValue('exchangerate');
        nlapiLogExecution('DEBUG', 'Invoice_Log', 'ExchangeRage =' + exRate);

        var discountAmtFin = recInv.getFieldValue('discounttotal');


        var deliveryNote = recInv.getFieldValue('custbody_afaq_multiple_dn_for_printing');

        nlapiLogExecution('DEBUG', 'Invoice_Log', 'delivery Note  =' + deliveryNote);

        if (_nullValidation(deliveryNote)) {
            deliveryNote = 'N/A';
        }

        var inv_Customer = recInv.getFieldValue('entity');
        nlapiLogExecution('DEBUG', 'Invoice_Log', 'Customer Name =' + inv_Customer);

        var contact_Person = recInv.getFieldValue('custbody_afaq_contacts');
        nlapiLogExecution('DEBUG', 'Invoice_Log', 'Contact Person =' + contact_Person);

        var accountNo = recInv.getFieldValue('custbody_afaq_bankdetails_acntname'); //Account Name
        nlapiLogExecution('DEBUG', 'Invoice_Log', 'account No =' + accountNo);

        if (_nullValidation(accountNo)) {
            accountNo = ' ';
        }

        var nameBank = recInv.getFieldValue('custbody_afaq_bankdetails_bankname'); // bankname
        nlapiLogExecution('DEBUG', 'Invoice_Log', 'nameBank =' + nameBank);

        if (_nullValidation(nameBank)) {
            nameBank = ' ';
        }

        var addressBank = recInv.getFieldValue('custbody_afaq_bankdetails_bankaddress'); //bankAddress
        nlapiLogExecution('DEBUG', 'Invoice_Log', 'addressBank =' + addressBank);

        if (_nullValidation(addressBank)) {
            addressBank = ' ';
        }

        var noAccount = recInv.getFieldValue('custbody_afaq_bankaccountnumber'); //Account No
        nlapiLogExecution('DEBUG', 'Invoice_Log', 'account no =' + noAccount);

        if (_nullValidation(noAccount)) {
            noAccount = ' ';
        }

        var iban = recInv.getFieldValue('custbody_afaq_bankdetails_iban'); //IBAN
        nlapiLogExecution('DEBUG', 'Invoice_Log', 'IBAN =' + iban);

        if (_nullValidation(iban)) {
            iban = ' ';
        }

        var swift = recInv.getFieldValue('custbody_afaq_bankdetails_swiftcode'); //SWIFT
        nlapiLogExecution('DEBUG', 'Invoice_Log', 'SWIFT =' + swift);

        if (_nullValidation(swift)) {
            swift = ' ';
        }

        var statusRecord = recInv.getFieldText('custbody_afaq_approvalstatus'); //Status
        nlapiLogExecution('DEBUG', 'Invoice_Log', 'statusRecord =' + statusRecord);

        var billingAddress = recInv.getFieldValue('billaddress');
        nlapiLogExecution('DEBUG', 'Invoice_Log', 'billing Address =' + billingAddress);

        var inv_date = recInv.getFieldValue('trandate');
        nlapiLogExecution('DEBUG', 'Invoice_Log', 'invoice Date=' + inv_date);

        var inv_subsidiary = recInv.getFieldValue('subsidiary');
        nlapiLogExecution('DEBUG', 'Invoice_Log', 'inv_subsidiary=' + inv_subsidiary);

        var inv_po_no = recInv.getFieldValue('otherrefnum'); //po number
        nlapiLogExecution('DEBUG', 'Invoice_Log', 'Customer Name =' + inv_po_no);


        if (_nullValidation(inv_po_no)) {
            inv_po_no = ' ';
        }

        var inv_deliveryTerm = recInv.getFieldText('custbody_afaq_deliveryterm'); //Delivery Term
        nlapiLogExecution('DEBUG', 'Invoice_Log', 'Delivery Term =' + inv_deliveryTerm);

        if (_nullValidation(inv_deliveryTerm)) {
            inv_deliveryTerm = ' ';
        }

        var inv_deliveryDate = recInv.getFieldValue('custbody_afaq_deliverydate'); //Delivery Date
        nlapiLogExecution('DEBUG', 'Invoice_Log', 'Delivery Date =' + inv_deliveryDate);

        if (_nullValidation(inv_deliveryDate)) {
            inv_deliveryDate = 'N/A';
        }

        var inv_PaymentTerm = recInv.getFieldText('terms'); //Payment Term
        nlapiLogExecution('DEBUG', 'Invoice_Log', 'Payment Term=' + inv_PaymentTerm);

        if (_nullValidation(inv_PaymentTerm)) {
            inv_PaymentTerm = ' ';
        }

        var inv_createdFrom = recInv.getFieldValue('createdfrom'); //Created From
        var s_inv_createdFrom = recInv.getFieldText('createdfrom'); //Created From
        nlapiLogExecution('DEBUG', 'Invoice_Log', 'Created From=' + inv_createdFrom);

        var i_discounttotal = recInv.getFieldValue('discounttotal');
        var i_taxtotal = recInv.getFieldValue('taxtotal');
        var i_Invtotal = recInv.getFieldValue('total');
        var i_Invsubtotal = recInv.getFieldValue('subtotal');
        var i_InvAdvancepaymt = recInv.getFieldValue('custbody_afaq_advancepaymt');
        var i_InvPartial = recInv.getFieldValue('custbody_afaq_invo_partialinvoice');
        var i_Inv_Adv_payment = recInv.getFieldValue('custbody_afaq_advancepaymt');
        // var i_InvRetention = '';

        var i_InvRetention = recInv.getFieldValue('custbody_afaq_retentionamount');
        var i_InvTotalRetention = recInv.getFieldValue('custbody_afaq_totalretentionamount');

        projRefno = recInv.getFieldValue('custbody_afaq_projcustorefe'); //Project Reference No
        nlapiLogExecution('DEBUG', 'Invoice_Log', 'Project Ref no   =' + projRefno);

        var s_salesOrderNo = '';
        if (s_inv_createdFrom) {
            var s_salesOrder = s_inv_createdFrom.split('#');
            s_salesOrderNo = s_salesOrder[1];
        }
        if (_nullValidation(projRefno)) {
            projRefno = ' ';
        }

        if (contact_Person != null && contact_Person != '' && contact_Person != undefined && contact_Person.toString() != 'NaN' && contact_Person != NaN) {
            attn = nlapiLookupField('contact', contact_Person, 'entityid');
            nlapiLogExecution('DEBUG', 'ContactRecord_Log', 'Attn*** =' + attn);
        } else {


            attn = ' ';
        }

        var customerName = nlapiLookupField('customer', inv_Customer, 'altname');
        nlapiLogExecution('DEBUG', 'CustomerRecord_Log', 'Customer Name*** =' + customerName);

        var customerphone = nlapiLookupField('customer', inv_Customer, 'phone');
        nlapiLogExecution('DEBUG', 'CustomerRecord_Log', 'Customer Phone*** =' + customerphone);

        var customerFAX = nlapiLookupField('customer', inv_Customer, 'fax');
        nlapiLogExecution('DEBUG', 'CustomerRecord_Log', 'customer FAX =' + customerFAX);

        var customerurl = nlapiLookupField('customer', inv_Customer, 'url');
        nlapiLogExecution('DEBUG', 'CustomerRecord_Log', 'customer url =' + customerurl);

        var customeremail = nlapiLookupField('customer', inv_Customer, 'email');
        nlapiLogExecution('DEBUG', 'CustomerRecord_Log', 'customer email =' + customeremail);

        var vatNo = nlapiLookupField('customer', inv_Customer, 'vatregnumber');
        nlapiLogExecution('DEBUG', 'CustomerRecord_Log', 'customer vatNo =' + vatNo);



        //Load Sales Order and getting Related Record Value for customer Deposit
        var related_Amount = 0;
        var relatedRec_Type;
        var relatedRec_Amount, o_so;

        if (inv_createdFrom) {
            o_so = nlapiLoadRecord('salesorder', inv_createdFrom);
            var i_so_total = o_so.getFieldValue('total');
            var so_RelatedRecordCount = o_so.getLineItemCount('links');
            nlapiLogExecution('DEBUG', 'SO_Log', 'Related Record linecount=' + so_RelatedRecordCount);
            var related_rec_line_no = so_RelatedRecordCount;
            for (var i = 1; i <= related_rec_line_no; i++) {
                relatedRec_Type = o_so.getLineItemValue('links', 'type', i);
                nlapiLogExecution('DEBUG', 'SO_RelatedRecord_Log', 'Type =' + relatedRec_Type);
                var relatedRec_Number = o_so.getLineItemValue('links', 'tranid', i);
                nlapiLogExecution('DEBUG', 'SO_RelatedRecord_Log', 'Number =' + relatedRec_Number);
                var relatedRec_Status = o_so.getLineItemValue('links', 'status', i);
                nlapiLogExecution('DEBUG', 'SO_RelatedRecord_Log', 'Status =' + relatedRec_Status);
                relatedRec_Amount = o_so.getLineItemValue('links', 'total', i);
                nlapiLogExecution('DEBUG', 'SO_RelatedRecord_Log', ' Amount =' + relatedRec_Amount);

                if (relatedRec_Type == "Customer Deposit" && relatedRec_Status == "Deposited") {
                    related_Amount = (parseFloat(related_Amount) + parseFloat(relatedRec_Amount));
                    nlapiLogExecution('DEBUG', 'SO_RelatedRecord_Addition_Log', ' Related_Amount** =' + related_Amount);
                    related_Amount = parseFloat(related_Amount).toFixed(2);
                    //  calculatedValue= febTotal.toFixed(2);
                } //End of IF
            } //End of For
        }



        //Load Subsidiary for get the dynamic logo Due to multiple Subsidiary
        var o_subsidiary = nlapiLoadRecord('subsidiary', inv_subsidiary);
        var logo_subsidiary = o_subsidiary.getFieldValue('logo');
        nlapiLogExecution('DEBUG', 'subsidiary_Log', 'logo_subsidiary=' + logo_subsidiary);
        var legalName = o_subsidiary.getFieldValue('legalname');
        nlapiLogExecution('DEBUG', 'subsidiary_Log', 'Legal Name=' + legalName);
        var addressOnPrint = o_subsidiary.getFieldValue('custrecord_afaq_addressonprintlayouts');
        nlapiLogExecution('DEBUG', 'subsidiary_Log', 'AddressOnPrintLayout=' + addressOnPrint);
        var email = o_subsidiary.getFieldValue('email');
        nlapiLogExecution('DEBUG', 'subsidiary_Log', 'Email=' + email);
        var website = o_subsidiary.getFieldValue('url');
        nlapiLogExecution('DEBUG', 'subsidiary_Log', 'Website=' + website);
        var vaTRegNo = o_subsidiary.getFieldValue('federalidnumber');
        nlapiLogExecution('DEBUG', 'subsidiary_Log', 'TRN =' + vaTRegNo);

        var o_image_obj = nlapiLoadFile(logo_subsidiary); // Load Logo/Image file
        var s_image_url = o_image_obj.getURL(); // Get URL of Logo/Image file
        nlapiLogExecution('DEBUG', 's_image_url_Log', 's_image_url=' + s_image_url);

        var inv_count = recInv.getLineItemCount('item');
        nlapiLogExecution('DEBUG', 'Invoice_Log', 'line item count=' + inv_count);


        //Code to create HTML templete

        var strVar = "";
        strVar += "	<table width=\"100%\" border=\"0pt\" >";


        //Status Condition
        if (statusRecord == "Approved") {
            strVar += "	<tr>";
            strVar += " 	<td  font-size=\"18\" align=\"center\"><b>TAX INVOICE</b><\/td>";
            strVar += "	<\/tr>";
        } else {
            strVar += "	<tr>";
            strVar += "		<td  font-size=\"18\" align=\"center\"><b>DRAFT INVOICE</b><\/td>";
            strVar += " <\/tr>";
        }
        strVar += "	<\/table>";

        //Table start
        strVar += " <table width=\"100%\" border=\"1pt\">";
        strVar += "	    <tr>";
        strVar += "		 <td  border-right=\"1pt\" border-bottom=\"0pt\" colspan=\"5\"   width=\"50%\" >";
        strVar += "		<table  border=\"0pt\">";
        strVar += "	    <tr>";
        strVar += "		<td   font-size=\"10\" ><b>" + nlapiEscapeXML(customerName) + "</b><br\/>" + nlapiEscapeXML(billingAddress) + "<br\/><b>Phone</b>:" + customerphone + "&nbsp;&nbsp;&nbsp;&nbsp;<b>Fax</b>:" + customerFAX + "<br\/><b>Email</b>:" + nlapiEscapeXML(customeremail) + "&nbsp;&nbsp;&nbsp;&nbsp;<b>Web</b>:" + nlapiEscapeXML(customerurl) + "<br\/><b>TRN</b>:" + vatNo + "<br\/><b>ATTN</b>:" + nlapiEscapeXML(attn) + "<\/td>";
        strVar += "	    <\/tr>";
        strVar += "		<\/table>";
        strVar += "		<\/td>";

        strVar += "		<td  border-bottom=\"0pt\" colspan=\"4\"   width=\"50%\" >";
        strVar += "		<table border=\"0pt\">";
        strVar += "	    <tr>";
        strVar += "		<td  font-size=\"10\" > <b>Invoice No</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + nlapiEscapeXML(inv_no) + "<br\/><b>Invoice Date</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + inv_trandate + "<br\/><b> Delivery Note</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + nlapiEscapeXML(deliveryNote) + "<br\/><b>Sales Order No. </b>&nbsp;&nbsp;:" + nlapiEscapeXML(s_salesOrderNo) + "<br\/><b>Salesman&nbsp;&nbsp;</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + nlapiEscapeXML(salesMan) + "<br\/><b>Currency&nbsp;&nbsp;</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:" + nlapiEscapeXML(rec_currency) + "<br\/><b>Exchange Rate&nbsp;&nbsp;</b>&nbsp;&nbsp;:" + nlapiEscapeXML(exRate) + "<\/td>";
        strVar += "	    <\/tr>";
        strVar += "		<\/table>";
        strVar += "	    <\/td>";
        strVar += "	    <\/tr>";
        strVar += "<\/table>";
        //For Gap
        strVar += "	<table width=\"100%\" border=\"0pt\" >";
        strVar += "	<tr>";
        strVar += "		<td height=\"2\"> &nbps;  <\/td>";
        strVar += "	<\/tr>";
        strVar += "	<\/table>";

        //Next Table
        strVar += "<table width =\"100%\"  border=\"1pt\" table-layout =\"fixed\" >";
        strVar += "	    <tr>";
        strVar += "		<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" font-size=\"10\" border-left=\"0pt\" border-right=\"1pt\" style=\"vertical-align:middle\" border-bottom=\"1pt\" border-top=\"0pt\" width=\"7%\" ><b>PO Number<\/b><\/td>";
        strVar += "		<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" font-size=\"10\" border-right=\"1pt\" style=\"vertical-align:middle\" border-bottom=\"1pt\" border-top=\"0pt\" width=\"14%\" ><b>Delivery Term<\/b><\/td>";
        strVar += "		<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" font-size=\"10\" border-right=\"1pt\" style=\"vertical-align:middle\" border-bottom=\"1pt\" border-top=\"0pt\" width=\"20%\" ><b>Delivery Date<\/b><\/td>";
        strVar += "		<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" font-size=\"10\" border-right=\"0pt\" style=\"vertical-align:middle\" border-bottom=\"1pt\" border-top=\"0pt\" width=\"5%\" ><b>Payment Term<\/b><\/td>";
        strVar += "	    <\/tr>";
        strVar += " <tr>";
        strVar += " <td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" width=\"25%\" font-size=\"9\" border-left=\"0pt\"  border-right=\"1pt\">" + nlapiEscapeXML(inv_po_no) + "<\/td>";

        strVar += " <td td-layout =\"fixed\" word-break = \"break-all\"   align=\"center\" width=\"25%\" font-size=\"9\"  border-right=\"1pt\">" + nlapiEscapeXML(inv_deliveryTerm) + "<\/td>";
        strVar += " <td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" width=\"25%\" font-size=\"9\"  border-right=\"1pt\">" + inv_deliveryDate + "<\/td>";
        strVar += " <td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" width=\"25%\" font-size=\"9\" border-right=\"0pt\">" + nlapiEscapeXML(inv_PaymentTerm) + "<\/td>";
        strVar += " <\/tr>";
        strVar += "	<\/table>";

        strVar += "<table width =\"100%\" table-layout =\"fixed\" border=\"1pt\"  margin-top=\"5pt\">";

        if (i_InvPartial == 'T') {
            strVar += "	    <thead>";
            strVar += "	    <tr>";
            strVar += "		<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" font-size=\"8\" border-left=\"0pt\" border-right=\"1pt\" style=\"vertical-align:middle\" border-bottom=\"1pt\" border-top=\"0pt\" width=\"4%\" ><b>No.<\/b><\/td>";
            strVar += "		<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" font-size=\"8\" border-right=\"1pt\" style=\"vertical-align:middle\" border-bottom=\"1pt\" border-top=\"0pt\" width=\"16%\" ><b>Item Code<\/b><\/td>";
            strVar += "		<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" font-size=\"8\" border-right=\"1pt\" style=\"vertical-align:middle\" border-bottom=\"1pt\" border-top=\"0pt\" width=\"21%\"  ><b>Item Description<\/b><\/td>";
            strVar += "		<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" font-size=\"8\" border-right=\"1pt\" style=\"vertical-align:middle\" border-bottom=\"1pt\" border-top=\"0pt\" width=\"6%\" ><b>UOM<\/b><\/td>";
            strVar += "		<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" font-size=\"8\"  border-right=\"1pt\" style=\"vertical-align:middle\" border-bottom=\"1pt\" border-top=\"0pt\" width=\"7%\" ><b>Qty<\/b><\/td>";
            strVar += "		<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" font-size=\"8\" border-right=\"1pt\" style=\"vertical-align:middle\" border-bottom=\"1pt\" border-top=\"0pt\" width=\"8%\"  ><b>Unit Price<\/b><\/td>";
            strVar += "		<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" font-size=\"8\" border-right=\"1pt\" style=\"vertical-align:middle\" border-bottom=\"1pt\" border-top=\"0pt\" width=\"9%\" ><b>Taxable<br\/>Amount<\/b><\/td>";
            strVar += "		<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" font-size=\"8\" border-right=\"1pt\" style=\"vertical-align:middle\" border-bottom=\"1pt\" border-top=\"0pt\" width=\"9%\" ><b>VAT <br\/>% <\/b><\/td>";
            strVar += "		<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" font-size=\"8\" border-right=\"1pt\" style=\"vertical-align:middle\" border-bottom=\"1pt\" border-top=\"0pt\" width=\"12%\" ><b>VAT <br\/>Amount <\/b><\/td>";
            strVar += "		<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" font-size=\"8\" border-right=\"0pt\" style=\"vertical-align:middle\" border-bottom=\"1pt\" border-top=\"0pt\" width=\"12%\" ><b>Total <\/b><\/td>";
            strVar += "	    <\/tr>";
            strVar += "	    </thead>";
        } else {
            strVar += "	    <thead>";
            strVar += "	    <tr>";
            strVar += "		<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" font-size=\"8\" border-left=\"0pt\" border-right=\"1pt\" style=\"vertical-align:middle\" border-bottom=\"1pt\" border-top=\"0pt\" width=\"3%\" ><b>No.<\/b><\/td>";
            strVar += "		<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" font-size=\"8\" border-right=\"1pt\" style=\"vertical-align:middle\" border-bottom=\"1pt\" border-top=\"0pt\" width=\"15%\" ><b>Item Code<\/b><\/td>";
            strVar += "		<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" font-size=\"8\" border-right=\"1pt\" style=\"vertical-align:middle\" border-bottom=\"1pt\" border-top=\"0pt\" width=\"20%\"  ><b>Item Description<\/b><\/td>";
            strVar += "		<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" font-size=\"8\" border-right=\"1pt\" style=\"vertical-align:middle\" border-bottom=\"1pt\" border-top=\"0pt\" width=\"5%\" ><b>UOM<\/b><\/td>";
            strVar += "		<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" font-size=\"8\"  border-right=\"1pt\" style=\"vertical-align:middle\" border-bottom=\"1pt\" border-top=\"0pt\" width=\"5%\" ><b>Qty<\/b><\/td>";
            strVar += "		<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" font-size=\"8\" border-right=\"1pt\" style=\"vertical-align:middle\" border-bottom=\"1pt\" border-top=\"0pt\" width=\"7%\"  ><b>Unit Price<\/b><\/td>";
            strVar += "		<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" font-size=\"8\" border-right=\"1pt\" style=\"vertical-align:middle\" border-bottom=\"1pt\" border-top=\"0pt\" width=\"8%\" ><b>Taxable<br\/>Amount<\/b><\/td>";
            strVar += "		<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" font-size=\"8\" border-right=\"1pt\" style=\"vertical-align:middle\" border-bottom=\"1pt\" border-top=\"0pt\" width=\"8%\" ><b>VAT <br\/>% <\/b><\/td>";
            strVar += "		<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" font-size=\"8\" border-right=\"1pt\" style=\"vertical-align:middle\" border-bottom=\"1pt\" border-top=\"0pt\" width=\"10%\" ><b>VAT <br\/>Amount <\/b><\/td>";
            strVar += "		<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" font-size=\"8\" border-right=\"0pt\" style=\"vertical-align:middle\" border-bottom=\"1pt\" border-top=\"0pt\" width=\"12%\" ><b>Total <\/b><\/td>";
            strVar += "	    <\/tr>";
            strVar += "	    </thead>";
        }


        var subtotalAmount = 0;
        var totaldiscount = 0;
        var totalTaxbaleAmount = 0;
        var totalvatamount = 0;
        var grandTotal = 0;
        //if avandecd payment is applied to the inovice then line item value coming from related Sales Order record.
        nlapiLogExecution('DEBUG', 'relatedRec_Type_Log', 'relatedRec_Type=' + relatedRec_Type);
        nlapiLogExecution('DEBUG', 'relatedRec_Status_Log', 'relatedRec_Status=' + relatedRec_Status);
        nlapiLogExecution('DEBUG', 'SO_RelatedRecord_Addition_Log', ' Related_Amount ##** =' + related_Amount);


        //    else  //bockcode if condition removed as not used
        {
            nlapiLogExecution('DEBUG', 'value is coming from Invoice', 'value is coming from Invoice');

            var INV_count = recInv.getLineItemCount('item');
            nlapiLogExecution('DEBUG', 'SalesOrder_Log', 'SalesOrder line item count=' + INV_count);
            // check the line count of Sales Order
            var lineNo = INV_count;
            var totalgrand = 0;
            var stopExecution = 0;
            var stopExecutionSO = 0;

            if (i_InvPartial == 'T' && _IF_IT_IS_nullValidation(i_Inv_Adv_payment)) {
                var i_so_count = o_so.getLineItemCount('item');
                nlapiLogExecution('DEBUG', 'SalesOrder_Log**$##', 'i_Inv_Adv_payment=' + i_Inv_Adv_payment);
                nlapiLogExecution('DEBUG', 'SalesOrder_Log**', 'i_so_count count=' + i_so_count);

                for (var k = 1; k <= i_so_count; k++) {
                    var sr_no = k; //Generate line no

                    var itemTYPE = nlapiLookupField('item', o_so.getLineItemValue('item', 'item', k), 'type')
                    nlapiLogExecution('debug', 'itemTYPE', itemTYPE);

                    var item_name = o_so.getLineItemText('item', 'item', k);
                    nlapiLogExecution('DEBUG', 'SalesOrder_Log**', 'Item Name =' + item_name);
                    var item_description = o_so.getLineItemValue('item', 'description', k);
                    nlapiLogExecution('DEBUG', 'SalesOrder_Log**', 'Item description =' + item_description);
                    var uom = o_so.getLineItemText('item', 'units', k);
                    nlapiLogExecution('DEBUG', 'SalesOrder_Log**', 'UOM =' + uom);
                    var quantity = o_so.getLineItemValue('item', 'quantity', k);
                    nlapiLogExecution('DEBUG', 'SalesOrder_Log**', 'Quantity =' + quantity);

                    if (itemTYPE == 'Discount') {
                        quantity = ' '
                    }

                    var item_rate = o_so.getLineItemValue('item', 'rate', k);
                    nlapiLogExecution('DEBUG', 'SalesOrder_Log**', ' Item Rate =' + item_rate);
                    var item_amount = o_so.getLineItemValue('item', 'amount', k);
                    nlapiLogExecution('DEBUG', 'SalesOrder_Log**', ' Item Amount =' + item_amount);
                    var item_disc = o_so.getLineItemValue('item', 'custcol_disc_amount', k);
                    nlapiLogExecution('DEBUG', 'SalesOrder_Log**', ' Item Disc =' + item_disc);
                    var item_TaxRate = o_so.getLineItemValue('item', 'taxrate1', k);
                    nlapiLogExecution('DEBUG', 'SalesOrder_Log**', ' Item Tax Rate =' + item_TaxRate);


                    var itemtaxRate = item_TaxRate.substring(0, item_TaxRate.length - parseInt(1));
                    nlapiLogExecution('DEBUG', 'invoice_Log**', ' itemtaxRate =' + itemtaxRate);


                    var subtotalrate = null_Value_Valid(item_amount);
                    var discountAmt = null_Value_Valid(item_disc);
                    var taxbaleAmount = (parseFloat(null_Value_Valid(subtotalrate)) + parseFloat(null_Value_Valid(discountAmt)));
                    taxbaleAmount = taxbaleAmount.toFixed(2); //For decimal value
                    nlapiLogExecution('DEBUG', 'taxbaleAmount_Log**', ' taxbaleAmount** =' + taxbaleAmount);
                    var vatAmt = (parseFloat(taxbaleAmount) * parseFloat(itemtaxRate) / parseFloat(100));
                    vatAmt = vatAmt.toFixed(2); //For decimal value
                    var toTal = parseFloat(vatAmt) + parseFloat(taxbaleAmount); //Addition of vat amount and taxable amount
                    toTal = parseFloat(toTal).toFixed(2); //For decimal value

                    subtotalAmount = parseFloat(subtotalAmount) + parseFloat(item_amount); //Adddition of subtotal
                    subtotalAmount = parseFloat(subtotalAmount).toFixed(2); //For decimal value
                    totaldiscount = totaldiscount + parseFloat(item_disc); //Adddition of discount
                    totalTaxbaleAmount = parseFloat(totalTaxbaleAmount) + parseFloat(taxbaleAmount); //Adddition of Total taxable amount
                    totalTaxbaleAmount = parseFloat(totalTaxbaleAmount).toFixed(2); //For decimal value
                    totalvatamount = totalvatamount + parseFloat(vatAmt); //Adddition of TotalVAT Amount
                    grandTotal = (parseFloat(grandTotal) + parseFloat(toTal)); //Adddition of Total
                    grandTotal = parseFloat(grandTotal).toFixed(2); //For decimal value

                    totalgrand = (parseFloat(grandTotal) - parseFloat(related_Amount));
                    nlapiLogExecution('DEBUG', 'totalgrand_Log**', ' totalgrand** =' + totalgrand);
                    totalgrand = parseFloat(totalgrand).toFixed(2); //For decimal value


                    //if(i_InvPartial == 'T')

                    //				else
                    {
                        strVar += "		<tr>";
                        strVar += "			<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" width=\"4%\" font-size=\"8\" border-left=\"0pt\"  border-right=\"1pt\">" + sr_no + "<\/td>";
                        strVar += "			<td td-layout =\"fixed\" word-break = \"break-all\"   align=\"center\" width=\"16%\" font-size=\"8\"  border-right=\"1pt\">" + nlapiEscapeXML(item_name) + "<\/td>";
                        strVar += "			<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" width=\"21%\" font-size=\"8\"  border-right=\"1pt\">" + ValueOrNot(nlapiEscapeXML(item_description)) + "<\/td>";
                        strVar += "			<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" width=\"6%\" font-size=\"8\" border-right=\"1pt\">" + uom + "<\/td>";
                        strVar += "			<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" width=\"7%\" font-size=\"8\"   border-right=\"1pt\">" + quantity + "<\/td>";
                        strVar += "			<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"right\" width=\"8%\" font-size=\"8\" border-right=\"1pt\">" + formatNumber(nlapiEscapeXML(null_Validation(item_rate))) + "<\/td>";
                        strVar += "			<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"right\" width=\"9%\" font-size=\"8\" border-right=\"1pt\">" + formatNumber(nlapiEscapeXML(null_Validation(taxbaleAmount))) + "<\/td>";
                        strVar += "			<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"right\" width=\"9%\" font-size=\"8\" border-right=\"1pt\">" + null_Validation(item_TaxRate) + "<\/td>";
                        strVar += "			<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"right\" width=\"12%\" font-size=\"8\" border-right=\"1pt\" >" + formatNumber(null_Validation(vatAmt)) + "<\/td>";
                        strVar += "			<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"right\" width=\"12%\" font-size=\"8\" border-right=\"0pt\" >" + formatNumber(null_Validation(toTal)) + "<\/td>";
                        strVar += "		<\/tr>";
                    }



                    var context = nlapiGetContext();
                    remainUsage = context.getRemainingUsage();
                    nlapiLogExecution('DEBUG', 'remainUsage_Log', '$$$ remaining usage  start==' + remainUsage);
                    if (remainUsage <= 850) {
                        var a_params = new Array();
                        var invoice_id = recId;
                        nlapiLogExecution('DEBUG', 'Invoice ID for scchedule Calling', 'Invoice ID=' + invoice_id);
                        //Parameter send to the schedule script
                        a_params['custscript_invoice_id'] = invoice_id;

                        nlapiLogExecution('DEBUG', 'statusCallingLog', 'Calling Scheduled Script');
                        //Call Schedule Script
                        var status = nlapiScheduleScript('customscript_sch_adv_payment_pdf', null, a_params); //"null" due to i have deplyoed script 3 times. At time 3 user can download the pdf no.
                        nlapiLogExecution('DEBUG', 'statusLog', 'status =' + status);

                        break;
                    } //End of Schedulde Script IF

                } //End of Invoice For Loop

            } //if(i_InvPartial == 'T')
            else if (i_InvPartial == 'T' && checkNullValue(i_Inv_Adv_payment)) {
                for (var k = 1; k <= lineNo; k++) {

                    var sr_no = k; //Generate line no
                    nlapiLogExecution('debug', 'Scenario2', 'Present Case');
                    var itemTYPE = nlapiLookupField('item', recInv.getLineItemValue('item', 'item', k), 'type')
                    var item_name = recInv.getLineItemText('item', 'item', k);
                    nlapiLogExecution('DEBUG', 'invoice_Log', 'Item Name =' + item_name);
                    var item_description = recInv.getLineItemValue('item', 'description', k);
                    nlapiLogExecution('DEBUG', 'invoice_Log', 'Item description =' + item_description);
                    var uom = recInv.getLineItemText('item', 'units', k);
                    nlapiLogExecution('DEBUG', 'invoice_Log', 'UOM =' + uom);
                    var quantity = recInv.getLineItemValue('item', 'quantity', k);

                    if (itemTYPE == 'Discount') {
                        quantity = ' '
                    }

                    nlapiLogExecution('DEBUG', 'invoice_Log', 'Quantity =' + quantity);
                    var item_rate = recInv.getLineItemValue('item', 'rate', k);
                    nlapiLogExecution('DEBUG', 'invoice_Log', ' Item Rate =' + item_rate);
                    var item_amount = recInv.getLineItemValue('item', 'amount', k);
                    nlapiLogExecution('DEBUG', 'invoice_Log', ' Item Amount =' + item_amount);
                    var item_disc = recInv.getLineItemValue('item', 'custcol_disc_amount', k);
                    nlapiLogExecution('DEBUG', 'invoice_Log', ' Item Disc =' + item_disc);

                    var item_TaxRate = recInv.getLineItemValue('item', 'taxrate1', k);
                    nlapiLogExecution('DEBUG', 'invoice_Log', ' Item Tax Rate =' + item_TaxRate);

                    var itemtaxRate = item_TaxRate.substring(0, item_TaxRate.length - parseInt(1));
                    nlapiLogExecution('DEBUG', 'invoice_Log', ' itemtaxRate =' + itemtaxRate);


                    var subtotalrate = item_amount;
                    var discountAmt = item_disc;
                    var taxbaleAmount = (parseFloat(subtotalrate) + parseFloat(discountAmt));
                    taxbaleAmount = taxbaleAmount.toFixed(2); //For decimal value
                    nlapiLogExecution('DEBUG', 'taxbaleAmount_Log', ' taxbaleAmount** =' + taxbaleAmount);
                    var vatAmt = (parseFloat(taxbaleAmount) * parseFloat(itemtaxRate) / parseFloat(100));
                    vatAmt = vatAmt.toFixed(2); //For decimal value
                    var toTal = parseFloat(vatAmt) + parseFloat(taxbaleAmount); //Addition of vat amount and taxable amount
                    toTal = parseFloat(toTal).toFixed(2); //For decimal value

                    subtotalAmount = parseFloat(subtotalAmount) + parseFloat(item_amount); //Adddition of subtotal
                    subtotalAmount = parseFloat(subtotalAmount).toFixed(2); //For decimal value
                    totaldiscount = totaldiscount + parseFloat(item_disc); //Adddition of discount
                    totalTaxbaleAmount = parseFloat(totalTaxbaleAmount) + parseFloat(taxbaleAmount); //Adddition of Total taxable amount
                    totalTaxbaleAmount = parseFloat(totalTaxbaleAmount).toFixed(2); //For decimal value
                    totalvatamount = totalvatamount + parseFloat(vatAmt); //Adddition of TotalVAT Amount
                    grandTotal = (parseFloat(grandTotal) + parseFloat(toTal)); //Adddition of Total
                    grandTotal = parseFloat(grandTotal).toFixed(2); //For decimal value

                    totalgrand = (parseFloat(grandTotal) - parseFloat(related_Amount));
                    nlapiLogExecution('DEBUG', 'totalgrand_Log', ' totalgrand** =' + totalgrand);
                    totalgrand = parseFloat(totalgrand).toFixed(2); //For decimal value
                    if (k == lineNo) {
                        strVar += "		<tr>";
                        strVar += "			<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" width=\"4%\" font-size=\"8\" border-left=\"0pt\"  border-right=\"1pt\">1<\/td>";
                        strVar += "			<td td-layout =\"fixed\" word-break = \"break-all\"   align=\"center\" width=\"16%\" font-size=\"8\"  border-right=\"1pt\">Advance Payment<\/td>";
                        strVar += "			<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" width=\"21%\" font-size=\"8\"  border-right=\"1pt\">" + nlapiEscapeXML(i_Inv_Adv_payment) + "<\/td>";
                        strVar += "			<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" width=\"6%\" font-size=\"8\" border-right=\"1pt\"><\/td>";
                        strVar += "			<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" width=\"7%\" font-size=\"8\"   border-right=\"1pt\"><\/td>";
                        strVar += "			<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"right\" width=\"8%\" font-size=\"8\" border-right=\"1pt\"><\/td>";
                        strVar += "			<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"right\" width=\"9%\" font-size=\"8\" border-right=\"1pt\">" + formatNumber(nlapiEscapeXML(totalTaxbaleAmount)) + "<\/td>";
                        strVar += "			<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"right\" width=\"9%\" font-size=\"8\" border-right=\"1pt\">" + itemtaxRate + "<\/td>";
                        strVar += "			<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"right\" width=\"12%\" font-size=\"8\" border-right=\"1pt\">" + formatNumber(totalvatamount.toFixed(2)) + "<\/td>";
                        strVar += "			<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"right\" width=\"12%\" font-size=\"8\" border-right=\"0pt\">" + formatNumber(grandTotal) + "<\/td>";
                        strVar += "		<\/tr>";
                    }
                }
            } else {
                for (var k = 1; k <= lineNo; k++) {
                    var sr_no = k; //Generate line no

                    var itemTYPE = nlapiLookupField('item', recInv.getLineItemValue('item', 'item', k), 'type')
                    nlapiLogExecution('debug', 'itemTYPE', itemTYPE);

                    var item_name = recInv.getLineItemText('item', 'item', k);
                    nlapiLogExecution('DEBUG', 'invoice_Log', 'Item Name =' + item_name);
                    var item_description = recInv.getLineItemValue('item', 'description', k);
                    nlapiLogExecution('DEBUG', 'invoice_Log', 'Item description =' + item_description);
                    var uom = recInv.getLineItemText('item', 'units', k);
                    nlapiLogExecution('DEBUG', 'invoice_Log', 'UOM =' + uom);
                    var quantity = recInv.getLineItemValue('item', 'quantity', k);

                    if (itemTYPE == 'Discount') {
                        quantity = ' '
                    }

                    nlapiLogExecution('DEBUG', 'invoice_Log', 'Quantity =' + quantity);
                    var item_rate = recInv.getLineItemValue('item', 'rate', k);
                    nlapiLogExecution('DEBUG', 'invoice_Log', ' Item Rate =' + item_rate);
                    var item_amount = recInv.getLineItemValue('item', 'amount', k);
                    nlapiLogExecution('DEBUG', 'invoice_Log', ' Item Amount =' + item_amount);
                    var item_disc = recInv.getLineItemValue('item', 'custcol_disc_amount', k);
                    nlapiLogExecution('DEBUG', 'invoice_Log', ' Item Disc =' + item_disc);


                    var item_TaxRate = recInv.getLineItemValue('item', 'taxrate1', k);
                    nlapiLogExecution('DEBUG', 'invoice_Log', ' Item Tax Rate =' + item_TaxRate);
                    if (item_TaxRate) {
                        var itemtaxRate = item_TaxRate.substring(0, item_TaxRate.length - parseInt(1));
                        nlapiLogExecution('DEBUG', 'invoice_Log', ' itemtaxRate =' + itemtaxRate);
                    }

                    var subtotalrate = item_amount;
                    var discountAmt = item_disc;
                    var taxbaleAmount = (parseFloat(subtotalrate) + parseFloat(discountAmt));
                    taxbaleAmount = taxbaleAmount.toFixed(2); //For decimal value
                    nlapiLogExecution('DEBUG', 'taxbaleAmount_Log', ' taxbaleAmount** =' + taxbaleAmount);
                    var vatAmt = (parseFloat(taxbaleAmount) * parseFloat(itemtaxRate) / parseFloat(100));
                    vatAmt = vatAmt.toFixed(2); //For decimal value
                    var toTal = parseFloat(vatAmt) + parseFloat(taxbaleAmount); //Addition of vat amount and taxable amount
                    toTal = parseFloat(toTal).toFixed(2); //For decimal value

                    subtotalAmount = parseFloat(subtotalAmount) + parseFloat(item_amount); //Adddition of subtotal
                    subtotalAmount = parseFloat(subtotalAmount).toFixed(2); //For decimal value
                    totaldiscount = totaldiscount + parseFloat(item_disc); //Adddition of discount
                    totalTaxbaleAmount = parseFloat(totalTaxbaleAmount) + parseFloat(taxbaleAmount); //Adddition of Total taxable amount
                    totalTaxbaleAmount = parseFloat(totalTaxbaleAmount).toFixed(2); //For decimal value
                    totalvatamount = totalvatamount + parseFloat(vatAmt); //Adddition of TotalVAT Amount
                    grandTotal = (parseFloat(grandTotal) + parseFloat(toTal)); //Adddition of Total
                    grandTotal = parseFloat(grandTotal).toFixed(2); //For decimal value

                    totalgrand = (parseFloat(grandTotal) - parseFloat(related_Amount));
                    nlapiLogExecution('DEBUG', 'totalgrand_Log', ' totalgrand** =' + totalgrand);
                    totalgrand = parseFloat(totalgrand).toFixed(2); //For decimal value

                    {
                        strVar += "		<tr>";
                        strVar += "			<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" width=\"3%\" font-size=\"8\" border-left=\"0pt\"  border-right=\"1pt\">" + sr_no + "<\/td>";
                        strVar += "			<td td-layout =\"fixed\" word-break = \"break-all\"   align=\"center\" width=\"15%\" font-size=\"8\"  border-right=\"1pt\">" + nlapiEscapeXML(item_name) + "<\/td>";
                        strVar += "			<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" width=\"20%\" font-size=\"8\"  border-right=\"1pt\">" + ValueOrNot(nlapiEscapeXML(item_description)) + "<\/td>";
                        strVar += "			<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" width=\"5%\" font-size=\"8\" border-right=\"1pt\">" + uom + "<\/td>";
                        strVar += "			<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"center\" width=\"5%\" font-size=\"8\"   border-right=\"1pt\">" + quantity + "<\/td>";
                        strVar += "			<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"right\" width=\"7%\" font-size=\"8\" border-right=\"1pt\">" + formatNumber(nlapiEscapeXML(item_rate)) + "<\/td>";
                        strVar += "			<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"right\" width=\"8%\" font-size=\"8\" border-right=\"1pt\">" + formatNumber(nlapiEscapeXML(taxbaleAmount)) + "<\/td>";
                        strVar += "			<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"right\" width=\"8%\" font-size=\"8\" border-right=\"1pt\">" + item_TaxRate + "<\/td>";
                        strVar += "			<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"right\" width=\"10%\" font-size=\"8\" border-right=\"1pt\" >" + formatNumber(vatAmt) + "<\/td>";
                        strVar += "			<td td-layout =\"fixed\" wordWrap = \"break-word\" align=\"right\" width=\"12%\" font-size=\"8\" border-right=\"0pt\" >" + formatNumber(toTal) + "<\/td>";
                        strVar += "		<\/tr>";
                    }


                    var context = nlapiGetContext();
                    remainUsage = context.getRemainingUsage();
                    nlapiLogExecution('DEBUG', 'remainUsage_Log', '$$$ remaining usage  start==' + remainUsage);
                    if (remainUsage <= 850) {
                        var a_params = new Array();
                        var invoice_id = recId;
                        nlapiLogExecution('DEBUG', 'Invoice ID for scchedule Calling', 'Invoice ID=' + invoice_id);
                        //Parameter send to the schedule script
                        a_params['custscript_invoice_id'] = invoice_id;

                        nlapiLogExecution('DEBUG', 'statusCallingLog', 'Calling Scheduled Script');
                        //Call Schedule Script
                        var status = nlapiScheduleScript('customscript_sch_adv_payment_pdf', null, a_params); //"null" due to i have deplyoed script 3 times. At time 3 user can download the pdf no.
                        nlapiLogExecution('DEBUG', 'statusLog', 'status =' + status);

                        break;
                    } //End of Schedulde Script IF

                } //End of Invoice For Loop

            } //else

            if (i_InvPartial == 'T' && checkNullValue(i_Inv_Adv_payment)) {
                strVar += "		<tr>";
                strVar += "			<td colspan=\"6\" border-left=\"0pt\" border-right=\"0pt\" border-top=\"1pt\" border-bottom=\"1pt\" align=\"left\" font-size=\"8\" ><b>Line Total<\/b><\/td>";
                strVar += "			<td  border-right=\"1pt\" border-top=\"1pt\"  border-bottom=\"1pt\" align=\"right\" font-size=\"8\" ><b>" + formatNumber(totalTaxbaleAmount) + "</b><\/td>";
                strVar += "			<td  border-right=\"1pt\" border-top=\"1pt\"   border-bottom=\"1pt\" align=\"right\" font-size=\"8\" ><b>" + item_TaxRate + "</b><\/td>";
                strVar += "			<td  border-right=\"1pt\" border-top=\"1pt\"  border-bottom=\"1pt\" align=\"right\" font-size=\"8\" ><b>" + formatNumber(totalvatamount.toFixed(2)) + "</b><\/td>";
                strVar += "			<td  border-right=\"0pt\" border-top=\"1pt\"  border-bottom =\"1pt\" align=\"right\" font-size=\"8\" ><b>" + grandTotal + "</b><\/td>";
                strVar += "		<\/tr>";

            } else if (i_InvPartial == 'T' && _IF_IT_IS_nullValidation(i_Inv_Adv_payment)) {
                strVar += "		<tr>";
                strVar += "			<td colspan=\"6\" border-left=\"0pt\" border-right=\"0pt\" border-top=\"1pt\" border-bottom=\"1pt\" align=\"left\" font-size=\"8\" ><b>Line Total<\/b><\/td>";
                strVar += "			<td  border-right=\"1pt\" border-top=\"1pt\"  border-bottom=\"1pt\" align=\"right\" font-size=\"8\" ><b>" + formatNumber(totalTaxbaleAmount) + "</b><\/td>";
                strVar += "			<td  border-right=\"1pt\" border-top=\"1pt\"   border-bottom=\"1pt\" align=\"right\" font-size=\"8\" ><b>" + item_TaxRate + "</b><\/td>";
                strVar += "			<td  border-right=\"1pt\" border-top=\"1pt\"  border-bottom=\"1pt\" align=\"right\" font-size=\"8\" ><b>" + formatNumber(totalvatamount.toFixed(2)) + "</b><\/td>";
                strVar += "			<td  border-right=\"0pt\" border-top=\"1pt\"  border-bottom =\"1pt\" align=\"right\" font-size=\"8\" ><b>" + grandTotal + "</b><\/td>";
                strVar += "		<\/tr>";

            } else {
                strVar += "		<tr>";
                strVar += "			<td colspan=\"6\" border-left=\"0pt\" border-right=\"0pt\" border-top=\"1pt\" border-bottom=\"1pt\" align=\"left\" font-size=\"8\" ><b>Line Total<\/b><\/td>";
                strVar += "			<td  border-right=\"1pt\" border-top=\"1pt\"  border-bottom=\"1pt\" align=\"right\" font-size=\"8\" ><b>" + formatNumber(totalTaxbaleAmount) + "</b><\/td>";
                strVar += "			<td  border-right=\"1pt\" border-top=\"1pt\"   border-bottom=\"1pt\" align=\"right\" font-size=\"8\" ><b>" + item_TaxRate + "</b><\/td>";
                strVar += "			<td  border-right=\"1pt\" border-top=\"1pt\"  border-bottom=\"1pt\" align=\"right\" font-size=\"8\" ><b>" + formatNumber(totalvatamount.toFixed(2)) + "</b><\/td>";
                strVar += "			<td  border-right=\"0pt\" border-top=\"1pt\"  border-bottom =\"1pt\" align=\"right\" font-size=\"8\" ><b> " +formatNumber(grandTotal) + "</b><\/td>";
                strVar += "		<\/tr>";
            }




            //VISHAL ADDED CODE

            if (i_InvPartial == 'T' && checkNullValue(i_Inv_Adv_payment)) {
                strVar += "		<tr>";
                strVar += "		<td colspan=\"9\" border-left=\"0pt\" border-right=\"0pt\" border-top=\"0pt\" border-bottom=\"0pt\" align=\"right\" font-size=\"8\" ><b>TAXABLE AMOUNT<\/b><\/td>";
                strVar += "			<td   border-right=\"0pt\" border-left=\"1pt\" border-top=\"0pt\" border-bottom=\"1pt\" align=\"right\" font-size=\"8\" ><b>" + formatNumber(i_Invsubtotal) + "</b><\/td>";
                strVar += "		<\/tr>";


                strVar += "		<tr>";
                strVar += "		<td colspan=\"9\" border-left=\"0pt\" border-right=\"0pt\" border-top=\"0pt\" border-bottom=\"0pt\" align=\"right\" font-size=\"8\" ><b>VAT AMOUNT<\/b><\/td>";
                strVar += "			<td   border-right=\"0pt\" border-left=\"1pt\" border-top=\"0pt\" border-bottom=\"1pt\" align=\"right\" font-size=\"8\" ><b>" + formatNumber(i_taxtotal) + "</b><\/td>";
                strVar += "		<\/tr>";

                strVar += "		<tr>";
                strVar += "		<td colspan=\"9\" border-left=\"0pt\" border-right=\"0pt\" border-top=\"0pt\" border-bottom=\"0pt\" align=\"right\" font-size=\"8\" ><b>TOTAL<\/b><\/td>";
                strVar += "			<td   border-right=\"0pt\" border-left=\"1pt\" border-top=\"0pt\" border-bottom=\"1pt\" align=\"right\" font-size=\"8\" ><b>" + formatNumber(i_Invtotal) + "</b><\/td>";
                strVar += "		<\/tr>";
            } else if (i_InvPartial == 'T' && _IF_IT_IS_nullValidation(i_Inv_Adv_payment)) {

                strVar += "		<tr>";
                strVar += "		<td colspan=\"9\" border-left=\"0pt\" border-right=\"0pt\" border-top=\"0pt\" border-bottom=\"0pt\" align=\"right\" font-size=\"8\" ><b>SO TOTAL<\/b><\/td>";
                strVar += "			<td   border-right=\"0pt\" border-left=\"1pt\" border-top=\"0pt\" border-bottom=\"1pt\" align=\"right\" font-size=\"8\" ><b>" + formatNumber(i_so_total) + "</b><\/td>";
                strVar += "		<\/tr>";



                strVar += "		<tr>";
                strVar += "		<td colspan=\"9\" border-left=\"0pt\" border-right=\"0pt\" border-top=\"0pt\" border-bottom=\"0pt\" align=\"right\" font-size=\"8\" ><b>INVOICE TOTAL<\/b><\/td>";
                strVar += "			<td   border-right=\"0pt\" border-left=\"1pt\" border-top=\"0pt\" border-bottom=\"1pt\" align=\"right\" font-size=\"8\" ><b>" + formatNumber(i_Invsubtotal) + "</b><\/td>";
                strVar += "		<\/tr>";

                strVar += "		<tr>";
                strVar += "		<td colspan=\"9\" border-left=\"0pt\" border-right=\"0pt\" border-top=\"0pt\" border-bottom=\"0pt\" align=\"right\" font-size=\"8\" ><b>VAT AMOUNT<\/b><\/td>";
                strVar += "			<td   border-right=\"0pt\" border-left=\"1pt\" border-top=\"0pt\" border-bottom=\"1pt\" align=\"right\" font-size=\"8\" ><b>" + formatNumber(i_taxtotal) + "</b><\/td>";
                strVar += "		<\/tr>";

                strVar += "		<tr>";
                strVar += "		<td colspan=\"9\" border-left=\"0pt\" border-right=\"0pt\" border-top=\"0pt\" border-bottom=\"0pt\" align=\"right\" font-size=\"8\" ><b>TOTAL<\/b><\/td>";
                strVar += "			<td   border-right=\"0pt\" border-left=\"1pt\" border-top=\"0pt\" border-bottom=\"1pt\" align=\"right\" font-size=\"8\" ><b>" + formatNumber(i_Invtotal) + "</b><\/td>";
                strVar += "		<\/tr>";



                //VISHAL ADDED CODE

                nlapiLogExecution('debug', 'rec_currency' + rec_currency);
                var amtinwords = amountinwords(i_Invtotal, rec_currency, rec_currency_val);
                strVar += "		<tr>";
                strVar += "		<td colspan=\"10\" border-left=\"0pt\" border-right=\"0pt\" border-top=\"1pt\" border-bottom=\"0pt\" align=\"left\"  width=\"100%\" font-size=\"8\" ><b>" + amtinwords + "<\/b><\/td>";
                strVar += "		<\/tr>";
            } else {

                strVar += "		<tr>";
                strVar += "		<td colspan=\"9\" border-left=\"0pt\" border-right=\"0pt\" border-top=\"0pt\" border-bottom=\"0pt\" align=\"right\" font-size=\"8\" ><b>SUBTOTAL<\/b><\/td>";
                strVar += "			<td   border-right=\"0pt\" border-left=\"1pt\" border-top=\"0pt\" border-bottom=\"1pt\" align=\"right\" font-size=\"8\" ><b>" + formatNumber(i_Invsubtotal) + "</b><\/td>";
                strVar += "		<\/tr>";

                strVar += "     <tr>";
                strVar += "     <td colspan=\"9\" border-left=\"0pt\" border-right=\"0pt\" border-top=\"0pt\" border-bottom=\"0pt\" align=\"right\" font-size=\"8\" ><b>DISCOUNT<\/b><\/td>";
                strVar += "         <td   border-right=\"0pt\" border-left=\"1pt\" border-top=\"0pt\" border-bottom=\"1pt\" align=\"right\" font-size=\"8\" ><b>" + discountAmtFin + "</b><\/td>";
                strVar += "     <\/tr>";


                strVar += "		<tr>";
                strVar += "		<td colspan=\"9\" border-left=\"0pt\" border-right=\"0pt\" border-top=\"0pt\" border-bottom=\"0pt\" align=\"right\" font-size=\"8\" ><b>VAT AMOUNT<\/b><\/td>";
                strVar += "			<td   border-right=\"0pt\" border-left=\"1pt\" border-top=\"0pt\" border-bottom=\"1pt\" align=\"right\" font-size=\"8\" ><b>" + formatNumber(i_taxtotal) + "</b><\/td>";
                strVar += "		<\/tr>";

                strVar += "		<tr>";
                strVar += "		<td colspan=\"9\" border-left=\"0pt\" border-right=\"0pt\" border-top=\"0pt\" border-bottom=\"0pt\" align=\"right\" font-size=\"8\" ><b>TOTAL WITH VAT<\/b><\/td>";
                strVar += "			<td   border-right=\"0pt\" border-left=\"1pt\" border-top=\"0pt\" border-bottom=\"1pt\" align=\"right\" font-size=\"8\" ><b>" + formatNumber(i_Invtotal) + "</b><\/td>";
                strVar += "		<\/tr>";


                if (i_InvRetention) {
                    strVar += "		<tr>";
                    strVar += "		<td colspan=\"9\" border-left=\"0pt\" border-right=\"0pt\" border-top=\"0pt\" border-bottom=\"0pt\" align=\"right\" font-size=\"8\" ><b>RETENTION AMT<\/b><\/td>";
                    strVar += "			<td   border-right=\"0pt\" border-left=\"1pt\" border-top=\"0pt\" border-bottom=\"1pt\" align=\"right\" font-size=\"8\" ><b> ("+ i_InvRetention +") </b> <\/td>";
                    strVar += "		<\/tr>";

                    var i_Inv_totalRet = Number(i_Invtotal) - Number(i_InvRetention);

                    strVar += "		<tr>";
                    strVar += "		<td colspan=\"9\" border-left=\"0pt\" border-right=\"0pt\" border-top=\"0pt\" border-bottom=\"0pt\" align=\"right\" font-size=\"8\" ><b>TOTAL<\/b><\/td>";
                    strVar += "			<td   border-right=\"0pt\" border-left=\"1pt\" border-top=\"0pt\" border-bottom=\"1pt\" align=\"right\" font-size=\"8\" ><b>" + formatNumber(i_InvTotalRetention) + "</b><\/td>";
                    strVar += "		<\/tr>";


                }

                if (i_InvAdvancepaymt) {
                    strVar += "		<tr>";
                    strVar += "		<td colspan=\"9\" border-left=\"0pt\" border-right=\"0pt\" border-top=\"0pt\" border-bottom=\"0pt\" align=\"right\" font-size=\"8\" ><b>ADVANCE AMT<\/b><\/td>";
                    strVar += "			<td   border-right=\"0pt\" border-left=\"1pt\" border-top=\"0pt\" border-bottom=\"0pt\" align=\"right\" font-size=\"8\" ><b>" + i_InvAdvancepaymt + "</b><\/td>";
                    strVar += "		<\/tr>";
                }

                //VISHAL ADDED CODE

                nlapiLogExecution('debug', 'rec_currency' + rec_currency);
                var amtinwords = amountinwords(i_Invtotal, rec_currency, rec_currency_val);
                strVar += "		<tr>";
                strVar += "		<td colspan=\"10\" border-left=\"0pt\" border-right=\"0pt\" border-top=\"1pt\" border-bottom=\"0pt\" align=\"left\"  width=\"100%\" font-size=\"8\" ><b>" + amtinwords + "<\/b><\/td>";
                strVar += "		<\/tr>";
            }
            strVar += "<\/table>";

            strVar += " <table width=\"100%\" border=\"1pt\">";
            strVar += "	    <tr>";
            strVar += "		 <td  font-size=\"8\" border-right=\"0pt\" border-bottom=\"0pt\" colspan=\"5\"   width=\"33%\" align=\"left\"><b>Bank Details</b><br\/><b>A/C Name&nbsp;&nbsp;&nbsp;:</b>" + remove_extra_spaces(accountNo) + "<br\/><b>Bank&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b>" + nameBank + "</td>";
            strVar += "		 <td  font-size=\"8\" border-right=\"0pt\" border-bottom=\"0pt\" colspan=\"5\"   width=\"33%\" align=\"center\">&nbsp;<br\/><b>A/C No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </b>" + noAccount + "<br\/><b>IBAN&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b>" + iban + "</td>";
            strVar += "		 <td  font-size=\"8\" border-right=\"0pt\" border-bottom=\"0pt\" colspan=\"5\"   width=\"33%\" align=\"right\" >&nbsp;<br\/><b>SWIFT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b>" + swift + "<br\/><b>Bank Address&nbsp;&nbsp;&nbsp;:</b>" + addressBank + "</td>";
            strVar += "	    <\/tr>";
            strVar += "<\/table>";

            strVar += " <table width=\"100%\" colspan=\"4\" border-bottom=\"0pt\" border=\"0pt\">";
            strVar += "	    <tr>";
            strVar += "  <td  colspan=\"7\" align=\"right\" font-size=\"8\" margin-top=\"1pt\" width=\"100%\" ><b>" + legalName + "</b><\/td>";
            strVar += "	    <\/tr>";
            strVar += "<\/table>";


            strVar += " <table width=\"100%\" colspan=\"4\" border-bottom=\"0pt\" border=\"0pt\" >";
            strVar += "	    <tr>";
            strVar += "			<td  border-right=\"0pt\" border-bottom=\"1pt\" border-top=\"1pt\" border-left=\"1pt\" align=\"left\" font-size=\"8\" ><b>Received By</b><\/td>";
            strVar += "			<td  border-right=\"1pt\" border-bottom=\"1pt\" border-top=\"1pt\" border-left=\"1pt\" align=\"left\" font-size=\"8\"  width=\"30%\" >&nbsp;<\/td>";
            strVar += "			<td  border-right=\"0pt\" border-bottom=\"0pt\" border-top=\"0pt\" border-left=\"0pt\"  font-size=\"8\"  width=\"30%\" >&nbsp;<\/td>";
            strVar += "			<td  border-right=\"0pt\" border-bottom=\"0pt\" border-top=\"0pt\" border-left=\"0pt\"  font-size=\"8\"  width=\"20%\" >&nbsp;<\/td>";
            strVar += "	    <\/tr>";
            strVar += "	    <tr>";
            strVar += "			<td  border-right=\"0pt\" border-bottom=\"1pt\" border-top=\"0pt\" border-left=\"1pt\" align=\"left\" font-size=\"8\" width=\"20%\" ><b>Signature &amp; Co. Stamp</b><\/td>";
            strVar += "			<td  border-right=\"1pt\" border-bottom=\"1pt\" border-top=\"0pt\" border-left=\"1pt\" align=\"left\" font-size=\"8\"  width=\"30%\" >&nbsp;<\/td>";
            strVar += "			<td  border-right=\"0pt\" border-bottom=\"0pt\" border-top=\"0pt\" border-left=\"0pt\"  font-size=\"8\"  width=\"30%\" >&nbsp;<\/td>";
            strVar += "			<td  border-right=\"0pt\" border-bottom=\"1pt\" border-top=\"0pt\" border-left=\"0pt\"  font-size=\"8\"  width=\"20%\" ><\/td>";
            strVar += "	    <\/tr>";
            strVar += "	    <tr>";
            strVar += "			<td  border-right=\"0pt\" border-bottom=\"1pt\" border-top=\"0pt\" border-left=\"1pt\" align=\"left\" font-size=\"8\" width=\"20%\" ><b>Date</b><\/td>";
            strVar += "			<td  border-right=\"1pt\" border-bottom=\"1pt\" border-top=\"0pt\" border-left=\"1pt\"  font-size=\"8\"  width=\"30%\" >&nbsp;<\/td>";
            strVar += "			<td  border-right=\"0pt\" border-bottom=\"0pt\" border-top=\"0pt\" border-left=\"0pt\"  font-size=\"8\"  width=\"30%\" >&nbsp;<\/td>";
            strVar += "			<td  border-right=\"0pt\" border-bottom=\"0pt\" border-top=\"0pt\" border-left=\"0pt\" align=\"right\" font-size=\"8\"  width=\"20%\" style=\"vertical-align: text-bottom;\"><b>Authorized Signatory</b><\/td>";
            strVar += "	    <\/tr>";
            strVar += "<\/table>";


        }

        var xml = "<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n";
        xml += "<pdf>";
        xml += "<head>";
        xml += "<style>";
        xml += "thead {display: table-header-group;}	";
        xml += "</style>";



        xml += "  <macrolist>";
        xml += "    <macro id=\"smallheader\">";
        xml += "<table width=\"100%\">";

        xml += "	<tr>";
        xml += "		<td width=\"50%\">";
        xml += "		<table width=\"100%\" align =\"left\">";

        if (inv_remove_header == 'F') {
            if (inv_subsidiary == 12) {
                xml += "			<tr>";
                xml += "   <td width=\"248\" align=\"left\" font-size=\"10\">" + legalName + " <br\/>" + addressOnPrint + "| Tel: +971 2 678 2422 | Fax: +971 2 678 2433 <br\/>" + email + " | " + website + " <br\/> TRN: " + vaTRegNo + "<\/td>";
                xml += "   <td width=\"248\" colspan=\"2\" align=\"right\"> <img align=\"right\" height=\"90\" width=\"45\" src=\"" + nlapiEscapeXML(s_image_url) + "\"><\/img><\/td>";
                xml += "			<\/tr>";
                xml += "		<\/table>";
                xml += "		<\/td>";
                xml += "	<\/tr>";
            } else if (inv_subsidiary == 7) {
                xml += "			<tr>";
                xml += "   <td width=\"248\" align=\"left\" font-size=\"10\">" + legalName + " <br\/>" + addressOnPrint + "<br\/>" + email + " | " + website + " <br\/> TRN: " + vaTRegNo + "<\/td>";
                xml += "   <td width=\"248\" colspan=\"2\" align=\"right\"> <img align=\"right\" height=\"75\" width=\"140\" src=\"" + nlapiEscapeXML(s_image_url) + "\"><\/img><\/td>";
                xml += "			<\/tr>";
                xml += "		<\/table>";
                xml += "		<\/td>";
                xml += "	<\/tr>";
            } else if (inv_subsidiary == 6) {
                xml += "			<tr>";
                xml += "   <td width=\"248\" align=\"left\" font-size=\"10\">" + legalName + " <br\/>PO Box 45993, Abu Dhabi, UAE | Tel: +971 2 6782422 | Fax: +971 2 6782433 <br\/>PO Box 28245, Dubai, UAE | Tel: +971 4 2651102 | Fax: +971 4 2651108 <br\/>" + email + " | " + website + " <br\/> TRN: " + vaTRegNo + "<\/td>";
                // xml += "   <td width=\"248\" align=\"left\" font-size=\"10\">" + legalName + " <br\/>" + addressOnPrint + "<br\/>" + email + " | " + website + " <br\/> TRN: " + vaTRegNo + "<\/td>";
                xml += "   <td  colspan=\"2\" align=\"right\"> <img src='https://5041434.app.netsuite.com/core/media/media.nl?id=568404&amp;c=5041434&amp;h=9gCP4n01B64GtkaZunA-TL7Iotd9uSOR2M8y5ySrGy8MK8wN' style='width: 85%;height: 140 px;' /><\/td>";
                xml += "			<\/tr>";
                xml += "		<\/table>";
                xml += "		<\/td>";
                xml += "	<\/tr>";
            } else {
                xml += "			<tr>";
                xml += "   <td width=\"248\" align=\"left\" font-size=\"10\">" + legalName + " <br\/>PO Box 45993, Abu Dhabi, UAE | Tel: +971 2 6782422 | Fax: +971 2 6782433 <br\/>PO Box 28245, Dubai, UAE | Tel: +971 4 2651102 | Fax: +971 4 2651108 <br\/>" + email + " | " + website + " <br\/> TRN: " + vaTRegNo + "<\/td>";
                xml += "   <td width=\"248\" colspan=\"2\" align=\"right\"> <img align=\"right\" height=\"90\" width=\"45\" src=\"" + nlapiEscapeXML(s_image_url) + "\"><\/img><\/td>";
                xml += "			<\/tr>";
                xml += "		<\/table>";
                xml += "		<\/td>";
                xml += "	<\/tr>";
            }
        } else {
            xml += "			<tr>";
            xml += "   <td width=\"248\" align=\"left\" font-size=\"10\"><br\/> <br\/> <\/td>";
            xml += "   <td width=\"248\" colspan=\"2\" align=\"right\">&nbsp;<\/td>";
            xml += "			<\/tr>";
            xml += "		<\/table>";
            xml += "		<\/td>";
            xml += "	<\/tr>";
        }



        xml += "<\/table>";

        xml += "    <\/macro>";
        xml += "    <macro id=\"smallfooter\">";
        xml += "<table width=\"100%\">";
        xml += "	<tr>";
        xml += "		<td width=\"100%\">";
        xml += "		<table width=\"100%\" align =\"left\">";
        xml += "		<tr>";
        xml += "			<td font-size=\"6\" align=\"right\" width=\"25%\"><\/td>";
        xml += "			<td font-size=\"6\" align=\"right\" width=\"25%\"><pagenumber/> of <totalpages/><\/td>";
        if (checkNullValue(s_salesOrderNo)) {
            xml += "			<td colspan=\"2\" font-size=\"6\" align=\"right\" width=\"50%\">" + inv_no + "&nbsp;&nbsp;&nbsp;&nbsp;" + inv_trandate + "&nbsp;&nbsp;&nbsp;&nbsp;" + s_salesOrderNo + "<\/td>";
        } else {
            xml += "			<td colspan=\"2\" font-size=\"6\" align=\"right\" width=\"50%\">" + inv_no + "&nbsp;&nbsp;&nbsp;&nbsp;" + inv_trandate + "<\/td>";
        }

        xml += "		<\/tr>";
        xml += "		<\/table>";
        xml += "		<\/td>";
        xml += "	<\/tr>";

        xml += "<\/table>";
        xml += "    <\/macro>";

        xml += "  <\/macrolist>";
        xml += "<\/head>";
        xml += "<body size=\"Letter-landscape\" margin-top=\"0pt\" header-height=\"8em\" header=\"smallheader\" footer=\"smallfooter\" footer-height=\"5em\" font-family=\"Helvetica\">";
        xml += strVar;
        xml += "</body>\n</pdf>";
        //nlapiLogExecution('DEBUG', 'PrintXmlToPDF', 'xml=' + xml);
        var file = nlapiXMLToPDF(xml);
        var fileObj = nlapiCreateFile('TaxInvoice.pdf', 'PDF', file.getValue());
        fileObj.setFolder(68381); // folder name = Adv Payment PDF in file cabinate
        var fileId = nlapiSubmitFile(fileObj);
        nlapiLogExecution('DEBUG', 'PDF', '*****===PDF fileId=' + fileId);

        var i_user = nlapiGetUser();

        //Checking usage
        nlapiLogExecution('DEBUG', 'remainUsage_Log', '$$$ remaining usage  start==' + remainUsage);

        response.setContentType('PDF', 'IFpdflayout.pdf', 'inline');
        response.write(file.getValue());

    }


    function _nullValidation(value) {
        if (value == null || value == 'NaN' || value == '' || value == undefined || value == '&nbsp;') {
            return true;
        } else {
            return false;
        }
    }




    //Amount in Words
    function amountinwords(totalInvoiceAmount, s_currency, currency) {
        if (totalInvoiceAmount == '0' || totalInvoiceAmount === '0.00') {
            log.debug('totalInvoiceAmount if amount is Zero : ', totalInvoiceAmount);
            if (currency == '1') {
                var s_amount_in_words = s_currency + ' .' + ' Zero Only';
            } else if (currency == '2') {
                var s_amount_in_words = s_currency + ' .' + ' Zero Only';
            } else if (currency == '3') {
                var s_amount_in_words = s_currency + ' .' + ' Zero Only';
            } else if (currency == '4') {
                var s_amount_in_words = s_currency + ' .' + ' Zero Only';
            }
            return s_amount_in_words

        } else {
            var s_curr_breakthrough;
            if (currency != '' && currency != null && currency != undefined) {
                switch (currency) {
                    case '1':
                        s_curr_breakthrough = "Fils";
                        break;
                    case '2':
                        s_curr_breakthrough = "Cents";
                        break;
                    case '3':
                        s_curr_breakthrough = "Cents";
                        break;
                    case '3':
                        s_curr_breakthrough = "Fils";
                        break;
                }
            }

            if (totalInvoiceAmount % 1 == 0 && totalInvoiceAmount != '0.00') {
                var s_amount_in_words = toWordsUSD(totalInvoiceAmount);
                nlapiLogExecution('debug', 'totalInvoiceAmount if amount is not Zero : ', s_amount_in_words);
                var res = s_currency + ' .' + s_amount_in_words + ' ' + 'Only';
                return res;

            } else {


                var a_tran_total = String(totalInvoiceAmount).split('.');
                nlapiLogExecution('debug', 'a_tran_total', a_tran_total);
                var i_amt_words = a_tran_total[0];
                nlapiLogExecution('debug', 'i_amt_words', i_amt_words);
                var i_amt_decimal = a_tran_total[1];
                nlapiLogExecution('debug', 'i_amt_decimal', i_amt_decimal);
                var s_words_total = toWordsUSD(i_amt_words);
                nlapiLogExecution('debug', 's_words_total', s_words_total);
                if (s_words_total == '') {
                    s_words_total = 'Zero';
                }
                var s_words_decimal = toWordsUSD(i_amt_decimal);
                if (s_words_decimal == '') {
                    s_words_decimal = 'Zero';
                }
                nlapiLogExecution('debug', 's_words_decimal', s_words_decimal);
                nlapiLogExecution('debug', 's_curr_breakthrough', s_curr_breakthrough);
                var res = s_currency + ' .' + s_words_total + ' ' + 'And' + ' ' + s_words_decimal + ' ' + s_curr_breakthrough + ' ' + ' Only ';
                return res;

            }
        }

    }



    function toWordsUSD(s) {
        var th = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];
        var dg = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
        var tn = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        var tw = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
        s = s.toString();
        s = s.replace(/[\, ]/g, '');
        if (s != parseFloat(s)) return 'not a number';
        var x = s.indexOf('.');
        if (x == -1)
            x = s.length;
        if (x > 15)
            return 'too big';
        var n = s.split('');
        var str = '';
        var sk = 0;
        for (var i = 0; i < x; i++) {
            if ((x - i) % 3 == 2) {
                if (n[i] == '1') {
                    str += tn[Number(n[i + 1])] + ' ';
                    i++;
                    sk = 1;
                } else if (n[i] != 0) {
                    str += tw[n[i] - 2] + ' ';
                    sk = 1;
                }
            } else if (n[i] != 0) { // 0235
                str += dg[n[i]] + ' ';
                if ((x - i) % 3 == 0) str += 'Hundred ';
                sk = 1;
            }
            if ((x - i) % 3 == 1) {
                if (sk)
                    str += th[(x - i - 1) / 3] + ' ';
                sk = 0;
            }
        }

        if (x != s.length) {
            var y = s.length;
            str += 'And ';
            for (var i = x + 1; i < y; i++)
                str += dg[n[i]] + ' ';
        }
        return str.replace(/\s+/g, ' ');
    }


    function CheckValidOrNot(value) {
        if ((value != null) && (value != '') && (value != undefined) && (value.toString() != 'NaN')) {
            return true;
        } else {
            return false;
        }
    }

    function ValueOrNot(Value) {
        if (CheckValidOrNot(Value) && Value != '- None -') {
            return Value;
        } else {
            return '';
        }
    }

    function returnZero(value) {
        if ((value != null) && (value != '') && (value != undefined) && (value.toString() != 'NaN')) {
            return value;
        } else {
            return 0;
        }
    }



    //checklastCharacter
    function checklastCharacter(str) {
        if (_logValidation(str)) {
            str = str.toString();
            var stringWithoutLastComma = '';
            if (str.substring(str.length - 2) == '& ') {
                stringWithoutLastComma = str.substring(0, str.length - 2);
            } else {
                stringWithoutLastComma = str;
            }
            return stringWithoutLastComma;
        } else {
            return '';
        }
    }



    //_logValidation
    function _logValidation(value) {

        if (value != null && value != '' && value != undefined && value.toString() != 'NaN' && value != NaN) {
            return true;
        } else {
            return false;
        }
    }


    function remove_extra_spaces(str) {
        var modified_str = str.replace(/\s+/g, ' ').trim();
        return modified_str;
    }



    function formatNumber(num) {
        if (CheckValidOrNot(num)) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }

    }


    function CheckValidOrNot(value) {
        if ((value != null) && (value != '') && (value != undefined) && (value.toString() != 'NaN')) {
            return true;
        } else {
            return false;
        }
    }

    function ValueOrNot(Value) {
        if (CheckValidOrNot(Value) && Value != '- None -') {
            return Value;
        } else {
            return '';
        }
    }

    function null_Validation(value) {
        if (value == 'null' || value == null || value == '' || value == ' ' || value == undefined || value == 'undefined' || value == 'NaN' || value == NaN) {
            return '';
        } else {
            return value;
        }
    }

    function checkNullValue(value) {
        if (value != null && value != '' && value != 'undefined' && value != undefined)
            return value;
        return false;
    }

    function null_Value_Valid(value) {
        if (value == 'null' || value == null || value == '' || value == ' ' || value == undefined || value == 'undefined' || value == 'NaN' || value == NaN) {
            return 0;
        } else {
            return value;
        }
    }

    function _IF_IT_IS_nullValidation(val) {
        if (val == null || val == undefined || val == '' || val.toString() == "undefined" || val.toString() == "NaN" || val.toString() == "null") {
            return true;
        } else {
            return false;
        }
    }