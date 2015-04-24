Posts = new Mongo.Collection('post');

Meteor.methods({

	postInsert: function(postAttributes) {
        
        check(postAttributes, {
            body: String,
        });
        
        var user = Meteor.user();

        //console.log(user);
        //console.log(user.username);
        if(user.username==null){
            Meteor.users.update({"_id": user._id},{$set: {"username": user.profile.name}});

            var post = _.extend(postAttributes, {
                submitted: new Date(),
                createdAt:moment().format('MMMM Do YYYY, h:mm a'),
                userId: user._id,                   //id of user who posted text
                username: user.profile.name,
                commentsCount: 0,
                likesCount:0,
                likers:[],   
            }); 
        }else{
            var post = _.extend(postAttributes, {
                submitted: new Date(),
                createdAt:moment().format('MMMM Do YYYY, h:mm a'),
                userId: user._id,                   //id of user who posted text
                commentsCount: 0,
                username : user.username,
                likesCount:0,  
                likers:[]	
            }); 
        }

        var postId = Posts.insert(post);
        return {
            _id: postId,
        };
    },


    likePost: function(postId){
        
        var user = Meteor.user();

        if (!user){
            
            window.alert("Please signIn to like this status!!");
            throw new Meteor.Error(401, "You need to login to recommend");
        }

        var post = Posts.findOne(postId);
        console.log(post._id);
        if (!post){
            
            throw new Meteor.Error(401, "Status NOT FOUND!!");
        }

        var testPost = Posts.findOne({_id: post._id, likers: user._id});

        console.log(testPost);
        
        if (testPost==null) {
            Posts.update(post._id, {
                $addToSet: {likers: user._id},
                $inc: {likesCount: 1}
            });
        }
        else{
            
            Posts.update(post._id, {
                $pull: {likers: user._id},
                $inc: {likesCount: -1}
            });
        }
                

    },

});
