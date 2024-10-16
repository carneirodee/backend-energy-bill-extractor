import {
    Table,
    Column,
    Model,
    DataType,
    AllowNull,
    Unique,
    AutoIncrement,
    ForeignKey,
    HasOne
} from 'sequelize-typescript';

import Customer from './customer.model';

@Table({
    timestamps: true,
    tableName: "bill",
    modelName: 'Bill'
})
class Bill extends Model<Bill> {

    @AutoIncrement
    @AllowNull(false)
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
    })
    declare id: number;

    @AllowNull(false)
    @ForeignKey(() => Customer)
    @Column({
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
    declare reference_date_month: string;

    @AllowNull(false)
    @Column({
        type: DataType.INTEGER,
    })
    declare reference_date_year: number;

    @Column({
        type: DataType.DATE,
    })
    declare due_date: string;

    @Column({
        type: DataType.INTEGER,
    })
    declare energy_qt: string;

    @AllowNull(false)
    @Column({
        type: DataType.DOUBLE,
    })
    declare energy_value: number;

    @Column({
        type: DataType.INTEGER,
    })
    declare energy_scee_s_icms_qt: string;

    @AllowNull(false)
    @Column({
        type: DataType.DOUBLE,
    })
    declare energy_scee_s_icms_value: number;

    @Column({
        type: DataType.INTEGER,
    })
    declare compensated_energy_qt: string;

    @AllowNull(false)
    @Column({
        type: DataType.DOUBLE,
    })
    declare  compensated_energy_value: number;

    @AllowNull(false)
    @Column({
        type: DataType.DOUBLE,
    })
    declare  public_lighting_value: number;
}

export default Bill;