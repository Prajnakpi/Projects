function createPruchaseOrderAction(request, response) {
    nlapiLogExecution('DEBUG', 'getting inside');
    var recordID = request.getParameter('recordID');
    nlapiLogExecution('DEBUG', 'recordID', recordID);

    var purchase_record = nlapiLoadRecord("purchaseorder",recordID);
    var payment = purchase_record.getFieldValue('custbody_prepayment_obligation');

    var count = purchase_record.getLineItemCount('item');


    var location = purchase_record.getFieldValue('location');
    nlapiLogExecution('DEBUG', 'location', location);

    var vendor = purchase_record.getFieldValue('entity');

    nlapiLogExecution('DEBUG', 'vendor', vendor);


    var subsidiary = purchase_record.getFieldValue('subsidiary');
    var sub = nlapiLoadRecord("subsidiary", subsidiary);
    var loc = nlapiLoadRecord("location", location);
    nlapiLogExecution('DEBUG', 'loc', loc);

    var mainAdd=loc.getFieldValue('mainaddress_text');

    var entity = nlapiLoadRecord("vendor", vendor);
     var entityAdd =entity.getFieldValue('defaultaddress');
     var entityId =entity.getFieldValue('entityid');

    var renderer = nlapiCreateTemplateRenderer();
    var template = "";
template+='<?xml version="1.0"?><!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">';
template+='<pdf>';
template+='<head>';
template+='<link name="NotoSans" type="font" subtype="truetype" src="${nsfont.NotoSans_Regular}" src-bold="${nsfont.NotoSans_Bold}" src-italic="${nsfont.NotoSans_Italic}" src-bolditalic="${nsfont.NotoSans_BoldItalic}" bytes="2" />';
template+='<#if .locale == "zh_CN">';
template+='<link name="NotoSansCJKsc" type="font" subtype="opentype" src="${nsfont.NotoSansCJKsc_Regular}" src-bold="${nsfont.NotoSansCJKsc_Bold}" bytes="2" />';
template+='<#elseif .locale == "zh_TW">';
template+='<link name="NotoSansCJKtc" type="font" subtype="opentype" src="${nsfont.NotoSansCJKtc_Regular}" src-bold="${nsfont.NotoSansCJKtc_Bold}" bytes="2" />';
template+='<#elseif .locale == "ja_JP">';
template+='<link name="NotoSansCJKjp" type="font" subtype="opentype" src="${nsfont.NotoSansCJKjp_Regular}" src-bold="${nsfont.NotoSansCJKjp_Bold}" bytes="2" />';
template+='<#elseif .locale == "ko_KR">';
template+='<link name="NotoSansCJKkr" type="font" subtype="opentype" src="${nsfont.NotoSansCJKkr_Regular}" src-bold="${nsfont.NotoSansCJKkr_Bold}" bytes="2" />';
template+='<#elseif .locale == "th_TH">';
template+='<link name="NotoSansThai" type="font" subtype="opentype" src="${nsfont.NotoSansThai_Regular}" src-bold="${nsfont.NotoSansThai_Bold}" bytes="2" />';
template+='</#if>';
template+='<macrolist>';
template+='<macro id="nlheader">';
template+='';
template+='';
template+=' ';
template+='   ';
template+='';
template+='   <table style="width: 100%;margin-top:5px;">';
template+='   <tr>';
            if (sub != "") {
                var address = sub.getFieldValue('mainaddress_text');
                var country = sub.getFieldValue('country');
                var taxno = sub.getFieldValue('federalidnumber');
                +
          
template+='            <td align="left" width="60%"><p align="left" width="60%"><b>Nasser Abdullah LootahGroup(LLC)</b> <br/>'+relaceSlashN(address)+'</p></td>  ';

if(subsidiary==3){
template+='            <td align="right" valign="top" width="33%">';
template+='                <img src="${record.custbody_subsidiary_logo.imageUrl}" style="width:200px;height:150px;margin:50px;position:absolute;top:-10px;padding-top:-130px;padding-left:-60px;" />';
template+='            </td>        '
}else if(subsidiary==4){  
template+='            <td align="right" valign="top" width="33%">';
template+='                <img src="${record.custbody_subsidiary_logo.imageUrl}" style="width:150px;height:150px;margin:100px;position:absolute;top:-10px;padding-top:-130px;padding-left:-110px;" />';
template+='            </td>        ';
}             
template+='    </tr>';
template+='    ';

template+='   <tr>';
template+='        <td width="60%"  align="left"></td>';
}


template+='        <td width="40%">';
template+='            <table style="width:100%;padding-top:10px;">';
template+='                 <tr>';
template+='                    <td></td>';
template+='                    <td></td>';
template+='                </tr>';
template+='                <tr>';
template+='                    <td width="50%"><p align="left; padding-top:-95px;">Telephone</p></td>';
template+='                    <td width="50%"></td>';
template+='                </tr>';
template+='                <tr>';
template+='                    <td><p align="left">Fax</p></td>';
template+='                    <td></td>';
template+='                </tr>';
template+='                 <tr>';
template+='                    <td><p align="left">Giro</p></td>';
template+='                    <td></td>';
template+='                </tr>';
template+='               ';
template+='';
template+='                <tr>';
template+='                    <td>Tax Registration No</td>';
template+='                    <td>'+taxno+'</td>';
template+='                </tr>  ';
template+='            </table>';
template+='        </td>';
template+='    </tr> ';
template+='                <tr>';
template+='                    <td><b>'+entityId+'</b></td>';
template+='                </tr>  ';

template+='    <tr>   ';
template+='        <td>'+relaceSlashN(entityAdd)+'<BR></BR>Tax Registration Number  &nbsp;${record.entity.vatregnumber}</td>';
template+='        <td>';
template+='             <table style="width:100%;padding-top:-10px;">';
template+='                <tr>';
template+='                   <td colspan="2"><p align="left"><h2>Purchase Order</h2></p></td>';
template+='                </tr>';
template+='                <tr>';
template+='                   <td><p align="left">Page</p></td>';
template+='                         <td> <pagenumber/>of <totalpages/> &nbsp;</td>';
template+='                </tr>';
template+='                 <tr>';
template+='                   <td><p align="left">Number</p></td>';
template+='                   <td align="left">${record.tranid}</td>';
template+='                </tr>';
template+='                 <tr>';
template+='                   <td><p align="left">Date</p></td>';
template+='                   <td align="left">${record.trandate?string("dd/MM/YYYY")}</td>';
template+='                </tr>';
if(payment=='T'){
template+='                 <tr>';
template+='                   <td><p align="left">PrePayment Obligation</p></td>';
template+='                   <td align="left">Yes</td>';
template+='                </tr>';
}else{
template+='                 <tr>';
template+='                   <td><p align="left">PrePayment Obligation</p></td>';
template+='                   <td align="left">No</td>';
template+='                </tr>';
}

template+='                <tr>';
template+='                    <td align="left">Delivery terms</td>';
template+='                     <td align="left">${record.incoterm}</td>';
template+='                </tr>';
template+='';
template+='                 <tr>';
template+='                    <td colspan="2"><p align="left">Delivery address<br></br>'+mainAdd+'</p></td>';
template+='                </tr>';
template+='';
template+='            </table>';
template+='        </td>';
template+='    </tr>';
template+='</table>';
template+='';
template+='</macro>';
template+='<#if (record.status == "Pending Approval") >';
template+='                            <macro id="watermark">';
template+='<div rotate="-45" style="margin-top:400px;margin-left:50px;margin-right:50px;z-index:999;" font-size="20pt" color="#C0C0C0">';
template+='<p>PENDING FOR APPROVAL</p>';
template+='</div>';
template+='</macro>';
template+='</#if>';
template+='';
template+='                            <macro id="nlfooter">';
template+='                                <table style="width: 100%;">';
template+='                                    <tr>';
template+='                                        <td align="left" style="width:60%;">';
template+='                                            <p class="alignL" style="font-size:11px;font-style:italics;color:#A9A9A9">*This is a system-generated document. No signature is required.</p>';
template+='                                        </td>';
template+='';
template+='                                        <td style="margin-left:150px;">&nbsp;( Page <pagenumber/>of <totalpages/>)&nbsp;</td>';
template+='                                </tr>';
template+='';
template+='';
template+='';
template+='                            </table>';
template+='                        </macro>';
template+='                    </macrolist>';
template+='                    <style type="text/css">span, table {';
template+='                        <#if .locale=="zh_CN">font-family: stsong, sans-serif;';
template+='                            <#elseif .locale=="zh_TW">font-family: msung, sans-serif;';
template+='                                <#elseif .locale=="ja_JP">font-family: heiseimin, sans-serif;';
template+='                                    <#elseif .locale=="ko_KR">font-family: hygothic, sans-serif;';
template+='                                        <#elseif .locale=="ru_RU">font-family: verdana;';
template+='                                            <#else>font-family: sans-serif;';
template+='                                            </#if>font-size: 9pt;';
template+='		table-layout: fixed;';
template+='		}';
template+='		th {';
template+='		font-weight: bold;';
template+='		font-size: 8.5pt;';
template+='		padding-top: 2px;';
template+='		vertical-align: middle;';
template+='		/*padding: 3px 6px 10px;*/';
template+='		/*background-color: #e3e3e3;';
template+='		color: #333333;*/';
template+='		}';
template+='		b {';
template+='		font-weight: bold;';
template+='		color: #333333;';
template+='		}';
template+='		table.header td {';
template+='		padding: 0;';
template+='		font-size: 10pt;';
template+='		}';
template+='		table.footer td {';
template+='		padding: 0;';
template+='		font-size: 8pt;';
template+='		}';
template+='		#itemtable th p{';
template+='		vertical-align: text-top !important;';
template+='		text-align: center !important;';
template+='		}';
template+='		#itemtable{';
template+='		font-size: 8.5pt !important;';
template+='		border: 0.5px solid #000000';
template+='		}';
template+='		table.total {';
template+='		page-break-inside: avoid;';
template+='		}';
template+='		tr.totalrow {';
template+='		background-color: #e3e3e3;';
template+='		line-height: 200%;';
template+='		}';
template+='		td.totalboxtop {';
template+='		font-size: 12pt;';
template+='		background-color: #e3e3e3;';
template+='		}';
template+='		span.title {';
template+='		font-size: 28pt;';
template+='		}';
template+='		.smallTitle {';
template+='		font-size: 9pt;';
template+='		}';
template+='		span.number {';
template+='		font-size: 16pt;';
template+='		text-align:center;';
template+='		}';
template+='		span.itemname {';
template+='		font-weight: bold;';
template+='		line-height: 150%;';
template+='		}';
template+='		hr {';
template+='		width: 100%;';
template+='		color: #d3d3d3;';
template+='		background-color: #d3d3d3;';
template+='		height: 1px;';
template+='		}';
template+='		table.smalltext tr td {';
template+='		font-size: 8pt;';
template+='		}';
template+='		/*table.itemtable th{';
template+='		border-bottom: 10px #ffc966;';
template+='		border-color: yellow;';
template+='		}*/';
template+='		p.alignR {';
template+='		text-align: right !important;';
template+='		}';
template+='		p.alignL {';
template+='		text-align: left !important;';
template+='		}';
template+='		p.alignC {';
template+='		text-align: center !important;';
template+='		}';
template+='		.td_right_line{';
template+='		/*border-right: 0.5px solid #f4f4f4;*/';
template+='		border-right :0.5px solid #000000;';
template+='		}';
template+='		.td_bottom_line{';
template+='		border-bottom: 0.5px solid #000000;';
template+='		}';
template+='		.td_top_line{';
template+='		/*border-top :0.5px solid #f4f4f4;*/';
template+='		border-top :0.5px solid #000000;';
template+='		}';
template+='		.title{';
template+='		font-weight: bold;';
template+='		align:center!important;';
template+='		font-size:16pt;';
template+='		}';
template+='		.footer-img{';
template+='		/*width: 100%;';
template+='		height: 20%;*/';
template+='		top: 0px;';
template+='		right: 0px;';
template+='		left: 0px;';
template+='		bottom: 0px;';
template+='		}';
template+='		.footer{';
template+='		margin-left:-45px; margin-right:-60px; margin-bottom:-115px;';
template+='		}';
template+='		.td_left_line{';
template+='		/*border-right: 0.5px solid #f4f4f4;*/';
template+='		border-left :0.5px solid #000000;';
template+='		}';
template+='		.maintbl{';
template+='		border:0.5px solid #000000;';
template+='		}';
template+='		.footertbl{';
template+='		border:0.5px solid #000000;';
template+='		border-top: 0px !important;';
template+='		}';
template+='		.footertbl2{';
template+='		';
template+='		/*border:0.5px solid #000000;*/';
template+='		border-left: 0.5px solid #000000;';
template+='		border-right: 0.5px solid #000000;';
template+='		border-top: 0.25px !important;';
template+='		}';
template+='		.pad_left{';
template+='		padding-left: 5px!important;';
template+='		}';
template+='		th,td{';
template+='		padding:4px;';
template+='		}';
template+='		                                                                                                                                                                                                                            <!--  .td_top_line td{';
template+='		padding-left: 5px!important;';
template+='		} -->';
template+='		td img {';
template+='		max-width:100%;';
template+='		';
template+='		}';
template+='                                        </style>';
template+='                                    </head>';
template+='                                    <body header="nlheader" background-macro="watermark" header-height="45%" footer="nlfooter" footer-height="4%" padding="0.25in 0.5in 0.25in 0.5in" size="A4">';
// template+=' <#assign TotalpurchaseAmount=0>';
var TotalpurchaseAmount=0;
var taxTotal=0;
var grossTotal=0
var TaxTotalAmount=0;
var grossTotalAmount=0;
var TaxableAmount=0;
template+=' <#if record.item?has_content>';
template+='<#assign SrNo=0>';
template+='<table style="width: 100%;margin-top:10px;" width="100%">                                                <!-- start items -->';
template+='        <#assign SrNo=0><#assign qty_to_ord = 0 ><#list record.item as item><#if item_index==0><#assign totalamount= 0>';
template+='                                                <#assign totalsubtotalamount= 0><#assign totaltaxamount= 0><#assign totalgrossamount= 0>';

template+='                                            <thead>';
template+='                                                <tr style="padding-bottom: 0px;">';
template+='                                                    <th align="left" width="3%" class="td_bottom_line">';
template+='                                                        <p align="left"><b>Sr<br/>No</b></p>';
template+='                                                    </th>';
// template+='                                                     <th align="left" class="td_bottom_line" width="5%">';
// template+='                                                        <p class="alignL">Line No</p>';
// template+='                                                    </th>';
template+='                                                     <th align="left" class="td_bottom_line" width="8%">';
template+='                                                        <p class="alignL">Item No</p>';
template+='                                                    </th>';
template+='                                                    <th align="left" class="td_bottom_line" width="15%">';
template+='                                                        <p class="alignL">Description</p>';
template+='                                                    </th>';
template+='                                                    <th align="left" class="td_bottom_line" width="9%">';
template+='                                                        <p class="alignL">Delivery</p>';
template+='                                                    </th>';
template+='                                                    <th align="left" class="td_bottom_line" width="5%">';
template+='                                                        <p class="alignL">Qty</p>';
template+='                                                    </th>';
template+='                                                    <th align="left" class="td_bottom_line" width="5%">';
template+='                                                        <p class="alignL">Unit</p>';
template+='                                                    </th>';

template+='                                                    <th align="left" class="td_bottom_line" width="8%">';
template+='                                                        <p class="alignL">Unit Price</p>';
template+='                                                    </th>';
template+='                                                   ';
template+='                                                    <th align="left" class="td_bottom_line" width="6%">';
template+='                                                        <p class="alignL">Amt</p>';
template+='                                                    </th>';

template+='                                                    <th align="center" class="td_bottom_line" width="10%">';
template+='                                                        <p class="alignC">Dis</p>';
template+='                                                    </th>';
template+='                                                    ';
template+='                                                    <th align="center" class="td_bottom_line" width="7%">';
template+='                                                        <p class="alignC"> Dis%</p>';
template+='                                                    </th>';
template+='                                                   ';
template+='                                                    <th align="left" class="td_bottom_line" width="8%">';
template+='                                                        <p class="alignL"> Taxable<br/>Amt</p>';
template+='                                                    </th>';




template+='                                                    <th align="left" class="td_bottom_line" width="8%">';
template+='                                                        <p class="alignL">VAT</p>';
template+='                                                    </th>';
template+='                                                     <th align="left" class="td_bottom_line" width="8%">';
template+='                                                       <p class="alignL">Gross<br/>Amt</p>';
template+='                                                    </th>';
template+='                                                 ';
template+='                                                </tr>';
template+='                                            </thead>';
template+='                                        </#if>';
template+='</#list>';
//template+='                                        <#if item.itemtype!="Discount" && item.itemtype!="Subtotal">';
// 1. Looping through the items

// 2. Check the current line's(i) item type - Bring the field from Item if it is not available in the load record

// 3. Check next line(i+1) if it exists i.e., i+1 > count then check the item type of (i+1)

// 4. If current line is not Discount then add or print the line details

// 5. Check next line (i+1) while looping for current line(i) item type if it is equal to Discount then take the amount and percentage and adjust the current line (i)
nlapiLogExecution('DEBUG', 'count', count);

var dis=0;
for (var i = 1; i <= count; i++) {
    var item = purchase_record.getLineItemValue('item', 'item', i);

    var itemNo = nlapiLookupField('item', item, 'itemid');
    nlapiLogExecution('DEBUG', 'Items1111', itemNo);

// var itemId = purchase_record.getLineItemValue('item', 'item', i);
// var item = nlapiLoadRecord("inventoryitem", itemId);
// var itemName = item.getFieldValue('itemidorig');

    var itemtype = purchase_record.getLineItemValue('item', 'itemtype', i);
    var item = purchase_record.getLineItemValue('item', 'item', i);
    // var itemID = purchase_record.getLineItemValue('item', 'itemidorig', i);

    var line = purchase_record.getLineItemValue('item', '', i)
    var description = purchase_record.getLineItemValue('item', 'description', i);
    var delivery = purchase_record.getLineItemValue('item', 'expectedreceiptdate', i)
    var quantity = purchase_record.getLineItemValue('item', 'quantity', i);
    var unit = purchase_record.getLineItemValue('item', 'units_display', i);
    var unitprice = purchase_record.getLineItemValue('item', 'rate', i);
    var amountTotal = purchase_record.getLineItemValue('item', 'amount', i)
    nlapiLogExecution('DEBUG', 'amountTotal', amountTotal);

    var VAT = purchase_record.getLineItemValue('item', 'tax1amt', i)
    var amount = purchase_record.getLineItemValue('item', 'grossamt', i)
   

    nlapiLogExecution('DEBUG', 'itemtype', itemtype);
    nlapiLogExecution('DEBUG', 'item', item);
    
    nlapiLogExecution('DEBUG', 'discount', discount);
    nlapiLogExecution('DEBUG', 'discountperc', discountperc);
var j=i+1;
nlapiLogExecution('DEBUG', 'j', j);
    if(itemtype!="Discount"){
        var discountperc=purchase_record.getLineItemValue('item', 'rate', j);
         discountperc=parseFloat(discountperc);
         discountperc=Math.abs(discountperc);

        nlapiLogExecution('DEBUG', 'discountperc', discountperc);

        var discount=purchase_record.getLineItemValue('item', 'amount', j);
        // discount=parseFloat(discount);
        // discount=Math.abs(discount);
        var VatDis=purchase_record.getLineItemValue('item', 'tax1amt', j);
        // VatDis=parseFloat(VatDis);
        // VatDis=Math.abs(VatDis);
        var GrossDis=purchase_record.getLineItemValue('item', 'grossamt', j);

 dis=Number(dis)+Number(discount)      
 TotalpurchaseAmount=TotalpurchaseAmount+ Number(amountTotal)
   TaxableAmount=Number(amountTotal)+Number(discount)
   nlapiLogExecution('DEBUG', 'TaxableAmount', TaxableAmount);

 nlapiLogExecution('DEBUG', 'TotalpurchaseAmount', TotalpurchaseAmount);
 taxTotal=Number(VAT)+Number(VatDis)
 nlapiLogExecution('DEBUG', 'taxTotal', taxTotal);
 TaxTotalAmount=TaxTotalAmount+ taxTotal   
 nlapiLogExecution('DEBUG', 'TaxTotalAmount', TaxTotalAmount);
 grossTotal=Number(amount)+Number(GrossDis)
 nlapiLogExecution('DEBUG', 'grossTotal1111', grossTotal);
 grossTotalAmount=grossTotalAmount+ grossTotal   
 nlapiLogExecution('DEBUG', 'grossTotalAmount', grossTotalAmount);

        nlapiLogExecution('DEBUG', 'discount', discount);
        nlapiLogExecution('DEBUG', 'discountperc', discountperc);
         

template+='                                                    <tr>';
template+='                                                        <td align="center" class="">';
template+='                                                            <p align="center"><#assign SrNo=SrNo + 1/>${SrNo}</p>';
template+='                                                        </td>';
// template+='                                                        <td align="left" class="">';
// template+='                                                            <p class="alignL"></p>';
// template+='                                                        </td>';
template+='                                                         <td align="center" class="">';
template+='                                                            <p class="alignC">'+itemNo+'</p>';
template+='                                                        </td>';
template+='                                                    ';
// template+='                                                         <td align="center" class="">';
// template+='                                                            <p class="alignC">'+itemName+'</p>';
// template+='                                                        </td>';
// template+='                                                    ';

template+='                                                         <td align="left" class="">';
template+='                                                            <p class="alignL">'+description+'</p>';
template+='                                                        </td>';
template+='                                                        <td align="center" class="">';
template+='                                                            <p class="alignC">'+delivery+'</p>';
template+='                                                        </td>';
template+='                                                        <td align="right" class="">';
template+='                                                            <p class="alignR">'+quantity+'</p>';
template+='                                                        </td>';
template+='                                                         <td align="center" class="">';
template+='                                                            <p class="alignC">'+unit+'</p>';
template+='                                                        </td>';
template+='';
// template+='                                                         <td align="center" class="">';
// template+='                                                            <p class="alignC">'+amountTotal+'</p>';
// template+='                                                        </td>';

template+='                                                        <td align="right" class="">         <!--unit price-->';
template+='                                                            <p class="alignR">'+unitprice+'</p>';
template+='                                                        </td>';
template+='                                                       ';
template+='                                                         <td align="right" class="">';
template+='                                                            <p class="alignR">'+amountTotal+'</p>';
template+='                                                        </td>';

if(discount!=null){
template+='                                                        <td align="right" class="">             <!--discount-->';
template+='                                                            <p class="alignR">'+discount+'</p>';
template+='                                                        </td>';
}else{
template+='                                                        <td align="right" class="">             <!--discount-->';
template+='                                                            <p class="alignR"></p>';
template+='                                                        </td>';
}
template+='';
if(discount!=null){
template+='                                                        <td align="center" class="">            <!--discount %-->';
template+='                                                            <p class="alignC">'+discountperc+'</p>';
template+='                                                        </td>';
}else{
template+='                                                        <td align="center" class="">            <!--discount %-->';
template+='                                                            <p class="alignC"></p>';
template+='                                                        </td>';
}
template+='                                                        <td align="right" class="">            <!--Taxableamount %-->';
template+='                                                            <p class="alignR">'+TaxableAmount+'</p>';
template+='                                                        </td>';

template+='';
// template+='                                                         <td align="center" class="">            <!--vat-->';
// template+='                                                            <p class="alignC">'+VAT+'</p>';
// template+='                                                        </td>';
template+='                                                         <td align="right" class="">            <!--vat-->';
template+='                                                            <p class="alignR">'+taxTotal+'</p>';
template+='                                                        </td>';

template+='';
template+='                                                        <td align="right" class="e">                 <!--amount-->  ';
template+='                                                            <p class="alignR">'+grossTotal+'</p>';
template+='                                                        </td>';
template+='                                                                         <!-- <td align="center" class="td_top_line td_right_line">';
template+='                                                                            <p class="alignC">${item.grossamt?string("##,#00.000")}</p>';
template+='                                                                        </td> -->';
template+=' ';
// template+='                                                      < <td align="right" class="">';
// template+='                                                            <p class="alignR">';
// // template+='                                                                <#assign totalgrossamount=totalgrossamount + item.grossamt/>${item.grossamt?string("##,#00.000")}</p>';
// // template+='                                                                <#assign totalamount=totalamount + Amount/>';
// // template+='                                                                <#assign totaltaxamount=totaltaxamount + item.tax1amt/>';
// template+='                                                        </td>';

template+='                                                    </tr>';
    }
}
//template+='                                        </#if>';


//template+='                                        </#list>';
template+='';
template+='</table>   ';
//  template+='<#if record.expense?has_content>';

// template+='  <#assign TotalAmount = 0/>';
//  template+='<#list record.expense as expense>';

// template+='   <#if expense_index==0>';

// template+='                                    <#assign SrNo=1><#assign totalsubtotalamount= 0>';
// template+='                                    <table style="width: 100%;margin-top:10px;" width="80%">                                                <!-- start items -->';
// template+='                                        ';
// template+='                                            <thead>';
// template+='                                                <tr style="padding-bottom: 0px;">';
// template+='                                                    <th align="left" width="1%" class="td_bottom_line">';
// template+='                                                        <p align="left"><b>sl</b></p>';
// template+='                                                    </th>';
// template+='                                                     <th align="right" width="5%" class="td_bottom_line">';
// template+='                                                        <p align="alignR"><b>Description</b></p>';
// template+='                                                    </th>';
// template+='                                                     <th align="right" width="10%" class="td_bottom_line">';
// template+='                                                        <p align="alignR"><b>Amount</b></p>';
// template+='                                                    </th>';
// template+='                                                     <th align="right" width="10%" class="td_bottom_line">';
// template+='                                                        <p align="alignR"><b>Tax Rate</b></p>';
// template+='                                                    </th>';
// template+='                                                     <th align="right" width="10%" class="td_bottom_line">';
// template+='                                                        <p align="alignR"><b>Tax Amount</b></p>';
// template+='                                                    </th>';
// template+='                                                     <th align="right" width="10%" class="td_bottom_line">';
// template+='                                                        <p align="alignR"><b>Gross Amount</b></p>';
// template+='                                                    </th>';
// template+='                                                </tr>';
// template+='                                            </thead>';
// template+='</#if>';

// template+='                                                    <tr>';
// template+='                                                          <td align="left" class="">';
// template+='                                                            <p class="alignL">${expense_index + 1}</p>';
// template+='                                                        </td>';
// template+='                                                        <td align="right" class="">';
// template+='                                                            <p class="alignR"> ${expense.account}</p>';
// template+='                                                        </td>';
// template+='                                                                            ';
// template+='                                                        <td align="right" class="">             <!--total discount-->';
// template+='                                                            <p class="alignR">${expense.amount?string["#,##0.00"]}</p>';
// template+='                                                        </td>';
// template+='                                                         <td align="right" class="">             <!--charges-->';
// template+='                                                            <p class="alignR">${expense.taxrate1}</p>';
// template+='                                                        </td>';
// template+='';
// template+='                                                        <td align="right" class="">          <!--vat-->';
// template+='                                                            <p class="alignR">${expense.tax1amt?string["#,##0.00"]}</p>';
// template+='                                                        </td>';
// template+='                                                                               ';
// template+='                                                        <td align="right" class="">     <!--total-->';
// template+='<p class="alignR">${expense.grossamt?string["#,##0.00"]}</p>';
// template+='                                                 ';
// template+='                                                        </td>';
// template+='                                                                                ';
// template+='                                                    </tr>';
// template+='<#assign TotalAmount = TotalAmount + expense.amount/>';
 
// template+='    <#assign TotalGrossAmount = TotalGrossAmount + expense.grossamt />';

// template+='</#list>';
// template+='                                    </table>';
// template+='</#if>';

template+='<#if record.expense?has_content>';

template+='  <#assign TotalAmount = 0/>';
template+='<table class="itemtable" style="width: 100%;margin-top:10px;">';

 template+='   <tr>';

 template+='       <td align="left" class=""><b>Charges</b></td>';

 template+='   </tr>';

template+='</table>';
template+='<table class="itemtable" style="width: 100%;margin-top:10px;">';
 template+='   <tr>';
 template+='       <td align="left" class=""><b>Charges</b></td>';
 template+='   </tr>';
template+='</table>';


 template+='<#list record.expense as expense>';

template+='   <#if expense_index==0>';
//template+='                                   <#if record.item?has_content>';
template+='                                    <#assign SrNo=1><#assign totalsubtotalamount= 0>';
template+='                                    <table style="width: 100%;margin-top:10px;" width="80%">                                                <!-- start items -->';
template+='                                        ';
template+='                                            <thead>';
template+='                                                <tr style="padding-bottom: 0px;">';
template+='                                                    <th align="left" width="1%" class="td_bottom_line">';
template+='                                                        <p align="left"><b>sl</b></p>';
template+='                                                    </th>';
template+='                                                     <th align="right" width="5%" class="td_bottom_line">';
template+='                                                        <p align="alignR"><b>Description</b></p>';
template+='                                                    </th>';
template+='                                                     <th align="right" width="10%" class="td_bottom_line">';
template+='                                                        <p align="alignR"><b>Amount</b></p>';
template+='                                                    </th>';
template+='                                                     <th align="right" width="10%" class="td_bottom_line">';
template+='                                                        <p align="alignR"><b>Tax Rate</b></p>';
template+='                                                    </th>';
template+='                                                     <th align="right" width="10%" class="td_bottom_line">';
template+='                                                        <p align="alignR"><b>Tax Amount</b></p>';
template+='                                                    </th>';
template+='                                                     <th align="right" width="10%" class="td_bottom_line">';
template+='                                                        <p align="alignR"><b>Gross Amount</b></p>';
template+='                                                    </th>';
template+='                                                </tr>';
template+='                                            </thead>';
template+='</#if>';
// template+='<#list record.item as item>';
// template+='<#assign totalsubtotalamount=totalsubtotalamount + item.grossamt/>';
template+='                                                    <tr>';
template+='                                                          <td align="left" class="">';
template+='                                                            <p class="alignL">${expense_index + 1}</p>';
template+='                                                        </td>';
template+='                                                        <td align="right" class="">';
template+='                                                            <p class="alignR"> ${expense.account}</p>';
template+='                                                        </td>';
template+='                                                                            ';
template+='                                                        <td align="right" class="">             <!--total discount-->';
template+='                                                            <p class="alignR">${expense.amount?string["#,##0.00"]}</p>';
template+='                                                        </td>';
template+='                                                         <td align="right" class="">             <!--charges-->';
template+='                                                            <p class="alignR">${expense.taxrate1}</p>';
template+='                                                        </td>';
template+='';
template+='                                                        <td align="right" class="">          <!--vat-->';
template+='                                                            <p class="alignR">${expense.tax1amt?string["#,##0.00"]}</p>';
template+='                                                        </td>';
template+='                                                                               ';
template+='                                                        <td align="right" class="">     <!--total-->';
template+='<p class="alignR">${expense.grossamt?string["#,##0.00"]}</p>';
template+='                                                 ';
template+='                                                        </td>';
template+='                                                                                ';
template+='                                                    </tr>';
template+='<#assign TotalAmount = TotalAmount + expense.amount/>';
 
template+='    <#assign TotalGrossAmount = TotalGrossAmount + expense.grossamt />';

template+='</#list>';
template+='                                                                            <!-- <tr>';
template+='                                                                                <td class="td_top_line " colspan="35">';
template+='                                                                                    <p class="alignL">';
template+='                                                                                        <b>Amount in Words&nbsp;:&nbsp;${record.currencysymbol}&nbsp;${record.custbody_total_amount_in_words}</b>';
template+='                                                                                    </p>';
template+='                                                                                </td>';
template+='                                                                            </tr> -->';
template+='                                                                           ';
template+='                                    </table>';
template+='</#if>';

 template+='                                    <#assign SrNo=1><#assign totalsubtotalamount= 0>';
template+='                                    <table style="width: 100%;margin-top:10px;" width="80%">                                                <!-- start items -->';
template+='                                        ';
template+='                                            <thead>';
template+='                                                <tr style="padding-bottom: 0px;">';
template+='                                                    <th align="left" width="10%" class="td_bottom_line">';
template+='                                                        <p align="left"><b>Currency</b></p>';
template+='                                                    </th>';
template+='                                                     <th align="center" width="15%" class="td_bottom_line">';
template+='                                                        <p align="alignR"><b>Purchase Subtotal Amount</b></p>';
template+='                                                    </th>';
template+='                                                     <th align="right" width="15%" class="td_bottom_line">';
template+='                                                        <p align="alignR"><b>Total Discount</b></p>';
template+='                                                    </th>';
template+='                                                     <th align="right" width="15%" class="td_bottom_line">';
template+='                                                        <p align="alignR"><b>Charges</b></p>';
template+='                                                    </th>';
template+='                                                     <th align="right" width="8%" class="td_bottom_line">';
template+='                                                        <p align="alignR"><b>Vat</b></p>';
template+='                                                    </th>';
template+='                                                     <th align="right" width="10%" class="td_bottom_line">';
template+='                                                        <p align="alignR"><b>Total</b></p>';
template+='                                                    </th>';
template+='                                                </tr>';
template+='                                            </thead>';
template+='                                                    <tr>';
template+='                                                          <td align="left" class="">';
template+='                                                            <p class="alignL">${record.currency}</p>';
template+='                                                        </td>';
template+='                                                        <td align="right" class="">';
template+='                                                            <p class="alignR">'+TotalpurchaseAmount.toFixed(2)+'</p>';
template+='                                                        </td>';
template+='                                                                            ';
template+='                                                        <td align="right" class="">             <!--total discount-->';
template+='                                                            <p class="alignR">'+dis.toFixed(2)+'</p>';
template+='                                                        </td>';
template+='                                                         <td align="right" class="">             <!--charges-->';
template+='                                                            <p class="alignR">${TotalAmount?string("##,#00.00")}</p>';
template+='                                                        </td>';
template+='';
template+='                                                        <td align="right" class="">          <!--vat-->';
template+='                                                            <p class="alignR">'+TaxTotalAmount.toFixed(2)+'</p>';
template+='                                                        </td>';
template+='                                                                               ';
template+='                                                        <td align="right" class="">     <!--total-->';
template+='<p class="alignR">'+grossTotalAmount.toFixed(2)+'</p>';
template+='                                                 ';
template+='                                                        </td>';
template+='                                                                                ';
template+='                                                    </tr>';
template+='                                                                            <!-- <tr>';
template+='                                                                                <td class="td_top_line " colspan="35">';
template+='                                                                                    <p class="alignL">';
template+='                                                                                        <b>Amount in Words&nbsp;:&nbsp;${record.currencysymbol}&nbsp;${record.custbody_total_amount_in_words}</b>';
template+='                                                                                    </p>';
template+='                                                                                </td>';
template+='                                                                            </tr> -->';
template+='                                                                           ';
template+='                                    </table>';
template+='                                                                       <!-- <table style="width: 100%;margin-top:15px;">';
template+='                                                                             <tr>';
template+='                                                                                 <td><b>Declaration:</b></td>';
template+='                                                                        </tr>';
template+='                                                                        <tr>';
template+='                                                                            <td>We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct" to be';
template+='                                                                                available in all invoices. Applicable to all the three operational subsidiaries</td>';
template+='                                                                        </tr>';
template+='                                                                        </table>-->';
template+='                                                                    </#if>';
template+='                                                                    <#if record.custbody_bank_account?has_content>';
template+='';
template+='</#if>';
template+='';
template+='';
template+='';
// template+='<#if record.custbody_terms_and_condition?has_content>';
template+=' <table style="width:100%;margin-top:50px;">';
template+='    <tr>';
template+='        <td align="left" style="width:25%;"><b>Terms and Conditions </b></td>';
template+='        <td align="left" style="width:2%;">:</td>';
template+='        <td align="left" style="width:73%;">1.OUR PURCHASE ORDER NUMBER/S  SHOULD APPEAR IN INVOICE<br/>2.GOODS TO BE SUPPLIED IN GOOD CONDITION<br/>3.PRODUCTS TO BE SUPPLIED WITH APPROVED TEMPERATURE MODE<br/>4.THIS ORDER IS PLACED IN ACCORDANCE WITH UAE LAW</td>';
template+='    </tr>';
template+='</table>';
template+='';
// template+='</#if>                ';
template+='';
template+='<!--<table style="width: 100%;margin-top:20px;">';
template+='    <tr>';
template+='        <td align="left" width="25%">_____________________</td>';
template+='        <td align="left" width="50%"></td>';
template+='        <td  width="25%" align="center" style="margin-right:10px;">_____________________';
template+='            </td>';
template+='    </tr>';
template+='     <tr>';
template+='        <td align="left" width="20%"></td>';
template+='        <td align="left" width="60%"></td>';
template+='        <td align="center" style="margin-right:10px;">';
template+='            <p style="margin-right:10px;padding-left:13px;font-weight:bold"><b>Received By</b></p></td>';
template+='    </tr>';
template+='      <tr>';
template+='        <td align="left" width="20%"><b>Prepared by</b></td>';
template+='        <td align="left" width="60%"></td>';
template+='        <td align="center" style="margin-right:10px;">';
template+='            <p style="margin-right:10px;padding-left:13px;font-weight:bold"></p></td>';
template+='    </tr>';
template+='</table>-->';
template+='</body>';
template+='</pdf>';


renderer.setTemplate(template);
renderer.addRecord('record', purchase_record);
var xml = renderer.renderToString();
var file = nlapiXMLToPDF(xml);
response.setContentType('PDF', 'Check' + purchase_record.getFieldValue("id") + '.pdf', 'inline');
response.write(file.getValue());
}

function relaceSlashN(charVal) {

    if (charVal) {

        return charVal.replace("\n", "<br />", "g");

    } else {

        return "";

    }

}
