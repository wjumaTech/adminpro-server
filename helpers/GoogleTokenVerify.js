const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();

exports.GoogleTokenVerify = async (token = '') => {

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_ID
  });

  return ticket.getPayload();

}