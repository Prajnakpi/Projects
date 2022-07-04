function printInvoiceLHNew(request, response) {
    var IFID = request.getParameter("recID");
    var file = nlapiPrintRecord('TRANSACTION', IFID, 'PDF', { formnumber: '187' });
    response.setContentType('PDF', 'CustInvc_' + IFID + '.pdf', 'INLINE');
    response.write(file.getValue());
    nlapiLogExecution("DEBUG", "testing", file);
}