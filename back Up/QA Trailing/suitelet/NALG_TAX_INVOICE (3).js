function createTaxInvoiceAction(request, response) {
    nlapiLogExecution('DEBUG', 'getting inside');
    var recordID = request.getParameter('recordID');
    nlapiLogExecution('DEBUG', 'recordID', recordID);


    var taxRec = nlapiLoadRecord("invoice", recordID);


    var subsidiary = taxRec.getFieldValue('subsidiary');
    var sub = nlapiLoadRecord("subsidiary", subsidiary);
    var entityName = taxRec.getFieldValue('entity');
    var entity = nlapiLoadRecord("customer", entityName);
    var entityId = entity.getFieldValue('entityid');
    nlapiLogExecution('DEBUG', 'entityid', entityId);

    var entityadd = entity.getFieldValue('defaultaddress');
    var entityTRN = entity.getFieldValue('vatregnumber');

    var entityParent = entity.getFieldValue('parent');
    nlapiLogExecution('DEBUG', 'parent', entityParent);


    var renderer = nlapiCreateTemplateRenderer();
    var template = "";
    template += '<?xml version="1.0"?><!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">';
    template += '<pdf>';
    template += '<head>';
    template += '<link name="NotoSans" type="font" subtype="truetype" src="${nsfont.NotoSans_Regular}" src-bold="${nsfont.NotoSans_Bold}" src-italic="${nsfont.NotoSans_Italic}" src-bolditalic="${nsfont.NotoSans_BoldItalic}" bytes="2" />';
    template += '<#if .locale == "zh_CN">';
    template += '<link name="NotoSansCJKsc" type="font" subtype="opentype" src="${nsfont.NotoSansCJKsc_Regular}" src-bold="${nsfont.NotoSansCJKsc_Bold}" bytes="2" />';
    template += '<#elseif .locale == "zh_TW">';
    template += '<link name="NotoSansCJKtc" type="font" subtype="opentype" src="${nsfont.NotoSansCJKtc_Regular}" src-bold="${nsfont.NotoSansCJKtc_Bold}" bytes="2" />';
    template += '<#elseif .locale == "ja_JP">';
    template += '<link name="NotoSansCJKjp" type="font" subtype="opentype" src="${nsfont.NotoSansCJKjp_Regular}" src-bold="${nsfont.NotoSansCJKjp_Bold}" bytes="2" />';
    template += '<#elseif .locale == "ko_KR">';
    template += '<link name="NotoSansCJKkr" type="font" subtype="opentype" src="${nsfont.NotoSansCJKkr_Regular}" src-bold="${nsfont.NotoSansCJKkr_Bold}" bytes="2" />';
    template += '<#elseif .locale == "th_TH">';
    template += '<link name="NotoSansThai" type="font" subtype="opentype" src="${nsfont.NotoSansThai_Regular}" src-bold="${nsfont.NotoSansThai_Bold}" bytes="2" />';
    template += '</#if>';
    template += '<macrolist>';
    template += '<macro id="nlheader">';
    template += '';
    template += '';
    template += ' ';
    template += '                                <table style="width:100%;top:-20px">';
    template += '            <tr><td align="center" class="title">';
    template += '                                                    <u>TAX INVOICE</u>';
    template += '                                                </td></tr>';
    template += '    </table>';
    template += '   <table style="width: 100%;margin-top:10px;">';
    template += '    <tr>';
    template += '        <td width="60%">';
    template += '            <table style="width:100%">';
    template += '           ';
    template += '';
    template += '                <tr>';
    template += '                    <td width="35%"><p align="left"><b>Customer Account</b></p></td>';
    template += '                    <td width="2%"><b>:</b></td>';
    template += '                    ';

    var custId = entity.getFieldValue('nameorig');
    nlapiLogExecution('DEBUG', 'entityid', parentId);
    template += '         <td width="63%"><p align="left">' + relaceCharector(custId) + '</p></td>';
    //     }
    // }      
    template += '                    ';
    template += '                    ';
    template += '                </tr>';
    template += '                ';
    template += '   ';
    template += '                <tr>';
    template += '                    <td><p align="left"><b>Deliver To</b></p></td>';
    template += '                    <td ><b>:</b></td>';
    template += '                    <td><p align="left">';
    //  if (subsidiary == 4) {
    var companyname = entity.getFieldValue('companyname');
    var firstName = entity.getFieldValue('firstname');
    var lastName = entity.getFieldValue('lastname');
    var middleName = entity.getFieldValue('middlename');
    var customerName = "";
    if (companyname) {
        customerName = companyname;
    } else {
        if (middleName) { middleName = " " + middleName; } else { middleName = ""; }
        if (lastName) { lastName = " " + lastName; } else { lastName = ""; }
        customerName = firstName + middleName + lastName
    }
    template += '' + relaceCharector(customerName) + '';
    // } else {
    //     template += '' + relaceCharector(entityId) + '';

    // }

    template += '</p></td>';
    template += '                </tr>';
    template += '                ';
    template += '';
    template += '                <tr>';
    template += '                    <td><p align="left"><b>Address</b></p></td>';
    template += '                    <td ><b>:</b></td>';
    entityadd = relaceCharector(entityadd);
    template += '                    <td><p align="left">' + relaceSlashN(entityadd) + '</p></td>';
    template += '                </tr>';
    template += '               ';
    template += '';
    template += '                <tr>';
    template += '                    <td><p align="left"><b>Tax Reg No</b></p></td>';
    template += '                    <td ><b>:</b></td>';
    template += '                    <td><p align="left">' + entityTRN + '</p></td>';
    template += '                </tr>';

    template += '                ';
    template += '               ';
    template += '            </table>';
    template += '        </td>';
    template += '        <td  width="33%">';
    template += '             <table style="width:100%">';
    template += '            ';
    template += '';
    template += '                <tr>';
    if (subsidiary == 3) {
        template += '                    <td align="right" valign="top" width="33%">';
        template += '<img src="${record.custbody_subsidiary_logo.imageUrl}" style="width:180px;height:180px;margin:80px;position:absolute;top:-75px;padding-top:-80px;padding-left:-100px;"  />  ';
        template += '</td>                 ';
    } else if (subsidiary == 4) {
        
        template += '                    <td align="right" valign="top" width="33%">';
        template += '<img src="https://7460164.app.netsuite.com/core/media/media.nl?id=986&amp;c=7460164&amp;h=A1FFtMoBgE8TiF4xCnqmW9QO5xdcjGXLl8RceB9tvdoC9cY0" style="width:150px;height:150px;margin:100px;position:absolute;top:-50px;padding-top:-100px;padding-left:-110px;"  />  ';
        template += '</td>                 ';

    }
    template += '                </tr>';
    template += '               ';
    template += '               ';
    template += '';
    template += '                <tr style="margin-top:100px;top:-40px">';
    template += '                   ';

    if (sub != "") {
        var address = sub.getFieldValue('mainaddress_text');
        address = relaceCharector(address)
        var country = sub.getFieldValue('country');
        var taxno = sub.getFieldValue('federalidnumber');
    }
    template += '                    <td>' + relaceSlashN(address) + '</td>';
    template += '                </tr>';
    template += '               ';
    template += '               ';
    template += '            </table>';
    template += '        </td>';
    template += '    </tr>';
    template += '     <tr>';
    template += '        <td>';
    template += '            <table style="width:100%;margin-top:-20px;">';
    if (entityParent) {
        var parent = nlapiLoadRecord("customer", entityParent);

        var parentId = parent.getFieldValue('nameorig');
        nlapiLogExecution('DEBUG', 'entityid', parentId);

        var parentaddress = parent.getFieldValue('defaultaddress');
        var parentRegNum = parent.getFieldValue('vatregnumber');

        template += '               <tr>';
        template += '                    <td width="35%"><p align="left"><b>Main Account</b></p></td>';
        template += '                    <td width="2%"><b>:</b></td>';

        template += '                    <td width="63%"><p align="left">' + relaceCharector(parentId) + '</p></td>';
        template += '                </tr>';
        template += '                <tr>';
        template += '                    <td><p align="left"><b>Main Account Name</b></p></td>';
        template += '                    <td ><b>:</b></td>';
        template += '                    <td><p align="left">';
        // if (subsidiary == 4) {
        var companyname = entity.getFieldValue('companyname');
        var firstName = entity.getFieldValue('firstname');
        var lastName = entity.getFieldValue('lastname');
        var middleName = entity.getFieldValue('middlename');
        var customerName = "";
        if (companyname) {
            customerName = companyname;
        } else {
            if (middleName) { middleName = " " + middleName; } else { middleName = ""; }
            if (lastName) { lastName = " " + lastName; } else { lastName = ""; }
            customerName = firstName + middleName + lastName
        }
        template += '' + relaceCharector(customerName) + '';
        template += '</p></td>';
        // } else {
        //     template += '' + relaceCharector(entityId) + '</p></td>';

        // }
        template += '                </tr>';
        template += '                <tr>';
        template += '                    <td><p align="left"><b>Address</b></p></td>';
        template += '                    <td ><b>:</b></td>';
        template += '                    <td><p align="left">' + relaceCharector(parentaddress) + '</p></td>';
        template += '                </tr>';

        template += '                <tr>';
        template += '                    <td width="40%"><p align="left"><b>Tax Reg No</b></p></td>';
        template += '                    <td width="2%"><b>:</b></td>';
        template += '                    <td width="58%"><p align="left">' + parentRegNum + '</p></td>';
        template += '                </tr>';
    } else {
        template += '               <tr>';
        template += '                    <td width="35%"><p align="left"><b>Main Account</b></p></td>';
        template += '                    <td width="2%"><b>:</b></td>';
        template += '                    <td width="63%"><p align="left">' + relaceCharector(custId) + '</p></td>';
        template += '                </tr>';

        template += '                <tr>';
        template += '                    <td><p align="left"><b>Main Account Name</b></p></td>';
        template += '                    <td ><b>:</b></td>';
        template += '                    <td><p align="left">';
        // if (subsidiary == 4) {
        var companyname = entity.getFieldValue('companyname');
        var firstName = entity.getFieldValue('firstname');
        var lastName = entity.getFieldValue('lastname');
        var middleName = entity.getFieldValue('middlename');
        var customerName = "";
        if (companyname) {
            customerName = companyname;
        } else {
            if (middleName) { middleName = " " + middleName; } else { middleName = ""; }
            if (lastName) { lastName = " " + lastName; } else { lastName = ""; }
            customerName = firstName + middleName + lastName
        }
        template += '' + relaceCharector(customerName) + '';
        // } else {
        //     template += '' + relaceCharector(entityId) + '';

        // }
        template += '</p></td>';
        template += '                </tr>';

        template += '                <tr>';
        template += '                    <td><p align="left"><b>Address</b></p></td>';
        template += '                    <td ><b>:</b></td>';
        template += '                    <td><p align="left">${record.billaddress}</p></td>';
        template += '                </tr>';

        template += '                <tr>';
        template += '                    <td width="40%"><p align="left"><b>Tax Reg No</b></p></td>';
        template += '                    <td width="2%"><b>:</b></td>';
        template += '                    <td width="58%"><p align="left">${record.entity.vatregnumber}</p></td>';
        template += '                </tr>';
    }

    template += '            </table>';
    template += '        </td>';

    template += '        <td>';
    template += '             <table style="width:100%;top:-50px">';
    template += '                <tr>';
    template += '                     <td width="40%"><!--' + country + '--></td>';
    template += '                    <td width="2%"></td>';
    template += '                    <td width="58%"></td>';
    template += '                </tr>';
    template += '                <tr>';
    template += '                    <td width="40%"><b>Tax Reg No</b></td>';
    template += '                    <td width="2%"><b>:</b></td>';
    template += '                    <td width="58%">' + taxno + '</td>';
    template += '                </tr>';
    template += '                <#if subsidiary.internalid?string == "4">';
    template += '                <tr>';
    template += '                     <td><b>Memo</b></td>';
    template += '                    <td><b>:</b></td>';
    template += '                    <td> NASSER ABDULLA LOOTAH GROUP(LLC)</td>';
    template += '                </tr>';
    template += '                </#if>';
    template += '            </table>';
    template += '        </td>';
    template += '    </tr>';
    template += '    </table>';
    template += '</macro>';
    // template+='<#if (record.status == "Pending Approval") >';
    // template+='                            <macro id="watermark">';
    // template+='<div rotate="-45" style="margin-top:400px;margin-left:50px;margin-right:50px;z-index:999;" font-size="20pt" color="#C0C0C0">';
    // template+='<p>PENDING FOR APPROVAL</p>';
    // template+='</div>';
    // template+='</macro>';
    // template+='</#if>';
    template += '';
    template += '                            <macro id="nlfooter">';
    template += '                            <!--    <table style="width: 100%;">';
    template += '                                    <tr>';
    template += '                                        <td align="left" style="width:60%;">';
    template += '                                            <p class="alignL" style="font-size:11px;font-style:italics;color:#A9A9A9">*This is a system-generated document. No signature is required.</p>';
    template += '                                        </td>';
    template += '';
    template += '                                        <td style="margin-left:150px;">&nbsp;( Page <pagenumber/>';
    template += ' of <totalpages/>';
    template += ' )&nbsp;</td>';
    template += '                                </tr>';
    template += '';
    template += '';
    template += '';
    template += '                            </table>-->';
    template += '                        </macro>';
    template += '                    </macrolist>';
    template += '                    <style type="text/css">span, table {';
    template += '                        <#if .locale=="zh_CN">font-family: stsong, sans-serif;';
    template += '                            <#elseif .locale=="zh_TW">font-family: msung, sans-serif;';
    template += '                                <#elseif .locale=="ja_JP">font-family: heiseimin, sans-serif;';
    template += '                                    <#elseif .locale=="ko_KR">font-family: hygothic, sans-serif;';
    template += '                                        <#elseif .locale=="ru_RU">font-family: verdana;';
    template += '                                            <#else>font-family: sans-serif;';
    template += '                                            </#if>font-size: 9pt;';
    template += '		table-layout: fixed;';
    template += '		}';
    template += '		th {';
    template += '		font-weight: bold;';
    template += '		font-size: 8.5pt;';
    template += '		padding-top: 2px;';
    template += '		vertical-align: middle;';
    template += '		/*padding: 3px 6px 10px;*/';
    template += '		/*background-color: #e3e3e3;';
    template += '		color: #333333;*/';
    template += '		}';
    template += '		b {';
    template += '		font-weight: bold;';
    template += '		color: #333333;';
    template += '		}';
    template += '		table.header td {';
    template += '		padding: 0;';
    template += '		font-size: 10pt;';
    template += '		}';
    template += '		table.footer td {';
    template += '		padding: 0;';
    template += '		font-size: 8pt;';
    template += '		}';
    template += '		#itemtable th p{';
    template += '		vertical-align: text-top !important;';
    template += '		text-align: center !important;';
    template += '		}';
    template += '		#itemtable{';
    template += '		font-size: 8.5pt !important;';
    template += '		border: 0.5px solid #000000';
    template += '		}';
    template += '		table.total {';
    template += '		page-break-inside: avoid;';
    template += '		}';
    template += '		tr.totalrow {';
    template += '		background-color: #e3e3e3;';
    template += '		line-height: 200%;';
    template += '		}';
    template += '		td.totalboxtop {';
    template += '		font-size: 12pt;';
    template += '		background-color: #e3e3e3;';
    template += '		}';
    template += '		span.title {';
    template += '		font-size: 28pt;';
    template += '		}';
    template += '		.smallTitle {';
    template += '		font-size: 9pt;';
    template += '		}';
    template += '		span.number {';
    template += '		font-size: 16pt;';
    template += '		text-align:center;';
    template += '		}';
    template += '		span.itemname {';
    template += '		font-weight: bold;';
    template += '		line-height: 150%;';
    template += '		}';
    template += '		hr {';
    template += '		width: 100%;';
    template += '		color: #d3d3d3;';
    template += '		background-color: #d3d3d3;';
    template += '		height: 1px;';
    template += '		}';
    template += '		table.smalltext tr td {';
    template += '		font-size: 8pt;';
    template += '		}';
    template += '		/*table.itemtable th{';
    template += '		border-bottom: 10px #ffc966;';
    template += '		border-color: yellow;';
    template += '		}*/';
    template += '		p.alignR {';
    template += '		text-align: right !important;';
    template += '		}';
    template += '		p.alignL {';
    template += '		text-align: left !important;';
    template += '		}';
    template += '		p.alignC {';
    template += '		text-align: center !important;';
    template += '		}';
    template += '		.td_right_line{';
    template += '		/*border-right: 0.5px solid #f4f4f4;*/';
    template += '		border-right :0.5px solid #000000;';
    template += '		}';
    template += '		.td_bottom_line{';
    template += '		border-bottom: 0.5px solid #000000;';
    template += '		}';
    template += '		.td_top_line{';
    template += '		/*border-top :0.5px solid #f4f4f4;*/';
    template += '		border-top :0.5px solid #000000;';
    template += '		}';
    template += '		.title{';
    template += '		font-weight: bold;';
    template += '		align:center!important;';
    template += '		font-size:16pt;';
    template += '		}';
    template += '		.footer-img{';
    template += '		/*width: 100%;';
    template += '		height: 20%;*/';
    template += '		top: 0px;';
    template += '		right: 0px;';
    template += '		left: 0px;';
    template += '		bottom: 0px;';
    template += '		}';
    template += '		.footer{';
    template += '		margin-left:-45px; margin-right:-60px; margin-bottom:-115px;';
    template += '		}';
    template += '		.td_left_line{';
    template += '		/*border-right: 0.5px solid #f4f4f4;*/';
    template += '		border-left :0.5px solid #000000;';
    template += '		}';
    template += '		.maintbl{';
    template += '		border:0.5px solid #000000;';
    template += '		}';
    template += '		.footertbl{';
    template += '		border:0.5px solid #000000;';
    template += '		border-top: 0px !important;';
    template += '		}';
    template += '		.footertbl2{';
    template += '		';
    template += '		/*border:0.5px solid #000000;*/';
    template += '		border-left: 0.5px solid #000000;';
    template += '		border-right: 0.5px solid #000000;';
    template += '		border-top: 0.25px !important;';
    template += '		}';
    template += '		.pad_left{';
    template += '		padding-left: 5px!important;';
    template += '		}';
    template += '		th,td{';
    template += '		padding:4px;';
    template += '		}';
    template += '		                                                                                                                                                                                                                            <!--  .td_top_line td{';
    template += '		padding-left: 5px!important;';
    template += '		} -->';
    template += '		td img {';
    template += '		max-width:100%;';
    template += '		';
    template += '		}';
    template += '                                        </style>';
    template += '                                    </head>';
    template += '                                    <body header="nlheader" background-macro="watermark" header-height="32%" footer="nlfooter" footer-height="4%" padding="0.25in 0.5in 0.25in 0.5in" size="A4">';
    var amountTotal = 0;
    var taxtotalAmount = 0;
    var grossAmount = 0;
    var TotalGrossAmount = 0;
    var discountTotal = 0;
    var TotalTaxableAmount = 0;
    var TaxAmountTotal = 0;
    var discountamount = 0;
    var discounttaxamount = 0;
    var discountgrossamount = 0;
    template += '   <table style="width:100%;">';
    template += '    <tr>';
    template += '        <td>';
    template += '            <table style="width:100%;">';
    template += '                <!-- <tr>';
    template += '                    <td width="35%"><p align="left"><b>Customer</b></p></td>';
    template += '                    <td width="2%"><b>:</b></td>';
    template += '                     <#if record.entity.isperson?string == "Yes">';
    template += '                    <td><b>${record.entity.firstname}&nbsp;${record.entity.lastname}</b></td>';
    template += '                    <#else>';
    template += '                    <td width="63%"><p align="left"><b>${record.entity.companyname}</b></p></td>';
    template += '                     </#if>';
    template += '                </tr> -->';
    template += '                <tr>';
    template += '                    <td width="45%"><p align="left"><b>Invoice No</b></p></td>';
    template += '                    <td width="2%"><b>:</b></td>';
    template += '                    <td width="53%" align="left"><p align="left">${record.tranid}</p></td>';
    template += '                </tr>';
    template += '                <tr>';
    template += '                    <td width="35%"><p align="left"><b>Invoice Date</b></p></td>';
    template += '                    <td width="2%"><b>:</b></td>';
    template += '                    <td width="63%"><p align="left">${record.trandate?string("dd-MMM-YYYY")}</p></td>';
    template += '                </tr>';
    template += '                <tr>';
    template += '                    <td><p align="left"><b>Date of Supply</b></p></td>';
    template += '                    <td ><b>:</b></td>';
    template += '                    <td><p align="left">';
    //template += '  ${record.duedate?string("dd-MMM-YYYY")}';
    template += '</p></td>';
    template += '                </tr>';
    template += '                <tr>';
    template += '                    <td><p align="left"><b>Customer Reference</b></p></td>';
    template += '                    <td ><b>:</b></td>';
    template += '                    <td><p align="left">${record.custbody_nalg_customer_ref}</p></td>';
    template += '                </tr>';
    template += '               ';
    template += '            </table>';
    template += '        </td>';
    template += '        <td >';
    template += '             <table style="width:100%;">';
    template += '                <tr>';
    template += '                    <td width="40%"><b>Sales Order NO</b></td>';
    template += '                    <td width="2%"><b>:</b></td>';
    template += '                    <td width="58%">';
    var shippeddate = "";
    var createdFrom = taxRec.getFieldValue('createdfrom');
    nlapiLogExecution('Debug', 'createdFrom', createdFrom);
    if (createdFrom) {
        //  var salesRecId = getdate(createdFrom);
        var rectype = nlapiLookupField('transaction', createdFrom, 'recordtype');
        //    nlapiLogExecution('Debug', 'Transaction', 'Type : ' + rectype);
        var salesRec = nlapiLoadRecord(rectype, createdFrom);
        shippeddate = salesRec.getFieldValue("tranid")
        nlapiLogExecution('Debug', 'shippeddate', shippeddate);

    }

    // if (createdFrom) {
    //     var rectype = nlapiLookupField('transaction', createdFrom, 'recordtype');
    //     nlapiLogExecution('Debug', 'Transaction', 'Type : ' + rectype);
    //     var salesRec = nlapiLoadRecord(rectype, createdFrom);
    //     var salesCount = salesRec.getLineItemCount('item');
    //     nlapiLogExecution('Debug', 'salesCount=====', salesCount);
    //     for (var i = 1; i <= salesCount; i++) {

    //     }
    // }

    template += '' + shippeddate + '';
    template += '</td>';
    template += '                </tr>';
    template += '                <tr>';
    template += '                    <td><b>Payment Terms</b></td>';
    template += '                    <td><b>:</b></td>';
    template += '                    <td>${record.terms}</td>';
    template += '                </tr>';
    // template += '                <tr>';
    // template += '                    <td><b>Invoice Account</b></td>';
    // template += '                    <td><b>:</b></td>';
    // template += '                    <td>';
    // if (entityParent) {
    //     template += '  ' + parentId + ' ';
    // }
    // else {
    //     template += ' ';
    // }
    // template += '</td>';
    // template += '                </tr>';
    template += '                <tr>';
    template += '                    <td><b>Sales Person</b></td>';
    template += '                    <td><b>:</b></td>';
    template += '                    <td><p align="left">${record.salesrep}</p></td>';
    template += '                </tr>';
    template += '               ';
    template += '                ';
    template += '            </table>';
    template += '        </td>';
    template += '    </tr>';
    template += '     <!-- <tr>';
    template += '        <td>';
    template += '            <table style="width:100%">';
    template += '                <tr>';
    template += '                    <td width="40%"><p align="left"><b>Dispatch Document#</b></p></td>';
    template += '                    <td width="2%"><b>:</b></td>';
    template += '                    <td>${record.custbody_nalg_dispatch_document}</td>';
    template += '                </tr>';
    template += '                <tr>';
    template += '                    <td><p align="left"><b>Dispatched Through</b></p></td>';
    template += '                    <td ><b>:</b></td>';
    template += '                    <td><p align="left">${record.custbody_nalg_dispacthed_through}</p></td>';
    template += '                </tr>';
    template += '                <tr>';
    template += '                    <td><p align="left"><b>Delivery Note</b></p></td>';
    template += '                    <td ><b>:</b></td>';
    template += '                    <td><p align="left">${record.custbody_delivery_note}</p></td>';
    template += '                </tr>';
    template += '                <tr>';
    template += '                    <td><p align="left"><b>Delivery Note Date</b></p></td>';
    template += '                    <td ><b>:</b></td>';
    template += '                    <td><p align="left">${record.custbody_delivery_note_date}</p></td>';
    template += '                </tr>';
    template += '            </table>';
    template += '        </td>';
    template += '        <td style="border-left:0.5px Solid Black;">';
    template += '             <table style="width:100%">';
    template += '                <tr>';
    template += '                    <td width="40%"><b>Shipping Destination</b></td>';
    template += '                    <td width="2%"><b>:</b></td>';
    template += '                    <td width="58%">${record.custbody_shipping_destination}</td>';
    template += '                </tr>';
    template += '                <tr>';
    template += '                    <td><b>Place of Supply</b></td>';
    template += '                    <td><b>:</b></td>';
    template += '                    <td>${record.custbody_place_of_supply}</td>';
    template += '                </tr>';
    template += '               ';
    template += '                <tr>';
    template += '                    <td><b>Memo</b></td>';
    template += '                    <td><b>:</b></td>';
    template += '                    <td> ${record.memo}</td>';
    template += '                </tr>';
    template += '            </table>';
    template += '        </td>';
    template += '    </tr> -->';
    template += '    </table>';
    template += '    ';
    template += ' <#if record.item?has_content>';
    template += '<#assign SrNo=0>';
    template += '<table  border="0.5" class="footertbl2" id="itemtable" style="width: 100%;margin-top:10px;" width="100%">                                                <!-- start items -->';
    template += '                                                <#assign SrNo=0><#assign qty_to_ord = 0 ><#list record.item as item><#if item_index==0>';
    template += '                                                ';
    template += '<thead>';
    template += '<tr style="padding-bottom: 0px;">';
    template += '                                                    <th align="left" width="3%" class="td_right_line">';
    template += '                                                        <p align="left">';
    template += '                                                            <b>Sl#</b>';
    template += '                                                        </p>';
    template += '                                                    </th>';
    template += '                                                     <th align="left" class="td_right_line" width="7%">';
    template += '                                                        <p class="alignL">Item No</p>';
    template += '                                                    </th>';
    template += '                                                    <th align="left" class="td_right_line" width="14%">';
    template += '                                                        <p class="alignL">Bar Code</p>';
    template += '                                                    </th>';
    template += '                                                    <th align="left" class="td_right_line" width="14%">';
    template += '                                                        <p class="alignL">Goods/Service Description</p>';
    template += '                                                    </th>';
    template += '                                                    <th align="center" class="td_right_line" width="4%">';
    template += '                                                        <p>Qty</p>';
    template += '                                                    </th>';
    template += '                                                    <th align="center" class="td_right_line" width="6%">';
    template += '                                                        <p>Units</p>';
    template += '                                                    </th>';
    template += '                                                   ';
    template += '                                                    <th align="right" class="td_right_line" width="6%">';
    template += '                                                        <p class="alignR">Unit Price</p>';
    template += '                                                    </th>';
    template += '                                                   ';
    template += '                                                    <th align="right" class="td_right_line" width="8%">';
    template += '                                                        <p class="alignR">Amount</p>';
    template += '                                                    </th>';
    template += '                                                    ';
    template += '                                                    <th align="right" class="td_right_line" width="9%">';
    template += '                                                        <p class="alignR"> Discount Amount</p>';
    template += '                                                    </th>';
    template += '                                                     <th align="right" class="td_right_line" width="8%">';
    template += '                                                        <p class="alignR"> Taxable Amount</p>';
    template += '                                                    </th>';
    template += '                                                   ';
    template += '                                                    <th align="right" class="td_right_line" width="8%">';
    template += '                                                        <p class="alignR">VAT(AED)</p>';
    template += '                                                    </th>';
    template += '                                                     <th align="right" class="td_right_line" width="6%">';
    template += '                                                        <p class="alignR">VAT RATE%</p>';
    template += '                                                    </th>';
    template += '                                                     <th align="right" width="8%">';
    template += '                                                        <p class="alignR">Gross Amount</p>';
    template += '                                                    </th>';
    template += '                                                </tr>';
    template += '                                            </thead>';
    template += '                                        </#if>';
    template += '                                        </#list>';

    // template+='                                        <#if item.itemtype!="Discount" && item.itemtype!="Subtotal">';
    var count = taxRec.getLineItemCount('item');
    for (var i = 1; i <= count; i++) {
        var item = taxRec.getLineItemValue('item', 'item', i);
        var itemNo = nlapiLookupField('item', item, 'itemid');

        var barcode = taxRec.getLineItemValue('item', 'custcol_upc_code', i);
        var goodsanddelivery = taxRec.getLineItemValue('item', 'description', i)
        var quantity = taxRec.getLineItemValue('item', 'quantity', i);
        var unit = taxRec.getLineItemValue('item', 'units_display', i);
        var unitprice = taxRec.getLineItemValue('item', 'rate', i);
        var amount = taxRec.getLineItemValue('item', 'amount', i)
        var taxableamount = taxRec.getLineItemValue('item', 'amount', i)
        var VAT = taxRec.getLineItemValue('item', 'tax1amt', i)
        var VATrate = taxRec.getLineItemValue('item', 'taxrate1', i)
        var grossamount = taxRec.getLineItemValue('item', 'grossamt', i)

        nlapiLogExecution('DEBUG', 'itemtype', itemtype);
        nlapiLogExecution('DEBUG', 'item', item);
        var j = i + 1;

        var itemtype = taxRec.getLineItemValue('item', 'itemtype', j);

        if (itemtype == "Discount") {
            discountamount = taxRec.getLineItemValue('item', 'amount', j);

            discounttaxamount = taxRec.getLineItemValue('item', 'tax1amt', j);
            discountgrossamount = taxRec.getLineItemValue('item', 'grossamt', j);

            nlapiLogExecution('DEBUG', 'discountamount', discountamount);
            amountTotal = Number(amount) + Number(discountamount)
            nlapiLogExecution('DEBUG', 'amountTotal', amountTotal);
            taxtotalAmount = Number(VAT) + Number(discounttaxamount);
            nlapiLogExecution('DEBUG', 'taxtotalAmount', taxtotalAmount);
            grossAmount = Number(grossamount) + Number(discountgrossamount)
            TotalTaxableAmount = TotalTaxableAmount + amountTotal
            nlapiLogExecution('DEBUG', 'TotalTaxableAmount', TotalTaxableAmount);
            TaxAmountTotal = TaxAmountTotal + taxtotalAmount
            nlapiLogExecution('DEBUG', 'TaxAmountTotal', TaxAmountTotal);
            TotalGrossAmount = TotalGrossAmount + grossAmount
            nlapiLogExecution('DEBUG', 'TotalGrossAmount', TotalGrossAmount);
            discountTotal = discountTotal + Number(discountamount)

            nlapiLogExecution('DEBUG', 'discountTotal', discountTotal);
            i = j;
        } else {
            // var discountamount = taxRec.getLineItemValue('item', 'amount', j);
            // discountamount = removeNull(discountamount);
            amountTotal = Number(amount) + Number(discountamount);
            TotalTaxableAmount = TotalTaxableAmount + amountTotal;
            taxtotalAmount = Number(VAT) + Number(discounttaxamount);
            grossAmount = Number(grossamount) + Number(discountgrossamount);
            TaxAmountTotal = TaxAmountTotal + taxtotalAmount;
            discountTotal = discountTotal + Number(discountamount);
            TotalGrossAmount = TotalGrossAmount + grossAmount;
        }


        template += '                                            <tr>';
        template += '                                                <td align="center" class="td_top_line td_right_line">';
        template += '                                                    <p align="center">';
        template += '                                                        <#assign SrNo=SrNo + 1/>${SrNo}</p></td>';
        template += '<td align="center" class="td_top_line td_right_line">';
        template += '                                                            <p class="alignL">' + relaceCharector(itemNo) + '</p>';
        template += '                                                        </td>';
        if (barcode != null) {

            template += '                                                         <td align="center" class="td_top_line td_right_line">';
            template += '                                                            <p class="alignL">' + barcode + '</p>';
            template += '                                                        </td>';
        } else {
            template += '                                                         <td align="center" class="td_top_line td_right_line">';
            template += '                                                            <p class="alignC"></p>';
            template += '                                                        </td>';

        }
        if (goodsanddelivery != null) {
            template += '                                                         <td align="left" class="td_top_line td_right_line">';
            template += '                                                            <p class="alignL">' + relaceCharector(goodsanddelivery) + '</p>';
            template += '                                                        </td>';
        } else {
            template += '                                                         <td align="center" class="td_top_line td_right_line">';
            template += '                                                            <p class="alignC"></p>';
            template += '                                                        </td>';

        }
        template += '                                                        <td align="center" class="td_top_line td_right_line">';
        template += '                                                            <p class="alignC">' + quantity + '</p>';
        template += '                                                        </td>';
        if (unit != null) {

            template += '                                                         <td align="center" class="td_top_line td_right_line">';
            template += '                                                            <p class="alignC">' + unit + '</p>';
            template += '                                                        </td>';
        } else {
            template += '                                                         <td align="center" class="td_top_line td_right_line">';
            template += '                                                            <p class="alignC"></p>';
            template += '                                                        </td>';

        }
        template += '';
        template += '                                                       ';
        if (unitprice != null) {

            template += '                                                        <td align="right" class="td_top_line td_right_line">';
            template += '                                                            <p class="alignR">' + unitprice + '</p>';
            template += '                                                        </td>';
            template += '                                                       ';
        } else {
            template += '                                                         <td align="center" class="td_top_line td_right_line">';
            template += '                                                            <p class="alignC"></p>';
            template += '                                                        </td>';
        }
        template += '                                                        <td align="right" class="td_top_line td_right_line">';
        template += '                                                            <p class="alignR">' + amount + '</p>';
        template += '                                                            </td>';
        if (discountamount != null) {

            template += '                                                             <td align="right" class="td_top_line td_right_line">';
            template += '                                                            <p class="alignR">' + discountamount + '</p>';
            template += '                                                        </td>';
        } else {
            template += '                                                         <td align="center" class="td_top_line td_right_line">';
            template += '                                                            <p class="alignC"></p>';
            template += '                                                        </td>';
        }
        template += '                                                        <td align="right" class="td_top_line td_right_line">';
        template += '                                                                            <p class="alignR">' + amountTotal.toFixed(2) + '</p>';
        template += '                                                                        </td>';
        template += '                                                                          <td align="right" class="td_top_line td_right_line">';
        template += '                                                            <p class="alignR">' + taxtotalAmount.toFixed(2) + '</p>';
        template += '                                                        </td>';
        template += '                                                       <td align="right" class="td_top_line td_right_line">';
        template += '                                                                            <p class="alignR">' + VATrate + '</p>';
        template += '                                                                        </td>';
        template += '                                                                         <!-- <td align="center" class="td_top_line td_right_line">';
        template += '                                                                            <p class="alignC"></p>';
        template += '                                                                        </td> -->';
        template += '';
        template += '                                                        ';
        template += '                                                        ';
        template += '                                                        <td align="right" class="td_top_line ">';
        template += '                                                         <p class="alignR">';
        template += '                                                                                <#assign totalgrossamount=totalgrossamount + item.grossamt/>' + grossAmount.toFixed(2)  + '</p>';
        // template+='                                                                                 <#assign totalamount=totalamount + item.amount/>';
        // template+='                                                                                    <#assign totaltaxamount=totaltaxamount + item.tax1amt/>';
        template += '';
        template += '                                                    ';
        template += '</td>';
        template += '</tr>';

    }
    //template+='</#if>';
    template += ' ';
    //template+='</#list>';
    template += '';
    template += '';
    template += '<tr>';
    template += '<td align="right" colspan="8" class="td_right_line  td_top_line" style="font-weight: bold;">TOTAL</td>';
    template += '                                                                               ';
    template += '                                                                                <td align="right" class="td_top_line td_right_line ">';
    template += '                                                                                    <p class="alignR">';
    template += '                                                                                        <b>' + discountTotal + '</b>';
    template += '                                                                                    </p>';
    template += '                                                                                </td>';


    template += '                                                                                <td align="right" class="td_top_line td_right_line ">';
    template += '                                                                                    <p class="alignR">';
    template += '                                                                                        <b>' + TotalTaxableAmount.toFixed(2) + '</b>';
    template += '                                                                                    </p>';
    template += '                                                                                </td>';
    template += '                                                                                <td align="right" class="td_top_line td_right_line ">';
    template += '                                                                                    <p class="alignR">';
    template += '                                                                                        <b>' + TaxAmountTotal.toFixed(2) + '</b>';
    template += '                                                                                    </p>';
    template += '                                                                                </td>';
    template += '                                                                                <td align="right" class="td_top_line td_right_line ">';
    template += '                                                                                    <p class="alignR">';
    template += '                                                                                        <b></b>';
    template += '                                                                                    </p>';
    template += '                                                                                </td>';
    template += '                                                                                ';
    template += '                                                                                ';
    template += '                                                                               ';
    template += '                                                                                ';
    template += '                                                                                <td align="right" class="td_top_line ">';
    template += '                                                                                    <p class="alignR">';
    template += '                                                                                        <b>' + TotalGrossAmount.toFixed(2) + '</b>';
    template += '                                                                                    </p>';
    template += '                                                                                </td>';
    template += '                                                                                ';
    template += '                                                                            </tr>';
    template += '                                                                            <!-- <tr>';
    template += '                                                                                <td class="td_top_line " colspan="35">';
    template += '                                                                                    <p class="alignL">';
    template += '                                                                                        <b>Amount in Words&nbsp;:&nbsp;${record.currencysymbol}&nbsp;${record.custbody_total_amount_in_words}</b>';
    template += '                                                                                    </p>';
    template += '                                                                                </td>';
    template += '                                                                            </tr> -->';
    template += '                                                                           ';
    template += '                                                                        </table>';
    template += '                                                                <!--      <table style="width: 100%;margin-top:15px;">';
    template += '                                                                             <tr>';
    template += '                                                                                 <td><b>Declaration:</b></td>';
    template += '                                                                        </tr>';
    template += '                                                                        <tr>';
    template += '                                                                                <td>We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct" to be';
    template += 'available in all invoices. Applicable to all the three operational subsidiaries</td>';
    template += '                                                                </tr>';
    template += '                                                                        </table>-->';
    template += '                                                                  </#if>';
    template += '';
    template += '                                                                    <table style="width:100%;margin-top:10px;">';
    template += '';
    template += '                                                                    <tr>';
    template += '';
    template += '        <td align="left" style="width:25%;"><b>Terms and Conditions </b></td>';
    template += '';
    template += '        <td align="left" style="width:2%;">:</td>';
    template += '';
    template += '        <td align="left" style="width:73%;font-size:10px;">1.GOODS ARE RECEIVED IN GOOD CONDITION<br/>2.ANY RETURN OF GOODS AFTER 24 HOURS IS SUBJECT TO MANAGEMENT APPROVAL<br/>3.NO CORRECTION/ALTERNATIONS ON TAX INVOICE<br/>4.PAYMENT SHOULD BE MADE BY A/C PAYEE CHEQUE ONLY IN FAVOUR OF OUR COMPANY<br/>5.ANY DISPUTE WILL BE SETTLED AS PER UAE LAW<br/>6.EOE</td>';
    template += '';
    template += '                                                                    </tr>';
    template += '';
    template += '                                                                    </table>';
    template += '';
    // template+='                                                                    </#if>                                                        ';
    // template+='';
    template += '<#if record.custbody_bank_account?has_content>';
    template += '<table style="width: 100%;margin-top:0px;">';
    template += '';
    template += '      <tr>';
    template += '';
    template += '        <th align="left" colspan="2" style="font-size:9pt; padding:0px;"><b>Bank Details</b></th>';
    template += '';
    template += '    </tr>';
    template += '';
    template += '    <tr>';
    template += '';
    template += '        <td align="left" colspan="2" style= "padding:0px;">Bank Name &nbsp;:&nbsp;${record.custbody_bank_account.custrecord_acc_bankname}</td>';
    template += '';
    template += '    </tr>';
    template += '';
    template += '    <tr>';
    template += '';
    template += '        <td align="left" colspan="2" style= "padding:0px;">Account Name &nbsp;:&nbsp;${record.custbody_bank_account.custrecord_account_name}</td>';
    template += '';
    template += '    </tr>';
    template += '';
    template += '    <tr>';
    template += '';
    template += '        <td align="left" colspan="2" style= "padding:0px;">Account Number &nbsp;:&nbsp;${record.custbody_bank_account.custrecord_ac_number}</td>';
    template += '';
    template += '    </tr>';
    template += '';
    template += '    <tr>';
    template += '';
    template += '        <td align="left" colspan="2" style= "padding:0px;">IBAN &nbsp;:&nbsp;${record.custbody_bank_account.custrecord_acc_iban}</td>';
    template += '';
    template += '    </tr>';
    template += '';
    template += '    <tr>';
    template += '';
    template += '        <td align="left" colspan="2" style= "padding:0px;">SWIFT &nbsp;:&nbsp;${record.custbody_bank_account.custrecord_acc_swift}</td>';
    template += '';
    template += '    </tr>';
    template += '';
    template += '</table>';
    template += '</#if>';
    template += '';
    template += '<table style="width:100%;">';
    template += '';
    template += ' <tr style="width:100%;padding-top: 50px;">';
    template += '<td align="left" style="width:20%;">';
    template += '';
    template += '  <table>';
    template += '';
    template += ' ';
    template += '';
    // template += '                                                                                                   <tr>';
    // template += '';
    // template += '                                                                                                        <td align="center" >${record.custbody_nalg_created_by}';
    // template += '';
    // template += '                                                                                                          <#if record.custbody_nalg_created_by.title?has_content>${record.custbody_nalg_created_by.title}';
    // template += '';
    // template += '                                                                                                         <#else>  ';
    // template += '';
    // template += '                                                                                                            &nbsp;';
    // template += '';
    // template += '                                                                                                        </#if>';
    // template += '';
    // template += '                                                                                                        </td>';
    // template += '';
    // template += '                                                                                                    </tr>';
    template += '';
    template += '                                                                                                     <tr>';
    template += '';
    template += '                                                                                                        <td align="center" style="margin-top:-13px;">____________</td>';
    template += '';
    template += '                                                                                                    </tr>';
    template += '';
    template += '';
    template += '';
    template += '                                                                                                    <tr>';
    template += '';
    template += '                                                                                                        <td align="center">';
    template += '';
    template += '                                                                                                            <b>Created By</b>';
    template += '';
    template += '                                                                                                        </td>';
    template += '';
    template += '                                                                                                    </tr>';
    template += '';
    template += '                                                                                                </table>';
    template += '';
    template += '                                                                                            </td>';
    template += '';
    template += '<td align="center">';
    template += '';
    template += '                                                                                                <table align="center">';
    template += '';
    // template += '                                                                                                <tr>';
    // template += '';
    // template += '                                                                                                        <td align="center">';
    // template += '';
    // template += ' ';
    // template += '';
    // template += '                                                                                                        <#if record.custbody_kpi_first_approve_reject?has_content>${record.custbody_kpi_first_approve_reject}';
    // template += '';
    // template += '                                                                                                         <#else>  ';
    // template += '';
    // template += '                                                                                                            &nbsp;';
    // template += '';
    // template += '                                                                                                        </#if>';
    // template += '';
    // template += '';
    // template += '';
    // template += '';
    // template += '                                                                                                        </td>';
    // template += '';
    // template += '                                                                                                    </tr>';
    template += '';
    template += ' ';
    template += '';
    template += '                                                                                                    <tr>';
    template += '';
    template += '                                                                                                        <td align="center" style="margin-top:-13px;">_______________</td>';
    template += '';
    template += '                                                                                                    </tr>';
    template += '';
    template += '                                                               ';
    template += '';
    template += '';
    template += '';
    template += '                                                                                                    <tr>';
    template += '';
    template += '                                                                                                        <td align="center">';
    template += '';
    template += '                                                                                                            <b>Checked by</b>';
    template += '';
    template += '                                                                                                        </td>';
    template += '';
    template += '                                                                                                    </tr>';
    template += '';
    template += '                                                                                                </table>';
    template += '';
    template += '                                                                                            </td>';
    template += ' <td align="center">';
    template += '';
    template += '                                                                                                <table align="center">';
    template += '';
    // template += '                                                                                                <tr>';
    // template += '';
    // template += '                                                                                                        <td align="center">';
    // template += '';
    // template += ' ';
    // template += '';
    // template += '                                                                                                        <#if record.custbody_kpi_second_approve_reject?has_content>${record.custbody_kpi_second_approve_reject}';
    // template += '';
    // template += '                                                                                                         <#else>  ';
    // template += '';
    // template += '                                                                                                            &nbsp;';
    // template += '';
    // template += '                                                                                                        </#if>';
    // template += '';
    // template += '';
    // template += '';
    // template += '';
    // template += '                                                                                                        </td>';
    // template += '';
    // template += '                                                                                                    </tr>';
    template += '';
    template += ' ';
    template += '';
    template += '                                                                                                    <tr>';
    template += '';
    template += '                                                                                                        <td align="center" style="margin-top:-13px;">_______________</td>';
    template += '';
    template += '                                                                                                    </tr>';
    template += '';
    template += '                                                               ';
    template += '';
    template += '';
    template += '';
    template += '                                                                                                    <tr>';
    template += '';
    template += '                                                                                                        <td align="center">';
    template += '';
    template += '                                                                                                            <b>Approved By</b>';
    template += '';
    template += '                                                                                                        </td>';
    template += '';
    template += '                                                                                                    </tr>';
    template += '';
    template += '                                                                                                </table>';
    template += '';
    template += '                                                                                            </td>     ';
    template += ' <td align="right">';
    template += '';
    template += '                                                                                 <table align="center">';
    template += '';
    // template += '                                                                                 <tr>';
    // template += '';
    // template += '                                                                                 </tr>';
    template += '';
    template += '                                                                                    <tr>';
    template += '';
    template += '                                                                                     <td align="center" style="margin-top:-13px;">_______________</td>';
    template += '';
    template += '';
    template += '';
    template += '                                                                                        <!-- <td>___________________</td> -->';
    template += '';
    template += '                                                                                    </tr>';
    template += '';
    template += '';
    template += '';
    template += '                                                                                    <tr>';
    template += '';
    template += '                                                                                        <td align="center">';
    template += '';
    template += '                                                                                            <b>Received By</b>';
    template += '';
    template += '                                                                                        </td>';
    template += '';
    template += '                                                                                    </tr>';
    template += '';
    template += '                                                                                </table>';
    template += '';
    template += '                                                                            </td>';
    template += '';
    template += '                                                                             </tr>';
    template += '';
    template += '                                                                    </table>                                                                                                                                                                                 ';
    template += '<!--<table style="width: 100%;margin-top:20px;">';
    template += '    <tr>';
    template += '        <td align="left" width="25%">_____________________</td>';
    template += '        <td align="left" width="50%"></td>';
    template += '        <td  width="25%" align="center" style="margin-right:10px;">_____________________';
    template += '            </td>';
    template += '    </tr>';
    template += '     <tr>';
    template += '        <td align="left" width="20%"></td>';
    template += '        <td align="left" width="60%"></td>';
    template += '        <td align="center" style="margin-right:10px;">';
    template += '            <p style="margin-right:10px;padding-left:13px;font-weight:bold"><b>Received By</b></p></td>';
    template += '    </tr>';
    template += '      <tr>';
    template += '        <td align="left" width="20%"><b>Prepared by</b></td>';
    template += '        <td align="left" width="60%"></td>';
    template += '        <td align="center" style="margin-right:10px;">';
    template += '            <p style="margin-right:10px;padding-left:13px;font-weight:bold"></p></td>';
    template += '    </tr>';
    template += '</table>-->';
    template += '</body>';
    template += '</pdf>';

    renderer.setTemplate(template);
    renderer.addRecord('record', taxRec);
    var xml = renderer.renderToString();
    var file = nlapiXMLToPDF(xml);
    response.setContentType('PDF', 'Check' + taxRec.getFieldValue("id") + '.pdf', 'inline');
    response.write(file.getValue());
}

