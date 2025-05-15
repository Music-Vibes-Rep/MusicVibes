//vamos a crear eventos ficticios, pendiente crear api que recoja directamente

const eventosMock = [
  {
    titulo: 'David Guetta en Madrid',
    descripcion: 'El famoso DJ mundial llega con un show lleno de luces, beats y energía electrónica.',
    fecha: '2025-06-03T21:00:00',
    lugar: 'WiZink Center, Madrid',
    url: 'https://www.wegow.com/es-es/conciertos/david-guetta-en-madrid',
    imagen: 'https://images.pexels.com/photos/1679825/pexels-photo-1679825.jpeg'
  },
  {
    titulo: 'Festival Río Babel 2025',
    descripcion: 'Música urbana, rock y fusión en uno de los festivales más esperados del verano.',
    fecha: '2025-07-12T18:00:00',
    lugar: 'Caja Mágica, Madrid',
    url: 'https://www.festivalriobabel.com/',
    imagen: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg'
  },
  {
    titulo: 'Love of Lesbian + Lori Meyers',
    descripcion: 'Dos gigantes del indie español en un concierto inolvidable.',
    fecha: '2025-06-20T20:00:00',
    lugar: 'IFEMA Live, Madrid',
    url: 'https://www.wegow.com/es-es/conciertos/love-of-lesbian-lori-meyers',
    imagen: 'https://images.pexels.com/photos/167446/pexels-photo-167446.jpeg'
  },
  {
    titulo: 'Nathy Peluso en directo',
    descripcion: 'La fuerza escénica de Nathy en un show que mezcla soul, trap y tango.',
    fecha: '2025-06-15T22:00:00',
    lugar: 'Teatro Eslava, Madrid',
    url: 'https://www.wegow.com/es-es/conciertos/nathy-peluso-en-madrid',
    imagen: 'https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg'
  },
  {
    titulo: 'Rozalén - Gira acústica',
    descripcion: 'Un concierto íntimo lleno de emoción, poesía y voz con alma.',
    fecha: '2025-06-07T20:30:00',
    lugar: 'Nuevo Teatro Alcalá, Madrid',
    url: 'https://www.entradas.com/artist/rozalen/',
    imagen: 'https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg'
  },
  {
    titulo: 'Festival Mad Cool 2025',
    descripcion: 'Los mejores artistas internacionales llegan a Madrid en el evento del año.',
    fecha: '2025-07-10T17:00:00',
    lugar: 'Espacio Mad Cool, Madrid',
    url: 'https://madcoolfestival.es/',
    imagen: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg'
  },
  {
    titulo: 'Vetusta Morla + Sidecars',
    descripcion: 'Concierto conjunto de dos bandas icónicas del panorama alternativo español.',
    fecha: '2025-06-25T20:00:00',
    lugar: 'IFEMA Live, Madrid',
    url: 'https://www.wegow.com/es-es/conciertos/vetusta-morla-sidecars',
    imagen: 'https://images.pexels.com/photos/167964/pexels-photo-167964.jpeg'
  },
  {
    titulo: 'Candlelight: Tributo a Queen',
    descripcion: 'Un tributo mágico a Queen a la luz de las velas en un entorno íntimo.',
    fecha: '2025-06-30T21:30:00',
    lugar: 'Ateneo de Madrid',
    url: 'https://feverup.com/m/101930',
    imagen: 'https://images.pexels.com/photos/1679826/pexels-photo-1679826.jpeg'
  },
  {
    titulo: 'Trueno en Madrid',
    descripcion: 'El artista argentino de rap y trap presenta su tour "El último baile".',
    fecha: '2025-03-13T21:00:00',
    lugar: 'WiZink Center, Madrid',
    url: 'https://www.seetickets.com/es/event/trueno/wizink-center/10000001',
    imagen: 'https://images.pexels.com/photos/167446/pexels-photo-167446.jpeg'
  },
  {
    titulo: 'O Gozo Festival: David Guetta + Guests',
    descripcion: 'David Guetta y artistas invitados en uno de los festivales más grandes de Galicia.',
    fecha: '2025-07-06T17:30:00',
    lugar: 'Monte do Gozo, Santiago de Compostela',
    url: 'https://www.livenation.es/show/1434568/o-gozo-festival-david-guetta-guests/santiago-de-compostela/2025-07-06/es',
    imagen: 'https://images.pexels.com/photos/1679827/pexels-photo-1679827.jpeg'
  },
  {
    titulo: 'Tomorrowland Immersive Experience',
    descripcion: 'Vive la magia de Tomorrowland en una experiencia audiovisual inmersiva.',
    fecha: '2024-10-25T17:30:00',
    lugar: 'WiZink Center, Madrid',
    url: 'https://immersive.tomorrowland.com/',
    imagen: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg'
  },
  {
    titulo: 'Dei V en concierto',
    descripcion: 'El artista puertorriqueño de moda presenta su show en Madrid.',
    fecha: '2025-04-01T21:00:00',
    lugar: 'WiZink Center, Madrid',
    url: 'https://baila.fm/eventos/concierto-dei-v-wizink-center-madrid-2025/',
    imagen: 'https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg'
  },
  {
    titulo: 'C. Tangana - Gira España 2025',
    descripcion: 'El fenómeno del rap y pop español presenta su nueva gira con temas inéditos.',
    fecha: '2025-09-05T21:00:00',
    lugar: 'Palau Sant Jordi, Barcelona',
    url: 'https://www.wegow.com/es-es/conciertos/c-tangana-en-barcelona',
    imagen: 'https://images.pexels.com/photos/167446/pexels-photo-167446.jpeg'
  },
  {
    titulo: 'Rosalía en concierto',
    descripcion: 'La superestrella internacional del flamenco urbano llega con su tour mundial.',
    fecha: '2025-08-15T22:00:00',
    lugar: 'Estadio Olímpico, Sevilla',
    url: 'https://www.wegow.com/es-es/conciertos/rosalia-en-sevilla',
    imagen: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg'
  },
  {
    titulo: 'Manuel Carrasco - Tour 2025',
    descripcion: 'El cantautor andaluz regresa con una gira llena de emociones y grandes éxitos.',
    fecha: '2025-10-10T20:30:00',
    lugar: 'Palacio de Deportes, Madrid',
    url: 'https://www.entradas.com/artist/manuel-carrasco/',
    imagen: 'https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg'
  },
  {
    titulo: 'Ibiza Sunset Festival',
    descripcion: 'Festival de música electrónica con los mejores DJs internacionales en la isla blanca.',
    fecha: '2025-07-20T18:00:00',
    lugar: 'Playa d’en Bossa, Ibiza',
    url: 'https://www.ibizasunsetfestival.com/',
    imagen: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg'
  },
  {
    titulo: 'La Pegatina + Ska-P',
    descripcion: 'Una noche explosiva de ska y rumba catalana con dos bandas legendarias.',
    fecha: '2025-06-28T21:00:00',
    lugar: 'Razzmatazz, Barcelona',
    url: 'https://www.wegow.com/es-es/conciertos/la-pegatina-ska-p',
    imagen: 'https://images.pexels.com/photos/167964/pexels-photo-167964.jpeg'
  },
  {
    titulo: 'Festival de Jazz de San Sebastián',
    descripcion: 'Encuentro anual con los mejores músicos de jazz nacionales e internacionales.',
    fecha: '2025-07-25T19:00:00',
    lugar: 'Teatro Victoria Eugenia, San Sebastián',
    url: 'https://www.jazzaldia.eus/',
    imagen: 'https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg'
  },
  {
    titulo: 'Muerdo en acústico',
    descripcion: 'Concierto íntimo con el cantautor murciano y su mezcla de folk y reggae.',
    fecha: '2025-06-18T20:00:00',
    lugar: 'Sala El Sol, Madrid',
    url: 'https://www.wegow.com/es-es/conciertos/muerdo-en-madrid',
    imagen: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg'
  },
  {
    titulo: 'El Barrio - Tour Flamenco 2025',
    descripcion: 'El emblemático artista gaditano vuelve con su gira de flamenco y rock.',
    fecha: '2025-09-12T21:00:00',
    lugar: 'Palacio de Congresos, Málaga',
    url: 'https://www.entradas.com/artist/el-barrio/',
    imagen: 'https://images.pexels.com/photos/1679826/pexels-photo-1679826.jpeg'
  }
];


exports.getEventos = async (req, res) => {
  res.render('eventos', { eventos: eventosMock, usuario: req.session.usuario });
};

exports.getEventosLanding = async (req, res) => {
  res.render('landing', { publicaciones: [], eventos: eventosMock, usuario: req.session.usuario });
};

exports.eventosMock = eventosMock;
