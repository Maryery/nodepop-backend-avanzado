'use strict';

const conn = require('./lib/connectMongoose');
const Anuncio = require('./models/Anuncio');
const Tag = require('./models/Tag.js');

conn.once('open', async () => {
  try {

    await initAnuncios();
    await initTags();
    conn.close();

  } catch(err) {
    console.error('There was an error:', err);
    process.exit(1);
  }
});

async function initAnuncios() {
    await Anuncio.deleteMany();
    await Anuncio.insertMany([
        { name: 'Bicycle', sell: true, price: 150, photo: 'bicycle.jpg', tags: ['lifestyle', 'motor']},
        { name: 'Iphone 3GS', sell: false, price: 100, photo: 'iphone.jpg', tags: ['lifestyle','mobile']},
        { name: 'Laptop HP', sell: true, price: 500, photo: 'hp.jpg', tags: ['lifestyle','work']},
        { name: 'Samsung galaxy S9', sell: false, price: 450, photo: 'samsung.jpg', tags: ['lifestyle','mobile']},
    ]);
}

async function initTags() {
  await Tag.deleteMany();
  await Tag.insertMany([
    { tag: 'lifestyle' },
    { tag: 'work' },
    { tag: 'motor' },
    { tag: 'mobile' },
  ]);
}