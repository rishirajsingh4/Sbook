Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        return [Meteor.subscribe('posts'), 
                Meteor.subscribe('currentUserData')];
    },

});

Router.route('/', {
    name: 'postList',
    waitOn: function() {
        return [Meteor.subscribe('userPostsData'),
                Meteor.subscribe('currentUserData'),
                Meteor.subscribe('comments'),
                Meteor.subscribe('userCommentsData'),];
    },
});