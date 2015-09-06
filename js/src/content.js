var app = {

	key: '',
	url: 'http://www.theyworkforyou.com/api/',

	init: function(key) {
		this.key = key;
		var that = this;
		this.highlightNames();
		$('.highlight').qtip({
			content: {
				text: function(event,api) {
					var person_id = $(this).attr('id').replace('person','');
					chrome.runtime.sendMessage({
						urlPerson: that.url+'getPerson'+'?id='+person_id+'&key='+that.key,
						urlMpInfo: that.url+'getMPInfo'+'?id='+person_id+'&key='+that.key,
						fn: 'getPersonDetails'
					},function(response){
						var person = response.person, mpInfo = response.mpInfo;
						// Check for votes:
						var votes = that.getVotes(mpInfo);
						// Build the pop-up:
						var popup = that.buildPopup(person_id,person,votes);
						api.set('content.text',popup);
					});
					return '<img src="'+chrome.extension.getURL('images/wait.gif')+'" alt="Loading..." width="16" height="16">';
				}
			},
			events: {
				render: function (event,api) {
					var elem = api.elements.tip;
				}
			},
		    hide: {
		        fixed: true,
		        delay: 300
		    },
		    style: {
		    	width: 300,
		    	tip: {
		    		corner: true
		    	}
		    },
		    position: {
		    	viewport: $(window)
		    }
		});
	},

	highlightNames: function() {

		// Highlight MP names:

		for (var i = 0; i < mps.length; i++) {
			var member_id = mps[i].member_id;
			var person_id = mps[i].person_id;
			$('body').highlight(mps[i].name, { wordsOnly: true });
		}

		// Now go through highlights and add ID attributes:

		$('.highlight').each(function(){
			var id;
			for (var i = 0; i < mps.length; i++) {
				if (mps[i].name == $(this).html()) {
					id = mps[i].person_id;
				}
			}
			$(this).attr('id','person'+id);
		});

	},

	// This function adapted from
	// https://github.com/ollieglass/theyworkforyou-responsive
	distanceMeaning: function(score) {
		var desc = "Unknown about";
	    if (score > 0.95 && score <= 1.0) {
	        desc = "Almost always against";
	    } else if (score > 0.85) {
	        desc = "Consistently against";
	    } else if (score > 0.6) {
	        desc = "Generally against";
	    } else if (score > 0.4) {
	        desc = "A mixture of for and against";
	    } else if (score > 0.15) {
	        desc = "Generally for";
	    } else if (score > 0.05) {
	        desc = "Consistently for";
	    } else if (score >= 0.0) {
	        desc = "Almost always for";
	    }
	    return desc;
	},

	getVotes: function(mpInfo) {
		var votes = new Object;
		var regex = new RegExp('(\\d+)');
		for (var key in mpInfo) {
			if (mpInfo.hasOwnProperty(key)) {
				if (key.indexOf('public_whip_dreammp') > -1) {
					var item = key.replace('public_whip_dreammp','');
					var matches = regex.exec(item);
					if (matches) {
						var vote_id= matches[0];											
						item = item.replace(vote_id+'_','');
						if (!votes.hasOwnProperty(vote_id)) {
							votes[vote_id] = new Object;
						}
						// Add to vote array:
						votes[vote_id][item] = mpInfo[key];
						if (policies.hasOwnProperty(vote_id)) {
							votes[vote_id]['name'] = policies[vote_id];
						}
					}
				}
			}
		}
		for (var key in votes) {
			var vote = this.distanceMeaning(votes[key]['distance']);
			votes[key]['vote'] = vote;
		}
		return votes;
	},

	buildPopup: function(person_id,person,votes) {
		var mpLink = 'http://www.theyworkforyou.com/mp/'+person_id;
		var str = '<div class="twfy_modal">';
		if (person.image != null) {
			str += '<div class="pic">';
			str += '<a href="'+mpLink+'" target="_blank">';
			str += '<img src="http://www.theyworkforyou.com/'+person.image+'" border="0">';
			str += '</a>';
			str += '</div>';
		}
		str += '<p class="name"><a href="'+mpLink+'" target="_blank"><strong>'+person.full_name+'</strong></a></p>';
		str += '<p class="party"><strong>'+person.party+'</strong></p>';
		str += '<p class="constituency">'+person.constituency+'</p>';
		str += '<p class="votes_header"><strong>Voting record</strong> (<a href="'+mpLink+'/votes" target="_blank">More detail</a>)</p>';
		str += '<div class="votes">'
		str += '<ul>';
		for (var key in votes) {
			if (votes[key]['name']) {
				str += '<li>'+votes[key]['vote']+' <strong>'+votes[key]['name']+'</strong></li>';
			}
		}
		str += '</ul>';
		str += '</div>';
		str += '</div>';
		return str;
	}

};

app.init(twfy_key);