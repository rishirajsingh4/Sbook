Comments = new Mongo.Collection('comment');

Meteor.methods({
	commentInsrt: function(commentAttributes) {

        /*check(commentAttributes,{
            cmnt:String
        });*/

        if (!commentAttributes.cmnt)
            throw new Meteor.Error(422, 'Please write some content');

        var user = Meteor.user();

        if (user.username==null) {
            Meteor.users.update({"_id": user._id}, {$set: {"username": user.profile.name} });


            var comment = _.extend(commentAttributes, {
                createdAt: new Date(),
                submitted: moment().format('MMMM Do YYYY, h:mm a'),
                userId: user._id,
                username: user.profile.name,
            });

        }else{
            var comment = _.extend(commentAttributes, {
                createdAt: new Date(),
                submitted: moment().format('MMMM Do YYYY, h:mm a'),
                userId: user._id,
                username: user.username
            });
        }

        //Comments.update(_id, {$set: {"createdAt": moment().startOf('comment.submitted').fromNow()}});

        Posts.update(comment.postId, {$inc: {commentsCount: 1}});

        comment._id = Comments.insert(comment);

        // now create a notification, informing the user that there's been a comment
        //createCommentNotification(comment);
        return comment._id;
    },
});