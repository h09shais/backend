import request from 'supertest';
import {
  TestApplicationController,
  prepareHttpTestController,
  stopTest,
} from '@utils/test/test';
import { AppModule } from '@apps/api/src/app.module';

describe('Users apple login controller', () => {
  let app: TestApplicationController['app'];
  let services: TestApplicationController['services'];

  beforeAll(async () => {
    const testController = await prepareHttpTestController(
      AppModule,
      'users_login_apple'
    );
    app = testController.app;
    services = testController.services;
  });

  afterAll(() => stopTest(app));

  it('login with a valid identity token => register a new user (/v1/users/login/apple)', async () => {
    services.appleService.getAppleId.mockReturnValue('123');
    const res = await request(app.getHttpServer())
      .post('/v1/users/login/apple')
      .send({ identityToken: 'aValidToken' });

    expect(res.status).toBe(201);
    expect(res.body.hasOwnProperty('user')).toBeTruthy();
    expect(res.body.accessToken.hasOwnProperty('token')).toBeTruthy();
    expect(res.body.accessToken.hasOwnProperty('expiration')).toBeTruthy();
  });

  it('login with an invalid identity token => error 403 (/v1/users/login/apple)', async () => {
    services.appleService.getAppleId.mockReturnValue('');
    const res = await request(app.getHttpServer())
      .post('/v1/users/login/apple')
      .send({ identityToken: 'invalidToken' });

    expect(res.status).toBe(403);
  });

  it('login without an identity token => error 400 (/v1/users/login/apple)', async () => {
    services.appleService.getAppleId.mockReturnValue('123');
    const res = await request(app.getHttpServer())
      .post('/v1/users/login/apple')
      .send({});

    expect(res.status).toBe(400);
  });
});
