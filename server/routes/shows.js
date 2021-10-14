const router = require('express').Router()


router.get('/shows', (req, res) => {
    return res.json({
        name: "Yannick Sereckissy",
        role: "Cool developper",
    })
});

module.exports = router;