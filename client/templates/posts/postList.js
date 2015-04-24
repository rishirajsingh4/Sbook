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
    	console.log(this._id);
    	console.log(Comments.find({postId:this._id}).fetch());
    	return Comments.find({postId:this._id});
    },

    postOwneravatar: function() {
        var user = Meteor.users.findOne({_id: this.userId});
        //console.log(user);
        if(user.services.google){
            return user.services.google.picture;
        } else {
            return "/pa3.jpg";
        }

    },

    currentUserAvatar: function(){
        
        var user = Meteor.users.findOne(Meteor.user()._id);
        
        if(user.services.google){
            return user.services.google.picture;
        } else {
            return "/pa3.jpg";
        }

    },

    commentOwnerAvatar: function() {
        //console.log(this._id);

        var user = Meteor.users.findOne({_id: this.userId});
        //console.log(user);
        if(user.services.google){
            return user.services.google.picture;
        } else {
            return "/pa3.jpg";
        }

    },
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
	},

    "click .right-box": function(){
        //window.alert(this._id);
        
        var idToShow = this._id;

            if ($('.comments-container#'+idToShow).is(':visible')) {
                $('.comments-container#'+idToShow).hide("slow");
                    
            } else {
                console.log(idToShow);
                $('.comments-container#'+idToShow).show("slow");
            }
    }
	
});

Template.postList.rendered = function () {
   
   $(document).ready(function() {

        $(".post-middle-container").click(function(){
            
            window.alert("hi");
            var idToShow = this.id;

             if ($('.comments-container#'+idToShow).is(':visible')) {
                $('.comments-container#'+idToShow).hide("slow");
                    // do save info
                $(this).val('Reply');
            } else {
                $('.comments-container#'+idToShow).show("slow");
                $(this).val('Reply');
            }
        });
    });
};
    

