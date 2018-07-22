import {DBConnection} from './DBConnection';

export type UserCred = {
  user_id: string;
  access_token: string;
  refresh_token: string;
};

export class SpotifyAuth {
  private static instance: SpotifyAuth;

  static getInstance() {
    if (!this.instance) {
      this.instance = new SpotifyAuth();
    }

    return this.instance;
  }

  public async setCreds(userCred: UserCred) {
    await DBConnection.getInstance().query(
      'INSERT INTO spotify_auth (user_id, access_token, refresh_token)\
      VALUES ($1, $2, $3)\
      ON CONFLICT (user_id) DO UPDATE\
      SET access_token = excluded.access_token,\
      refresh_token = excluded.refresh_token;',
      [userCred.user_id, userCred.access_token, userCred.refresh_token],
    );
  }

  public async getRefreshToken(userId: string) {
    const {rows} = await DBConnection.getInstance().query(
      'SELECT refresh_token FROM spotify_auth WHERE user_id=$1',
      [userId],
    );
    return rows[0];
  }

  public async setToken(userId: string, newToken: string) {
    await DBConnection.getInstance().query(
      'UPDATE spotify_auth SET access_token=$2 WHERE user_id=$1',
      [userId, newToken],
    );
  }
}
