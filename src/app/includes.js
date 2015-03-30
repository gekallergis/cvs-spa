define([
    //=====//
    // CVS //
    //=====//

    // Layout
    'core/layout/module',
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

    // Seed Panel Page
    'components/seed-panel-page/module',
    'components/seed-panel-page/controllers/seed-controller',

    // Authentication/Registration
    'components/account/module',
    'components/account/directives/account-info/account-info',

    // Multilingual Content
    'shared/language/module',
    'shared/language/controllers/language-controller',
    'shared/language/directives/language-selector',
    'shared/language/services/language-service',





    // account
    //'modules/auth/module',
    //'modules/auth/models/User',

    // layout
    'modules/widgets/directives/widgetGrid',
    'modules/widgets/directives/jarvisWidget',

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

    'modules/inbox/module',
    'modules/inbox/models/InboxConfig',
    'modules/inbox/models/InboxMessage',

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
    'modules/widgets/module',

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
