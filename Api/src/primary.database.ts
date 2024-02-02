// primary.database.ts

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const primaryDatabaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' && {
    rejectUnauthorized: false,
  },
  // 1. https://www.google.com/search?q=what+does+synchronize+do+nestjs
  // - synchronize: Indicates if database schema should be auto-created on every application launch
  //
  // 2. https://docs.nestjs.com/techniques/database#:~:text=WARNING,lose%20production%20data.
  // - Setting "synchronize: true" shouldn't be used in production - otherwise you can lose production data.
  synchronize: false,
  entities: [__dirname + '/db_primary/**/*.entity.{js,ts}'],
  subscribers: [__dirname + '/db_primary/*.subscriber.{js,ts}'],
  migrations: [__dirname + '/db_primary/migrations/*.{js,ts}'],
};

export default primaryDatabaseConfig;
