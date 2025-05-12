const express = require('express');
const router = express.Router();
const axios = require('axios');

const EVENTBRITE_TOKEN = process.env.EVENTBRITE_TOKEN;
const CIUDAD = 'madrid';

router.get('/eventos', async (req, res) => {
  try {
    if (!EVENTBRITE_TOKEN) {
      console.error('⚠️ EVENTBRITE_TOKEN no definido en .env');
      return res.status(500).send('Token de Eventbrite no configurado');
    }

    const ebURL = `https://www.eventbriteapi.com/v3/events/search/?location.address=${CIUDAD}&categories=103&expand=venue`;
    const ebRes = await axios.get(ebURL, {
      headers: { Authorization: `Bearer ${EVENTBRITE_TOKEN}` }
    });

    const eventos = ebRes.data.events.slice(0, 6).map(ev => ({
      fuente: 'Eventbrite',
      titulo: ev.name.text,
      descripcion: ev.description?.text?.slice(0, 200) || '',
      fecha: ev.start.local,
      lugar: ev.venue?.address?.localized_address_display || 'Sin dirección',
      url: ev.url,
      imagen: ev.logo?.url
    }));

    res.render('eventos', { eventos });
  } catch (error) {
    console.error('❌ Error al cargar eventos:', error.message);
    res.status(500).send('Error al obtener eventos de Eventbrite');
  }
});

module.exports = router;
