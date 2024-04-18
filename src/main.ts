import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as connectMongoDBSessionStore from 'connect-mongodb-session';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1')
  app.enableCors({
    origin: true,
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });
  const MongoDBSessionStore = connectMongoDBSessionStore(session);
  const sessionStore = new MongoDBSessionStore({
    uri: process.env.MONGODB_URL,
    collection: 'sessions',
    expires: 24 * 60 * 60 * 1000, //* 1 day to milliseconds
  });
  sessionStore.on('error', () => {
    console.log('unable to connect');
  });
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000, () => console.log('Listening to port 3000'));
}
bootstrap();
