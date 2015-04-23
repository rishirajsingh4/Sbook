Template.postList.helpers({
	posts: function() {
        return Posts.find({}, {sort: {submitted: -1}});
    },

    liked: function(){
        var post = Posts.findOne({_id: this._id, likers: Meteor.user()._id});
        console.log(post);
        if(post!=null)
            return true;
    },
});

Template.postList.events({
	'click .like-button': function (e) {
		e.preventDefault();
        
        Meteor.call('likePost', this._id);
	}
	
});