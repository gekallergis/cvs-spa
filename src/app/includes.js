define([
    //=====//
    // CVS //
    //=====//

    // CVS Model
    'shared/cvs-model/module',
    'shared/cvs-model/services/cvs-api',
    'shared/cvs-model/models/account-model',
    'shared/cvs-model/models/inbox-model',
    'shared/cvs-model/models/product-model',
    'shared/cvs-model/models/report-model',
    'shared/cvs-model/models/sales-data-model',
    'shared/cvs-model/models/order-model',
    'shared/cvs-model/models/invoice-model',
    'shared/cvs-model/models/intel-model',

    // Layout
    'core/layout/module',
    'core/layout/controllers/menu',
    'core/layout/actions/minifyMenu',
    'core/layout/actions/toggleMenu',
    'core/layout/actions/fullScreen',
    'core/layout/actions/resetWidgets',
    'core/layout/actions/resetWidgets',
    'core/layout/actions/searchMobile',
    'core/layout/directives/layout-configuration/layout-configuration',
    'core/layout/directives/smartInclude',
    'core/layout/directives/smartDeviceDetect',
    'core/layout/directives/smartFastClick',
    'core/layout/directives/smartLayout',
    'core/layout/directives/smartSpeech',
    'core/layout/directives/smartRouterAnimationWrap',
    'core/layout/directives/smartFitAppView',
    'core/layout/directives/radioToggle',
    'core/layout/directives/dismisser',
    'core/layout/directives/smartMenu',
    'core/layout/directives/bigBreadcrumbs',
    'core/layout/directives/stateBreadcrumbs',
    'core/layout/directives/smartPageTitle',
    'core/layout/directives/hrefVoid',
    'core/layout/service/SmartCss',

    // Shared Utils
    'shared/utils/module',
    'shared/utils/directives/loading-animation/loading-animation',
    'shared/utils/directives/shortcut-menu/shortcut-menu',
    'shared/utils/directives/shortcut-menu/toggle-shortcut-menu',
    'shared/utils/directives/table-tools/datatable-basic',
    'shared/utils/directives/file-upload/smart-dropzone',
    'shared/utils/directives/tree-view/tree-view',
    'shared/utils/directives/modal-window/modal-window',
    'shared/utils/directives/validator/smart-validate-form',
    'shared/utils/filters/capitalize',

    // Shared Widgets
    'shared/widgets/module',
    'shared/widgets/directives/widget-grid',
    'shared/widgets/directives/jarvis-widget',

    // Seed Panel Page
    'components/seed-panel-page/module',
    'components/seed-panel-page/controllers/seed-controller',

    // Accounts (companies, users)
    'components/account/module',
    'components/account/controllers/login',
    'components/account/controllers/registration',
    'components/account/controllers/reset-password',
    'components/account/directives/account-info/account-info',
    'components/account/directives/company-list/company-list',
    'components/account/directives/company-profile/company-profile',
    'components/account/directives/user-profile/user-profile',
    'components/account/directives/profile-list/profile-list',
    'components/account/controllers/company-list',
    'components/account/controllers/company-profile',
    'components/account/controllers/user-profile',
    'components/account/controllers/profile-list',

    // Multilingual Content
    'shared/language/module',
    'shared/language/controllers/language-controller',
    'shared/language/directives/language-selector',
    'shared/language/services/language-service',

    // Inbox
    'components/inbox/module',
    'components/inbox/directives/message-labels',
    'components/inbox/directives/unread-messages-count',
    'components/inbox/services/inbox-config',
    'components/inbox/services/inbox-message',

    // Products
    'components/products/module',
    'components/products/controllers/order-list',
    'components/products/controllers/invoice-list',
    'components/products/controllers/owned-product-list',
    'components/products/controllers/product-list',
    'components/products/controllers/invoice-details',
    'components/products/directives/order-list/order-list',
    'components/products/directives/invoice-list/invoice-list',
    'components/products/directives/owned-product-list/owned-product-list',
    'components/products/directives/product-list/product-list',
    'components/products/directives/invoice-details/invoice-details',

    // Reporting
    'components/reporting/module',
    'components/reporting/controllers/sales-data-list',
    'components/reporting/controllers/sales-data-upload',
    'components/reporting/controllers/report-generation',
    'components/reporting/directives/sales-data-list/sales-data-list',
    'components/reporting/directives/sales-data-upload/sales-data-upload',
    'components/reporting/directives/report-generation/report-generation',

    // Intel
    'components/intel/module',
    'components/intel/controllers/system-log',
    'components/intel/directives/system-log',
    'components/intel/filters/system-log',

    // Basket
    'components/basket/module',
    'components/basket/controllers/basket-controller',
    'components/basket/directives/basket-dropdown-toggle',
    'components/basket/directives/basket/basket',













    // account
    //'modules/auth/module',
    //'modules/auth/models/User',

    // layout
    //'modules/widgets/directives/widgetGrid',
    //'modules/widgets/directives/jarvisWidget',

    // dashboard
    'modules/dashboard/module',

    //components
    //'modules/language/Language',
    //'modules/language/languageSelector',
    //'modules/language/language-controller',

    //'modules/projects/Project',
    //'modules/projects/recentProjects',

    //'modules/activities/activities-controller',
    //'modules/activities/activities-dropdown-toggle-directive',
    //'modules/activities/activities-service',

    //'modules/shortcut/shortcut-directive',

    'modules/calendar/module',
    'modules/calendar/models/CalendarEvent',
    'modules/calendar/directives/fullCalendar',
    'modules/calendar/directives/dragableEvent',
    'modules/calendar/controllers/CalendarCtrl',

    //'modules/inbox/module',
    //'modules/inbox/models/InboxConfig',
    //'modules/inbox/models/InboxMessage',

    'modules/todo/TodoCtrl',
    'modules/todo/models/Todo',
    'modules/todo/directives/todoList',

    // chat
    'modules/chat/module',

    // graphs
    'modules/graphs/module',


    // tables
    'modules/tables/module',

    // forms
    'modules/forms/module',

    // ui
    'modules/ui/module',

    // widgets
    //'modules/widgets/module',

    // widgets
    'modules/maps/module',

    // appViews
    'modules/app-views/module',

    // misc
    'modules/misc/module',

    // smartAdmin
    'modules/smart-admin/module'
], function () {
    'use strict';
});
