module.exports = function(errorValue, errorID){

	/**
	 *	Glosario de errores
	 *	0 			--> No error
	 * 	1000 		--> Usuario no encontrado
	 */
	
	var errorList         = Array();
	errorList['err_0']    = 'No error';
	errorList['err_1000'] = 'User not found';
	errorList['err_1001'] = 'Incorrect Password or Email';

	var obj = {
		error: {
			value: errorValue,
			ID: errorID,
			Msg: errorList[errorID]
		}
	};

	return obj;
	
}