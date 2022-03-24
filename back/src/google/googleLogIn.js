const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleVerify = async () => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,

        });
        const payload = ticket.getPayload();
        console.log(payload)
        const userid = payload['sub'];

    } catch(error) {
        console.log(error);
    };
  
}

export { googleVerify }

