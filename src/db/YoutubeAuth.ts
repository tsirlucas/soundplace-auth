import {DBConnection} from './DBConnection';

export type UserCred = {
  user_id: string;
  access_token: string;
  refresh_token: string;
};

export class YoutubeAuth {
  private static instance: YoutubeAuth;

  static getInstance() {
    if (!this.instance) {
      this.instance = new YoutubeAuth();
    }

    return this.instance;
  }

  public async setCreds(userCred: UserCred) {
    await DBConnection.getInstance().query(
      'INSERT INTO youtube_auth (user_id, access_token, refresh_token)\
      VALUES ($1, $2, $3)\
      ON CONFLICT (user_id) DO UPDATE\
      SET access_token = excluded.access_token,\
      refresh_token = excluded.refresh_token;',
      [userCred.user_id, userCred.access_token, userCred.refresh_token],
    );
  }

  public async getCreds(userId: string) {
    const {rows} = await DBConnection.getInstance().query(
      'SELECT access_token, refresh_token FROM youtube_auth WHERE user_id=$1',
      [userId],
    );
    return rows[0];
  }

  public async setToken(userId: string, newToken: string) {
    await DBConnection.getInstance().query(
      'UPDATE youtube_auth SET access_token=$2 WHERE user_id=$1',
      [userId, newToken],
    );
  }
}
