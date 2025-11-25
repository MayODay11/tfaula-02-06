import React from "react";
import { UsersProvider, useUsersState, useUsersActions } from "../../providers/UserProvider";

// Componente para testar o estado e ações
function UsersTestComponent() {
    const { data, currentPage, loading, error } = useUsersState();
    const { changeData, setCurrentPage, setLoading, setError } = useUsersActions();

    const testData = {
        rows: [
            { id: 1, name: "João Silva", email: "joao@teste.com", photo: null, password: "", created_at: new Date(), updated_at: new Date() },
            { id: 2, name: "Maria Santos", email: "maria@teste.com", photo: null, password: "", created_at: new Date(), updated_at: new Date() }
        ],
        limit: 10,
        next: 2,
        count: 25,
        page: 1,
        totalPages: 3
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>🧪 Teste do Users Provider</h2>
            
            {/* Status atual */}
            <div style={{ backgroundColor: '#f5f5f5', padding: '15px', margin: '10px 0', borderRadius: '5px' }}>
                <h3>📊 Estado Atual:</h3>
                <p><strong>Página Atual:</strong> {currentPage}</p>
                <p><strong>Loading:</strong> {loading ? '✅ Sim' : '❌ Não'}</p>
                <p><strong>Erro:</strong> {error || '❌ Nenhum'}</p>
                <p><strong>Dados:</strong> {data ? (data === "error" ? "❌ Erro" : `✅ ${data.rows.length} usuários carregados`) : '❌ Nenhum'}</p>
            </div>

            {/* Botões de teste */}
            <div style={{ margin: '20px 0' }}>
                <h3>🎮 Ações de Teste:</h3>
                <button 
                    onClick={() => setLoading(true)}
                    style={{ margin: '5px', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px' }}
                >
                    🔄 Ativar Loading
                </button>
                
                <button 
                    onClick={() => setLoading(false)}
                    style={{ margin: '5px', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px' }}
                >
                    ✅ Desativar Loading
                </button>
                
                <button 
                    onClick={() => changeData(testData)}
                    style={{ margin: '5px', padding: '10px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '3px' }}
                >
                    📂 Carregar Dados Teste
                </button>
                
                <button 
                    onClick={() => setError("Erro de teste!")}
                    style={{ margin: '5px', padding: '10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px' }}
                >
                    ❌ Simular Erro
                </button>
                
                <button 
                    onClick={() => setError(null)}
                    style={{ margin: '5px', padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '3px' }}
                >
                    🧹 Limpar Erro
                </button>
            </div>

            {/* Teste de paginação */}
            <div style={{ margin: '20px 0' }}>
                <h3>📄 Teste de Paginação:</h3>
                {[1, 2, 3, 4, 5].map(page => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        style={{
                            margin: '2px',
                            padding: '8px 12px',
                            backgroundColor: currentPage === page ? '#007bff' : '#e9ecef',
                            color: currentPage === page ? 'white' : 'black',
                            border: '1px solid #ccc',
                            borderRadius: '3px'
                        }}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* Exibir dados carregados */}
            {data && data !== "error" && (
                <div style={{ backgroundColor: '#d4edda', padding: '15px', margin: '10px 0', borderRadius: '5px' }}>
                    <h3>👥 Usuários Carregados:</h3>
                    <ul>
                        {data.rows.map(user => (
                            <li key={user.id}>
                                <strong>{user.name}</strong> - {user.email} (ID: {user.id})
                            </li>
                        ))}
                    </ul>
                    <p><strong>Página:</strong> {data.page} de {data.totalPages} | <strong>Total:</strong> {data.count} usuários</p>
                </div>
            )}
        </div>
    );
}

export default function UsersTest() {
    return (
        <UsersProvider>
            <UsersTestComponent />
        </UsersProvider>
    );
}