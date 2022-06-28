/**
 * @NApiVersion 2.0
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 
 * Module Description
 * Deployment for Invoice Print
 * Includes invoicePrint
 *
 * Version    Date            Author        Remarks
 * 1.0.0      17 Nov 2021     Arshitha MS        Created for GRN print
 
 */
//  define(['N/log','N/ui/serverWidget', 'N/record', 'N/search', 'N/https', 'N/url', 'N/redirect', 'N/task', 'N/runtime'],
 define(['N/log', 'N/ui/serverWidget', 'N/record','N/format', 'N/config','N/search', 'N/https', 'N/url', 'N/redirect', 'N/task', "N/runtime", "N/file", , 'N/render'],
    function (log, serverWidget, record, format,config,search, http, url, redirect, task, runtime, render, file) {
        /**
         * Definition of the Suitelet script trigger point.
         *
         * @param {Object} context
         * @param {ServerRequest} context.request - Encapsulation of the incoming request
         * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
         * @Since 2015.2
         */
        function onRequest(context) {
            
            var scriptObj = context.request.parameters;
            var recordId = scriptObj.recid;
            var recType= 'purchaseorder';
        
            if (context.request.method == 'GET') {
                var purRec = record.load({
                    type: recType,
                    id: 10755
                });
                var vendor =purRec.getValue({ //Get employee ID
                    fieldId: "entity"
                });
    
                if (vendor) {
                    //load employee record
                    var venRec = record.load({
                        type: 'vendor',
                        id: vendor
                    });
                    empFname = venRec.getValue({
                        fieldId: "entityid"
                    });
                }    
            
                
            var xml = '<?xml version="1.0"?>';
            xml += '<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">';
            xml += '<pdf>';
            xml += '<head>';
            xml += '<link name="NotoSans" type="font" subtype="truetype" src="${nsfont.NotoSans_Regular}" src-bold="${nsfont.NotoSans_Bold}" src-italic="${nsfont.NotoSans_Italic}" src-bolditalic="${nsfont.NotoSans_BoldItalic}" bytes="2" />';
            xml += '    <style type="text/css">span, table {';
            xml += '     font-family: stsong, sans-serif;';
            xml += '    font-family: msung, sans-serif;';
            xml += '    font-family: heiseimin, sans-serif;';
            xml += '     font-family: hygothic, sans-serif;';
            xml += '    font-family: verdana;';
            xml += '    font-family: sans-serif;';
            xml += '     font-size: 9pt;';
            xml += '     table-layout: fixed;';
            xml += '     }';
            xml += '     td.headerB {';
            xml += '       font-size: 9px;';
            xml += '     }';
            xml += '     td.headerM {';
            xml += '       font-size: 9px;';
            xml += '     }';
            xml += '     span.headerM {';
            xml += '       font-size: 9px;';
            xml += '     }';
            xml += '     td.headerR {';
            xml += '       font-size: 10px;';
            xml += '     }';
            xml += '     td.headerRB {';
            xml += '       font-size: 12px;';
            xml += '       font-weight: bold;';
            xml += '     }';
            xml += '     th {';
            xml += '     font-weight: bold;';
            xml += '     font-size: 8.5pt;';
            xml += '     padding-top: 2px;';
            xml += '     vertical-align: middle;';
            xml += '         }';
            xml += '     b {';
            xml += '     font-weight: bold;';
            xml += '     color: #333333;';
            xml += '     }';
            xml += '     table.header td {';
            xml += '     padding: 0;';
            xml += '     font-size: 10pt;';
            xml += '     }';
            xml += '     table.footer td {';
            xml += '     padding: 0;';
            xml += '     font-size: 8pt;';
            xml += '     }';
            xml += '     #itemtable th p{';
            xml += '     vertical-align: text-top !important;';
            xml += '     text-align: center !important;';
            xml += '     }';
            xml += '     #itemtable{';
            xml += '     font-size: 8.5pt !important;';
            xml += '     border: 0.5px solid #000000';
            xml += '     }';
            xml += '     table.total {';
            xml += '     page-break-inside: avoid;';
            xml += '     }';
            xml += '     tr.totalrow {';
            xml += '     background-color: #e3e3e3;';
            xml += '     line-height: 200%;';
            xml += '     }';
            xml += '     td.totalboxtop {';
            xml += '     font-size: 12pt;';
            xml += '     background-color: #e3e3e3;';
            xml += '     }';
            xml += '     span.title {';
            xml += '     font-size: 28pt;';
            xml += '     }';
            xml += '     .smallTitle {';
            xml += '     font-size: 9pt;';
            xml += '     }';
            xml += '     span.number {';
            xml += '     font-size: 16pt;';
            xml += '     text-align:center;';
            xml += '     }';
            xml += '     span.itemname {';
            xml += '     font-weight: bold;';
            xml += '     line-height: 150%;';
            xml += '     }';
            xml += '     hr {';
            xml += '     width: 100%;';
            xml += '     color: #d3d3d3;';
            xml += '     background-color: #d3d3d3;';
            xml += '     height: 1px;';
            xml += '     }';
            xml += '     table.smalltext tr td {';
            xml += '     font-size: 8pt;';
            xml += '     }';
            xml += '       p.alignR {';
            xml += '     text-align: right !important;';
            xml += '     }';
            xml += '     p.alignL {';
            xml += '     text-align: left !important;';
            xml += '     }';
            xml += '     p.alignC {';
            xml += '     text-align: center !important;';
            xml += '     }';
            xml += '     .td_right_line{';
            xml += '     border-right :0.5px solid #000000;';
            xml += '     }';
            xml += '     .td_bottom_line{';
            xml += '     border-bottom: 0.5px solid #000000;';
            xml += '     }';
            xml += '     .td_top_line{';
            xml += '     border-top :0.5px solid #000000;';
            xml += '     }';
            xml += '     .title{';
            xml += '     font-weight: bold;';
            xml += '         font-size:16pt;';
            xml += '     line-height: 150%;';
            xml += '     }';
            xml += '     .footer-img{';
            xml += '        top: 0px;';
            xml += '     right: 0px;';
            xml += '     left: 0px;';
            xml += '     bottom: 0px;';
            xml += '     }';
            xml += '     .footer{';
            xml += '     margin-left:-45px; margin-right:-60px; margin-bottom:-115px;';
            xml += '     }';
            xml += '     .td_left_line{';
            xml += '     border-left :0.5px solid #000000;';
            xml += '     }';
            xml += '     .maintbl{';
            xml += '     border:0.5px solid #000000;';
            xml += '     }';
            xml += '     .footertbl{';
            xml += '     border:0.5px solid #000000;';
            xml += '     border-top: 0px !important;';
            xml += '     }';
            xml += '     .footertbl2{';
            xml += '         border-left: 0.5px solid #000000;';
            xml += '     border-right: 0.5px solid #000000;';
            xml += '     border-top: 0px !important;';
            xml += '     }';
            xml += '     .pad_left{';
            xml += '     padding-left: 5px!important;';
            xml += '     }';
            xml += '     th,td{';
            xml += '     padding:4px;';
            xml += '     }';
            xml += ' .custstamp{';
            xml += ' color:#d3d3d3;';
            xml += '     font-weight: bold;';
            xml += '         }';
            xml += '     </style>';
            xml += '        <macrolist>';
            xml += '        <macro id="nlheader">';
            xml += '         </macro>';
            xml += '     </macrolist>';
            xml += '</head>';
            xml += '<body>';
            xml += '     <p align="center" style="font-size:20px;"><b>TAX INVOICE</b></p>';
            xml += '<table  style="width:100%;height:100%;" border="1">';
            xml += '<tr >';
            xml += '<td width="15%" style=""><b>Vendor#</b></td>';
            xml += '<td width="2%"><b>:</b></td>';
            xml += '<td width="33%" style="border-right :1px;"><b>'+empFname+'</b></td>';
            xml += '<td width="50%"><b>Date:28/04/2022</b></td>';
            xml += '</tr>';
            xml += '<tr border="1" height="10%">';
            xml += '<td width="15%" style=""><b>Buyer</b></td>';
            xml += '<td width="2%"><b></b></td>';
            xml += '<td width="33%" style="border-right :1px;"><b>Prajna</b>';
            
            xml += '</td>';
            xml +='</tr>';          
            xml += '</table>';
            
            xml += ' </body>';
            xml += '</pdf>';
            context.response.renderPdf({
                xmlString: xml
            });
        }}
        return {

            onRequest: onRequest
        };
    });
