import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as connectMongoDBSessionStore from 'connect-mongodb-session';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });
  const MongoDBSessionStore = connectMongoDBSessionStore(session);
  const sessionStore = new MongoDBSessionStore({
    uri: process.env.MONGODB_URL,
    collection: 'sessions',
    expires: 60000,
  });
  sessionStore.on('error', () => {
    console.log('unable to connect');
  });
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookies: {
        maxAge: 60000,
      },
      store: sessionStore
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000, () => console.log('Listening to port 3000')
  );
}
bootstrap();
