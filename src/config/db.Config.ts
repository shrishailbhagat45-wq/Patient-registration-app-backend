
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

export default (): MysqlConnectionOptions => ({
      url: process.env.DATABASE_URL,
      type: "mysql",
      port: 27118,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
})