function removeNull(string) {
    if (string == null) {
        string = "";
    } else {
        string = string;
    }
    return string;
}

function relaceSlashN(charVal) {

    if (charVal) {

        return charVal.replace("\n", "<br />", "g");

    } else {

        return "";

    }

}

function relaceCharector(charVal) {
    if (charVal) {
        return charVal.replace(/&/g, "&amp;");
    } else {
        return "";
    }
}

function getdate(createdfrm) {

    var filter = new Array();
    var internalid = "";
    filter[0] = new nlobjSearchFilter('type', null, 'anyof', "ItemShip");
    filter[1] = new nlobjSearchFilter('createdfrom', null, 'anyof', createdfrm);
    filter[2] = new nlobjSearchFilter('mainline', null, 'is', "T");
    var col = new Array();
    col[0] = new nlobjSearchColumn("internalid", null, null);
    var itemDetails = nlapiSearchRecord('itemfulfillment', null, filter, col);
    nlapiLogExecution("DEBUG", itemDetails.length);

    if (itemDetails != null) {
        for (var i = 0; i < itemDetails.length; i++) {
            internalid = itemDetails[i].getValue("internalid");
            nlapiLogExecution("DEBUG", "internalid", internalid);
        }
    }

    return internalid;

}

function relaceCharector(charVal) {
    return charVal.replace(/&/g, "&amp;");
}