import {
    Table,
    Column,
    Model,
    DataType,
    HasMany,
    AllowNull,
    Unique,
    AutoIncrement
} from 'sequelize-typescript';

import Bill from './bill.model';

@Table({
    timestamps: true,
    tableName: "customer",
    modelName: 'Customer'
})
class Customer extends Model<Customer> {

    @AllowNull(false)
    @Unique
    @Column({
        primaryKey: true,
        type: DataType.STRING,
    })
    declare customer_code: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    declare installation_number: string;

    @AllowNull(false)
    @Unique
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

    @HasMany(() => Bill)
    declare bills: Bill[];

}

export default Customer;