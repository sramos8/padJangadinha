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
exports.ItensProduzidoController = void 0;
const common_1 = require("@nestjs/common");
const itens_produzido_service_1 = require("./itens-produzido.service");
const supabase_client_1 = require("../supabase/supabase.client");
let ItensProduzidoController = class ItensProduzidoController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(data) {
        if (!data.produto_id || !data.quantidade || !data.unidade) {
            throw new common_1.BadRequestException('Campos obrigatórios: produto_id, quantidade, unidade');
        }
        console.log('Dados recebidos:', data);
        const { data: produto, error } = await supabase_client_1.supabase
            .from('produtos')
            .select('nome')
            .eq('id', data.produto_id)
            .single();
        if (error || !produto) {
            throw new common_1.BadRequestException('Produto não encontrado');
        }
        return this.service.create({
            produto_id: data.produto_id,
            quantidade: data.quantidade,
            unidade: data.unidade,
        });
    }
    findAll() {
        return this.service.findAll();
    }
    async update(id, data) {
        return this.service.update(id, data);
    }
    remove(id) {
        return this.service.remove(id);
    }
};
exports.ItensProduzidoController = ItensProduzidoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ItensProduzidoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ItensProduzidoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ItensProduzidoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ItensProduzidoController.prototype, "remove", null);
exports.ItensProduzidoController = ItensProduzidoController = __decorate([
    (0, common_1.Controller)('itens-produzidos'),
    __metadata("design:paramtypes", [itens_produzido_service_1.ItensProduzidoService])
], ItensProduzidoController);
//# sourceMappingURL=itens-produzido.controller.js.map