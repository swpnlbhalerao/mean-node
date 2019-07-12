const router = require('express').Router();
const Business = require('../models/Business')



router.post('/add', (req, res) => {
    let business = new Business(req.body);
    console.log(req.body);
    business.save()
        .then(business => {
            res.status(200).json({ 'business': 'business in added successfully' });
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
})

router.get('/', (req, res) => {

    Business.find(function (err, business) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(business);
        }
    });
})


router.get('/edit/:id', (req, res) => {
    let id = req.params.id;
    Business.findById(id, function (err, business) {
        res.json(business);
    });
})

router.post('/update/:id', (req, res) => {
    Business.findById(req.params.id, function (err, business) {
        if (!business)
            //return next(new Error('Could not load Document'));
            res.status(400).send("Could not load Document");
        else {
            business.person_name = req.body.person_name;
            business.business_name = req.body.business_name;
            business.business_gst_number = req.body.business_gst_number;

            business.save().then(business => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Business.findByIdAndRemove({ _id: req.params.id }, function (err, business) {
        if (err) res.json(err);
        else res.json('Successfully removed');
    });
});


module.exports = router;