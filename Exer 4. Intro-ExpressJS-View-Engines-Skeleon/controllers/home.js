const Cube = require('../models/Cube');

function handleQueryErrors(from, to) {
    let errors = [];

    if (!from || !to) {
        errors.push('Please fill all difficulties!');
    }

    if (from < 1 || from > 6) {
        errors.push('From must be between 1 nad 6');
    }

    if (to < 1 || to > 6) {
        errors.push('To must be between 1 nad 6');
    }

    if (from > to) {
        errors.push('From must be less then to');
    }

    return errors;
}

module.exports = {
    homeGet: (req, res) => {
        Cube.find({})
            .select('_id name imageUrl difficulty')
            .sort('-difficulty')
            .then((cubes) => {
                res.render('index', { cubes });
            })
            .catch((e) => console.log(e))
    },
    about: (req, res) => {
        res.render('about');
    },
    search: (req, res) => {
        let { name, from, to } = req.query;
        from = Number(from);
        to = Number(to);

        let errors = handleQueryErrors(from, to);
        if (errors.length) {
            res.locals.globalErrors = handleQueryErrors(from, to);
            res.render('index');
            return;
        }

        if (name && from && to) {
            Cube.find({})
                .where('difficulty')
                .gte(from)
                .lte(to)
                .then((cubes) => {
                    const filtered = cubes.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));

                    res.render('index', { cubes: filtered });
                });
        } else if (name && from === 0 && to === 0) {
            Cube.find({ 'name': new RegExp(name, 'i') })
                .then((cubes) => {
                    const filtered = cubes.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));

                    res.render('index', { cubes: filtered });
                });
        }
    }
};