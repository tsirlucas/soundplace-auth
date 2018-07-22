import axios, {AxiosInstance} from 'axios';
import {environment} from 'config';
import queryString from 'query-string';

export class SpotifyAuthService {
  private static instance: SpotifyAuthService;

  private endpoint = 'https://accounts.spotify.com';
  private scope = 'user-read-private user-read-email user-read-birthdate user-follow-read';
  private redirectUri = `${environment.settings.apiUrl}/auth/spotify/token`;
  private clientId = environment.secrets.spotifyId;
  private clientSecret = environment.secrets.spotifySecret;

  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.endpoint,
    });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new SpotifyAuthService();
    }

    return this.instance;
  }

  public getAuthorizationUrl() {
    return (
      `${this.endpoint}/authorize?` +
      queryString.stringify({
        response_type: 'code',
        client_id: this.clientId,
        scope: this.scope,
        redirect_uri: this.redirectUri,
      })
    );
  }

  public async getRefreshedToken(refreshToken: string) {
    try {
      const {data} = await this.axiosInstance.post('/api/token', null, {
        params: {
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
        },
        headers: {
          Authorization:
            'Basic ' + Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      return data.access_token;
    } catch (e) {
      throw e;
    }
  }
  public async getTokenizedUrl(code: string) {
    try {
      const result = await this.axiosInstance.post('/api/token', null, {
        params: {
          code,
          client_id: this.clientId,
          client_secret: this.clientSecret,
          redirect_uri: this.redirectUri,
          grant_type: 'authorization_code',
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const {data} = await axios.get('https://api.spotify.com/v1/me?fields=id', {
        headers: {
          Authorization: `${result.data.token_type} ${result.data.access_token}`,
          Accept: 'application/json',
        },
      });

      return queryString.stringify({
        user_id: data.id,
        access_token: result.data.access_token,
        refresh_token: result.data.refresh_token,
      });
    } catch (e) {
      throw e;
    }
  }
}
