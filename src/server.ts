import {execFile, ExecFileOptions} from 'child_process';
import {environment} from 'config';

import app from 'src';

interface AddressInfoWithPort {
  port: number;
}

execFile(
  'bash',
  ['scripts/mount_pg_secrets.sh', environment.secrets.dbPem] as ExecFileOptions,
  (error: Error | null) => {
    if (error) {
      console.log(error);
      throw error;
    }
    const httpServer = app.listen(process.env.PORT || 3003, (error: Error) => {
      if (error) {
        console.error(error);
      } else {
        const address = httpServer.address() as AddressInfoWithPort;
        console.info(
          `==> 🌎 Listening on ${address.port}. Open up http://localhost:${
            address.port
          }/ in your browser.`,
        );
      }
    });
  },
);
