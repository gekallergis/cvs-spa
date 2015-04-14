var require = {
    waitSeconds: 0,
    paths: {

        'jquery': [
            '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min',
            '../assets/plugins/jquery/dist/jquery.min'
        ],
        'jquery-ui': '//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min',

        'bootstrap': '//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min',

        'angular': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.min',
        'angular-cookies': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular-cookies.min',
        'angular-resource': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular-resource.min',
        'angular-sanitize': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular-sanitize.min',
        'angular-animate': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular-animate.min',


        'domReady': '../assets/plugins/requirejs-domready/domReady',

        'angular-ui-router': '../assets/plugins/angular-ui-router/release/angular-ui-router.min',

        'angular-google-maps': '../assets/plugins/angular-google-maps/dist/angular-google-maps.min',

        'angular-bootstrap': '../assets/plugins/angular-bootstrap/ui-bootstrap-tpls.min',

        'angular-couch-potato': '../assets/plugins/angular-couch-potato/dist/angular-couch-potato',

        'pace':'../assets/plugins/pace/pace.min',

        'fastclick': '../assets/plugins/fastclick/lib/fastclick',

        'jquery-color': '../assets/plugins/jquery-color/jquery.color',

        'select2': '../assets/plugins/select2/select2.min',
        'angular-ui-select2': '../assets/plugins/angular-ui-select2/src/select2',

        'summernote': '../assets/plugins/summernote/dist/summernote.min',

        'he': '../assets/plugins/he/he',
        'to-markdown': '../assets/plugins/to-markdown/src/to-markdown',
        'markdown': '../assets/plugins/markdown/lib/markdown',
        'bootstrap-markdown': '../assets/plugins/bootstrap-markdown/js/bootstrap-markdown',

        'ckeditor': '../assets/plugins/ckeditor/ckeditor',

        'moment': '../assets/plugins/moment/min/moment-with-locales.min',
        'moment-timezone': '../assets/plugins/moment-timezone/moment-timezone',

        'sparkline': '../assets/plugins/relayfoods-jquery.sparkline/dist/jquery.sparkline.min',
        'easy-pie': '../assets/plugins/jquery.easy-pie-chart/dist/jquery.easypiechart.min',

        'flot': '../assets/plugins/jquery-flot/jquery.flot',

        'flot-resize': '../assets/plugins/jquery-flot/jquery.flot.resize',
        'flot-fillbetween': '../assets/plugins/jquery-flot/jquery.flot.fillbetween',
        'flot-orderBar': '../assets/plugins/flotOrderBars/js/jquery.flot.orderBars',
        'flot-pie': '../assets/plugins/jquery-flot/jquery.flot.pie',
        'flot-time': '../assets/plugins/jquery-flot/jquery.flot.time',
        'flot-tooltip': '../assets/plugins/flot.tooltip/js/jquery.flot.tooltip.min',

        'raphael': '../assets/plugins/raphael/raphael-min',
        'morris': '../assets/plugins/morrisjs/morris.min',

        'dygraphs': '../assets/plugins/dygraphs/dygraph-combined',
        'dygraphs-demo': '../api/dygraph-demo-data.min',

        'chartjs': '../assets/plugins/chartjs/Chart.min',

        'datatables': '../assets/plugins/datatables/media/js/jquery.dataTables.min',
        'datatables-bootstrap': '../assets/plugins/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap',
        'datatables-tools': '../assets/plugins/datatables-tabletools/js/dataTables.tableTools',
        'datatables-colvis': '../assets/plugins/datatables-colvis/js/dataTables.colVis',
        'datatables-responsive': '../assets/plugins/datatables-responsive/files/1.10/js/datatables.responsive',


        'jqgrid':'../assets/plugins/jqgrid/js/minified/jquery.jqGrid.min',
        'jqgrid-locale-en':'../assets/plugins/jqgrid/js/i18n/grid.locale-en',


        'jquery-maskedinput': '../assets/plugins/jquery-maskedinput/dist/jquery.maskedinput.min',
        'jquery-validation': '../assets/plugins/jquery-validation/dist/jquery.validate.min',
        'jquery-form': '../assets/plugins/jquery-form/jquery.form',

        'bootstrap-validator': '../assets/plugins/bootstrapvalidator/dist/js/bootstrapValidator.min',

        'bootstrap-timepicker': '../assets/plugins/bootstrap3-fontawesome-timepicker/js/bootstrap-timepicker.min',
        'clockpicker': '../assets/plugins/clockpicker/dist/bootstrap-clockpicker.min',
        'nouislider': '../assets/plugins/nouislider/distribute/jquery.nouislider.min',
        'ionslider': '../assets/plugins/ion.rangeSlider/js/ion.rangeSlider.min',
        'bootstrap-duallistbox': '../assets/plugins/bootstrap-duallistbox/dist/jquery.bootstrap-duallistbox.min',
        'bootstrap-colorpicker': '../assets/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker',
        'jquery-knob': '../assets/plugins/jquery-knob/dist/jquery.knob.min',
        'bootstrap-slider': '../assets/plugins/seiyria-bootstrap-slider/dist/bootstrap-slider.min',
        'bootstrap-tagsinput': '../assets/plugins/bootstrap-tagsinput/dist/bootstrap-tagsinput.min',
        'x-editable': '../assets/plugins/x-editable/dist/bootstrap3-editable/js/bootstrap-editable.min',
        // 'angular-x-editable': '../assets/plugins/angular-xeditable/dist/js/xeditable.min',

        'fuelux-wizard': '../assets/plugins/fuelux/js/wizard',

        'dropzone': '../assets/plugins/dropzone/downloads/dropzone.min',

        'jcrop': '../assets/plugins/jcrop/js/jquery.Jcrop.min',


        'bootstrap-progressbar': '../assets/plugins/bootstrap-progressbar/bootstrap-progressbar.min',
        'jquery-nestable': '../assets/plugins/jquery-nestable/jquery.nestable',

        'superbox': '../assets/plugins/superbox/src/superbox.min',

        'jquery-jvectormap': '../assets/plugins/bower-jvectormap/jquery-jvectormap-1.2.2.min',
        'jquery-jvectormap-world-mill-en': '../assets/plugins/bower-jvectormap/jquery-jvectormap-world-mill-en',

        'lodash': '../assets/plugins/lodash/lodash.min',


        'magnific-popup': '../assets/plugins/magnific-popup/dist/jquery.magnific-popup',

        'fullcalendar': '../assets/smartadmin-plugin/fullcalendar/jquery.fullcalendar.min',
        'smartwidgets': '../assets/smartadmin-plugin/smartwidgets/jarvis.widget.min',
        'notification': '../assets/smartadmin-plugin/notification/SmartNotification.min',

        // app js file includes
        'appConfig': '../app.config',
        'modules-includes': 'includes'

    },
    shim: {
        'angular': {'exports': 'angular', deps: ['jquery']},

        'angular-animate': { deps: ['angular'] },
        'angular-resource': { deps: ['angular'] },
        'angular-cookies': { deps: ['angular'] },
        'angular-sanitize': { deps: ['angular'] },
        'angular-bootstrap': { deps: ['angular'] },
        'angular-ui-router': { deps: ['angular'] },
        'angular-google-maps': { deps: ['angular'] },

        'angular-couch-potato': { deps: ['angular'] },

        'socket.io': { deps: ['angular'] },

        'anim-in-out': { deps: ['angular-animate'] },
        'angular-easyfb': { deps: ['angular'] },
        'angular-google-plus': { deps: ['angular'] },

        'select2': { deps: ['jquery']},
        'angular-ui-select2': {deps: ['angular', 'select2']},
        
        'summernote': { deps: ['jquery']},

        'to-markdown': {deps: ['he']},

        'bootstrap-markdown': { deps: ['jquery', 'markdown', 'to-markdown']},

        'ckeditor': { deps: ['jquery']},

        'moment': { exports: 'moment'},
        'moment-timezone': { deps: ['moment']},
        'moment-timezone-data': { deps: ['moment']},
        'moment-helper': { deps: ['moment-timezone-data']},
        'bootstrap-daterangepicker': { deps: ['jquery', 'moment']},

        'flot': { deps: ['jquery']},
        'flot-resize': { deps: ['flot']},
        'flot-fillbetween': { deps: ['flot']},
        'flot-orderBar': { deps: ['flot']},
        'flot-pie': { deps: ['flot']},
        'flot-time': { deps: ['flot']},
        'flot-tooltip': { deps: ['flot']},

        'morris': {deps: ['raphael']},

        'datatables':{deps: ['jquery']},
        'datatables-colvis':{deps: ['datatables']},
        'datatables-tools':{deps: ['datatables']},
        'datatables-bootstrap':{deps: ['datatables','datatables-tools','datatables-colvis']},
        'datatables-responsive': {deps: ['datatables']},

        'jqgrid' : {deps: ['jquery']},
        'jqgrid-locale-en' : {deps: ['jqgrid']},

        'jquery-maskedinput':{deps: ['jquery']},
        'jquery-validation':{deps: ['jquery']},
        'jquery-form':{deps: ['jquery']},
        'jquery-color':{deps: ['jquery']},

        'jcrop':{deps: ['jquery-color']},

        'bootstrap-validator':{deps: ['jquery']},

        'bootstrap-timepicker':{deps: ['jquery']},
        'clockpicker':{deps: ['jquery']},
        'nouislider':{deps: ['jquery']},
        'ionslider':{deps: ['jquery']},
        'bootstrap-duallistbox':{deps: ['jquery']},
        'bootstrap-colorpicker':{deps: ['jquery']},
        'jquery-knob':{deps: ['jquery']},
        'bootstrap-slider':{deps: ['jquery']},
        'bootstrap-tagsinput':{deps: ['jquery']},
        'x-editable':{deps: ['jquery']},

        'fuelux-wizard':{deps: ['jquery']},
        'bootstrap':{deps: ['jquery']},

        'magnific-popup': { deps: ['jquery']},
        'modules-includes': { deps: ['angular']},
        'sparkline': { deps: ['jquery']},
        'easy-pie': { deps: ['jquery']},
        'jquery-jvectormap': { deps: ['jquery']},
        'jquery-jvectormap-world-mill-en': { deps: ['jquery']},

        'dropzone': { deps: ['jquery']},

        'bootstrap-progressbar': { deps: ['bootstrap']},


        'jquery-ui': { deps: ['jquery']},
        'jquery-nestable': { deps: ['jquery']},

        'superbox': { deps: ['jquery']},

        'notification': { deps: ['jquery']},

        'smartwidgets': { deps: ['jquery-ui']}

    },
    priority: [
        'jquery',
        'bootstrap',
        'angular'
    ]
};