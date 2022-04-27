const express = require("express");
const router = express.Router();
const Composer = require("../models/composer");
const Messages = require("../../messages/messages");

router.get("/", (req, res, next) => {
  res.json({
    message: "Composers - GET",
  });
});

router.post("/", (req, res, next) => {
  res.json({
    message: "Composers - POST",
  });
});

router.get("/:composerId", (req, res, next) => {
  const composerId = req.params.composerId;
  Composer.findById(composerId)
    .select("name _id")
    .populate("composition", "title composer")
    .exec()
    .then((composer) => {
      if (!composer) {
        console.log(composer);
        return res.status(404).json({
          message: Messages.composer_not_found,
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
  res.json({
    message: "Composers - PATCH",
    id: composerId,
  });
});

router.delete("/:composerId", (req, res, next) => {
  const composerId = req.params.composerId;
  Composer.deleteOne({
    _id: composerId,
  })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Composer Deleted",
        request: {
          method: "GET",
          url: "http://localhost:3000/composer/" + composerId,
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
