app.controller('TabsCtrl', function($scope, $rootScope, $state) {
        $rootScope.$on('$ionicView.beforeEnter', function() {

        	var hides = ['tab.cameraDetail','tab.lensDetail'];

            $rootScope.hideTabs = false;

            if ( ~hides.indexOf( $state.current.name )  ) {
                $rootScope.hideTabs = true;
            }
        });
    });