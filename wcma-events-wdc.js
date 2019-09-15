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
            id: "startDate",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "description",
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
            var feat = resp.Events,
                tableData = [];
    
            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "eventId": feat[i].eventId,
                    "eventName": feat[i].eventName,
                    "startDate": feat[i].startDate,
                    "description": feat[i].description
                });
            }
    
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "WCMA events2"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });

})();
