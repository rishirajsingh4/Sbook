Meteor.startup(function () {
    if (Posts.find().count() === 0) {
    	
    	var userId = Meteor.users.insert({username : "Test User", services: {}});

    	Posts.insert({body: "Hello World",
  					submitted : new Date(),
                	createdAt:moment().format('MMMM Do YYYY, h:mm a'),
  					username : "Test User",
  					userId: userId,
  					likesCount : 0,
  					commentsCount:0,
  		});

      	
    }
});

Meteor.publish('posts', function() {
    return Posts.find({}, {sort: {submitted: -1}});
});

Meteor.publish('comments', function() {
    return Comments.find({}, {sort: {submitted: -1}});
});

Meteor.publish('userPostsData', function(){
	
	var posts  =  Posts.find({}).fetch();

	var userIds = posts.map(function(c) { return c.userId });
	/*console.log(Meteor.users.find({_id: {$in: userIds}}, 
				{fields: {"services.password":0, "services.resume":0}}).fetch());*/
	
	return Meteor.users.find({_id: {$in: userIds}}, {fields: {"services.password":0, "services.resume":0}});
	
});

Meteor.publish("currentUserData", function () {
 	
  	if ( this.userId ) {  
		return Meteor.users.find(this.userId, {fields: {"services.google.picture":1 }});
  	} 
  	else {
   		 this.ready();
  	}
 });

 Meteor.publish('userCommentsData', function(){
	
	var comments  =  Comments.find({}).fetch();

	var userIds = comments.map(function(c) { return c.userId });
	/*console.log(Meteor.users.find({_id: {$in: userIds}}, 
				{fields: {"services.password":0, "services.resume":0}}).fetch());*/
	
	return Meteor.users.find({_id: {$in: userIds}}, {fields: {"services.password":0, "services.resume":0}});
	
});