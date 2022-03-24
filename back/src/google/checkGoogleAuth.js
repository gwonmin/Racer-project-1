const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const checkAuthenticated= (req, res, next) =>{
    let token = req.cookies['session-token'];

    let googleUser = {};
    const verify = async () => {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID,
        });

        const payload = ticket.getPayload();
        googleUser.name = payload.name;
        googleUser.email = payload.email;
        googleUser.picture = payload.picture;
    }

    verify()
    .then(()=>{
        req.user = googleUser;
        next();
    })
    .catch((err) => {
        console.log(err)
        res.redirect('login') // login 화면으로 다시 돌아감
    })

}

export { checkAuthenticated };