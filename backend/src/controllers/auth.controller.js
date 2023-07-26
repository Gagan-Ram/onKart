const { authService } = require("../services/index.service")

const postSignup = async (req, res) => {

    const body = req.body
    // console.log(body)

    try {

        // console.log("s1");
        const result = await authService.signUp(body)
        // console.log("s2");
        res.status(201).json(result)

    } catch (error) {
        res.status(500).json({
            message: "you are facing signUp problem ",
            error

        })
    }

}

const postLogin = async (req, res) => {

    const body = req.body

    try {

        const result = await authService.login(body)

        if (result.isLoggedIn) {
            res.cookie("token", result.token, { maxAge: 60, httpOnly: true });

            res.status(201).json({
                "user": result.user,
                "tokens": {
                    "access": {
                        "token"  : result.token
                        // "token": res.cookie("token", result.token, { maxAge: 60, httpOnly: true })
                        // "expires": 
                    }
                }
            })
        } else {
            res.status(401).json({ message: "Invalid Password" });
        }


    } catch (error) {
        res.status(500).json({
            message: "please enter valid credentials ",
            error

        })

    }

}

module.exports = {
    // authController :{
    postSignup,
    postLogin
    // }
}