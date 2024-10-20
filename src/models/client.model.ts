import {
    Table,
    Column,
    Model,
    DataType,
    AllowNull,
    AutoIncrement
} from 'sequelize-typescript';


@Table({
    timestamps: true,
    tableName: "client",
    modelName: 'Client'
})
class Client extends Model<Client> {

    @AutoIncrement
    @AllowNull(false)
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
    })
    declare id: number;

    @AllowNull(false)
    @Column({
        type: DataType.DOUBLE,
    })
    declare client_code: number;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    declare installation_number: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    declare name: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
        defaultValue: "CEMIG"
    })
    declare distributor: string;


}

export default Client;