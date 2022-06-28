function printCheckAction(request, response) {
    var renderer = nlapiCreateTemplateRenderer();
    var recID = request.getParameter('recordID');
    var res = nlapiLoadRecord("check", recID);
    var count = res.getLineItemCount('recmachcustrecord_trans_ref');
    var entity = res.getFieldValue('entity');
    nlapiLogExecution('DEBUG', 'entity', entity);
    var recType = nlapiLookupField("entity", entity, 'recordtype');
    nlapiLogExecution('DEBUG', 'recType', recType);
    var custRec = nlapiLoadRecord(recType, entity);
    if (recType == "employee") {
        var firstName = custRec.getFieldValue('firstname');
        var middleName = custRec.getFieldValue('middlename');
        if (middleName) {
            middleName = middleName;
        }
        else {
            middleName = " ";
        }
        var lastName = custRec.getFieldValue('lastname');
        if (lastName) {
            lastName = lastName;
        }
        else {
            lastName = " ";
        }
        var fullName = firstName + " " + middleName + " " + lastName;
        var custAdd = custRec.getFieldValue('defaultaddress');
        nlapiLogExecution('DEBUG', 'address', address);
        if (custAdd) {
            custAdd = custAdd;
        }
        else {
            custAdd = " ";
        }
    }
    else {
        var isPerson = custRec.getFieldValue('isperson');
        if (isPerson == 'T') {
            var fullName = custRec.getFieldValue('altname');
        }
        else {
            var fullName = custRec.getFieldValue('companyname');
            var custAdd = custRec.getFieldValue('defaultaddress');
            nlapiLogExecution('DEBUG', 'address', address);
            if (custAdd) {
                custAdd = custAdd;
            }
            else {
                custAdd = " ";
            }

        }
    }
    var subsidiary = res.getFieldValue('subsidiary');
    var sub = nlapiLoadRecord("subsidiary", subsidiary);
    var subTRN = sub.getFieldValue('federalidnumber');
    var subAdd = sub.getFieldValue('mainaddress_text');

    var cust = nlapiLoadRecord('customer', entity);
    var TRN =cust.getFieldValue('vatregnumber');
    var contact=cust.getFieldValue('phone');
var address=cust.getFieldValue('defaultaddress');

    var template = '';
    template += "<?xml version=\"1.0\"?><!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\"> "
        + "<pdf> "
        + "    <#global Cash = '1'/> "
        + "    <#global Cheque = '2' /> "
        + "    <#global letterOfCredit = '3' /> "
        + "    <#global onlineTransfer = '4' /> "
        + "    <#global TT = '5' /> "
        + "    <#global BT = '6' /> "
        + "    <#global CCPay = '7' /> "
        + "    <#global DCPay = '8' /> "
        + " "
        + "    <#global paymentTypeBank = '1' /> "
        + "    <#global paymentTypeCash = '2' /> "
        + " "
        + "    <head> "
        + "  <link name=\"Amiri-font\" type=\"font\" subtype=\"opentype\" src=\"https://7329918.app.netsuite.com/core/media/media.nl?id=12252&amp;c=7329918&amp;h=0UHuNYXd9YR04EmKuSz3PVitE9A7emTU7pB82YEH2SWBNuPR&amp;_xt=.ttf\" src-bold=\"https://7329918.app.netsuite.com/core/media/media.nl?id=12250&amp;c=7329918&amp;h=V_5JR_3nl_jzVCjiM314tG8nCKoOAj_QKzurLf3UQkAA4QOd&amp;_xt=.ttf\" bytes=\"2\" />  "
        + "        <link name=\"NotoSans\" type=\"font\" subtype=\"truetype\" src=\"${nsfont.NotoSans_Regular}\" src-bold=\"${nsfont.NotoSans_Bold}\" src-italic=\"${nsfont.NotoSans_Italic}\" src-bolditalic=\"${nsfont.NotoSans_BoldItalic}\" bytes=\"2\" /> "
        + "        <#if .locale == \"zh_CN\"> "
        + "            <link name=\"NotoSansCJKsc\" type=\"font\" subtype=\"opentype\" src=\"${nsfont.NotoSansCJKsc_Regular}\" src-bold=\"${nsfont.NotoSansCJKsc_Bold}\" bytes=\"2\" /> "
        + "            <#elseif .locale == \"zh_TW\"> "
        + "                <link name=\"NotoSansCJKtc\" type=\"font\" subtype=\"opentype\" src=\"${nsfont.NotoSansCJKtc_Regular}\" src-bold=\"${nsfont.NotoSansCJKtc_Bold}\" bytes=\"2\" /> "
        + "                <#elseif .locale == \"ja_JP\"> "
        + "                    <link name=\"NotoSansCJKjp\" type=\"font\" subtype=\"opentype\" src=\"${nsfont.NotoSansCJKjp_Regular}\" src-bold=\"${nsfont.NotoSansCJKjp_Bold}\" bytes=\"2\" /> "
        + "                    <#elseif .locale == \"ko_KR\"> "
        + "                        <link name=\"NotoSansCJKkr\" type=\"font\" subtype=\"opentype\" src=\"${nsfont.NotoSansCJKkr_Regular}\" src-bold=\"${nsfont.NotoSansCJKkr_Bold}\" bytes=\"2\" /> "
        + "                        <#elseif .locale == \"th_TH\"> "
        + "                            <link name=\"NotoSansThai\" type=\"font\" subtype=\"opentype\" src=\"${nsfont.NotoSansThai_Regular}\" src-bold=\"${nsfont.NotoSansThai_Bold}\" bytes=\"2\" /> "
        + "                        </#if> "
        + "                        <macrolist> "
        + "                            <macro id=\"nlheader\"> "
        + "                                <table class=\"header\" style=\"width: 100%;\"> "
        + "                                    <tr> ";
    if (sub != "") {
        var logo = sub.getFieldValue('logo');
        var legalName = sub.getFieldValue('legalname');
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
            } else if (subsidiary == 4) {
                template +=
                    "<td align=\"left\" valign=\"top\" width=\"33%\"> "
                    + "                                            <img src=\"" + logoUrl + "\" style=\"width:150px;height:60px;position:absolute;top:-6px;padding-top:0px;padding-left:-5px;\" /> "
                    + "                                        </td> ";
            } else if (subsidiary == 7) {
                template +=
                    "<td align=\"left\" valign=\"top\" width=\"33%\"> "
                    + "                                            <img src=\"" + logoUrl + "\" style=\"width:150px;height:60px;position:absolute;top:-6px;padding-top:0px;padding-left:-5px;\" /> "
                    + "                                        </td> ";
            }
        }


        template +=

            "                                        <td align=\"right\" valign=\"top\" width=\"23%\"> "
            + "                                            <b>" + legalName + "</b> "
            + "                                            <br/> "
            + "                                            <span style=\" font-size: 9pt;\">" + replaceSlashN(address) + "</span> "
            + "                                            <br/> "
            + "                                            <span style=\" font-size: 9pt;\">TRN&nbsp;:&nbsp;" + trn + "</span> "
            + "                                            <br/> "

            + "                                        </td> ";
    }
    template +=
        "                                    </tr> "
        + "                                </table> "
        + "                            </macro> "
        + "                            <macro id=\"nlfooter\"> "
        //     + "                                <table style=\"width: 100%\"> "
        //     + "                                    <tr> "
        //     + "                                        <td align=\"left\" style=\"width:60%;\"> "
        //    // + "                                            <p class=\"alignL\" style=\"font-size:11px;font-style:italics;color:#A9A9A9\">*This is a system-generated document. No signature is required.</p> "
        //     + "                                            <p class=\"alignL\" style=\"font-size:11px;\">"+subAdd+"</p> "

        //     + "                                        </td> "
        //     + " "
        //     + "                                        <td align=\"right\">&nbsp;( Page <pagenumber/> "
        //     + " of <totalpages/> "
        //     + " )&nbsp;"
        //     + "</td> "
        //     + "                                </tr> "
        //     + "                            </table> "
        //     + "                            <!-- <table style=\"padding-left:0px !important\" width=\"100%\"> "
        //     + "                <tr> "
        //     + "                    <td style=\"padding-left:0px !important\"><img src=\"#\" style=\"width:660px;height:150px;\"/></td> "
        //     + "             </tr> "
        //     + "         </table> --> "
        + "<#"
        + "if record.subsidiary.internalid?string == '4'> "
        + "                        <table style=\"width: 100%;\"> "
        + " "
        + "                                                            <tr> "
        + "                                        <td align=\"left\" style=\"width:50%;font-size:9px\"> "
        + "                                        PO Box:  3049 ;"

        + "PC: 130<br/> "
        + "                                        Building"
        + "No: 98/1, Plot"
        + "No: 140, Block"
        + "No: 242, Way"
        + "No: 4229, Flat"
        + "No: 505<br/> "
        + "                                        Azaiba North, Muscat, Sultanate of Oman"
        + "Tel: +968 22850997.<br/>"
        + "CR: 1230780  VAT"

        + "Reg: OM1100001071 Tax"

        + "Card: 8094031 "
        + "                                        </td> "
        + " "
        + "                                        <td style=\"width:40%;font-family: Amiri-font, sans-serif;font-size:9px;text-align:right;margin-top:-7px;\" align=\"right\"><p >ص.ب : 3049  ,"

        + "الرمزالبريدي: 130 </p><p style='margin-top:3px'> "
        + "                                        مبنى"
        + "رقم: 98/1 رقم"
        + "القطعة: 140  بلوك رقم : 242 ورقم السكه  :  4229 شقة"
        + "رقم:  505 </p> <p style='margin-top:3px'> "
        + "                                        العذيبة شمال مسقط ، سلطنة عمان."
        + "هاتف: 96822850997+</p> <p style='margin-top:3px'>"
        + "OM1100001071:س ت :1230780 البطاقة الضريبية   8094031:  . ضريبة القيمة المضافة </p> "
        + "                                        </td> "
        + " "
        + " "
        + "                                </tr> "
        + " "
        + "                        </table> "
        + "                        </#"
        + "if> "
        + " "
        + "                             <#if record.subsidiary.internalid?string == '3'> "
        + "                        <table style=\"width: 100%;\"> "
        + " "
        + "                                                            <tr> "
        + "                                        <td align=\"left\" style=\"width:50%;font-size:9px\"> "
        + "                                        PO Box: 2185, Postal"
        + "Code: 130<br/> "
        + "                                        Way"
        + "No: 98, Building"
        + "No: 260, Flat"
        + "No: 302, Al Jinain Street<br/> "
        + "                                        Qurayyat, Sultanate of Oman.<br/> "
        + "                                        Tel : +968 22850997,"
        + "CR: 1214737, Tax"
        + "card: 8078231 "
        + "                                        </td> "
        + " "
        + "                                        <td style=\"width:40%;font-family: Amiri-font, sans-serif;font-size:9px;text-align:right;margin-top:-7px;\" align=\"right\"><p >ص ب :2185  , الرمز البريدي :130  </p><p style='margin-top:3px'> "
        + "                                رقم"

        + "السكة: 98 , بناية"

        + "رقم: 260 , شقة"

        + "رقم: 302  شارع الجنين </p> <p style='margin-top:3px'> "
        + "                                        قريات, ســــــلطنة عــــــمان </p> <p style='margin-top:3px'>"

        + "هاتف: 96822850997+ س ت :1214737 البطاقة"

        + "الضريبية: 8078231   </p> "
        + "                                        </td> "
        + " "
        + " "
        + "                                </tr> "
        + " "
        + "                        </table> "
        + "                        </#"

        + "if>"
        + "                        </macro> "
        + "                    </macrolist> "
        + "                    <style type=\"text/css\">span, table "
        + "{                        <#if .locale==\"zh_CN\">font-family: stsong, sans-serif; "
        + "                            <#elseif .locale==\"zh_TW\">font-family: msung, sans-serif; "
        + "                                <#elseif .locale==\"ja_JP\">font-family: heiseimin, sans-serif; "
        + "                                    <#elseif .locale==\"ko_KR\">font-family: hygothic, sans-serif; "
        + "                                        <#elseif .locale==\"ru_RU\">font-family: verdana; "
        + "                                            <#else>font-family: sans-serif; "
        + "                                            </#if>font-size: 9pt; "
        + "     table-layout: fixed; "
        + "     } "
        + "     th "
        + "{        font-weight: bold; "
        + "     font-size: 8.5pt; "
        + "     padding-top: 2px; "
        + "     vertical-align: middle; "
        + "     /*padding: 3px 6px 10px;*/ "
        + "     /*background-color: #e3e3e3; "
        + "     color: #333333;*/ "
        + "     } "
        + "     b "
        + "{        font-weight: bold; "
        + "     color: #333333; "
        + "     } "
        + "     table.header td "
        + "{        padding: 0; "
        + "     font-size: 10pt; "
        + "     } "
        + "     table.footer td "
        + "{        padding: 0; "
        + "     font-size: 8pt; "
        + "     } "
        + "     #itemtable th p "
        + "{        vertical-align: text-top !important; "
        + "     text-align: center !important; "
        + "     } "
        + "     #itemtable "
        + "{        font-size: 8.5pt !important; "
        + "     border: 0.5px solid #000000 "
        + "     } "
        + "     table.total "
        + "{        page-break-inside: avoid; "
        + "     } "
        + "     tr.totalrow "
        + "{        background-color: #e3e3e3; "
        + "     line-height: 200%; "
        + "     } "
        + "     td.totalboxtop "
        + "{        font-size: 12pt; "
        + "     background-color: #e3e3e3; "
        + "     } "
        + "     span.title "
        + "{        font-size: 28pt; "
        + "     } "
        + "     .smallTitle "
        + "{        font-size: 9pt; "
        + "     } "
        + "     span.number "
        + "{        font-size: 16pt; "
        + "     text-align:center; "
        + "     } "
        + "     span.itemname "
        + "{        font-weight: bold; "
        + "     line-height: 150%; "
        + "     } "
        + "     hr "
        + "{        width: 100%; "
        + "     color: #d3d3d3; "
        + "     background-color: #d3d3d3; "
        + "     height: 1px; "
        + "     } "
        + "     table.smalltext tr td "
        + "{        font-size: 8pt; "
        + "     } "
        + "     /*table.itemtable th{ "
        + "border-bottom: 10px #ffc966; "
        + "border-color: yellow; "
        + "}*/ "
        + "     p.alignR "
        + "{        text-align: right !important; "
        + "     } "
        + "     p.alignL "
        + "{        text-align: left !important; "
        + "     } "
        + "     p.alignC "
        + "{        text-align: center !important; "
        + "     } "
        + "     .td_right_line "
        + "{        /*border-right: 0.5px solid #f4f4f4;*/ "
        + "     border-right :0.5px solid #000000; "
        + "     } "
        + "     .td_bottom_line "
        + "{        border-bottom: 0.5px solid #000000; "
        + "     } "
        + "     .td_top_line "
        + "{        /*border-top :0.5px solid #f4f4f4;*/ "
        + "     border-top :0.5px solid #000000; "
        + "     } "
        + "     .title "
        + "{        font-weight: bold; "
        + "     align:center!important; "
        + "     font-size:16pt; "
        + "     line-height: 150%; "
        + "     } "
        + "     .footer-img "
        + "{        /*width: 100%; "
        + "     height: 20%;*/ "
        + "     top: 0px; "
        + "     right: 0px; "
        + "     left: 0px; "
        + "     bottom: 0px; "
        + "     } "
        + "     .footer "
        + "{        margin-left:-45px; margin-right:-60px; margin-bottom:-115px; "
        + "     } "
        + "     .td_left_line "
        + "{        /*border-right: 0.5px solid #f4f4f4;*/ "
        + "     border-left :0.5px solid #000000; "
        + "     } "
        + "     .maintbl "
        + "{        border:0.5px solid #000000; "
        + "     } "
        + "     .footertbl "
        + "{        border:0.5px solid #000000; "
        + "     border-top: 0px !important; "
        + "     } "
        + "     .footertbl2 "
        + "{         "
        + "     /*border:0.5px solid #000000;*/ "
        + "     border-left: 0.5px solid #000000; "
        + "     border-right: 0.5px solid #000000; "
        + "     border-top: 0.25px !important; "
        + "     } "
        + "     .pad_left "
        + "{        padding-left: 5px!important; "
        + "     } "
        + "     th,td "
        + "{        padding:4px; "
        + "     } "
        + "     td img "
        + "{        max-width:100%; "
        + "      "
        + "     } "
        + "     .signature img "
        + "{            width:85px; "
        + "         height:50px; "
        + "      } "
        + "                                        </style> "
        + "                                    </head> "
        + "                                    <body header=\"nlheader\" background-macro=\"watermark\" header-height=\"8%\" footer=\"nlfooter\" footer-height=\"3%\" padding=\"0.25in 0.25in 0.25in 0.25in\" size=\"A4\"> "
        + "                                        <br/> "
        + "                                        <table width=\"100%\" style=\"margin-top:10px;\">'; "
        + "                                            <tr> "
        + "                                                <td align=\"center\" class=\"title\"> "
        + "                                                    <u>PAYMENT VOUCHER</u> "
        + "                                                </td> "
        + "                                            </tr> "
        + "                                        </table> "
        + "                                        <table border=\"0.5px solid #000000\" border-bottom=\"0.25px solid #000000\" style=\"width: 100%;margin-top:10px;\"> "
        + "                                            <tr class=\"\"> "
        + "                                                <td class=\"td_right_line\" width=\"50%\"> "
        + "                                                    <table align=\"right\" width=\"100%\"> "
        + "                                                        <tr> "
        + "                                                            <td colspan=\"1\" align=\"left\" width=\"30%\"> "
        + "                                                                <p align=\"left\"> "
        + "                                                                    <b>Payment To</b> "
        + "                                                                </p> "
        + "                                                            </td> "
        + "                                                            <td width=\"1%\"> "
        + "                                                                <b>&nbsp;&nbsp;:&nbsp;&nbsp;</b> "
        + "                                                            </td> "
        + "                                                            <td align=\"left\" width=\"54%\"> "
        + "                 <p style='align:left'>   <b>" + replaceAndOper(fullName) + "</b></p> "
        + "                                                            </td> "
        + "                                                            <td></td> "
        + "                                                        </tr> "
        + "                                                        <tr> "
        + "                                                            <td align=\"left\" width=\"30%\"> "
        + "                                                                <p align=\"left\"> "
        + "                                                                    <b>Address</b> "
        + "                                                                </p> "
        + "                                                            </td> "
        + "                                                            <td width=\"1%\"> "
        + "                                                                <b>&nbsp;&nbsp;:&nbsp;&nbsp;</b> "
        + "                                                            </td> "
        + "                                                            <td align=\"left\" width=\"64%\">" + relaceCharector(address) + "</td> "
        + "                                                        </tr> "
        + " "
        + "                                                        <tr> "
        + "                                                            <td align=\"left\" width=\"30%\"> "
        + "                                                                <p align=\"left\"> "
        + "                                                                    <b>Amount</b> "
        + "                                                                </p> "
        + "                                                            </td> "
        + "                                                            <td width=\"1%\"> "
        + "                                                                <b>&nbsp;&nbsp;:&nbsp;&nbsp;</b> "
        + "                                                           </td> "
        + "                                                            <td align=\"left\" width=\"64%\">${record.usertotal?string[\"#,##0.000\"]}</td> "
        + "                                                        </tr> "

        + "                                                        <tr> "
        + "                                                            <td align=\"left\" width=\"30%\"> "
        + "                                                                <p align=\"left\"> "
        + "                                                                    <b>TRN</b> "
        + "                                                                </p> "
        + "                                                            </td> "
        + "                                                            <td width=\"1%\"> "
        + "                                                                <b>&nbsp;&nbsp;:&nbsp;&nbsp;</b> "
        + "                                                           </td> "
        + "                                                            <td align=\"left\" width=\"64%\">"+TRN+"</td> "
        + "                                                        </tr> "
        
        + "                                                        <tr> "
        + "                                                            <td align=\"left\" width=\"30%\"> "
        + "                                                                <p align=\"left\"> "
        + "                                                                    <b>Contact</b> "
        + "                                                                </p> "
        + "                                                            </td> "
        + "                                                            <td width=\"1%\"> "
        + "                                                                <b>&nbsp;&nbsp;:&nbsp;&nbsp;</b> "
        + "                                                           </td> "
        + "                                                            <td align=\"left\" width=\"64%\">"+contact+"</td> "
        + "                                                        </tr> "
        + "                                                        <tr> "
        + "                                                            <td align=\"left\" width=\"30%\"> "
        + "                                                                <p align=\"left\"> "
        + "                                                                    <b>Amount</b> "
        + "                                                                </p> "
        + "                                                            </td> "
        + "                                                            <td width=\"1%\"> "
        + "                                                                <b>&nbsp;&nbsp;:&nbsp;&nbsp;</b> "
        + "                                                           </td> "
        + "                                                            <td align=\"left\" width=\"64%\">${record.availablebalance?string[\"#,##0.000\"]}</td> "
        + "                                                        </tr> "
        + " "
        + "                                                    </table> "
        + "                                                </td> "
        + "                                                <td align=\"left\" width=\"50%\"> "
        + "                                                    <table align=\"right\" width=\"100%\"> "
        + "                                                        <tr> "
        + "                                                            <td colspan=\"1\" align=\"left\" width=\"40%\"> "
        + "                                                                <p align=\"left\"> "
        + "                                                                    <b>Transaction#</b> "
        + "                                                                </p> "
        + "                                                            </td> "
        + "                                                            <td width=\"1%\"> "
        + "                                                                <b>&nbsp;&nbsp;:&nbsp;&nbsp;</b> "
        + "                                                            </td> "
        + "                                                            <td align=\"left\" width=\"54%\"> "
        + "                                                                ${record.transactionnumber} "
        + "                                                            </td> "
        + "                                                            <td></td> "
        + "                                                        </tr> "
       
        + "                                                        <tr> "
        + "                                                            <td colspan=\"1\" align=\"left\" width=\"40%\"> "
        + "                                                                <p align=\"left\"> "
        + "                                                                    <b>Date</b> "
        + "                                                                </p> "
        + "                                                            </td> "
        + "                                                            <td width=\"1%\"> "
        + "                                                                <b>&nbsp;&nbsp;:&nbsp;&nbsp;</b> "
        + "                                                            </td> "
        + "                                                            <td align=\"left\" width=\"54%\"> "
        + "                                                                ${record.trandate?string(\"dd-MMM-YYYY\")} "
        + "                                                            </td> "
        + "                                                            <td></td> "
        + "                                                        </tr> "
        + "                                                        <tr> "
        + "                                                            <td align=\"left\" width=\"40%\"> "
        + "                                                                <p align=\"left\"> "
        + "                                                                    <b>Currency</b> "
        + "                                                                </p> "
        + "                                                            </td> "
        + "                                                            <td width=\"1%\"> "
        + "                                                                <b>&nbsp;&nbsp;:&nbsp;&nbsp;</b> "
        + "                                                            </td> "
        + "                                                            <td align=\"left\" width=\"64%\">${record.currency}</td> "
        + "                                                        </tr> "
        + "                                                        <tr> "
        + "                                                            <td align=\"left\" width=\"40%\"> "
        + "                                                                <p align=\"left\"> "
        + "                                                                    <b>Exchange Rate</b> "
        + "                                                                </p> "
        + "                                                            </td> "
        + "                                                            <td width=\"1%\"> "
        + "                                                                <b>&nbsp;&nbsp;:&nbsp;&nbsp;</b> "
        + "                                                            </td> "
        + "                                                            <td align=\"left\" width=\"64%\"> "
        + "                                                                <p align=\"left\" style=\"text-decoration:none;\"> "
        + "                                    ${record.exchangerate?string[\"#,##0.00\"]} "
        + "                                                                </p> "
        + "                                                            </td> "
        + "                                                        </tr> "

        + "                                                        <tr> "
        + "                                                            <td align=\"left\" width=\"40%\"> "
        + "                                                                <p align=\"left\"> "
        + "                                                                    <b>Paymeny mode</b> "
        + "                                                                </p> "
        + "                                                            </td> "
        + "                                                            <td width=\"1%\"> "
        + "                                                                <b>&nbsp;&nbsp;:&nbsp;&nbsp;</b> "
        + "                                                            </td> "
        + "                                                            <td align=\"left\" width=\"64%\"> "
        
        + "                                                                ${record.custbody_kpib_payment_method} "
        
        + "                                                            </td> "
        + "                                                        </tr> "
        + "                                                        <tr> "
        + "                                                            <td align=\"left\" width=\"40%\"> "
        + "                                                                <p align=\"left\"> "
        + "                                                                    <b>Bank Name</b> "
        + "                                                                </p> "
        + "                                                            </td> "
        + "                                                            <td width=\"1%\"> "
        + "                                                                <b>&nbsp;&nbsp;:&nbsp;&nbsp;</b> "
        + "                                                            </td> "
        + "                                                            <td align=\"left\" width=\"64%\"> "

        + "                                                                <p align=\"left\" style=\"text-decoration:none;\"> "
        + "${record.custbody_kpib_bank_account}"
        + "                                                                </p> "
        + "                                                            </td> "
        + "                                                        </tr> "

        + "                                                <#if record.custbody_kpib_cheque_number?has_content> "
        +                                                        "<tr> "
        +                                                         "<td colspan=\"1\" align=\"left\" width=\"40%\"> "
        + "                                                    <p align=\"left\"> "
        + "                                                        <b>Check No</b> "
        + "                                                    </p> "
        + "                                                </td> "
        + "                                                <td width=\"1%\"> "
        + "                                                    <b>&nbsp;&nbsp;:&nbsp;&nbsp;</b> "
        + "                                                </td> "
        + "                                                <td align=\"left\" width=\"54%\"> "
        + "                                                                ${record.custbody_kpib_cheque_number} "
        + "                                                </td> "
        + "                                                <td></td> "
        + "                                            </tr> "
        + "                                        </#if> "

        + "                                                          <tr> "
        + "                                                            <td colspan=\"1\" align=\"left\" width=\"40%\"> "
        + "                                                                <p align=\"left\"> "
        + "                                                                    <b>Cheque Date</b> "
        + "                                                                </p> "
        + "                                                            </td> "
        + "                                                            <td width=\"1%\"> "
        + "                                                                <b>&nbsp;&nbsp;:&nbsp;&nbsp;</b> "
        + "                                                            </td> "
        + "                                                            <td align=\"left\" width=\"54%\"> "
        + "                                                                ${record.custbody_kpib_cheque_date} "
        + "                                                            </td> "
        + "                                                            <td></td> "
        + "                                                        </tr> "
        // + " <tr> "
        // + "                                                            <td colspan=\"1\" align=\"left\" width=\"40%\"> "
        // + "                                                                <p align=\"left\"> "
        // + "                                                                    <b>Memo</b> "
        // + "                                                                </p> "
        // + "                                                            </td> "
        // + "                                                            <td width=\"1%\"> "
        // + "                                                                <b>&nbsp;&nbsp;:&nbsp;&nbsp;</b> "
        // + "                                                            </td> "
        // + "                                                            <td align=\"left\" width=\"54%\"> "
        // + "                                                                ${record.custbody_kpib_payment_method} "
        // + "                                                            </td> "
        // + "                                                            <td></td> "
        // + "                                                        </tr> "


        

        + " "
        + "                                <#if record.custbody_kpib_online_transfer_number?has_content> "
        + "<tr> "
        + "<td align=\"left\" width=\"40%\"> "
        + "                                    <p align=\"left\"> "
        + "                                        <b>Payment / Transfer Ref No.</b> "
        + "                                    </p> "
        + "                                </td> "
        + "                                <td width=\"1%\"> "
        + "                                    <b>&nbsp;&nbsp;:&nbsp;&nbsp;</b> "
        + "                                </td> "
        + "                                <td align=\"left\" width=\"64%\">${record.custbody_kpib_online_transfer_number}</td> "
        + "                            </tr> "
        + "                        </#if> "
        + "                        <tr> "
        + "                            <td align=\"left\" width=\"40%\"> "
        + "                                <p align=\"left\"> "
        + "                                    <b>Memo</b> "
        + "                                </p> "
        + "                            </td> "
        + "                            <td width=\"1%\"> "
        + "                                <b>&nbsp;&nbsp;:&nbsp;&nbsp;</b> "
        + "                            </td> "
        + "                            <td align=\"left\" width=\"64%\"><p align=\"left\">${record.memo}</p></td> "
        + "                        </tr> "
        + " "
        + "                    </table> "
        + "                </td> "
        + "            </tr> "
        + "        </table> "
        + " "

     

        + "        <#if record.item?has_content> "
        + "<table class=\"footertbl2\" id=\"itemtable\" style=\"width: 100%;margin-top: 15px;\"> "
        + " <#assign SrNo=0> "
        
        + "            <tr style=\"padding-bottom: 0px;\"> "
        + "                <td align=\"center\" width=\"4%\" class=\"td_right_line\"> "
        + "                    <b>Sl#</b> "
        + "                </td> "
        + "                <td align=\"center\" width=\"30%\" class=\"td_right_line\"> "
        + "                    <b>Item Description</b> "
        + "                </td> "
        // + "                <td align=\"center\"  width=\"15%\" class=\"td_right_line\"> "
        // + "                    <b>Rate</b> "
        // + "                </td> "
        + "                <td align=\"center\" width=\"20%\" class=\"td_right_line\"> "
        + "                    <b>AMOUNT</b> "
        + "                </td> "
        + "                <td align=\"center\" width=\"15%\" class=\"td_right_line\"> "
        + "                    <b>Tax Rate</b> "
        + "                </td> "
        + "                <td align=\"center\" width=\"15%\" class=\"td_right_line\"> "
        + "                    <b>Tax Amount</b> "
        + "                </td> "
        + "                <td align=\"center\" width=\"16%\"> "
        + "                    <b>GROSS AMOUNT</b> "
        + "                </td> "
        + "            </tr> "
         + " <#assign totalNetAmt = 0 />"
        + " <#assign totalTaxAmt = 0 />"
        + " <#assign totalGrossAmt = 0 />"
        + "      <#list record.item as item> "
        + "<tr> "
        + "<td align=\"center\" class=\"td_top_line td_right_line\"> "
        + "                <p align=\"center\"><#assign SrNo=SrNo + 1/>${SrNo}</p> "
        + "            </td> "
        + "            <td align=\"center\" class=\"td_top_line td_right_line\"> "
        + '                <p align=\"center\">${item.item}<br/>${item.description}</p> '
        + "            </td> "
        // + "            <td align=\"right\" class=\"td_top_line td_right_line\"> "
        // + '                <p class=\"alignR\">${item.rate}</p> '
        // + "            </td> "
        + "            <td align=\"right\" class=\"td_top_line td_right_line\"> "
        + '                <p class=\"alignR\">${item.custcol_amount?string["#,##0.000"]}</p> '
        + "            </td> "
        + "            <td align=\"right\" class=\"td_top_line td_right_line\"> "
        + '                <p class=\"alignR\">${item.taxrate1}</p> '
        + "            </td> "
        + "            <td align=\"right\" class=\"td_top_line td_right_line\"> "
        + '                <p class=\"alignR\">${item.tax1amt?string["#,##0.000"]}</p> '
        + "            </td> "
        + "            <td align=\"right\" class=\"td_top_line\"> "
        + '                <p class=\"alignR\">${item.grossamt?string["#,##0.000"]}</p> '
        + "            </td> "
        + "        </tr> "
         + " <#assign totalNetAmt = totalNetAmt + item.custcol_amount />"
         + " <#assign totalTaxAmt = totalTaxAmt + item.tax1amt />"
         + " <#assign totalGrossAmt = totalGrossAmt + item.grossamt />"
        +"</#list> "

        + "        <tr> "
        + ' <td align="right" colspan="2" class="td_top_line td_right_line"> '
        + "      <b>Total</b> "
        + " </td> "
        + ' <td align="right"  class="td_top_line td_right_line"> '
        + "     <p class=\"alignR\">${totalNetAmt}</p> "
        + " </td> "
        + ' <td align="right"  class="td_top_line"> '
         + " </td> "

        + ' <td align="right"  class="td_top_line td_right_line"> '
        + "     <p class=\"alignR\">${totalTaxAmt?string['#,##0.000']}</p> "
        + " </td> "
        + ' <td align="right"  class="td_top_line td_right_line"> '
        + "     <p class=\"alignR\">${totalGrossAmt?string['#,##0.000']}</p> "
        + " </td> "

        + "        </tr> "


        + "        <tr> "
        + ' <td align="left" colspan="7" class="td_top_line"> '
        + "     <b>Amount in Words :&nbsp;${record.currencysymbol}&nbsp;${record.custbody_amount_in_words} </b> "
        + " </td> "
        + "        </tr> "

        + "        <tr> "
        + ' <td align="right" colspan="5" class="td_top_line td_right_line"> '
        + "     <b>Net Amount</b> "
        + " </td> "
        + ' <td align="right"  class="td_top_line"> '
        + "     <p class=\"alignR\">${totalNetAmt}</p> "
        + " </td> "
        + "        </tr> "
        + "        <tr> "
        + ' <td align="right" colspan="5" class="td_top_line td_right_line"> '
        + "     <b>Tax Amount</b> "
        + " </td> "
        + ' <td align="right"  class="td_top_line"> '
        + "     <p class=\"alignR\">${totalTaxAmt?string['#,##0.000']}</p> "
        + " </td> "
        + "        </tr> "
        + "        <tr> "
        + ' <td align="right" colspan="5" class="td_top_line td_right_line"> '
        + "     <b> Gross Amount</b> "
        + " </td> "
        + ' <td align="right"  class="td_top_line"> '
        + "     <p class=\"alignR\">${totalGrossAmt?string['#,##0.000']}</p> "
        + " </td> "
        + "        </tr> "

        
        
        + "</table> "
        + "</#if> "
        
        //expense table start here//

        + "        <#if record.expense?has_content> "
        + "<table style=\"width: 100%;margin-top:20px;\"> "
        + "<tr style=\"padding-bottom: 0px;\" > "
        + "<td align=\"left\" colspan=\"5\" ><b>Expense</b></td> "
        + "</tr> "
        + "</table> "
        + "<table class=\"footertbl2\" id=\"itemtable\" style=\"width: 100%;margin-top: 15px;\"> "
        + " <#assign SrNo=0> "
        
        + "            <tr style=\"padding-bottom: 0px;\"> "
        + "                <td align=\"center\" width=\"6%\" class=\"td_right_line\"> "
        + "                    <b>Sl#</b> "
        + "                </td> "
        + "                <td align=\"center\" width=\"20%\" class=\"td_right_line\"> "
        + "                    <b>Account</b> "
        + "                </td> "
        + "                <td align=\"center\"  width=\"10%\" class=\"td_right_line\"> "
        + "                    <b>Memo</b> "
        + "                </td> "
        + "                <td align=\"center\" width=\"15%\" class=\"td_right_line\"> "
        + "                    <b>Amount</b> "
        + "                </td> "
        + "                <td align=\"center\" width=\"20%\" class=\"td_right_line\"> "
        + "                    <b>Tax Rate</b> "
        + "                </td> "
        + "                <td align=\"center\" width=\"15%\" class=\"td_right_line\"> "
        + "                    <b>Tax Amount</b> "
        + "                </td> "
        + "                <td align=\"center\" width=\"14%\"> "
        + "                    <b>GROSS AMOUNT</b> "
        + "                </td> "
        + "            </tr> "
        + " <#assign totalNetAmt = 0 />"
        + " <#assign totalTaxAmt = 0 />"
        + " <#assign totalGrossAmt = 0 />"
        + "      <#list record.expense as expense> "
        + "<tr> "
        + "<td align=\"center\" class=\"td_top_line td_right_line\"> "
        + "                <p align=\"center\"><#assign SrNo=SrNo + 1/>${SrNo}</p> "
        + "            </td> "
        + "            <td align=\"center\" class=\"td_top_line td_right_line\"> "
        + '                <p align=\"center\">${expense.account}</p> '
        + "            </td> "
        + "            <td align=\"right\" class=\"td_top_line td_right_line\"> "
        + '                <p class=\"alignR\">${expense.memo}</p> '
        + "            </td> "
        + "            <td align=\"right\" class=\"td_top_line td_right_line\"> "
        + '                <p class=\"alignR\">${expense.amount?string["#,##0.000"]}</p> '
        + "            </td> "
        + "            <td align=\"right\" class=\"td_top_line td_right_line\"> "
        + '                <p class=\"alignR\">${expense.taxrate1}</p> '
        + "            </td> "
        + "            <td align=\"right\" class=\"td_top_line td_right_line\"> "
        + '                <p class=\"alignR\">${expense.tax1amt?string["#,##0.000"]}</p> '
        + "            </td> "
        + "            <td align=\"right\" class=\"td_top_line\"> "
        + '                <p class=\"alignR\">${expense.grossamt?string["#,##0.000"]}</p> '
        + "            </td> "
        + "        </tr> "
        + " <#assign totalNetAmt = totalNetAmt + expense.amount />"
        + " <#assign totalTaxAmt = totalTaxAmt + expense.tax1amt />"
        + " <#assign totalGrossAmt = totalGrossAmt +expense.grossamt  />"

        +"</#list> "

        + "        <tr> "
        + ' <td align="right" colspan="3" class="td_top_line td_right_line"> '
        + "      <b>Total</b> "
        + " </td> "
        + ' <td align="right"  class="td_top_line td_right_line"> '
        + "     <p class=\"alignR\">${totalNetAmt}</p> "
        + " </td> "
        + ' <td align="right"  class="td_top_line td_right_line"> '
         + " </td> "

        + ' <td align="right"  class="td_top_line td_right_line"> '
        + "     <p class=\"alignR\">${totalTaxAmt?string['#,##0.000']}</p> "
        + " </td> "
        + ' <td align="right"  class="td_top_line td_right_line"> '
        + "     <p class=\"alignR\">${totalGrossAmt?string['#,##0.000']}</p> "
        + " </td> "

        + "        </tr> "


        + "        <tr> "
        + ' <td align="left" colspan="8" class="td_top_line"> '
        + "     <b>Amount in Words :&nbsp;${record.currencysymbol}&nbsp;${record.custbody_amount_in_words} </b> "
        + " </td> "
        + "        </tr> "

        + "        <tr> "
        + ' <td align="right" colspan="6" class="td_top_line td_right_line"> '
        + "     <b>Net Amount</b> "
        + " </td> "
        + ' <td align="right"  class="td_top_line"> '
        + "     <p class=\"alignR\">${totalNetAmt}</p> "
        + " </td> "
        + "        </tr> "
        + "        <tr> "
        + ' <td align="right" colspan="6" class="td_top_line td_right_line"> '
        + "     <b>Tax Amount</b> "
        + " </td> "
        + ' <td align="right"  class="td_top_line"> '
        + "     <p class=\"alignR\">${totalTaxAmt?string['#,##0.000']}</p> "
        + " </td> "
        + "        </tr> "
        + "        <tr> "
        + ' <td align="right" colspan="6" class="td_top_line td_right_line"> '
        + "     <b> Gross Amount</b> "
        + " </td> "
        + ' <td align="right"  class="td_top_line"> '
        + "     <p class=\"alignR\">${totalGrossAmt?string['#,##0.000']}</p> "
        + " </td> "
        + "        </tr> "

        
        
        + "</table> "

        + "</#if> "


        // + "        <#if record.expense?has_content> "
        // + "<table class=\"footertbl2\"  style=\"width: 100%;margin-top:20px;\"> "
        // + "<tr style=\"padding-bottom: 0px;\" > "
        // + "<td align=\"left\" colspan=\"5\" ><b>Expense</b></td> "
        // + "</tr> "
        // + "</table> "
        // + "<table class=\"footertbl2\" id=\"itemtable\"  width=\"100%\" > "
        // // + "            <tr style=\"padding-bottom: 0px;\" class=\"td_bottom_line \"> "
        // // + "                <td align=\"left\" > "
        // // + "                    <b>Expense</b> "
        // // + "                </td> "
        // // + "            </tr> "
        // + "            <tr style=\"padding-bottom: 0px;\"> "
        // + "                <th align=\"center\" class=\"td_right_line\" width=\"30%\"> "
        // + "                    <b>Account</b> "
        // + "                </th> "
        // + "                <th align=\"center\" class=\"td_right_line\" width=\"35%\"> "
        // + "                    <b>Memo</b> "
        // + "                </th> "
        // + "                <th align=\"center\" class=\"td_right_line\" width=\"10%\"> "
        // + "                    <b>Department</b> "
        // + "                </th> "
        // + "                <th align=\"center\" class=\"td_right_line\" width=\"10%\"> "
        // + "                    <b>Class</b> "
        // + "                </th> "
        // + "                <th align=\"center\"  width=\"15%\"> "
        // + "                    <b>Amount</b> "
        // + "                </th> "
        // // + "                <td align=\"center\" > "
        // // + "                    <b>Location</b> "
        // // + "                </td> "
        // + "            </tr> "
        // + "      <#list record.expense as expense> "
        // + "<tr> "
        // + "<td align=\"center\" class=\"td_top_line td_right_line\"> "
        // + "                <p align=\"center\">${expense.account}</p> "
        // + "            </td> "
        // + "            <td align=\"center\" class=\"td_top_line td_right_line\"> "
        // + "                <p class=\"alignL\">${expense.memo}</p> "
        // + "            </td> "
        // + "            <td align=\"center\" class=\"td_top_line td_right_line\"> "
        // + "                <p class=\"alignL\">"
        // + "<#if expense.custcol_department_id?has_content>"
        // + "${expense.custcol_department_id}"
        // + " <#else> "
        // + "${expense.department}"
        // + "</#if>"
        // + "</p> "
        // + "            </td> "
        // // var expensecount = res.getLineItemCount('expense');
        // // nlapiLogExecution("DEBUG","expensecount",expensecount);
        // + "            <td align=\"center\" class=\"td_top_line td_right_line\"> "
        // + "                <p class=\"alignL\">${expense.custcol_class_id}</p> "
        // + "            </td> "
        // + "            <td align=\"right\" class=\"td_top_line\"> "
        // + '                <p align=\"right\">${expense.custcol_gross_amount_3_decimal?string["#,##0.000"]}</p> '
        // + "            </td> "
        // // + "            <td align=\"left\" class=\"td_top_line\"> "
        // // + '                <p class=\"alignL\">${expense.location}</p> '
        // // + "            </td> "
        // + "        </tr> "

        // + "</#list> "
        // + "<tr> "
        // + "<td align=\"right\" colspan=\"4\" class=\"td_top_line td_right_line\"> "
        // + "                <p align=\"right\"><b>Total</b></p> "
        // + "            </td> "
        // + "<td align=\"right\" class=\"td_top_line\"> "
        // + "                <p align=\"right\">${record.custbody_total_amount_3_decimal?string[\"#,##0.000\"]}</p> "
        // + "            </td> "
        // // + "<td colspan=\"3\" align=\"center\" class=\"td_top_line\"> "
        // // + "                <p align=\"center\"></p> "
        // // + "            </td> "
        // + "        </tr> "
        // + "<tr> "
        // + " <td align=\"left\" colspan=\"5\" class=\"td_top_line\">"
        // + "                <p align=\"center\"> <b>Amount in Words :&nbsp;${record.currencysymbol}&nbsp;${record.custbody_amount_in_words} </b></p> "
        // + "            </td> "
        // + "        </tr> "
        // + "</table> "
        // + "</#if> "




        + " "
        + "<table style=\"width:100%;\"> "
        + "<tr style=\"width:100%;padding-top: 30px;\"> "
        + "<td align=\"left\" style=\"width:30%;\"> "
        + "<table> "
        + "<tr> "
        + "        <td align=\"center\">${record.custbody_nalg_created_by}</td> "
        + "    </tr> "
        + "    <tr> "
        + "        <td align=\"center\" style=\"margin-top:-16px\">___________________</td> "
        + "    </tr> "
        + "     "
        + "    <tr> "
        + "        <td align=\"center\"> "
        + "            <b>Prepared By</b> "
        + "        </td> "
        + "    </tr> "
        + "</table> "
        + "</td> "
        + "<td align=\"center\" style=\"width:40%;\"> "
        // + "<table> "
        // + "<tr> "
        // + "        <td></td> "
        // + "    </tr> "
        // + "    <tr> "
        // + "        <td align=\"center\" style=\"margin-top:-16px\">___________________</td> "
        // + "    </tr> "
        // + "    <tr> "
        // + "        <td align=\"center\"> "
        // + "            <b>Approved By</b> "
        // + "        </td> "
        // + "    </tr> "
        // + "</table> "
        + "</td> "
        + "<td align=\"right\" style=\"width:30%;\"> "
        + "<table align=\"right\"> "
        + "<tr> "
        + "        <td align=\"center\">&nbsp;</td> "
        + "    </tr> "
        + "    <tr> "
        + "        <td align=\"center\" style=\"margin-top:-14px\">___________________</td> "

        + "    </tr> "
        + "    <tr> "
        + "        <td align=\"center\"> "
        + "            <b>Received By</b> "
        + "        </td> "
        + "    </tr> "
        + "</table> "
        + "</td> "
        + "</tr> "
        + "</table> "
        + "</body> "
        + "</pdf>";
    // nlapiLogExecution("DEBUG", "templte", template);
    renderer.setTemplate(template);
    renderer.addRecord('record', res);
    var xml = renderer.renderToString();
    var file = nlapiXMLToPDF(xml);
    response.setContentType('PDF', 'writecheck.pdf', 'inline');
    response.write(file.getValue());
}
function relaceSlashN(charVal) {
    if (charVal) {
        return charVal.replace("\n", "<br />", "g");
    } else {
        return "";
    }
}
function replaceAndOper(charVal) {
    return charVal.replace(/&/g, "&amp;");
}
function replaceSlashN(charVal) {



    if (charVal) {



        return charVal.replace("\n", "<br />", "g");



    } else {



        return "";



    }



}
