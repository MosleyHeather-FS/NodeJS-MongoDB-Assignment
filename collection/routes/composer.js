const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Composer = require("../models/composer");
const messages = require("../../messages/messages");

router.get("/", (req, res, next) => {
  Composer.find({
    title: req.body.title,
    composer: req.body.composer,
  })
    .select("name")
    .populate("title composer")
    .exec()
    .then((composer) => {
        if (!composer) {
          console.log(composer);
          return res.status(404).json({
            message: messages.composer_not_found,
          });
        }
      res.json({
        title: req.body.title,
        composer: req.body.composer,
      });
    });
});

router.post("/", (req, res, next) => {
  Composer.find({
    title: req.body.title,
    composer: req.body.composer,
  })
    .select("name _id")
    .exec()
    .then((result) => {
      console.log(result);
      if (result.length > 0) {
        return res.status(406).json({
          message: messages.composer_already_cataloged,
        });
      }
    })

      const newComposer = new Composer({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        composer: req.body.composer,
      });

      // write to the db
      newComposer
        .save()
        .then((result) => {
          console.log(result);
          res.status(200).json({
            message: messages.composer_created,
            composer: {
              title: result.title,
              composer: result.composer,
              id: result._id,
              metadat: {
                method: result.method,
                host: req.hostname,
              },
            },
          });
        })
        .catch((err) => {
          console.log(err.message);
          res.status(500).json({
            error: {
              message: err.message,
            },
          });
        });
    });

router.get("/:composerId", (req, res, next) => {
  const composerId = req.params.composerId;
  Composer.findById({_id:composerId})
    .select("name _id")
    .populate("composition", "title composer")
    .exec()
    .then((composer) => {
      if (!composer) {
        console.log(composer);
        return res.status(404).json({
          message: messages.composer_not_found,
        });
      }
      res.status(201).json({
        composer: composer,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: {
          message: err.message,
        },
      });
    });
});

router.patch("/:composerId", (req, res, next) => {
  const composerId = req.params.composerId;
  const updatedComposer = {
    title: req.body.title,
    composer: req.body.composer,
  };
  Composer.find({
    title: req.body.title,
    composer: req.body.composer,
  })
    .select("name _id")
    .exec()
    .then((result) => {
      console.log(result);
      if (result.length > 0) {
        return res.status(406).json({
          message: messages.composer_already_cataloged,
        });
      }

      Composer.updateOne(
        {
          _id: composerId,
        },
        {
          $set: updatedComposer,
        }
      )
        .then((result) => {
          res.status(200).json({
            message: messages.composer_updated,
            composer: {
              title: result.title,
              composer: result.composer,
              id: result._id,
            },
            metadata: {
              host: req.hostname,
              method: req.method,
            },
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: {
              message: err.message,
            },
          });
        });
    });
});

router.delete("/:composerId", (req, res, next) => {
  const composerId = req.params.composerId;
  Composer.deleteOne({
    _id: composerId,
  })
    .select("name _id")
    .exec()
  //Composer.findById(composerId)
    .then((composer) => {
      if (!composer) {
        console.log(composer);
        return res.status(404).json({
          message: messages.composer_not_found,
        });
      }
      res.status(200).json({
        message: messages.composer_deleted,
        request: {
          method: "GET",
          url: "http://localhost:3000/composers/" + composerId,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: {
          message: err.message,
        },
      });
    });
});

module.exports = router;
