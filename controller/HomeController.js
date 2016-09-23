var HomeController = {
		home: function(req, res, next) {
  			res.render(
          //view
  				'index',
          //vars
  				{ 
            title: 'Home',
            cat: 'Home',
            ctlr:'computersCtrl',
            actions: false
  				});
		},
		computers: function(req, res, next) {
  			res.render(
            //view
  					'computers',
            //vars
  					{ 
              title: 'Computadores',
              cat: 'Computadores',
              lk:'Home',
              ctlr:'computersCtrl',
              actions: true
  				  });
		},
    screens: function(req, res, next) {
        res.render(
            //view
            'monitores',
            //vars
            { 
              title: 'Monitores',
              cat: 'Monitores',
              lk:'Home',
              ctlr:'screensCtrl',
              actions: true
            });
    },
    moveis: function(req, res, next) {
        res.render(
            //view
            'moveis',
            //vars
            { 
              title: 'Móveis',
              cat: 'Moveis',
              lk:'Home',
              ctlr:'moveisCtrl',
              actions: true
            });
    },
    others: function(req, res, next) {
        res.render(
            //view
            'others',
            //vars
            { 
              title: 'Outros',
              cat: 'Outros',
              lk:'Home',
              ctlr:'othersCtrl',
              actions: true
            });
    }

}

module.exports = HomeController;