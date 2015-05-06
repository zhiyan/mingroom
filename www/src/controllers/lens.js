app.controller('LensCtrl', function($http,$scope,$state,$rootScope,$ionicLoading,$firebaseArray,$data) {
	var limit = 0, // 下拉刷新限制条数
		step = 10; //下拉刷新递进条数

	$scope.total = 0;

	var ref = $data.child("lens").orderByKey();

	$scope.refresh = function(){
		limit += step;
		var arr = $firebaseArray(ref.limitToFirst( limit ));
		arr.$loaded(function(data){
			$scope.data = arr;
			$scope.$broadcast('scroll.infiniteScrollComplete');
			$ionicLoading.hide();
		})
	}

	$ionicLoading.show({
      template: '加载中...'
    });

    $scope.go = function( key ){
    	$state.go("tab.lensDetail",{
    		id:key
    	});
    }

})

app.controller('LensDetailCtrl', function($http,$scope,$state,$rootScope,$ionicLoading,$stateParams,$data,$firebaseObject) {

	var ref = $data.child("lens").orderByKey().equalTo($stateParams.id);

	var obj = $firebaseObject(ref);

	obj.$loaded(function(x){
		$scope.data = x[$stateParams.id];
		$ionicLoading.hide();
	});

	$ionicLoading.show({
      template: '加载中...'
    });

})

