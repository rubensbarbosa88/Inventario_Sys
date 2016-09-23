app.controller('moveisCtrl', function ($scope, $http) {
	$scope.itens = [];
	$scope.arrayCsv = [];
	$scope.itemObj = {};
	$scope.procurar = "";
	$scope.footer = true;


//getDb function
	function refresh(){
		$http.get('/moveis/inventmoveis').success(function(data){
				$scope.itens = data;
				$scope.load_table = true;
				$scope.table_itens = true;
				$scope.mostrando = true;
				$scope.btn_plus = true;
				$scope.btn_less = true;

				angular.forEach(data, function(i,o){
					$scope.arrayCsv.push(
						{
							patrimonio:data[o].patrimonio,
							tipo:data[o].tipo,
							marca:data[o].marca,
							descricao:data[o].descricao,
							//sn:data[o].sn,
							local:data[o].local,
							ref:data[o].ref,
							itemImg:data[o].itemImg,
							imgNf:data[o].imgNf
						}
					);
				});		
				
			}).error(function(data, status){
				alert("Erro " + status)
		})
	}
	refresh();

$scope.hoverIn = function(ul){
	ul.dropdown = true;
}
$scope.hoverOut = function(ul){
	ul.dropdown = false;
}

//Form show function
	$scope.formShow = false;
	$scope.validateShow = 0;
	$scope.showForm = function(){
		if($scope.validateShow == 0){
				$scope.formShow = true;
				$scope.validateShow += 1;
		
		}
		else if($scope.validateShow > 0){
				$scope.formShow = false;
				$scope.validateShow -= 1;
		
		}
	}

//limit list max and min
	$scope.botao = 10;
	//max
	$scope.mplus  = function(){
		if($scope.botao >= $scope.itens.length){
			angular.element(
						Materialize.toast('Este é o numero maximo de itens',2000,'toast-max')
					)
			return;
		}
		else{
			$scope.botao += 10;
			if($scope.botao >= $scope.itens.length){
				$scope.botao = $scope.itens.length;
			}
		}
	}
	//min
	$scope.mlow  = function(){
		if($scope.botao <= 10){
			angular.element(
						Materialize.toast('Não é possivel mostrar menos do que 10 itens',2000,'toast-max')
					)
			return;
		}
		else{
			$scope.botao -= 10;
			if($scope.botao <= 10){
				$scope.botao = 10;
			}
		}
	}

//-Order list function
	/*var ValidateType = Object.freeze({Cresc: 0, Des: 1});

	var columnsValidate = {
		patrimonio: ValidateType.Cresc,

	}*/

	$scope.orderValidate = [0,1,1,1,1,1,1,1];
	$scope.order = 'patrimonio';
	$scope.orderShow = "Patrimônio";
	//
	$scope.pat = function(){
		if($scope.orderValidate[0] == 0){
			$scope.order = '-patrimonio';
			$scope.orderShow = "Patrimônio";
			$scope.orderValidate[0] += 1;
		}
		else if($scope.orderValidate[0] == 1){
			$scope.order = 'patrimonio';
			$scope.orderShow = "Patrimônio";
			$scope.orderValidate[0] -= 1;
		}
	}
	$scope.tipo = function(){
		if($scope.orderValidate[1] == 0){
			$scope.order = '-tipo';
			$scope.orderShow = "Tipo";
			$scope.orderValidate[1] += 1;
		}
		else if($scope.orderValidate[1] == 1){
			$scope.order = 'tipo';
			$scope.orderShow = "Tipo";
			$scope.orderValidate[1] -= 1;
		}		
	}
	$scope.marca = function(){
		if($scope.orderValidate[2] == 0){
			$scope.order = '-marca';
			$scope.orderShow = "Marca";
			$scope.orderValidate[2] += 1;
		}
		else if($scope.orderValidate[2] == 1){
			$scope.order = 'marca';
			$scope.orderShow = "Marca";
			$scope.orderValidate[2] -= 1;
		}		
	}
	// $scope.sn = function(){
	// 	if($scope.orderValidate[4] == 0){
	// 		$scope.order = '-sn';
	// 		$scope.orderShow = "Numero de Série";
	// 		$scope.orderValidate[4] += 1;
	// 	}
	// 	else if($scope.orderValidate[4] == 1){
	// 		$scope.order = 'sn';
	// 		$scope.orderShow = "Numero de Série";
	// 		$scope.orderValidate[4] -= 1;
	// 	}
	// }	
	$scope.local = function(){
		if($scope.orderValidate[6] == 0){
			$scope.order = '-local';
			$scope.orderShow = "Local";
			$scope.orderValidate[6] += 1;
		}
		else if($scope.orderValidate[6] == 1){
			$scope.order = 'local';
			$scope.orderShow = "Local";
			$scope.orderValidate[6] -= 1;
		}
	}
	$scope.ref = function(){
		if($scope.orderValidate[7] == 0){
			$scope.order = '-ref';
			$scope.orderShow = "Referência";
			$scope.orderValidate[7] += 1;
		}
		else if($scope.orderValidate[7] == 1){
			$scope.order = 'ref';
			$scope.orderShow = "Referência";
			$scope.orderValidate[7] -= 1;
		}	
	}
	
	

//Submit / ADD NEW ITEM function
	$scope.submitted = false;
	$scope.enviar = function(form){
		$scope.submitted = true;
			if(form.$invalid){
				return;
			}
			else{
				$http.post('/moveis/inventmoveis', $scope.itemObj).success(function(data){
					$scope.submitted = false;
					$scope.itemObj = "";
					angular.element(
						Materialize.toast('Item adicionado com sucesso',2000,'toast-del-ok')
					)

				}).error(function(data,status){
					alert("Não foi possivel adicionar esse item devido algum problema de conexão com o servidor \n Erro informado: "  + status);
				});
			}
		refresh();
	}

//UPDATE A ITEM
	$scope.update = function(id, item){
		$http.put('/moveis/inventmoveis/' + id, item).success(function(data){
			angular.element(
						Materialize.toast('Item editado com sucesso',2000,'toast-del-ok')
					)	
			item.editing = false;
			item.edit = false;
		}).error(function(data, status){
			alert("Não foi possivel editar esse item devido algum problema de conexão com o servidor \n Erro informado: "  + status);
			item.editing = false;
			item.edit = false;
		});
	refresh();
	}

//DELETE ITEM
	$scope.delete = function(id, item){
		item.dropdown = false;
		//Abre a modal
		angular.element(
						$('#modal1').openModal()
					)
		//passa os dados do item para a variavel description
		$scope.description = item;
		//Caso clicar em SIM
		$scope.sim = function(){
			//Delete	
			$http.delete('/moveis/inventmoveis/' + id, item).success(function(data){
				//Sucesso - Abre o toast
				angular.element(
						Materialize.toast('Item deletado com sucesso',2000,'toast-del-ok')
					)							
			}).error(function(data, status){
				//Erro - abre o alert
				alert("Não foi possivel deletar esse item devido algum problema de conexão com o servidor \n Erro informado: "  + status);
			});
			//Atualiza os dados do DB
			refresh();
		}
		//Caso clicar em Não
		$scope.nao = function(){
			//Para a operação por aqui	
			return;
		}
	}
//MORE DATAILS
	$scope.detals = function(item){
		item.dropdown = false;
		//Abre a modal
		angular.element(
						$('#modal2').openModal()
					)
		//passa os dados do item para a variavel description
		$scope.description = item;
		
	}


});