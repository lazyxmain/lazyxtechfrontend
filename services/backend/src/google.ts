import {OAuth2Client} from 'google-auth-library';
import {env} from './config.js';

export function googleClient(){ if(!env.GOOGLE_CLIENT_ID||!env.GOOGLE_CLIENT_SECRET) throw new Error('Google OAuth is not configured');
  return new OAuth2Client(env.GOOGLE_CLIENT_ID,env.GOOGLE_CLIENT_SECRET,env.GOOGLE_REDIRECT_URI);
}
export function googleAuthUrl(){
  const client=googleClient();
  return client.generateAuthUrl({access_type:'offline',scope:['openid','email','profile'],prompt:'select_account'});
}
export async function verifyGoogleCode(code:string){
  const client=googleClient();
  const {tokens}=await client.getToken(code);
  const ticket=await client.verifyIdToken({idToken:tokens.id_token!,audience:env.GOOGLE_CLIENT_ID});
  const payload=ticket.getPayload();
  return {email:(payload?.email||'').toLowerCase(),name:payload?.name||'',googleId:payload?.sub||''};
}
