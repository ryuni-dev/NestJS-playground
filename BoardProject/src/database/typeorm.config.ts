import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config'

const config = new ConfigService();

export const typeORMConfig: TypeOrmModuleOptions = {
    type: config.get('DB_TYPE'),
    host: config.get('DB_HOST'),
    port: config.get('DB_PORT'),
    username: config.get('DB_USERNAME'),
    password: 'postgres',// config.get('DB_PASSWORD'),
    database: config.get('DB_DATABASE'),
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: config.get('DB_SYNCHRONIZE'),
}