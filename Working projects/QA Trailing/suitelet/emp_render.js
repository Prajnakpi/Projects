/**
 * @NApiVersion 2.0
 * @NScriptType Suitelet
 */
// This sample shows how to render search results into a PDF file.
define(['N/render', 'N/search','N/file','N/log','N/record'], function(render, search,file,log,record) {
    function onRequest(options) {
        var request = options.request;
        var response = options.response;


        jsonObj = {
            name : "student 1",
            id:123,
            place: "mangalore",
            age:20,
            education:"BE"
        };

        var templateFile=file.load('Templates/PDF Templates/employee.html');
        var renderer = render.create();
        renderer.templateContent = templateFile.getContents();

        renderer.addCustomDataSource({
            format: render.DataSource.OBJECT,
            alias: "myJsonObject",
            data: jsonObj
        });
        var newfile = renderer.renderAsPdf();
        response.writeFile(newfile);  
    }
    
    return {
        onRequest: onRequest
    };
});