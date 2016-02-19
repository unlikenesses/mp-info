var event = {

	init: function(){

		chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
			if (request.fn in event) {
				event[request.fn](request, sender, sendResponse);
			}
			return true;
		});

	},

	getPersonDetails: function(request, sender, sendResponse) {
		var returnObj = {};
		var that = this;
		that.getPerson(request, function(data) { 
			returnObj['person'] = data; 
			that.getMPInfo(request, function(data) {
				returnObj['mpInfo'] = data;
				sendResponse(returnObj);
			});	
		});
	},

	getPerson: function(request, callback) {

		$.ajax({
			url: request.urlPerson,
			type: 'GET',
			dataType: 'json'
		})
		.then(function(data) {
			callback(data[0]);
		}, function(xhr, status, error) {
		});

	},

	getMPInfo: function(request, callback) {

		$.ajax({
			url: request.urlMpInfo,
			type: 'GET',
			dataType: 'json'
		})
		.then(function(data) {
			callback(data);
		}, function(xhr, status, error) {
			console.log('Error getting MP info');
		});

	}

};

event.init();