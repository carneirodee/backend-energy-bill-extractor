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

import Client from './client.model';

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
    declare reference_date_month: string;

    @AllowNull(false)
    @Column({
        type: DataType.DOUBLE,
    })
    declare reference_date_year: number;

    @Column({
        type: DataType.DATE,
    })
    declare due_date: string;

    @Column({
        type: DataType.DOUBLE,
    })
    declare energy_qt: number;

    @AllowNull(false)
    @Column({
        type: DataType.DOUBLE,
    })
    declare energy_value: number;

    @Column({
        type: DataType.DOUBLE,
    })
    declare energy_scee_s_icms_qt: number;

    @AllowNull(false)
    @Column({
        type: DataType.DOUBLE,
    })
    declare energy_scee_s_icms_value: number;

    @Column({
        type: DataType.DOUBLE,
    })
    declare compensated_energy_qt: number;

    @AllowNull(false)
    @Column({
        type: DataType.DOUBLE,
    })
    declare compensated_energy_value: number;

    @AllowNull(false)
    @Column({
        type: DataType.DOUBLE,
    })
    declare public_lighting_value: number;
}

export default Bill;