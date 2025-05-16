//aqui guardamos todas las logicas para los filtros

const { publicacion } = require("../db/objetosBD");

module.exports = {
  usuarios: (db, { q }, cb) => {
    const like = `%${q || ''}%`;
    db.query(`
      SELECT u.id_usuario, u.Nombre, u.Apellido, u.descripcion, u.foto_perfil,
             u.es_musico, i.Nombre AS instrumento, p.Provincia AS provincia
      FROM Usuario u
      LEFT JOIN Instrumento i ON u.id_instrumento = i.id_instrumento
      LEFT JOIN Provincia p ON u.id_provincia = p.id_provincia
      WHERE u.Nombre LIKE ? OR u.Apellido LIKE ? OR i.Nombre LIKE ? OR p.Provincia LIKE ?
    `, [like, like, like, like], cb);
  },
//publicaciones
  publicaciones: (db, { q }, cb) => {
    const like = `%${q || ''}%`;
    db.query(`
      SELECT p.*, u.Nombre AS nombre_usuario, u.foto_perfil
      FROM Publicacion p
      JOIN Usuario u ON p.id_usuario = u.id_usuario
      WHERE p.contenido LIKE ?
    `, [like], cb);
  },
//filtrar musicos
  musicos: (db, { es_musico }, cb) => {
    db.query(`
      SELECT u.id_usuario, u.Nombre, u.Apellido, u.descripcion, u.foto_perfil,
             i.Nombre AS instrumento, p.Provincia AS provincia
      FROM Usuario u
      LEFT JOIN Instrumento i ON u.id_instrumento = i.id_instrumento
      LEFT JOIN Provincia p ON u.id_provincia = p.id_provincia
      WHERE u.es_musico = ?
    `, [es_musico || 1], cb);
  },
//filtrar provincias
  provincia: (db, { provincia }, cb) => {
    const like = `%${provincia || ''}%`;
    db.query(`SELECT * FROM Provincia WHERE Provincia LIKE ?`, [like], cb);
  },
//f generos
  genero: (db, { genero }, cb) => {
    const like = `%${genero || ''}%`;
    db.query(`SELECT * FROM Genero_Musical WHERE nombre LIKE ?`, [like], cb);
  },
//filtrado de perfil
  perfil: (db, { qry, es_musico, provincia }, cb) => {
    let sql = `
      SELECT u.id_usuario, u.Nombre, u.Apellido, u.descripcion, u.foto_perfil,
             u.es_musico, i.Nombre AS instrumento, p.Provincia AS provincia
      FROM Usuario u
      LEFT JOIN Instrumento i ON u.id_instrumento = i.id_instrumento
      LEFT JOIN Provincia p ON u.id_provincia = p.id_provincia
      WHERE 1 = 1
    `;

    const params = [];

    if (qry) {
      sql += ` AND (u.Nombre LIKE ? OR u.Apellido LIKE ?)`;
      params.push(`%${qry}%`, `%${qry}%`);
    }

    if (es_musico !== undefined) {
      sql += ` AND u.es_musico = ?`;
      params.push(es_musico);
    }

    if (provincia) {
      sql += ` AND p.Provincia LIKE ?`;
      params.push(`%${provincia}%`);
    }

    db.query(sql, params, cb);
  }
};
