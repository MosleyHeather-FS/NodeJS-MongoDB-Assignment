const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.json({
        message: "Composers - GET"
    });
});

router.post("/", (req, res, next) => {
    res.json({
        message: "Composers - POST"
    });
});

router.get("/:composerId", (req, res, next) => {
    const composerId = req.params.composerId;
    res.json({
        message: "Composers - GET",
        id: composerId
    });
});

router.patch("/:composerId", (req, res, next) => {
    const composerId = req.params.composerId;
    res.json({
        message: "Composers - PATCH",
        id: composerId
    });
});

router.delete("/:composerId", (req, res, next) => {
    const composerId = req.params.composerId;
    res.json({
        message: "Composers - DELETE",
        id: composerId
    });
});


module.exports = router;