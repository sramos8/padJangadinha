"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueController = void 0;
const common_1 = require("@nestjs/common");
const estoque_service_1 = require("./estoque.service");
let EstoqueController = class EstoqueController {
    estoqueService;
    constructor(estoqueService) {
        this.estoqueService = estoqueService;
    }
    findAll() {
        return this.estoqueService.findAll();
    }
    update(id, body) {
        return this.estoqueService.update(id, body);
    }
};
exports.EstoqueController = EstoqueController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EstoqueController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EstoqueController.prototype, "update", null);
exports.EstoqueController = EstoqueController = __decorate([
    (0, common_1.Controller)('estoque'),
    __metadata("design:paramtypes", [estoque_service_1.EstoqueService])
], EstoqueController);
//# sourceMappingURL=estoque.controller.js.map