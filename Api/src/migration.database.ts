// migration.database.ts

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const migrationDatabaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_MIGRATION_HOST,
  port: parseInt(process.env.DB_MIGRATION_PORT),
  username: process.env.DB_MIGRATION_USERNAME,
  password: process.env.DB_MIGRATION_PASSWORD,
  database: process.env.DB_MIGRATION_DATABASE,
  synchronize: false,
  entities: [__dirname + '/db_migration/**/*.entity.{js,ts}'],
  subscribers: [__dirname + '/db_migration/*.subscriber.{js,ts}'],
  migrations: [__dirname + '/db_migration/migrations/*.{js,ts}'],
};

export default migrationDatabaseConfig;
