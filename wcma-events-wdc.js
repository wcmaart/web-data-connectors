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
            id: "facultyMember",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "subjectAndCourse",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "subject",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "courseNbr",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "institution",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "description",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "startDate",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "startYear",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "startMonth",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "startDay",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "dayOfTheWeek",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "terms",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "relatedObjects",
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
                    "facultyMember": feat[i].facultyMember,
                    "subjectAndCourse": feat[i].subjectAndCourse,
                    "subject": feat[i].subject,
                    "courseNbr": feat[i].courseNbr,
                    "institution": feat[i].institution,
                    "description": feat[i].description,
                    "startDate": feat[i].startDate,
                    "startYear": feat[i].startYear,
                    "startMonth": feat[i].startMonth,
                    "startDay": feat[i].startDay,
                    "dayOfTheWeek": feat[i].dayOfTheWeek,
                    "relatedObjects": feat[i].relatedObjects.objectID


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
