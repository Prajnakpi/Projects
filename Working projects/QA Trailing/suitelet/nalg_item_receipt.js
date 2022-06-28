function printItemReceiptAction(request, response) {
    
nlapiLogExecution('DEBUG', 'getting inside');
 var recordID = request.getParameter('recordID');
    nlapiLogExecution('DEBUG', 'recordID', recordID);
  

    var item_receipt = nlapiLoadRecord("itemreceipt",recordID );
    var createdfrom = item_receipt.getFieldValue('createdfrom');
    nlapiLogExecution('DEBUG', 'createdfrom', createdfrom);

     var recordtype = nlapiLookupField('transaction', createdfrom, 'recordtype');
    nlapiLogExecution('DEBUG', 'recordtype', recordtype);
 
    var count = item_receipt.getLineItemCount('item');
    nlapiLogExecution('DEBUG', 'crfr', count);

 var requested_by = item_receipt.getFieldValue('custbody_salesrep_or_emp');
     nlapiLogExecution('DEBUG', 'requested_by', requested_by)

     if (requested_by != null && requested_by != "") {
        nlapiLogExecution('DEBUG', 'getting inside------req');

         var employee = nlapiLoadRecord("employee", requested_by);
         var emp_name = employee.getFieldValue('altname');
        nlapiLogExecution('DEBUG', 'emp_name', emp_name)
     }

    var renderer = nlapiCreateTemplateRenderer();
    var template = "";

    var entity = item_receipt.getFieldValue('entity');



    nlapiLogExecution('DEBUG', 'itemreceipt', entity)

     var order = nlapiLoadRecord(recordtype, createdfrom);
 var cust = nlapiLoadRecord('vendor', entity);
    var contact1=cust.getFieldValue('contact');
    var address=cust.getFieldValue('defaultaddress');
    var custTRN=cust.getFieldValue('vatregnumber');

    if(contact1!=null&&contact1!=""){
    var contactrec = nlapiLoadRecord('contact', contact1);
    var contactrole=contactrec.getFieldValue('contactrole');
    
    }
    var salesrep = cust.getFieldValue('salesrep');
    if (salesrep != "" && salesrep != null) {
        var employee = nlapiLoadRecord("employee", salesrep)
        var contact = employee.getFieldValue('entityid');
    }
 var entityid = order.getFieldValue('entityid');
var cls = order.getFieldValue('class');
    var subsidiary = order.getFieldValue('subsidiary');
    var sub = nlapiLoadRecord("subsidiary", subsidiary);
     if (cls != "" && cls != null) {
         var clss = nlapiLoadRecord('classification', cls);
     }
     nlapiLogExecution('DEBUG', 'clss', clss);
    var type = cust.getFieldValue('isperson')
    nlapiLogExecution('DEBUG', 'type', type);
    nlapiLogExecution('DEBUG', 'cls', cls);
    template +=
        "<?xml version=\"1.0\"?> "
        + "<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\"> "
        + "<pdf> "
        + " "
        + "    <head> "
        + "        <link name=\"NotoSans\" type=\"font\" subtype=\"truetype\" src=\"${nsfont.NotoSans_Regular}\" src-bold=\"${nsfont.NotoSans_Bold}\" src-italic=\"${nsfont.NotoSans_Italic}\" src-bolditalic=\"${nsfont.NotoSans_BoldItalic}\" bytes=\"2\" /> "
        + "        <#if .locale==\"zh_CN\"> "
        + "            <link name=\"NotoSansCJKsc\" type=\"font\" subtype=\"opentype\" src=\"${nsfont.NotoSansCJKsc_Regular}\" src-bold=\"${nsfont.NotoSansCJKsc_Bold}\" bytes=\"2\" /> "
        + "            <#elseif .locale==\"zh_TW\"> "
        + "                <link name=\"NotoSansCJKtc\" type=\"font\" subtype=\"opentype\" src=\"${nsfont.NotoSansCJKtc_Regular}\" src-bold=\"${nsfont.NotoSansCJKtc_Bold}\" bytes=\"2\" /> "
        + "                <#elseif .locale==\"ja_JP\"> "
        + "                    <link name=\"NotoSansCJKjp\" type=\"font\" subtype=\"opentype\" src=\"${nsfont.NotoSansCJKjp_Regular}\" src-bold=\"${nsfont.NotoSansCJKjp_Bold}\" bytes=\"2\" /> "
        + "                    <#elseif .locale==\"ko_KR\"> "
        + "                        <link name=\"NotoSansCJKkr\" type=\"font\" subtype=\"opentype\" src=\"${nsfont.NotoSansCJKkr_Regular}\" src-bold=\"${nsfont.NotoSansCJKkr_Bold}\" bytes=\"2\" /> "
        + "                        <#elseif .locale==\"th_TH\"> "
        + "                            <link name=\"NotoSansThai\" type=\"font\" subtype=\"opentype\" src=\"${nsfont.NotoSansThai_Regular}\" src-bold=\"${nsfont.NotoSansThai_Bold}\" bytes=\"2\" /> "
        + "                        </#if> "
        + " "
        + "                        <macrolist> "
        + "                            <macro id=\"nlheader\"> "
        + "                                <table class=\"header\" style=\"width: 100%;\"> "
        + "                                    <tr> ";
    if (sub != "") {
        var logo = sub.getFieldValue('logo');
        var Name = sub.getFieldValue('name');
        var address = sub.getFieldValue('mainaddress_text');
        var trn = sub.getFieldValue('federalidnumber');
        nlapiLogExecution('DEBUG', 'logo', logo);
        if (logo != null) {


            var fileObj = nlapiLoadFile(logo);
            nlapiLogExecution('DEBUG', 'location', fileObj)
            var imgURLForPDF = "https://4950788.app.netsuite.com/" + fileObj.getURL();
            nlapiLogExecution('DEBUG', 'url', imgURLForPDF)

            function relaceCharector(charVal) {
                if (charVal) {
                    return charVal.replace(/&/g, "&amp;");
                } else {
                    return "";
                }
            }
            var logoUrl = relaceCharector(imgURLForPDF);
            if (subsidiary == 3) {
                template +=
                    "<td align=\"left\" valign=\"top\" width=\"33%\"> "
                    + "                                            <img src=\"" + logoUrl + "\" style=\"width:200px;height:200px;margin:80px;position:absolute;top:-45px;padding-top:-100px;padding-left:-100px;\" /> "
                    + "                                        </td> ";
            } else if (subsidiary == 10) {
                template +=
                    "<td align=\"left\" valign=\"top\" width=\"33%\"> "
                    + "                                            <img src=\"" + logoUrl + "\" style=\"width:220px;height:110px;margin:100px;position:absolute;top:-6px;padding-top:-95px;padding-left:-95px;\" /> "
                    + "                                        </td> ";
            } else if (subsidiary == 6) {
                template +=
                    "<td align=\"left\" valign=\"top\" width=\"33%\"> "
                    + "                                            <img src=\"" + logoUrl + "\" style=\"width:220px;height:110px;margin:100px;position:absolute;top:-6px;padding-top:-95px;padding-left:-95px;\" />  "
                    + "                                        </td> ";
            } else if (subsidiary == 13) {
                template +=
                    "<td align=\"left\" valign=\"top\" width=\"33%\"> "
                    + "                                            <img src=\"" + logoUrl + "\" style=\"width:150px;height:60px;position:absolute;top:-6px;padding-top:0px;padding-left:-5px;\" /> "
                    + "                                        </td> ";
            }else if (subsidiary == 4) {
                template +=
                    "<td align=\"left\" valign=\"top\" width=\"33%\"> "
                    + "                                            <img src=\"" + logoUrl + "\" style=\"width:150px;height:60px;position:absolute;top:-6px;padding-top:0px;padding-left:-5px;\" /> "
                    + "                                        </td> ";
            }else if (subsidiary == 7) {
                template +=
                    "<td align=\"left\" valign=\"top\" width=\"33%\"> "
                    + "                                            <img src=\"" + logoUrl + "\" style=\"width:150px;height:80px;position:absolute;top:-6px;padding-top:10px;padding-left:-5px;\" /> "
                    + "                                        </td> ";
            }
        }


        template +=

            "                                        <td align=\"right\" valign=\"top\" width=\"23%\"> "
            + "                                            <b>" + Name + "</b> "
            + "                                            <br/> "
            + "                                            <span style=\" font-size: 9pt;\">"+replaceSlashN(address)+"</span> "
            + "                                            <br/> "
            + "                                            <span style=\" font-size: 9pt;\">TRN&nbsp;:&nbsp;" + trn + "</span> "
            + "                                            <br/> "

            + "                                        </td> ";
    }
    template +=

        "                                    </tr> "
        + "                                </table> "
        + "                            </macro> "
        + " "
        + "                            <macro id=\"nlfooter\"> "
        + "                                <table style=\"width: 100%\"> "
        + "                                    <tr> "
        + "<td align=\"left\" style=\"width:60%;\">"
        + "   <p class=\"align\L\" style =\"font-size:11px;font-style:italics;color:#A9A9A9;\">*This is a system-generated document. No signature is required.</p>"
        + "   </td>"
        + "                                        <td align=\"right\" colspan=\"3\">&nbsp;( Page <pagenumber/> "
        + " of <totalpages/> "
        + " )&nbsp;"

        + "</td> "
        + "                                </tr> "
        + " "
        + "                            </table> "
        + "                        </macro> "
        + "                    </macrolist> "
        + " "
        + "                    <style type=\"text/css\"> "
        + "        span, "
        + "        table "
        + "{                        <#if .locale==\"zh_CN\">font-family: stsong, sans-serif; "
        + "                            <#elseif .locale==\"zh_TW\">font-family: msung, sans-serif; "
        + "                                <#elseif .locale==\"ja_JP\">font-family: heiseimin, sans-serif; "
        + "                                    <#elseif .locale==\"ko_KR\">font-family: hygothic, sans-serif; "
        + "                                        <#elseif .locale==\"ru_RU\">font-family: verdana; "
        + "                                            <#else>font-family: sans-serif; "
        + "                                            </#if>font-size: 9pt; "
        + "            table-layout: fixed; "
        + "        } "
        + " "
        + "        th "
        + "{            font-weight: bold; "
        + "            font-size: 8.5pt; "
        + "            padding-top: 2px; "
        + "            vertical-align: middle; "
        + "            /*padding: 3px 6px 10px;*/ "
        + "            /*background-color: #e3e3e3; "
        + "        color: #333333;*/ "
        + "        } "
        + " "
        + "        b "
        + "{            font-weight: bold; "
        + "            color: #333333; "
        + "        } "
        + " "
        + "        table.header td "
        + "{            padding: 0; "
        + "            font-size: 10pt; "
        + "        } "
        + " "
        + "        table.footer td "
        + "{            padding: 0; "
        + "            font-size: 8pt; "
        + "        } "
        + " "
        + "        #itemtable th p "
        + "{            vertical-align: text-top !important; "
        + "            text-align: center !important; "
        + "        } "
        + " "
        + "        #itemtable "
        + "{            font-size: 8.5pt !important; "
        + "            border: 0.5px solid #000000 "
        + "        } "
        + " "
        + "        table.total "
        + "{            page-break-inside: avoid; "
        + "        } "
        + " "
        + "        tr.totalrow "
        + "{            background-color: #e3e3e3; "
        + "            line-height: 200%; "
        + "        } "
        + " "
        + "        td.totalboxtop "
        + "{            font-size: 12pt; "
        + "            background-color: #e3e3e3; "
        + "        } "
        + " "
        + "        span.title "
        + "{            font-size: 28pt; "
        + "        } "
        + " "
        + "        .smallTitle "
        + "{            font-size: 9pt; "
        + "        } "
        + " "
        + "        span.number "
        + "{            font-size: 16pt; "
        + "            text-align: center; "
        + "        } "
        + " "
        + "        span.itemname "
        + "{            font-weight: bold; "
        + "            line-height: 150%; "
        + "        } "
        + " "
        + "        hr "
        + "{            width: 100%; "
        + "            color: #d3d3d3; "
        + "            background-color: #d3d3d3; "
        + "            height: 1px; "
        + "        } "
        + " "
        + "        table.smalltext tr td "
        + "{            font-size: 8pt; "
        + "        } "
        + " "
        + "        /*table.itemtable th{ "
        + "border-bottom: 10px #ffc966; "
        + "border-color: yellow; "
        + "}*/ "
        + "        p.alignR "
        + "{            text-align: right !important; "
        + "        } "
        + " "
        + "        p.alignL "
        + "{            text-align: left !important; "
        + "        } "
        + " "
        + "        p.alignC "
        + "{            text-align: center !important; "
        + "        } "
        + " "
        + "        .td_right_line "
        + "{            /*border-right: 0.5px solid #f4f4f4;*/ "
        + "            border-right: 0.5px solid #000000; "
        + "        } "
        + " "
        + "        .td_bottom_line "
        + "{            border-bottom: 0.5px solid #000000; "
        + "        } "
        + " "
        + "        .td_top_line "
        + "{            /*border-top :0.5px solid #f4f4f4;*/ "
        + "            border-top: 0.5px solid #000000; "
        + "        } "
        + " "
        + "        .title "
        + "{            font-weight: bold; "
        + "            align: center !important; "
        + "            font-size: 16pt; "
        + "        } "
        + " "
        + "        .footer-img "
        + "{            /*width: 100%; "
        + "        height: 20%;*/ "
        + "            top: 0px; "
        + "            right: 0px; "
        + "            left: 0px; "
        + "            bottom: 0px; "
        + "        } "
        + " "
        + "        .footer "
        + "{            margin-left: -45px; "
        + "            margin-right: -60px; "
        + "            margin-bottom: -115px; "
        + "        } "
        + "        .td_left_line "
        + "{            /*border-right: 0.5px solid #f4f4f4;*/ "
        + "            border-left: 0.5px solid #000000; "
        + "        } "
        + " "
        + "        .maintbl "
        + "{            border: 0.5px solid #000000; "
        + "        } "
        + " "
        + "        .footertbl "
        + "{            border: 0.5px solid #000000; "
        + "            border-top: 0px !important; "
        + "        } "
        + " "
        + "        .footertbl2 "
        + " "
        + "{            /*border:0.5px solid #000000;*/ "
        + "            border-left: 0.5px solid #000000; "
        + "            border-right: 0.5px solid #000000; "
        + "            border-top: 0.25px !important; "
        + "        } "
        + " "
        + "        .pad_left "
        + "{            padding-left: 5px !important; "
        + "        } "
        + " "
        + "        th, "
        + "        td "
        + "{            padding: 4px; "
        + "        } "
        + " "
        + "       td img "
        + " "
        + "{            max-width: 100%; "
        + "        } "
        + "                                        </style> "
        + "                                    </head> "
        + " "
        + "                                    <body header=\"nlheader\" background-macro=\"watermark\" header-height=\"11%\" footer=\"nlfooter\" footer-height=\"4%\" padding=\"0.25in 0.5in 0.25in 0.5in\" size=\"A4\"> "
        + "                                        <table width=\"100%\">'; "
        + "                                            <tr> "
        + "                                                <td align=\"center\" class=\"title\"> "
        + "                                                    <u>GOODS RECEIPT NOTE</u> "
        + "                                                </td> "
        + "                                            </tr> "
        + "                                        </table> "
        + "                                        <table class=\"maintbl \" style=\"width: 100%;\"> "
        + "                                            <tr> "
        + "                                                <td width=\"50%\" border-right=\"0.5px solid #000000\"> "
        + "                                                    <table width=\"100%\"> "
        + "                                                        <tr> "
        + "                                                            <td width=\"28%\"> "
        + "                                                                <b>Supplier</b> "
        + "                                                            </td> "
        + "                                                            <td width=\"2%\">&nbsp;:&nbsp;</td> ";
    if (cust.getFieldValue('isperson') == "T") {
        template +=
            "                                                            <td width=\"70%\"> "
            + "                                                                <p class=\"alignL\"> "
            + "                                                                    <b>" + cust.getFieldValue('firstname') + "&nbsp;" + cust.getFieldValue('lastname') + "</b> "
            + "                                                                </p> "
            + "                                                            </td> ";
    } else {
        template +=
            "                                                            <td width=\"70%\"> "
            + "                                                                <p class=\"alignL\"> "
            + "                                                                    <b>" + cust.getFieldValue('companyname') + "</b> "
            + "                                                                </p> "
            + "                                                            </td> ";
    }
    template +=
        "                                                        </tr> "
        + "                                        <tr> "
        + "                                            <td align=\"left\" width=\"15%\"> "
        + "                                                <p align=\"left\"> "
        + "                                                    <b>LPO Ref</b> "
        + "                                                </p> "
        + "                                            </td> "
        + "                                            <td width=\"1%\"> "
        + "                                                <b>&nbsp;&nbsp;:&nbsp;&nbsp;</b> "
        + "                                            </td> "
        
        + "                                                <td align=\"left\" width=\"64%\"> "
        + "                                                    <p align=\"left\" style=\"text-decoration:none;\"> " + cust.getFieldValue('defaultaddress') + " </p> "

        + "                                                </td> "
        
        

        + "                                        </tr> "
        + " "

        + "                                                        <tr> "
        + "                                                            <td> "
        + "                                                                <p class=\"alignL\"> "
        + "                                                                    <b>Supplier TRN</b> "
        + "                                                                </p> "
        + "                                                            </td> "
        + "                                                            <td>&nbsp;:&nbsp;</td> "
        + "                                                            <td> " + cust.getFieldValue('custTRN') + "</td> "
           
        + "                                                        </tr> "
        + "                                                   <!-- <tr> "
        + "                                                           <td> "
        + "                                                                <b>Sales Order</b> "
        + "                                                            </td> "
        + "                                                            <td>&nbsp;:&nbsp;</td> "
        + "                                                            <td>${record.createdfrom}</td> "
        + "                                                        </tr> -->";
       
        //     template+=
        // //  "                                                        <tr> "
        // + "                                                            <td> "
        // + "                                                                <b>Contact </b> "
        // + "                                                            </td> "
        // + "                                                            <td>&nbsp;:&nbsp;</td> "
        // + "                                                            <td>" + cust.getFieldValue('contact1') + "</td> "
        // + "                                                        </tr> ";
       
        template+=
        "                                                    </table> "
        + "                                                </td> "
        + "                                                <td width=\"50%\"> "
        + "                                                    <table align=\"right\" width=\"100%\"> "
        + "                                                        <tr> "
        + "                                                            <td colspan=\"1\" align=\"left\" width=\"30%\"> "
        + "                                                                <p align=\"left\"> "
        + "                                                                    <b>Ref No</b> "
        + "                                                                </p> "
        + "                                                            </td> "
        + "                                                            <td width=\"1%\"> "
        + "                                                                <b>&nbsp;&nbsp;:&nbsp;&nbsp;</b> "
        + "                                                            </td> "
        + "                                                            <td align=\"left\" width=\"54%\"> "
        + "                                                                <b>${record.tranid}</b> "
        + "                                                            </td> "
        + "                                                            <td></td> "
        + "                                                        </tr> "
        
        + "                                                        <tr> "
        + "                                                            <td align=\"left\" width=\"20%\"> "
        + "                                                                <p align=\"left\"> "
        + "                                                                    <b>Date</b> "
        + "                                                                </p> "
        + "                                                            </td> "
        + "                                                            <td width=\"1%\"> "
        + "                                                                <b>&nbsp;&nbsp;:&nbsp;&nbsp;</b> "
        + "                                                            </td> "
        + "                                                            <td align=\"left\" width=\"64%\">${record.trandate}</td> "
        + "                                                        </tr> "



        + "                                        <tr> "
        + "                                            <td align=\"left\" width=\"20%\"> "
        + "                                                <p align=\"left\"> "
        + "                                                    <b>TRN</b> "
        + "                                                </p> "
        + "                                            </td> "
        + "                                            <td width=\"1%\"> "
        + "                                                <b>&nbsp;&nbsp;:&nbsp;&nbsp;</b> "
        + "                                            </td> "
        + "                                                <td align=\"left\" width=\"64%\"> "
        + "                                                    <p align=\"left\" style=\"text-decoration:none;\"> "
        + "                                <!-- ${record.createdfrom.salesrep}-->"
        + "                                                    </p> "
        + "                                                </td> "

        + "                                        </tr> "
        + "                                        <tr> "
        + "                                            <td align=\"left\" width=\"20%\"> "
        + "                                                <p align=\"left\"> "
        + "                                                    <b>Driver Name</b> "
        + "                                                </p> "
        + "                                            </td> "
        + "                                            <td width=\"1%\"> "
        + "                                                <b>&nbsp;&nbsp;:&nbsp;&nbsp;</b> "
        + "                                            </td> "
        + "                                                <td align=\"left\" width=\"64%\"> "
        + "                                                    <p align=\"left\" style=\"text-decoration:none;\"> "
        + "                              <!-- ${record.createdfrom.location}--> "
        + "                                                    </p> "
        + "                                                </td> "

        + "                                        </tr> "
        + "                                        <tr> "
        + "                                            <td align=\"left\" width=\"20%\"> "
        + "                                                <p align=\"left\"> "
        + "                                                    <b>Vehicle No.</b> "
        + "                                                </p> "
        + "                                            </td> "
        + "                                            <td width=\"1%\"> "
        + "                                                <b>&nbsp;&nbsp;:&nbsp;&nbsp;</b> "
        + "                                            </td> "
        + "                                                <td align=\"left\" width=\"64%\"> "
        + "                                                    <p align=\"left\" style=\"text-decoration:none;\"> "
        + "                              <!-- ${record.createdfrom.location}--> "
        + "                                                    </p> "
        + "                                                </td> "

        + "                                        </tr> "


        + "                                        <tr> "
        + "                                            <td align=\"left\" width=\"20%\"> "
        + "                                                <p align=\"left\"> "
        + "                                                   <b>Memo</b> "
        + "                                                </p> "
        + "                                            </td> "
        + "                                            <td width=\"1%\"> "
        + "                                                <b>&nbsp;&nbsp;:&nbsp;&nbsp;</b> "
        + "                                            </td> "
        + "                                                <td align=\"left\" width=\"64%\"> "
        + "                                                    <p align=\"left\" style=\"text-decoration:none;\"> "
        + "                                 ${record.memo}"
        + "                                                    </p> "
        + "                                                </td> "

        + "                                        </tr> "
        + " "
        + " "
        + "                                    </table> "
        + "                                </td> "
        + "                            </tr> "
        // + "                            <tr border-top=\"0.5px solid #000000\"> "
        // + "                                <td width=\"50%\" border-right=\"0.5px solid #000000\"> "
        + "                                   "
        + " "
        + " "
        // + "<table align=\"right\" width=\"100%\"> "
        // + "                                                        <tr> "
        // + "                                                            <td colspan=\"1\" align=\"left\" width=\"28%\"> "
        // + "                                                                <p align=\"left\"> "
        // + "                                                                    <b>Invoice To</b> "
        // + "                                                                </p> "
        // + "                                                            </td> "
        // + "                                                            <td width=\"1%\"> "
        // + "                                                                <b>&nbsp;&nbsp;:&nbsp;&nbsp;</b> "
        // + "                                                            </td> "
        // + "                                                            <td align=\"left\" width=\"54%\"> ${record.shipaddress} "
        // + "                                                               <!-- <#if record.createdfrom.billaddress?has_content> -->"
        // + "                                               "
        // + "                           <!-- </#if>  -->"
        // + "                                                            </td> "
        // + "                                                            <td></td> "
        // + "                                                        </tr> "
        // + "                                                         "
        // + "                                            </table> "
        // + "</td> "
        // + "<td width=\"50%\"> "
        // + "                                                    <table align=\"right\" width=\"100%\"> "
        // + "                                                        <tr> "
        // + "                                                            <td colspan=\"1\" align=\"left\" width=\"30%\"> "
        // + "                                                                <p align=\"left\"> "
        // + "                                                                    <b>Delivery To</b> "
        // + "                                                                </p> "
        // + "                                                            </td> "
        // + "                                                            <td width=\"1%\"> "
        // + "                                                                <b>&nbsp;&nbsp;:&nbsp;&nbsp;</b> "
        // + "                                                            </td> "
        // + "                                                            <td align=\"left\" width=\"54%\"> "
        // + "                                                                ${record.shipaddress} "
        // + "                                                            </td> "
        // + "                                                            <td></td> "
        // + "                                                        </tr> "
        // // + " "
        // + "                                                    </table> "
        // + "                                                </td> "
        // + "                                            </tr> "
        + "                                        </table> "
        + " "

        + "                                            <#if record.item?has_content> "
        + "<table id=\"itemtable\" style=\"width: 100%;margin-top :10px\">                                                <!-- start items --> "
        + "                                                <#assign SrNo=0> "
        + "<#assign qty_to_ord = 0 ><#list record.item as item><#if item_index==0> "
        + "<#assign totalsum = 0> "
        + "<thead> "
        + "<tr style=\"padding-bottom: 0px;\"> "
        + "                                                    <th align=\"center\" class=\"td_right_line\" width=\"5%\"> "
        + "                    Sl# "
        + "                                                    </th> "
        + "                                                    <th align=\"center\" class=\"td_right_line\" width=\"33%\"> "
        + "                                                        <p class=\"alignC\"> Item <br /> "
        + "Description</p> "
        + "                                                    </th> "
        + "                                                    <th align=\"center\" class=\"td_right_line\" width=\"8%\"> "
        + "                    Qty "
        + "                                                    </th> "
        + "                                                    <th align=\"center\" class=\"td_right_line\" width=\"9%\"> "
        + "                    Unit "
        + "                                                    </th> "
        + "                                                    <th align=\"center\" class=\"td_right_line\" width=\"13%\"> "
        + "                    Lot NO./S.No. "
        + "                                                    </th> "

        + " "
        + "                                                </tr> "
        + "                                            </thead> "
        + "                                        </#if> "
        + "</#list>";
    for (var i = 1; i <= count; i++) {
        var item = new Array();
        var inventory = new Array();
        var serialno = new Array();
        item.push(item_receipt.getLineItemValue('item', 'item', i))
        nlapiLogExecution('DEBUG', 'item', item);
        var subrec = item_receipt.viewLineItemSubrecord('item', 'inventorydetail', i);
        template +=
            "                                        <tr> "
            + "                                            <td class=\"td_top_line td_right_line\" align=\"center\"> "
            + "                                                <p class=\"alignC\"> "
            + "                                                    <#assign SrNo=SrNo + 1/>${SrNo}</p> "
            + "</td> "
            + "<td class=\"td_top_line td_right_line\" align=\"center\"> "
            + "                                                        <p class=\"alignC\">"+item_receipt.getLineItemText('item', 'item', i)+"<br /> "
            + ""+item_receipt.getLineItemValue('item', 'description', i)+"</p> "
            + "                                                    </td> "
            + "                                                    <td class=\"td_top_line td_right_line\" align=\"center\"> "
            + "                                                        <p class=\"alignC\">"+item_receipt.getLineItemValue('item', 'quantity', i)+"</p> "
            + "                                                    </td> "
            + "                                                    <td class=\"td_top_line td_right_line\" align=\"center\"> "
            + "                                                        <p class=\"alignC\">"+item_receipt.getLineItemValue('item', 'unitsdisplay', i)+"</p> "
            + "                                                    </td> "
            + " "

            + "                                                    <td class=\"td_top_line td_right_line\" align=\"center\"> ";
        if (subrec) {
            var subreccount = subrec.getLineItemCount('inventoryassignment');
            nlapiLogExecution('DEBUG', 'subreccount', subreccount);
            for (var ss = 1; ss <= subreccount; ss++) {
                serialno.push(subrec.getLineItemText('inventoryassignment', 'issueinventorynumber', ss));
                nlapiLogExecution('DEBUG', 'serialno', serialno);
      
            }
        }
        template +=
        "                                                        <p class=\"alignL\">"+serialno+"</p> "
           + "                                                    </td> "
            + " "
            + "                                                </tr> ";
    }
    template +=
        // "                                            </#list> "
        "                                        </table> "
        + "                                    </#if> "

        + "                            <table style=\"width:100%;padding-top:40px;\" class=\"\"> "
        + "                                <tr> "
        + "                                    <td width=\"70%\" align=\"left\"> "
        + "                                        <table width=\"100%\"> "
        + "                                            <tr> "
        + "                                                <td align=\"left\" width=\"25%\"> "
        + "                                                    <b>Received By</b> "
        + "                                                </td> "

        + "                                                <td align=\"left\" width=\"73%\"></td> "
        + "                                            </tr> "
        + "                                            <tr> "
        + "                                                <td align=\"left\"> "
        + "                                                    <b>Signature</b> "
        + "                                                </td> "
        + "                                                <td align=\"left\">:</td> "
        + "                                                <td align=\"left\"></td> "
        + "                                            </tr> "
        + "                                            <tr> "
        + "                                                <td align=\"left\"> "
        + "                                                    <b>Name</b> "
        + "                                                </td> "
        + "                                                <td align=\"left\">:</td> "
        + "                                                <td align=\"left\"></td> "
        + "                                            </tr> "

        + "                                            <tr> "
        + "                                                <td align=\"left\"> "
        + "                                                    <b>Mobile No.</b> "
        + "                                                </td> "
        + "                                                <td align=\"left\">:</td> "
        + "                                                <td align=\"left\"></td> "
        + "                                            </tr> "
        + "                                            <tr> "
        + "                                                <td align=\"left\"> "
        + "                                                    <b>Date</b> "
        + "                                                </td> "
        + "                                                <td align=\"left\">:</td> "
        + "                                                <td align=\"left\"></td> "
        + "                                            </tr> "


        + "                                        </table> "
        + "                                    </td> "
        + "                                    <td width=\"30%\" align=\"right\"> "
        + "                                        <table width=\"100%\"> "
        + "                                            <tr> "
        + "                                                <td align=\"center\">______________</td> "
        + "                                            </tr> "
        + "                                            <tr> "
        + "                                                <td align=\"center\"> "
        + "                                                    ${record.custbody_nalg_created_by}"
        + "                                                </td> "
        + "                                            </tr> "

        + "                                            <tr> "
        + "                                                <td align=\"center\"> "
        + "                                                    <b>Created By</b> "
        + "                                                </td> "
        + "                                            </tr> "
        + "                                        </table> "
        + "                                    </td> "
        + "                                </tr> "
        + "                            </table> "
        + " "
        + "                        </body> "
        + "                    </pdf>";


    renderer.setTemplate(template);
    renderer.addRecord('record', item_receipt);
    var xml = renderer.renderToString();
    var file = nlapiXMLToPDF(xml);
    response.setContentType('PDF', 'Check' + item_receipt.getFieldValue("id") + '.pdf', 'inline');
    response.write(file.getValue());
}
function replaceSlashN(charVal) {



    if (charVal) {



        return charVal.replace("\n", "<br />", "g");



    } else {



        return "";



    }



}