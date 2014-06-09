app.controller('ChannelController', function ($scope, $rootScope, $location, Groups, User) {
    $scope.groupName = User.currentGroup().name;
    $scope.groups = User.get().groups;
    $scope.toJoin = '';

    $rootScope.$on('change:groups', function(event, data) {
        console.log(data.groups);
        console.log(data);
        /* ON DELETE */
        if (data.groups) {
            console.log(User.get());
            // $scope.groups = User.get().
        /* ON CREATE */
        } else {
            $scope.groups.push(data);
        }
    });

    $scope.checkActive = function(groupName) {
        if ($scope.groupName === groupName) { return 'subheading-active'; }
        return '';
    };

    $scope.remove = function (group) {
        Groups.removeGroupFromUser(User.get(), group);
    };

    $scope.create = function () {
        Groups.createGroup(User.get(), $scope.toJoin);
        $scope.toJoin = '';
    };

    $scope.join = function () {
        Groups.addUser(User.get(), $scope.toJoin);
        $scope.toJoin = '';
    };

    $scope.switch = function (group) {
        User.currentGroup(group);
        $scope.groupName = User.currentGroup().name;
    };
});