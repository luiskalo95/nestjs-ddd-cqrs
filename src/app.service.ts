import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';;
import { WarehouseEntity } from './backoffice/bounded-contexts/dairy-store/infrastructure/entities/warehouse/warehouse.entity';
import { StoreEntity } from './backoffice/bounded-contexts/dairy-store/infrastructure/entities/store/store.entity';
import * as mongoose from 'mongoose';

export interface IDBConfigMongo {
    user: string;
    pass: string;
    database: string;
    host: string;
    port: number;
}

let manager: EntityManager;

@Injectable()
export class AppService {

    private dataSource: DataSource | void;

    private dbConfig(): object {
        return {
            host: 'localhost',
            port: 5200,
            database: 'dairy_store',
            username: 'root',
            password: '123456',
            synchronize: true,
            logging: false,
        };
    }

    private dbConfigMongo(): IDBConfigMongo {
        return {
            user: 'root',
            pass: '12345',
            database: 'eventsourcing',
            host: 'localhost',
            port: 27017
        };
    }

    public async onModuleInit(): Promise<void> {
        const entities = [WarehouseEntity, StoreEntity];
        const config = this.dbConfig();
        this.dataSource = await new DataSource({
            type: 'mysql',
            ...config, entities,
        }).initialize().catch((error) => {
            console.log(error);
            process.exit(1);
        });
        console.log('Connected to the database')
        manager = (this.dataSource as DataSource).manager;

        const configMongo = this.dbConfigMongo();
        try {
            await mongoose.connect(
                `mongodb://${configMongo.user}:${configMongo.pass}@${configMongo.host}:${configMongo.port}/${configMongo.database}?authSource=admin&retryWrites=true&w=majority`,
);
            console.log('Connected to MongoDB');
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    }

    public static get manager(): EntityManager {
        return manager;
    }
}
