app.controller('HeaderController', function ($scope, $location, Listings, User) {
    $scope.url = '';

    $scope.navigate = function (path) {
        $location.path('/' + path);
    };

    $scope.home = function() {
        $location.path('/groups');
    };

    $scope.post = function (keyEvent, groupName) {
        if (keyEvent.which === 13) { 
            Listings.create(User.currentGroup(), $scope.url); 
            $scope.url = '';
        }
    };

    $scope.logout = function (groupName) {
        Listings.logout();
    };
});

