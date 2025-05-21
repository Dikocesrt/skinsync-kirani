const showFront = (req, res) => {
    
    res.render("front", { user: req.session.user, isFront: true })
}

module.exports = { showFront }