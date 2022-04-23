const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Composition = require("../models/composition");

router.get("/", (req, res, next) => {
    res.json({
        message: "Compositions - GET"
    });
});

router.post("/", (req, res, next) => {
    const newComposition = new Composition({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        composer: req.body.composer
    });
    
    // write to the db
    newComposition.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Composition Created",
                composition: {
                    title: result.title,
                    composer: result.composer,
                    id: result._id,
                    metadat: {
                        method: result.method,
                        host: req.hostname
                    }
                }
            })
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).json({
                error: {
                    message: err.message
                }
            })
        })
});

router.get("/:id", (req, res, next) => {
    const id = req.params.id;
    
    const getComposition = {
        title: req.body.title,
        composer: req.body.composer
    };

    Composition.updateOne({
        _id: id
    }, {
        $set: getComposition
    }).then(result => {
        res.status(200).json({
            message: "Received Composition",
            composition: {
                title: result.title, 
                composer: result.composer, 
                id: result._id
            },
            metadata: {
                host: req.hostname,
                method: req.method
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: {
                message: err.message
            }
        })
    });
});

router.patch("/:id", (req, res, next) => {
    const id = req.params.id;
    
    const updatedComposition = {
        title: req.body.title,
        composer: req.body.composer
    };

    Composition.updateOne({
        _id: id
    }, {
        $set: updatedComposition
    }).then(result => {
        res.status(200).json({
            message: "Updated Composition",
            composition: {
                title: result.title, 
                composer: result.composer, 
                id: result._id
            },
            metadata: {
                host: req.hostname,
                method: req.method
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: {
                message: err.message
            }
        })
    });
});

router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    
    const deletedComposition = {
        title: req.body.title,
        composer: req.body.composer
    };

    Composition.updateOne({
        _id: id
    }, {
        $set: deletedComposition
    }).then(result => {
        res.status(200).json({
            message: "Composition Deleted",
            composition: {
                title: result.title, 
                composer: result.composer, 
                id: result._id
            },
            metadata: {
                host: req.hostname,
                method: req.method
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: {
                message: err.message
            }
        })
    });
});


module.exports = router;