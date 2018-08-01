import {environment} from 'config';
import {OAuth2Client} from 'google-auth-library';
import {google} from 'googleapis';
import queryString from 'query-string';

export class YoutubeAuthService {
  private static instance: YoutubeAuthService;
  private oauth2Client: OAuth2Client;
  private scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/youtube',
  ];
  private redirectUri = `${environment.settings.apiUrl}/auth/youtube/token`;
  private clientId = environment.secrets.youtubeId;
  private clientSecret = environment.secrets.youtubeSecret;

  private constructor() {
    this.oauth2Client = new google.auth.OAuth2(this.clientId, this.clientSecret, this.redirectUri);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new YoutubeAuthService();
    }

    return this.instance;
  }

  public getAuthorizationUrl() {
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: this.scopes,
      prompt: 'consent',
    });
  }

  public async getRefreshedToken(creds: {refresh_token: string; access_token: string}) {
    try {
      this.oauth2Client.setCredentials(creds);
      const {credentials} = await this.oauth2Client.refreshAccessToken();

      return {
        access_token: credentials.access_token as string,
        refresh_token: credentials.refresh_token as string,
      };
    } catch (e) {
      throw e;
    }
  }
  public async getTokenizedUrl(code: string) {
    try {
      const {tokens} = await this.oauth2Client.getToken(code);
      const {sub} = await this.oauth2Client.getTokenInfo(tokens.access_token as string);
      return queryString.stringify({
        user_id: sub,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
