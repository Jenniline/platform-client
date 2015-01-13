module.exports = [
    '$scope',
    '$rootScope',
    '$routeParams',
    '$translate',
    'multiTranslate',
    'RoleHelper',
    'TagEndpoint',
    'Notify',
    '_',
function(
    $scope,
    $rootScope,
    $routeParams,
    $translate,
    multiTranslate,
    RoleHelper,
    TagEndpoint,
    Notify,
    _
) {
    $translate('tag.edit_tag').then(function(manageTagsTranslation){
        $scope.title = manageTagsTranslation;
    });

    $scope.types = multiTranslate(['tag.types.category', 'tag.types.status']);
    $scope.roles = RoleHelper.roles;

    $scope.tag = TagEndpoint.get({id: $routeParams.id});
    $scope.processing = false;

    $scope.saveTag = function(tag) {
        $scope.processing = true;
        TagEndpoint.update({id: $routeParams.id}, tag, function() {
            $rootScope.goBack();
        }, function(errorResponse) { // error
            var errors = _.pluck(errorResponse.data && errorResponse.data.errors, 'message');
            errors && Notify.showAlerts(errors);
            $scope.processing = false;
        });
    };
}];
