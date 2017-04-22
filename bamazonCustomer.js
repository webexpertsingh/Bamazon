var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'Bamazon'
});

connection.connect(function(err){
	if(err) throw err;
	console.log("connected as id "+connection.threadId);
});

connection.query("SELECT * FROM products", function(err, res) {
if(err) throw err;
for(var i=0; i<res.length; i++){
	console.log(res[i].term_id +" | "+ res[i].product_name +" | "+ res[i].department_name +" | "+ res[i].price +" | "+ res[i].stock_quantity);
}
});

 var postQuestions =  [
     {
        type:'input',
        name:'term_id',
        message:'What is the id of the product?'
    },
    {
        type:'input',
        name:'units',
        message:'how many units of the product you would like to buy?'
    }
   ]

   inquirer.prompt(postQuestions).then(function (answers){
    	var term_id = answers.term_id;
    	var units = answers.units;

    	connection.query("SELECT * FROM products where?",{term_id:term_id}, function(err, res) {
			if(err) throw err;
			//console.log(res[0].stock_quantity);
			//console.log(units);
			if (units <= res[0].stock_quantity){
				var new_units = res[0].stock_quantity - units;
				connection.query("update products set? where?",[{stock_quantity:new_units}, {term_id:term_id}], function(err, res){
						if(err) throw err;
						console.log("Order placed! Thanks");
				});
			} else {
				console.log("Insufficient quantity!");
			}
		});
    });