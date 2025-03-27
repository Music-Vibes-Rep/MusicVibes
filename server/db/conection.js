//crear conexion de base de datos
var mysql = require('mysql2');

var conn = mysql.createConnection({
    host : 'localhost',
    database : 'MusicVibes',
    user :  'root',
    password : '1234'

});
//conectar la base de datos
//mostrar un mensaje para la base de datos exitosa, sino, mostraremos un error
conn.connect((error) => {
    if (error){
        console.log("Error, no se ha podido conectar a la base de datos");
        return;
    }
        console.log("Conexion creada exitosamente!");
    
        conn.end((error) => {
            if (error){
                console.log("Error al cerrar la base de datos");
                return;
            }
            //borrar cuando se use porque sino se cerrara siempre
            console.log("Conexion cerrada con exito");
        });


});
