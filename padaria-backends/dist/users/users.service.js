"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const supabase_client_1 = require("../supabase/supabase.client");
let UsersService = class UsersService {
    async findAll() {
        const { data, error } = await supabase_client_1.supabase.from('users').select('*');
        if (error)
            throw error;
        return data;
    }
    async create(user) {
        const { data, error } = await supabase_client_1.supabase.from('users').insert([
            {
                ...user,
                role: user.role || 'user',
            },
        ]).select();
        if (error)
            throw error;
        return data[0];
    }
    async update(id, user) {
        const { data, error } = await supabase_client_1.supabase.from('users').update(user).eq('id', id).select();
        if (error)
            throw error;
        return data[0];
    }
    async remove(id) {
        if (!id)
            throw new Error('ID do usuário é obrigatório');
        const { error } = await supabase_client_1.supabase.from('users').delete().eq('id', id);
        if (error)
            throw error;
        return { message: 'Usuário removido com sucesso' };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map