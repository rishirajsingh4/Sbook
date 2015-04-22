Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    /*waitOn: function() {
        return [Meteor.subscribe('text'), 
                Meteor.subscribe('notification'),
                Meteor.subscribe('currentUserData')];
    },
*/
});