
import { validationResult } from 'express-validator';
import therapy from '../models/therapy.js';
import user from '../models/user.js';



export function getAll(req, res) {
    therapy
        .find({})
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });

}
export function addOnce(req, res) {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }
    user.findOne({ _id: req.query.idUser }).then(user => {

        therapy
            .create({
                titre: req.body.titre,
                date: req.body.date,
                address: req.body.address,
                description: req.body.description,

                capacity: req.body.capacity,
                dispo: req.body.dispo,
                user: user,
                image: `${req.protocol}://${req.get('host')}/image/${req.file.filename}`
            })
            .then(newTherapy => {
                res.status(201).send({ therapy: newTherapy });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: err });
            });
    }).catch(err => res.status(404).json({ error: "user not found!" }))



}



export function getOnce(req, res) {
    therapy
        .findOne({ user: req.params.id })
        .then(doc => {
            res.status(200).json([doc]);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}
export function putAll(req, res) {
    Therapy
        .updateMany({}, { "dispo": true })
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}



export function patchOnce(req, res) {
    Game
        .findOneAndupdate({ "titre": req.params.name }, { "dispo": false })
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}

export function deleteOnce(req, res) {
    Game
        .findOneAndRemove({ "titre": req.params.name })
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}
/*export function deleteOnce(req, res) {
    Game
    .remove( {"onSale":false})
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({ error: err});
       });
}*/
