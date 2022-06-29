
var col = new Array();
var filter = new Array();
var rec_type = "transaction";



col.push(search.createColumn({
    name: 'internalid',
}));
col.push(search.createColumn({
    name: 'entity'
}));
col.push(search.createColumn({
    name: 'internalid',
}));
col.push(search.createColumn({
    name: 'account'
}));
col.push(search.createColumn({
    name: 'internalid',
}));
col.push(search.createColumn({
    name: 'memo'
}));


filter.push(search.createFilter({
    name: 'entity',
    operator: search.Operator.ANYOF,
    values: AccountNetsuiteId
}));
filter.push(search.createFilter({
    name: 'account',
    operator: search.Operator.ANYOF,
    values: AccountNetsuiteId
}));
filter.push(search.createFilter({
    name: 'memo',
    operator: search.Operator.ANYOF,
    values: AccountNetsuiteId
}));


var invoiveSearch = {};
invoiveSearch.type = rec_type;
invoiveSearch.columns = col;
invoiveSearch.filters = filter;

var invoiceSearchRes = search.create(invoiveSearch);

var invoiceSearchResults = invoiceSearchRes.run().getRange({
    start: 0,
    end: 1000
});
log.debug("routeSearchResults.length", invoiceSearchResults.length)
if (_isNotNullOREmpty(invoiceSearchResults)) {
    for (var j = 0; j < invoiceSearchResults.length; j++) {

        var entity = invoiceSearchResults[j].getValue({
            name: "entity",
            sort: search.Sort.DESC
        });
    }
}

