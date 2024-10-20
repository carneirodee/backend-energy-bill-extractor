var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Table, Column, Model, DataType, AllowNull, AutoIncrement } from 'sequelize-typescript';
let Client = class Client extends Model {
};
__decorate([
    AutoIncrement,
    AllowNull(false),
    Column({
        primaryKey: true,
        type: DataType.INTEGER,
    })
], Client.prototype, "id", void 0);
__decorate([
    AllowNull(false),
    Column({
        type: DataType.DOUBLE,
    })
], Client.prototype, "client_code", void 0);
__decorate([
    AllowNull(false),
    Column({
        type: DataType.STRING,
    })
], Client.prototype, "installation_number", void 0);
__decorate([
    AllowNull(false),
    Column({
        type: DataType.STRING,
    })
], Client.prototype, "name", void 0);
__decorate([
    AllowNull(false),
    Column({
        type: DataType.STRING,
        defaultValue: "CEMIG"
    })
], Client.prototype, "distributor", void 0);
Client = __decorate([
    Table({
        timestamps: true,
        tableName: "client",
        modelName: 'Client'
    })
], Client);
export default Client;
