function createSalesOrderAction(request, response) {
    nlapiLogExecution('DEBUG', 'getting inside');
    var recordID = request.getParameter('recordID');
    nlapiLogExecution('DEBUG', 'recordID', recordID);
    var renderer = nlapiCreateTemplateRenderer();
    var taxRec = nlapiLoadRecord("salesorder", 9633);
    var template = "";

    template += '<?xml version="1.0"?><!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">';

    template += '<pdf>';

    template += '<head>';

    template += '	<link name="NotoSans" type="font" subtype="truetype" src="${nsfont.NotoSans_Regular}" src-bold="${nsfont.NotoSans_Bold}" src-italic="${nsfont.NotoSans_Italic}" src-bolditalic="${nsfont.NotoSans_BoldItalic}" bytes="2" />';

    template += '	<#if .locale == "zh_CN">';

    template += '		<link name="NotoSansCJKsc" type="font" subtype="opentype" src="${nsfont.NotoSansCJKsc_Regular}" src-bold="${nsfont.NotoSansCJKsc_Bold}" bytes="2" />';

    template += '	<#elseif .locale == "zh_TW">';

    template += '		<link name="NotoSansCJKtc" type="font" subtype="opentype" src="${nsfont.NotoSansCJKtc_Regular}" src-bold="${nsfont.NotoSansCJKtc_Bold}" bytes="2" />';

    template += '	<#elseif .locale == "ja_JP">';

    template += '		<link name="NotoSansCJKjp" type="font" subtype="opentype" src="${nsfont.NotoSansCJKjp_Regular}" src-bold="${nsfont.NotoSansCJKjp_Bold}" bytes="2" />';

    template += '	<#elseif .locale == "ko_KR">';

    template += '		<link name="NotoSansCJKkr" type="font" subtype="opentype" src="${nsfont.NotoSansCJKkr_Regular}" src-bold="${nsfont.NotoSansCJKkr_Bold}" bytes="2" />';

    template += '	<#elseif .locale == "th_TH">';

    template += '		<link name="NotoSansThai" type="font" subtype="opentype" src="${nsfont.NotoSansThai_Regular}" src-bold="${nsfont.NotoSansThai_Bold}" bytes="2" />';

    template += '	</#if>';

    template += '    <macrolist>';

    template += '        <macro id="nlheader">';

    template += '            <table style="width: 100%; font-size: 10pt;"><tr>';

    template += '	<td rowspan="3" style="padding: 0;"><#if companyInformation.logoUrl?length != 0><img src="${companyInformation.logoUrl}" style="float: left; margin: 7px" /> </#if> ${companyInformation.companyName}<br />${companyInformation.addressText}</td>';

    template += '	<td align="right" style="padding: 0;"><span style="font-size: 28pt;">${record@title}</span></td>';

    template += '	</tr>';

    template += '	<tr>';

    template += '	<td align="right" style="padding: 0;"><span style="font-size: 16pt;">#${record.tranid}</span></td>';

    template += '	</tr>';

    template += '	<tr>';

    template += '	<td align="right" style="padding: 0;">${record.trandate}</td>';

    template += '	</tr></table>';

    template += '        </macro>';

    template += '        <macro id="nlfooter">';

    template += '            <table style="width: 100%; font-size: 8pt;"><tr>';

    template += '	<td style="padding: 0;"><barcode codetype="code128" showtext="true" value="${record.tranid}"/></td>';

    template += '	<td align="right" style="padding: 0;"><pagenumber/> of <totalpages/></td>';

    template += '	</tr></table>';

    template += '        </macro>';

    template += '    </macrolist>';

    template += '    <style type="text/css">* {';

    template += '		<#if .locale == "zh_CN">';

    template += '			font-family: NotoSans, NotoSansCJKsc, sans-serif;';

    template += '		<#elseif .locale == "zh_TW">';

    template += '			font-family: NotoSans, NotoSansCJKtc, sans-serif;';

    template += '		<#elseif .locale == "ja_JP">';

    template += '			font-family: NotoSans, NotoSansCJKjp, sans-serif;';

    template += '		<#elseif .locale == "ko_KR">';

    template += '			font-family: NotoSans, NotoSansCJKkr, sans-serif;';

    template += '		<#elseif .locale == "th_TH">';

    template += '			font-family: NotoSans, NotoSansThai, sans-serif;';

    template += '		<#else>';

    template += '			font-family: NotoSans, sans-serif;';

    template += '		</#if>';

    template += '		}';

    template += '		table {';

    template += '			font-size: 9pt;';

    template += '			table-layout: fixed;';

    template += '		}';

    template += '        th {';

    template += '            font-weight: bold;';

    template += '            font-size: 8pt;';

    template += '            vertical-align: middle;';

    template += '            padding: 5px 6px 3px;';

    template += '            background-color: #e3e3e3;';

    template += '            color: #333333;';

    template += '        }';

    template += '        td {';

    template += '            padding: 4px 6px;';

    template += '        }';

    template += '		td p { align:left }';

    template += '</style>';

    template += '</head>';

    template += '';

    template += '<body header="nlheader" header-height="10%" footer="nlfooter" footer-height="20pt" padding="0.5in 0.5in 0.5in 0.5in" size="Letter">';

    template += '<h3 align="center">SALES ORDER</h3>';

    template += '<table style="border:1px solid black; width:100%">';

    template += '<tr style="border-top:1px solid black;">';

    template += '<td colspan="5" align="center">Customer Information</td>';

    template += '<td colspan="6" align="center">Sales Rep</td>';

    template += '</tr>';

    template += '<tr style="border-top:1px solid black;">';

    template += '<td colspan="5" style="border-right:1px solid black;">Name: <br> </br>  ';

    template += 'Contact: <br> </br>';

    template += 'Address: <br></br>';

    template += 'City,ST,Zip:<br></br>';

    template += 'Phone:<br></br>';

    template += 'Fax:<br></br>';

    template += 'Email:<br></br>';

    template += 'VAT#:<br></br>';

    template += '</td>';

    template += '<td>Sales Rep:<br></br>';

    template += 'Email:<br></br>';

    template += 'Mobile:<br></br>';

    template += '</td>';

    template += '</tr>';

    template += '<tr>';

    template += '<th>SL#</th>';

    template += '<th>Item</th>';

    template += '<th>Description</th>';

    template += '<th>Rental Type</th>';

    template += '<th>No.of H/D/W/M</th>';

    template += '<th>Qty</th>';

    template += '<th>Rate</th>';

    template += '<th>Amount</th>';

    template += '<th>Tax%</th>';

    template += '<th>Tax Amt</th>';

    template += '<th>Gross Amt</th>';

    template += '</tr>';

    template += '<#assign SL=0>';

    template += '<#if record.item?has_content>';

    template += '<#assign SL=SL+1/> ';

    template += '<#list record.item as item>';

    template += '<tr>';

    template += '<td>${SL}</td>';

    template += '<td>${item.item}</td>';

    template += '<td> ${item.description}</td>';

    template += '<td>${item.custcol_rent_from_date}</td>';

    template += '<td>${item.custcol_rent_no_of_hdwm}</td>';

    template += '<td>${item.quantity}</td>';

    template += '<td>${item.rate}</td>';

    template += '<td>${item.amount}</td>';

    template += '<td>${item.taxcode}</td>';

    template += '<td>${item.custcol_kpi_tax_amount_3_decimal}</td>';

    template += '<td>${item.custcol_kpi_gross_amount_3_decimal}</td>';

    template += '</tr>';

    template += '</#list>';

    template += '</#if>';

    template += '<tr style="border-top:1px solid black;">';

    template += ' 		<td colspan="5" >comments:(optional if any)</td>';

    template += '		<td  colspan="6" style="border-left:1px solid black;">sub total<br></br>';

    template += '			<p>total vat amount</p></td>';

    template += '</tr>	';

    template += '<tr>';

    template += '<td colspan="5" style="border-right:1px solid black;"></td>';

    template += '<td colspan="6" style="border-top:1px solid black;">total(including taxes)</td>';

    template += '</tr>	';

    template += '';

    template += '';

    template += '</table>';

    template += '';

    template += '';

    template += '';

    template += '';

    template += '';

    template += '';

    template += '';

    template += '';

    template += '    ';

    template += '</body>';

    template += '</pdf>';
    renderer.setTemplate(template);
    renderer.addRecord('record', taxRec);
    var xml = renderer.renderToString();
    var file = nlapiXMLToPDF(xml);
    response.setContentType('PDF', 'Check' + taxRec.getFieldValue("id") + '.pdf', 'inline');
    response.write(file.getValue());
}