(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "eventId",
            dataType: tableau.dataTypeEnum.string
        
        }];
    
        var tableSchema = {
            id: "eventsFeed",
            alias: "WCMA events",
            columns: cols
        };
    
        schemaCallback([tableSchema]);
    };

    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://raw.githubusercontent.com/wcmaart/collection/master/Events-utf8.json", function(resp) {
            var feat = resp.features,
                tableData = [];
    
            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "eventId": feat[i].Events.eventId
                });
            }
    
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    myConnector.init = function(initCallback) {
        initCallback();
        tableau.submit();
    };

})();
