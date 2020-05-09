const jimp = require('jimp');

async function resize(imgName) {
    try {
        const img = await jimp.read(`../../public/assets/img/${imgName}`);

        await img.resize(100, 100);

        await img.writeAsync(`../../public/assets/img/tn-${imgName}`);
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = resize;