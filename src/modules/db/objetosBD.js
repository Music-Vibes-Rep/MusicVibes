//vmaos a colocar objetos de las bases de datos para exportarlos luego, de esta manera podemos indexar rapidamente las tablas desde el vscode
//de esta manera podemos autocompletar y saber que atributos tiene cada tabla
//accederemos importando, luego lo queharemos sera acceder al objeto (ex: usuario.nombre = "juan") 
//sin necesidad de mirar la bd para saber que tenemos que usar



//usuario

const usuario = {
    id_usuario: null,
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    foto_perfil: '',
    descripcion: '',
    fecha_creacion: null,
    es_musico: null,
    id_instrumento: null,
    id_provincia: null
  };

//publicaciones

const publicacion = {
    id_publicacion: null,
    fecha_publicacion: null,
    contenido: '',
    foto: '',
    id_usuario: null
  };
 
// follow
const follow = {
  id_follow: null,
  fecha_follow: null,
  seguidor: null,
  seguido: null
};

//provincias

const provincia = {
  id_provincia: null,
  provincia:""
};

//comentarios
const comentario = {
  id_comentario: null,
  comentario:"",
  fecha_comentario: null,
  id_usuario: null,
  id_publicacion: null
};
//genero musical
const genero_musical = {
  id_genero: null,
  nombre:""
};
//instrumento
const instrumento = {
  id_instrumento: null,
  nombre:"",
  tipo: null
};
//like_publicacion
const like_publicacion = {
  id_like: null,
  id_usuario: null,
  id_publicacion: null,
  fecha_like: null
};
//usuario_genero
const usuario_genero = {
  id_usuario_genero: null,
  id_usuario: null,
  id_genero: null
};
//usuario_instrumento
const usuario_instrumento = {
  id_usuario_instrumento: null,
  id_usuario: null,
  id_instrumento: null
};
//tipo instrumento
const tipo_instrumento = {
  id_tipo_instrumento: null,
  nombre: ""
};
/*
module.exports = usuario;
module.exports = instrumento;
module.exports = tipo_instrumento;
module.exports = genero_musical;
module.exports = comentario;
module.exports = usuario_instrumento;
module.exports = usuario_genero;
module.exports = provincia;
module.exports = like_publicacion;
module.exports = follow;
module.exports = publicacion;
*/

module.exports = {
  usuario,
  publicacion,
  follow,
  provincia,
  comentario,
  genero_musical,
  instrumento,
  like_publicacion,
  usuario_genero,
  usuario_instrumento,
  tipo_instrumento
};

//linea 100, me hacia ilu :D