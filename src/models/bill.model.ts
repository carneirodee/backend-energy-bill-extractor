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
        type: DataType.STRING,
    })
    declare client_code: string;

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
        type: DataType.INTEGER,
    })
    declare reference_date_year: number;

    @Column({
        type: DataType.DATE,
    })
    declare due_date: string;

    @Column({
        type: DataType.STRING,
    })
    declare total_value: string;

    @Column({
        type: DataType.STRING,
    })
    declare energy_qt: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    declare energy_value: string;

    @Column({
        type: DataType.STRING,
    })
    declare energy_scee_s_icms_qt: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    declare energy_scee_s_icms_value: string;

    @Column({
        type: DataType.STRING,
    })
    declare compensated_energy_qt: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    declare compensated_energy_value: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    declare public_lighting_value: string;
}

export default Bill;