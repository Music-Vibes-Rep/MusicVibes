//vamos a crear eventos ficticios, pendiente crear api que recoja directamente

const eventosMock = [
  {
    titulo: 'David Guetta en Madrid',
    descripcion: 'El famoso DJ mundial llega con un show lleno de luces, beats y energía electrónica.',
    fecha: '2025-06-03T21:00:00',
    lugar: 'WiZink Center, Madrid',
    url: 'https://www.wegow.com/es-es/conciertos/david-guetta-en-madrid',
    imagen: 'https://images.unsplash.com/photo-1581404917879-7c38c2a4b8e2'
  },
  {
    titulo: 'Festival Río Babel 2025',
    descripcion: 'Música urbana, rock y fusión en uno de los festivales más esperados del verano.',
    fecha: '2025-07-12T18:00:00',
    lugar: 'Caja Mágica, Madrid',
    url: 'https://www.festivalriobabel.com/',
    imagen: 'https://images.unsplash.com/photo-1535930749574-1399327ce78f'
  },
  {
    titulo: 'Love of Lesbian + Lori Meyers',
    descripcion: 'Dos gigantes del indie español en un concierto inolvidable.',
    fecha: '2025-06-20T20:00:00',
    lugar: 'IFEMA Live, Madrid',
    url: 'https://www.wegow.com/es-es/conciertos/love-of-lesbian-lori-meyers',
    imagen: 'https://images.unsplash.com/photo-1598387847036-5aa769fc1744'
  },
  {
    titulo: 'Nathy Peluso en directo',
    descripcion: 'La fuerza escénica de Nathy en un show que mezcla soul, trap y tango.',
    fecha: '2025-06-15T22:00:00',
    lugar: 'Teatro Eslava, Madrid',
    url: 'https://www.wegow.com/es-es/conciertos/nathy-peluso-en-madrid',
    imagen: 'https://images.unsplash.com/photo-1603190292077-7444f7f5bb0d'
  },
  {
    titulo: 'Rozalén - Gira acústica',
    descripcion: 'Un concierto íntimo lleno de emoción, poesía y voz con alma.',
    fecha: '2025-06-07T20:30:00',
    lugar: 'Nuevo Teatro Alcalá, Madrid',
    url: 'https://www.entradas.com/artist/rozalen/',
    imagen: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15'
  },
  {
    titulo: 'Festival Mad Cool 2025',
    descripcion: 'Los mejores artistas internacionales llegan a Madrid en el evento del año.',
    fecha: '2025-07-10T17:00:00',
    lugar: 'Espacio Mad Cool, Madrid',
    url: 'https://madcoolfestival.es/',
    imagen: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2'
  },
  {
    titulo: 'Vetusta Morla + Sidecars',
    descripcion: 'Concierto conjunto de dos bandas icónicas del panorama alternativo español.',
    fecha: '2025-06-25T20:00:00',
    lugar: 'IFEMA Live, Madrid',
    url: 'https://www.wegow.com/es-es/conciertos/vetusta-morla-sidecars',
    imagen: 'https://images.unsplash.com/photo-1506157786151-b8491531f063'
  },
  {
    titulo: 'Candlelight: Tributo a Queen',
    descripcion: 'Un tributo mágico a Queen a la luz de las velas en un entorno íntimo.',
    fecha: '2025-06-30T21:30:00',
    lugar: 'Ateneo de Madrid',
    url: 'https://feverup.com/m/101930',
    imagen: 'https://images.unsplash.com/photo-1497032205916-ac775f0649ae'
  }
];

exports.getEventos = async (req, res) => {
  res.render('eventos', { eventos: eventosMock, usuario: req.session.usuario });
};

exports.getEventosLanding = async (req, res) => {
  res.render('landing', { publicaciones: [], eventos: eventosMock, usuario: req.session.usuario });
};

exports.eventosMock = eventosMock;
