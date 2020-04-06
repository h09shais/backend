import { Injectable } from '@nestjs/common';

export const env = process.env.ENV || 'develop';

@Injectable()
export class ConfigService {
  public env = env;
  public isProduction = process.env.NODE_ENV === 'production';
  public host = this.isProduction
    ? process.env.HOST
    : this.env === 'develop'
    ? 'localhost'
    : 'staging.komak.io';
  public sentryDsn = process.env.SENTRY_BACKEND;
  public tag = process.env.TAG;
  public packageNames = process.env.PACKAGES_NAMES?.split(',') || [
    'io.komak.app.dev',
  ];
  public googleAuthProjects = {
    ios: process.env.GOOGLE_AUTH_PROJECT_IOS?.split(',') || [
      '50726922019-5cff1qhkilhft8jtaecj7gqeo980pghe.apps.googleusercontent.com',
    ],
    android: process.env.GOOGLE_AUTH_PROJECT_ANDROID?.split(',') || [
      '50726922019-3mba9hr53ob7dbj43s658gr92i5ndsf3.apps.googleusercontent.com',
    ],
  };
  public maxDistance = parseInt(process.env.MAX_DISTANCE, 10) || 1000;

  public peliasUrl = process.env.PELIAS_URL;

  public mongo = {
    srv: process.env.MONGO_SRV,
    host: process.env.MONGO_HOST || 'localhost',
    port: parseInt(process.env.MONGO_PORT, 10) || 27017,
    database: process.env.MONGO_DB || 'default',
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    replicaSet: process.env.MONGO_REPLICASET,
  };

  public rabbitmq = {
    host: process.env.RABBITMQ_HOST || 'localhost',
    port: parseInt(process.env.RABBITMQ_PORT, 10) || 5672,
    user: process.env.RABBITMQ_USER,
    password: process.env.RABBITMQ_PASSWORD,
    prefix: process.env.RABBITMQ_PREFIX || 'default',
  };

  public fcm = {
    serverKey: process.env.FCM_SERVER_KEY,
  };

  public jwt = {
    accessTokenSecret:
      process.env.ACCESS_TOKEN_SECRET ||
      'du:<9tv:B{P^X/s~Lv4+MsT7.>%w%!A$zU%_C~Pj3[,]+~c2LB;;fLBE5E@NKFg',
    accessTokenExpiration: 60 * 60 * 24 * 365,
  };

  public mailgun = {
    apiKey: process.env.EMAIN_API_KEY || 'something',
    domain: process.env.EMAIN_DOMAIN,
    from: process.env.EMAIN_ADDRESS,
  };

  public recaptcha = {
    secret:
      process.env.RECAPTCHA_SECRET ||
      '03AHaCkAZlZA1UVLVmVOOh0FnaZLFi0nTUS5bl2fPM-RThENRZHYaYJV5nyv2pLXjJPhdGLoAhe3yNFQx5QP4JYKve_FTpqwL0uGkLuCMVwH1S1feRLNhHpwC3sKacOlNWhO64CwBRuHtfKgu02B9L_FLSPFug_3GoQdtdS3JdJnfzGAGjT_WlNneBWcyeWw36Y_7L8zzyHWRcIwNhZPCXbUr-bs9ROljNTTRmx4qI80U_ZEQx-ydbhndq_4VuV63PETdmuJHqercdpBLOqQQqYdFLO--lTpUspipGATQ0imFcZClUu91LoIb3ET0H4UcMDZFg-S33Z7_TtTiuewVzx7q3aPygaqx8Jntc-5HBblXDRDSO0lMAA3qTz8Y6DsTijw17aHWHRxhM',
  };
}
