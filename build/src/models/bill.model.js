var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Table, Column, Model, DataType, AllowNull, AutoIncrement } from 'sequelize-typescript';
let Bill = class Bill extends Model {
};
__decorate([
    AutoIncrement,
    AllowNull(false),
    Column({
        primaryKey: true,
        type: DataType.INTEGER,
    })
], Bill.prototype, "id", void 0);
__decorate([
    AllowNull(false),
    Column({
        type: DataType.STRING,
    })
], Bill.prototype, "client_code", void 0);
__decorate([
    AllowNull(false),
    Column({
        type: DataType.STRING,
    })
], Bill.prototype, "installation_number", void 0);
__decorate([
    AllowNull(false),
    Column({
        type: DataType.STRING,
    })
], Bill.prototype, "reference_date_month", void 0);
__decorate([
    AllowNull(false),
    Column({
        type: DataType.INTEGER,
    })
], Bill.prototype, "reference_date_year", void 0);
__decorate([
    Column({
        type: DataType.DATE,
    })
], Bill.prototype, "due_date", void 0);
__decorate([
    Column({
        type: DataType.STRING,
    })
], Bill.prototype, "total_value", void 0);
__decorate([
    Column({
        type: DataType.STRING,
    })
], Bill.prototype, "energy_qt", void 0);
__decorate([
    AllowNull(false),
    Column({
        type: DataType.STRING,
    })
], Bill.prototype, "energy_value", void 0);
__decorate([
    Column({
        type: DataType.STRING,
    })
], Bill.prototype, "energy_scee_s_icms_qt", void 0);
__decorate([
    AllowNull(false),
    Column({
        type: DataType.STRING,
    })
], Bill.prototype, "energy_scee_s_icms_value", void 0);
__decorate([
    Column({
        type: DataType.STRING,
    })
], Bill.prototype, "compensated_energy_qt", void 0);
__decorate([
    AllowNull(false),
    Column({
        type: DataType.STRING,
    })
], Bill.prototype, "compensated_energy_value", void 0);
__decorate([
    AllowNull(false),
    Column({
        type: DataType.STRING,
    })
], Bill.prototype, "public_lighting_value", void 0);
Bill = __decorate([
    Table({
        timestamps: true,
        tableName: "bill",
        modelName: 'Bill'
    })
], Bill);
export default Bill;
