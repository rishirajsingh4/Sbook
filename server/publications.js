Meteor.publish('userPostsData', function(){
	
	var posts  =  Posts.find({}).fetch();

	var userIds = posts.map(function(c) { return c.userId });
	/*console.log(Meteor.users.find({_id: {$in: userIds}}, 
				{fields: {"services.password":0, "services.resume":0}}).fetch());*/
	
	return Meteor.users.find({_id: {$in: userIds}}, {fields: {"services.password":0, "services.resume":0}});
	
});