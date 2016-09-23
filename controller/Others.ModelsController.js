var mongojs = require('mongojs');
var db = mongojs('mongodb://reamp:reamp#159@ds017544.mlab.com:17544/inventario_db', ['outros']);


var inventarioController = {
	getDb: function(req, res){
			db.outros.find(function(err, list){
				res.json(list);
			});
		},
	postDb: function(req, res){
			db.outros.insert(req.body, function(err, list){
				res.json(list);
			});
	},
	updDb: function(req, res){
			var id = req.params.id;
				//achando os dados pelo id e modificando
				db.outros.findAndModify({query: {_id: mongojs.ObjectId(id)},
					//novo update dos daods do body , nome , email e numero
					update: {$set: 
								{ 
									patrimonio: req.body.patrimonio,
									tipo: req.body.tipo, 
									marca: req.body.marca,
									modelo: req.body.modelo,
									sn: req.body.sn,
									user: req.body.user,
									departamento: req.body.departamento,
									ref: req.body.ref,
									itemImg: req.body.itemImg,
									imgNf: req.body.imgNf
								}},
					new: true},
					//enviando e recebendo json
		 			function(err, list){
		 				if(err){
		 					console.log(err)
		 				}
		 				else{
							res.json(list);
						}
				});
	},
	delDb: function(req , res){
			//pegando o paramtro id enviado pelo controller angular e passando pra URL
			var id = req.params.id;
			console.log(id);
			db.outros.remove({_id: mongojs.ObjectId(id)}, function(err, docs){
				if(err){
					return;
					console.log(err);
				}
				else{
					//enviando e recebendo json
					res.json(docs);
				}
			});
	} 
}

module.exports = inventarioController;