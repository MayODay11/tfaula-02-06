# 🧪 Guia Completo de Testes - Users Provider

## Pré-requisitos

Antes de testar, certifique-se de que:

```bash
# 1. Instalar dependências
npm install

# 2. Configurar banco de dados (se necessário)
npm run cli migrate

# 3. Popular dados de teste (se necessário)
npm run cli seed
```

---

## 🚀 Como Testar

### **1. Teste Rápido da API (Terminal)**

```bash
# Iniciar servidor
npm run dev

# Em outro terminal, testar API
node test-users-api.js
```

**O que esperar:**
- ✅ Conexão com servidor confirmada
- ✅ Dados de usuários carregados
- ✅ Informações de paginação exibidas
- ✅ Lista dos primeiros usuários

---

### **2. Teste Manual do Provider (Browser)**

1. **Iniciar o servidor:**
   ```bash
   npm run dev
   ```

2. **Acessar a aplicação:**
   - Abra: `http://localhost:8080`

3. **Testar o componente de teste:**
   - Modifique temporariamente o arquivo `resources/index.html` para usar `UsersTest`
   - Ou acesse a página de usuários existente

4. **Ações de teste disponíveis:**
   - 🔄 Ativar/Desativar Loading
   - 📂 Carregar Dados de Teste
   - ❌ Simular Erro
   - 📄 Testar Paginação (páginas 1-5)

---

### **3. Teste com API Real (Browser)**

1. **Usar o componente `UsersApiTest`:**
   - Este componente conecta com a API real
   - Testa carregamento de dados reais
   - Testa paginação funcional

2. **Funcionalidades testadas:**
   - 🌐 Conexão com API real
   - 📄 Navegação entre páginas
   - 🔄 Recarregamento de dados
   - ❌ Tratamento de erros
   - 👥 Exibição de usuários

---

### **4. Teste de Integração (Console do Browser)**

Abra o **DevTools (F12)** e execute no console:

```javascript
// Testar se o Provider está funcionando
console.log('Testando Users Provider...');

// Simular dados de teste
const testData = {
    rows: [
        { id: 1, name: "Teste User", email: "teste@test.com", photo: null, password: "", created_at: new Date(), updated_at: new Date() }
    ],
    limit: 10,
    next: null,
    count: 1,
    page: 1,
    totalPages: 1
};

// Se você tiver acesso ao contexto (em uma página com Provider):
// changeData(testData);
// setCurrentPage(2);
// setLoading(true);
```

---

## 🔍 Checklist de Testes

### ✅ **Testes de Estado:**
- [ ] Estado inicial correto (página 1, sem loading, sem erro)
- [ ] Loading funciona (ativa/desativa)
- [ ] Erro funciona (define/limpa mensagem)
- [ ] CurrentPage funciona (muda página)
- [ ] ChangeData funciona (carrega dados)

### ✅ **Testes de Ações:**
- [ ] `setLoading(true/false)` atualiza estado
- [ ] `setError('mensagem')` define erro
- [ ] `setCurrentPage(numero)` muda página
- [ ] `changeData(dados)` carrega dados e limpa loading/erro

### ✅ **Testes de Integração:**
- [ ] Provider envolve componentes filhos
- [ ] Hooks funcionam dentro do Provider
- [ ] Hooks falham fora do Provider (erro esperado)
- [ ] Múltiplos componentes compartilham mesmo estado

### ✅ **Testes de API:**
- [ ] Carregamento inicial de dados
- [ ] Paginação funcional
- [ ] Tratamento de erros de rede
- [ ] Formato de dados correto (ListApi<UserModel>)

---

## 🐛 Solução de Problemas

### **Erro: "useUsers must be used within a UsersProvider"**
```jsx
// ❌ Errado
function App() {
    return <UsersComponent />; // Sem Provider
}

// ✅ Correto
function App() {
    return (
        <UsersProvider>
            <UsersComponent />
        </UsersProvider>
    );
}
```

### **Erro: API não responde**
```bash
# Verificar se servidor está rodando
curl http://localhost:8080/api/users

# Se não responder, iniciar servidor
npm run dev
```

### **Erro: Dados não carregam**
```javascript
// Verificar no console se há erros CORS
// Verificar se API retorna formato correto:
{
    "rows": [...],
    "limit": 10,
    "page": 1,
    "totalPages": 5,
    "count": 50,
    "next": 2
}
```

---

## 📊 Logs de Debug

Para ver logs detalhados, adicione no código:

```javascript
// No componente
console.log('Estado atual:', { data, currentPage, loading, error });

// No Provider
console.log('Ação executada:', action.type, action.payload);

// Na API
console.log('Dados recebidos:', response.data);
```

---

## 🎯 Próximos Passos

Após os testes passarem:

1. **Integrar com página real de usuários**
2. **Adicionar filtros/busca ao Provider**
3. **Implementar cache de dados**
4. **Adicionar testes automatizados (Jest)**
5. **Otimizar performance com useMemo/useCallback**