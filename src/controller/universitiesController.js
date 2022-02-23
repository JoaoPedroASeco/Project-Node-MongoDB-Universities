const express = require('express');
const router = express.Router();
const api = require('axios');

const University = require('../models/University');

router.get('/registeruniversities', async ( req, res ) => {
    const countries = [
        "argentina",
        "brazil",
        "chile",
        "colombia",
        "paraguay",
        "peru",
        "suriname",
        "uruguay"
    ];
        
    try {
        for(const [key, value] of Object.entries(countries)) {
            const { data } = await api.get(`http://universities.hipolabs.com/search?country=${value}`);
            
            for (const [key, value] of Object.entries(data)) {
                await University.create({ 
                    alpha_two_code: value.alpha_two_code, 
                    web_pages: value.web_pages,
                    name: value.name,
                    country: value.country,
                    domains: value.domains,
                });
            }
        }

        return res.send({ message: "success" });
    } catch (err) {
        return res.status(400).send({ error: `Registration failed ${err}` });
    }
})

router.get('/universities', async ( req, res, next ) => {

    try {
        University.find({}, async function( err, universities ) { 

            let allUniversities = [];

            for (let i = 0; i < universities.length; i++) {

                const data = { 
                    _id: universities[i]._id,
                    nome: universities[i].name, 
                    pais: universities[i].country, 
                    estado: undefined
                };

                if(req.query.id && req.query.country) {
                    if( universities[i].country == req.query.country && universities[i]._id == req.query.id ) {
                        await allUniversities.push(data);
                    }
                }else if(req.query.id && !req.query.country) {
                    if(universities[i]._id == req.query.id) {
                        await allUniversities.push(data);
                    }
                }else if(!req.query.id && req.query.country) {
                    if(universities[i].country == req.query.country) {
                        await allUniversities.push(data);
                    }
                }else {
                    await allUniversities.push(data);
                }
            }

            if(req.query.limit_20 && req.query.limit_20 == "false" ) {                
                return res.send(allUniversities);
            }else if(!req.query.limit_20 || req.query.limit_20 == "true" ) {
                let limitedUniversities = [];

                for (let i = 0; i < 20; i++) {
                    await limitedUniversities.push(allUniversities[i]);
                }

                return res.send( limitedUniversities );
            }
        })
    }catch (err) {
        res.status(400).send({ error: `Error ${err}`});
    }
})

router.post('/universities', async ( req, res ) => {
    const { alpha_two_code, web_pages, name, country, domains, state_province } = req.body;
    const data = { alpha_two_code, web_pages, name, country, domains, state_province };

    try { 
        if( await University.findOne({ name })) 
            return res.status(400).send({ error: "University alredy exists" })

        const university = await University.create(data)
            
        return res.send({ university })
    } catch (err) {
        return res.status(400).send({ error: `Registration failed ${err}` })
    }
});

router.put('/universities/:id', async ( req, res ) => {
    const { web_pages, name, domains } = req.body;

    try {
        await University.findOneAndUpdate({ _id: req.params.id }, {
            name: name,
            web_pages: web_pages,
            domains: domains,
        } );

        return res.send({ message: "success" });
    }catch (err) {
        return res.status(400).send({ error: `Error on update ${err}`})
    }
})

router.delete('/universities/:id', async ( req, res ) => {
    try {
        await University.findOneAndDelete({ _id: req.params.id });

        return res.send({ message: "success" });
    }catch (err) {
        return res.status(400).send({ error: `Error on update ${err}`})
    }
})

module.exports = app => app.use('', router);
