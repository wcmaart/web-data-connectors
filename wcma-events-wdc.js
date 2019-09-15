(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "eventId",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "eventName",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "subject",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "startDate",
            dataType: tableau.dataTypeEnum.string
        }];
    
        var tableSchema = {
            id: "eventsFeed",
            alias: "Earthquakes with magnitude greater than 4.5 in the last seven days",
            columns: cols
        };
    
        schemaCallback([tableSchema]);
    };

    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://github.com/wcmaart/collection/raw/master/Events-utf8.json", function(resp) {
            var feat = resp.features,
                tableData = [];
    
            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "eventId": feat[i].Events.eventId,
                    "eventName": feat[i].Events.eventName,
                    "subject": feat[i].Events.subject,
                    "startDate": feat[i].Events.startDate
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