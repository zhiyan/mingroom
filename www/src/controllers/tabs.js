app.controller('TabsCtrl', function($scope, $rootScope, $state) {
        $rootScope.$on('$ionicView.beforeEnter', function() {

            $rootScope.hideTabs = false;

            if ($state.current.name === 'tab.cameraDetail') {
                $rootScope.hideTabs = true;
            }
        });
    });