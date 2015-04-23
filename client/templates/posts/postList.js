Template.postList.helpers({
	posts: function() {
        return Posts.find({}, {sort: {submitted: -1}});
    },

    liked: function(){
        var post = Posts.findOne({_id: this._id, likers: Meteor.user()._id});
        //console.log(post);
        if(post!=null)
            return true;
    },

    comments: function(){
    	//console.log(this._id);
    	console.log(Comments.find({postId:this._id}).fetch());
    	return Comments.find({postId:this._id});
    }
});

Template.postList.events({
	'click .like-button': function (e) {
		e.preventDefault();
        
        Meteor.call('likePost', this._id);
	},

	'submit form': function(e){
		e.preventDefault();

        var postId = this._id;
        var cmnt = $(e.target).find('[name=comment]').val();

        var comment = {};
        comment.cmnt = cmnt;
        comment.postId = postId;

        /*console.log(comment.cmnt);
        console.log(comment.ownerText);*/

        Meteor.call('commentInsrt', comment, function(error, result) {
            // display the error to the user and abort
            if (error)
                return alert(error.reason);

            if(result){
                $('#commentBox').val(''); 
            }

        });
	}
	
});