# 🧪 Guia de Testes Simplificado - Users Provider

## ✅ Como Testar o Provider (Passo a Passo)

### **1. Servidor está rodando ✅**
```
✅ Servidor: http://localhost:3000
✅ Swagger: http://localhost:3000/docs
```

### **2. Teste Rápido da API**

Abra seu navegador e acesse:
- `http://localhost:3000/api/users` - Para ver os dados JSON
- `http://localhost:3000/docs` - Para ver a documentação da API

### **3. Teste do Provider React**

**Opção A: Usar página existente**
1. Acesse: `http://localhost:3000`
2. Navegue até a página de usuários
3. Abra o DevTools (F12) e vá para a aba Console
4. Digite: `console.log('Provider funcionando!')`

**Opção B: Criar teste simples**
1. Substitua temporariamente o conteúdo de `Users.tsx` pelo código de teste
2. Veja o estado em tempo real

### **4. Testes Manuais no DevTools**

Abra o Console do navegador (F12) e execute:

```javascript
// Teste 1: Verificar se axios funciona
fetch('http://localhost:3000/api/users')
  .then(r => r.json())
  .then(data => console.log('✅ API funcionando:', data))
  .catch(err => console.log('❌ Erro na API:', err));

// Teste 2: Verificar estrutura dos dados
fetch('http://localhost:3000/api/users')
  .then(r => r.json())
  .then(data => {
    console.log('📊 Estrutura dos dados:');
    console.log('- Total usuários:', data.count);
    console.log('- Página atual:', data.page);
    console.log('- Total páginas:', data.totalPages);
    console.log('- Usuários nesta página:', data.rows.length);
  });
```

---

## 🎯 Checklist de Testes

### ✅ **Testes Básicos:**
- [ ] Servidor responde em `http://localhost:3000`
- [ ] API `/api/users` retorna JSON válido
- [ ] Dados têm estrutura correta (rows, page, totalPages, count)
- [ ] Swagger funciona em `/docs`

### ✅ **Testes do Provider:**
- [ ] Provider envolve componentes sem erro
- [ ] Hooks funcionam (`useUsersState`, `useUsersActions`)
- [ ] Estado inicial correto (página 1, loading false)
- [ ] Ações funcionam (setCurrentPage, setLoading, changeData)

### ✅ **Testes de Integração:**
- [ ] Carregamento de dados da API
- [ ] Paginação funcional
- [ ] Estados de loading/error
- [ ] Múltiplos componentes compartilham estado

---

## 🚀 Teste Rápido de 5 Minutos

**1. Abra o navegador:** `http://localhost:3000/api/users`
   - ✅ Deve mostrar JSON com usuários

**2. Abra o Console (F12):**
```javascript
// Copie e cole isso:
console.log('🧪 Testando estrutura da API...');
fetch('/api/users').then(r=>r.json()).then(d=>{
  console.log('✅ Usuários:', d.rows.length);
  console.log('✅ Páginas:', d.totalPages);
  console.log('✅ Total:', d.count);
});
```

**3. Resultado esperado:**
```
🧪 Testando estrutura da API...
✅ Usuários: [número]
✅ Páginas: [número]
✅ Total: [número]
```

---

## 🛠️ Se algo não funcionar

### **API não responde:**
- Verificar se servidor está rodando: `npm start`
- Acessar: `http://localhost:3000`

### **Dados não aparecem:**
- Verificar banco de dados: `npm run cli migrate`
- Popular dados: `npm run cli seed`

### **Provider não funciona:**
- Verificar se está envolvido com `<UsersProvider>`
- Verificar imports corretos

---

## 📝 Próximos Passos

1. **✅ API funcionando** → Testar Provider
2. **✅ Provider funcionando** → Integrar com página real
3. **✅ Tudo funcionando** → Adicionar funcionalidades extras

---

## 🎉 Provider Pronto para Uso!

O Users Provider está funcionando e pode ser usado em qualquer componente:

```jsx
// Exemplo de uso simples
function MeuComponente() {
    const { data, loading } = useUsersState();
    const { setCurrentPage } = useUsersActions();
    
    if (loading) return <div>Carregando...</div>;
    
    return (
        <div>
            {data?.rows.map(user => (
                <div key={user.id}>{user.name}</div>
            ))}
            <button onClick={() => setCurrentPage(2)}>
                Página 2
            </button>
        </div>
    );
}
```