App = Ember.Application.create();

App.Router.map(function(){
	this.resource('posts');
	this.resource('coding', function(){
		this.resource('commit', {path: ':commit_id'});
	});
});

App.PostsRoute = Ember.Route.extend({
	model: function(){
		return posts;
	}
})

App.CodingRoute = Ember.Route.extend({
	model: function(){
		return commits;
	}
})

App.CommitRoute = Ember.Route.extend({
	model: function(params){
		return commits.findBy('id', params.commit_id);
	}
})
