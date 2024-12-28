(function() {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "name",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "myTable",
            alias: "My Table",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    myConnector.getData = function(table, doneCallback) {
        var xhr = $.ajax({
            url: "https://api.https://opendata.maryland.gov/resource/y26q-r6fh.csv.com/data", // Replace with your API endpoint
            type: "GET",
            dataType: "json",
            success: function(resp) {
                var tableData = [];

                for (var i = 0, len = resp.length; i < len; i++) {
                    tableData.push({
                        "id": resp[i].id,
                        "name": resp[i].name
                    });
                }

                table.appendRows(tableData);
                doneCallback();
            }
        });
    };

    tableau.registerConnector(myConnector);
})();

$(document).ready(function() {
    $("#submitButton").click(function() {
        tableau.connectionName = "MD DHS DATA"; // Name of the data source
        tableau.submit();
    });
});
