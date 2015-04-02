define(['shared/utils/module'], function (module) {

    "use strict";
    module.registerController('TreeViewController', function ($scope) {
        $scope.company_hierarchy = [
            {"content": "<span><i class=\"fa fa-lg fa-building\"></i> Microsoft</span>", "expanded": true, "children": [
                {"content": "<h4><i class=\"fa fa-lg fa-star\"></i> Bill Gates</h4>", "expanded": false, "children": []},
                {"content": "<span class=\"label label-success\"><i class=\"fa fa-lg fa-plus-circle\"></i> Microsoft Sweden</span>", "expanded": false, "children": [
                    {"content": "<span class=\"alert-info\"><i class=\"fa fa-star\"></i> George Kallergis</span>"},
                    {"content": "<span><i class=\"fa fa-user\"></i> John Doe</span>"},
                    {"content": "<span><i class=\"fa fa-user\"></i> Jane Doe</span>"}
                ]},
                {"content": "<span class=\"label label-success\"><i class=\"fa fa-lg fa-plus-circle\"></i> Microsoft Germany</span>", "expanded": false, "children": [
                    {"content": "<span class=\"alert-info\"><i class=\"fa fa-star\"></i> George Kallergis</span>"},
                    {"content": "<span><i class=\"fa fa-user\"></i> John Doe</span>"},
                    {"content": "<span><i class=\"fa fa-user\"></i> Jane Doe</span>"}
                ]},
                {"content": "<span class=\"label label-success\"><i class=\"fa fa-lg fa-plus-circle\"></i> Microsoft Italy</span>", "expanded": false, "children": [
                    {"content": "<span class=\"alert-info\"><i class=\"fa fa-star\"></i> George Kallergis</span>"},
                    {"content": "<span><i class=\"fa fa-user\"></i> John Doe</span>"},
                    {"content": "<span><i class=\"fa fa-user\"></i> Jane Doe</span>"}
                ]},
            ]}
        ];
    });
});
