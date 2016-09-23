 //DB
var mongojs = require('mongojs');
var db = mongojs('mongodb://reamp:reamp#159@ds017544.mlab.com:17544/inventario_db', ['equipamentos']);


var inventarioController = {

	getDb: function(req, res){
			db.equipamentos.find(function(err, list){
				res.json(list);
			});
		},
	postDb: function(req, res){
			db.equipamentos.insert(req.body, function(err, list){
				res.json(list);
			});
	},
	updDb: function(req, res){
			var id = req.params.id;
				//achando os dados pelo id e modificando
				db.equipamentos.findAndModify({query: {_id: mongojs.ObjectId(id)},
					//novo update dos daods do body , nome , email e numero
					update: {$set: 
								{ 
									patrimonio: req.body.patrimonio,
									item: req.body.item, 
									marca: req.body.marca,
									modelo: req.body.modelo,
									config: req.body.config,
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
			db.equipamentos.remove({_id: mongojs.ObjectId(id)}, function(err, docs){
				if(err){
					return;
					console.log(err);
				}
				else{
					//enviando e recebendo json
					res.json(docs);
				}
			});
	},
	
	// close:function(){db.close();} 
}

module.exports = inventarioController;