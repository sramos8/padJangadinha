"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const common_1 = require("@nestjs/common");
const supabase_client_1 = require("../supabase/supabase.client");
let EstoqueService = class EstoqueService {
    async findAll() {
        const { data, error } = await supabase_client_1.supabase.from('estoque').select('*');
        if (error)
            throw error;
        return data;
    }
    async update(id, estoque) {
        const { data, error } = await supabase_client_1.supabase.from('estoque').update(estoque).eq('id', id).select();
        if (error)
            throw error;
        return data[0];
    }
};
exports.EstoqueService = EstoqueService;
exports.EstoqueService = EstoqueService = __decorate([
    (0, common_1.Injectable)()
], EstoqueService);
//# sourceMappingURL=estoque.service.js.map