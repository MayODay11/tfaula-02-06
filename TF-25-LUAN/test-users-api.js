#!/usr/bin/env node

// Script para testar a API de usuários
import axios from 'axios';

const API_BASE = 'http://localhost:8080';

async function testUsersAPI() {
    console.log('🧪 Iniciando testes da API de usuários...\n');

    try {
        // Teste 1: Conexão com o servidor
        console.log('📡 Testando conexão com o servidor...');
        const healthCheck = await axios.get(`${API_BASE}/api/users?page=1&limit=1`);
        console.log('✅ Servidor está respondendo\n');

        // Teste 2: Listagem de usuários
        console.log('👥 Testando listagem de usuários...');
        const usersResponse = await axios.get(`${API_BASE}/api/users`);
        const usersData = usersResponse.data;
        
        console.log(`✅ Usuários carregados com sucesso!`);
        console.log(`   • Total de usuários: ${usersData.count}`);
        console.log(`   • Usuários por página: ${usersData.limit}`);
        console.log(`   • Página atual: ${usersData.page}`);
        console.log(`   • Total de páginas: ${usersData.totalPages}`);
        console.log(`   • Usuários nesta página: ${usersData.rows.length}\n`);

        // Teste 3: Paginação
        if (usersData.totalPages > 1) {
            console.log('📄 Testando paginação...');
            const page2Response = await axios.get(`${API_BASE}/api/users?page=2`);
            const page2Data = page2Response.data;
            
            console.log(`✅ Segunda página carregada!`);
            console.log(`   • Página: ${page2Data.page}`);
            console.log(`   • Usuários: ${page2Data.rows.length}\n`);
        } else {
            console.log('📄 Apenas uma página disponível, paginação não testada\n');
        }

        // Teste 4: Exibir alguns usuários
        console.log('📋 Primeiros usuários encontrados:');
        usersData.rows.slice(0, 3).forEach((user, index) => {
            console.log(`   ${index + 1}. ${user.name} (${user.email}) - ID: ${user.id}`);
        });
        
        console.log('\n🎉 Todos os testes passaram com sucesso!');
        console.log('\n📝 Para testar o Provider React:');
        console.log('   1. Inicie o servidor: npm run dev');
        console.log('   2. Acesse: http://localhost:8080');
        console.log('   3. Navegue para a página de teste de usuários');

    } catch (error) {
        console.error('❌ Erro nos testes:');
        
        if (error.code === 'ECONNREFUSED') {
            console.error('   • Servidor não está rodando');
            console.error('   • Execute: npm run dev');
        } else if (error.response) {
            console.error(`   • Status: ${error.response.status}`);
            console.error(`   • Mensagem: ${error.response.data?.error || error.response.data}`);
        } else {
            console.error(`   • ${error.message}`);
        }
        
        process.exit(1);
    }
}

// Executar testes
testUsersAPI();