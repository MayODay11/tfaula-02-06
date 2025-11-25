# Users Provider

Provider responsável por gerenciar o estado global da listagem e paginação de usuários.

## Arquitetura

O Provider utiliza React Context e useReducer para gerenciar o estado global da aplicação relacionado aos usuários. O estado inclui:

- **data**: Lista de usuários e informações de paginação da API
- **currentPage**: Página atual da paginação
- **loading**: Estado de carregamento
- **error**: Mensagem de erro (se houver)

## Estrutura de Arquivos

```
UserProvider/
├── index.ts                 # Exportações principais
├── UsersProvider.tsx        # Componente Provider
├── UsersContext.tsx         # Context do React
├── users.types.ts          # Tipos TypeScript
├── usersReducer.ts         # Reducer para gerenciar estado
└── usersHooks.ts           # Hooks customizados
```

## Como Usar

### 1. Envolver componentes com o Provider

```tsx
import { UsersProvider } from './providers/UserProvider';

function App() {
    return (
        <UsersProvider>
            <UsersPage />
        </UsersProvider>
    );
}
```

### 2. Consumir o estado nos componentes

```tsx
import { useUsersState, useUsersActions } from './providers/UserProvider';

function UsersComponent() {
    const { data, currentPage, loading, error } = useUsersState();
    const { changeData, setCurrentPage, setLoading, setError } = useUsersActions();

    // Usar o estado e ações conforme necessário
}
```

## Estado Global

### Propriedades do Estado

- `data`: `ListApi<UserModel> | "error" | undefined`
  - Lista de usuários retornada pela API
  - Inclui informações de paginação (page, totalPages, count, etc.)

- `currentPage`: `number`
  - Página atual da paginação (inicia em 1)

- `loading`: `boolean`
  - Indica se está em processo de carregamento

- `error`: `string | null`
  - Mensagem de erro ou null se não houver erro

## Ações Disponíveis

### `changeData(data?: UsersDataValue)`
Atualiza os dados de usuários. Automaticamente limpa o estado de loading e error.

### `setCurrentPage(page: number)`
Define a página atual da paginação.

### `setLoading(loading: boolean)`
Controla o estado de carregamento.

### `setError(error: string | null)`
Define mensagem de erro. Automaticamente para o loading.

## Hooks Personalizados

### `useUsers()`
Retorna o contexto completo (estado + ações).

### `useUsersState()`
Retorna apenas o estado atual.

### `useUsersActions()`
Retorna apenas as ações disponíveis.

## Exemplo Completo

```tsx
import React, { useEffect } from "react";
import axios from "axios";
import { ListApi, UserModel } from "@app/js/app.types";
import { UsersProvider, useUsersState, useUsersActions } from "./providers/UserProvider";

function UsersContent() {
    const { data, currentPage, loading, error } = useUsersState();
    const { changeData, setCurrentPage, setLoading, setError } = useUsersActions();

    // Carregar usuários quando a página mudar
    useEffect(() => {
        loadUsers(currentPage);
    }, [currentPage]);

    const loadUsers = async (page: number) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await axios.get<ListApi<UserModel>>(
                `http://localhost:8080/api/users?page=${page}`
            );
            
            changeData(response.data);
        } catch (err) {
            setError('Erro ao carregar usuários');
            changeData("error");
        }
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;
    if (!data || data === "error") return <div>Nenhum usuário encontrado</div>;

    return (
        <div>
            <h1>Usuários</h1>
            <ul>
                {data.rows.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
            
            {/* Paginação */}
            <div>
                {Array.from({ length: data.totalPages }, (_, i) => i + 1).map(page => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        disabled={page === currentPage}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default function Users() {
    return (
        <UsersProvider>
            <UsersContent />
        </UsersProvider>
    );
}
```

## Vantagens

1. **Estado Centralizado**: Todos os componentes acessam o mesmo estado
2. **Paginação Automática**: Mudanças de página são refletidas globalmente
3. **Gestão de Loading**: Estados de carregamento são controlados centralmente
4. **Tratamento de Erros**: Erros são gerenciados de forma consistente
5. **Reutilização**: Múltiplos componentes podem consumir os mesmos dados
6. **Type Safety**: Totalmente tipado com TypeScript

## Integração com API

O Provider é agnóstico em relação à fonte dos dados. Você pode integrar com qualquer API ou serviço, apenas certifique-se de que os dados retornados sigam o formato `ListApi<UserModel>` definido em `app.types.ts`.