import React, { useEffect } from "react";
import axios from "axios";
import { ListApi, UserModel } from "@app/js/app.types";
import { UsersProvider, useUsersState, useUsersActions } from "../../providers/UserProvider";

function UsersApiTestComponent() {
    const { data, currentPage, loading, error } = useUsersState();
    const { changeData, setCurrentPage, setLoading, setError } = useUsersActions();

    // Carregar usuários da API real
    const loadUsersFromApi = async (page: number = 1) => {
        try {
            console.log(`🔄 Carregando usuários da página ${page}...`);
            setLoading(true);
            setError(null);
            
            const response = await axios.get<ListApi<UserModel>>(
                `http://localhost:8080/api/users?page=${page}`
            );
            
            console.log('✅ Dados recebidos da API:', response.data);
            changeData(response.data);
            
        } catch (err: any) {
            console.error('❌ Erro ao carregar usuários:', err);
            const errorMessage = err.response?.data?.error || err.message || 'Erro desconhecido';
            setError(`Erro ao carregar usuários: ${errorMessage}`);
            changeData("error");
        }
    };

    // Carregar dados inicial
    useEffect(() => {
        loadUsersFromApi(currentPage);
    }, [currentPage]);

    const handlePageChange = (newPage: number) => {
        console.log(`📄 Mudando para página ${newPage}`);
        setCurrentPage(newPage);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
            <h2>🌐 Teste API Real - Users Provider</h2>
            
            {/* Status de conexão */}
            <div style={{ 
                backgroundColor: loading ? '#fff3cd' : (error ? '#f8d7da' : '#d4edda'), 
                padding: '15px', 
                margin: '10px 0', 
                borderRadius: '5px',
                border: '1px solid ' + (loading ? '#ffeaa7' : (error ? '#f5c6cb' : '#c3e6cb'))
            }}>
                <h3>📡 Status da Conexão:</h3>
                <p><strong>Estado:</strong> {loading ? '🔄 Carregando...' : (error ? '❌ Erro' : '✅ Conectado')}</p>
                <p><strong>Página Atual:</strong> {currentPage}</p>
                {error && <p style={{ color: '#721c24' }}><strong>Erro:</strong> {error}</p>}
            </div>

            {/* Controles de teste */}
            <div style={{ margin: '20px 0' }}>
                <h3>🎮 Controles de Teste:</h3>
                <button 
                    onClick={() => loadUsersFromApi(currentPage)}
                    disabled={loading}
                    style={{ 
                        margin: '5px', 
                        padding: '10px 15px', 
                        backgroundColor: loading ? '#6c757d' : '#007bff', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px',
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? '🔄 Carregando...' : '🔄 Recarregar Página Atual'}
                </button>
                
                <button 
                    onClick={() => handlePageChange(1)}
                    disabled={loading || currentPage === 1}
                    style={{ 
                        margin: '5px', 
                        padding: '10px 15px', 
                        backgroundColor: (loading || currentPage === 1) ? '#6c757d' : '#28a745', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px',
                        cursor: (loading || currentPage === 1) ? 'not-allowed' : 'pointer'
                    }}
                >
                    📄 Ir para Página 1
                </button>
                
                <button 
                    onClick={() => handlePageChange(2)}
                    disabled={loading}
                    style={{ 
                        margin: '5px', 
                        padding: '10px 15px', 
                        backgroundColor: loading ? '#6c757d' : '#17a2b8', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px',
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    📄 Ir para Página 2
                </button>
            </div>

            {/* Resultados */}
            {data && data !== "error" && (
                <div style={{ backgroundColor: '#d4edda', padding: '15px', margin: '10px 0', borderRadius: '5px', border: '1px solid #c3e6cb' }}>
                    <h3>👥 Usuários Carregados (Página {data.page}):</h3>
                    <div style={{ display: 'grid', gap: '10px' }}>
                        {data.rows.map(user => (
                            <div key={user.id} style={{ 
                                backgroundColor: 'white', 
                                padding: '10px', 
                                borderRadius: '5px', 
                                border: '1px solid #ddd',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px'
                            }}>
                                <div style={{ 
                                    width: '40px', 
                                    height: '40px', 
                                    borderRadius: '50%', 
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold'
                                }}>
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p style={{ margin: '0', fontWeight: 'bold', fontSize: '16px' }}>{user.name}</p>
                                    <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>{user.email}</p>
                                    <p style={{ margin: '0', color: '#999', fontSize: '12px' }}>
                                        ID: {user.id} | Criado: {new Date(user.created_at).toLocaleDateString('pt-BR')}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
                        <p><strong>📊 Informações da Paginação:</strong></p>
                        <p>• Página atual: <strong>{data.page}</strong> de <strong>{data.totalPages}</strong></p>
                        <p>• Total de usuários: <strong>{data.count}</strong></p>
                        <p>• Usuários por página: <strong>{data.limit}</strong></p>
                        <p>• Próxima página: {data.next ? <strong>{data.next}</strong> : <em>Não há</em>}</p>
                    </div>
                </div>
            )}

            {/* Paginação interativa */}
            {data && data !== "error" && data.totalPages > 1 && (
                <div style={{ margin: '20px 0', textAlign: 'center' }}>
                    <h3>📄 Navegação por Páginas:</h3>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', flexWrap: 'wrap' }}>
                        {Array.from({ length: data.totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                disabled={loading || page === currentPage}
                                style={{
                                    padding: '8px 12px',
                                    backgroundColor: page === currentPage ? '#007bff' : (loading ? '#6c757d' : '#e9ecef'),
                                    color: page === currentPage ? 'white' : (loading ? '#6c757d' : 'black'),
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    cursor: (loading || page === currentPage) ? 'not-allowed' : 'pointer',
                                    fontWeight: page === currentPage ? 'bold' : 'normal'
                                }}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Log de debug */}
            <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px', fontSize: '12px' }}>
                <h4>🐛 Debug Info:</h4>
                <p>• Estado atual: {JSON.stringify({ loading, error: !!error, hasData: !!data, currentPage }, null, 2)}</p>
                <p>• Abra o console do navegador para ver logs detalhados</p>
            </div>
        </div>
    );
}

export default function UsersApiTest() {
    return (
        <UsersProvider>
            <UsersApiTestComponent />
        </UsersProvider>
    );
}