const { User } = require("../models/index")
const bcrypt = require("bcrypt")

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })

    if (!user) {
        req.session.error = "Email atau Password salah"
        return res.redirect("/login")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        req.session.error = "Email atau Password salah"
        return res.redirect("/login")
    }

    req.session.user = user
    res.redirect("/")
}

const showLogin = (req, res) => {
    if(req.session.user) {
        return res.redirect("/")
    }

    var error
    if (req.session.error) {
        error = req.session.error
        delete req.session.error
    }
    res.render("login", { error })
}

const register = async (req, res) => {
    if(req.session.user) {
        return res.redirect("/")
    }

    const { username, email, password, confirmPassword } = req.body

    if (password !== confirmPassword) {
        req.session.error = "Password dan Konfirmasi Password tidak cocok"
        return res.redirect("/register")
    }

    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
        req.session.error = "Email sudah terdaftar"
        return res.redirect("/register")
    }

    const existingUsername = await User.findOne({ where: { username } })
    if (existingUsername) {
        req.session.error = "Username sudah terdaftar"
        return res.redirect("/register")
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({ username, email, password: hashedPassword })

    req.session.user = newUser
    res.redirect("/")
}

const showRegister = (req, res) => {
    var error
    if (req.session.error) {
        error = req.session.error
        delete req.session.error
    }
    res.render("register", { error })
}

const logout = (req, res) => {
    req.session.destroy()
    res.redirect("/")
}

module.exports = {
    login,
    register,
    showLogin,
    showRegister,
    logout
}