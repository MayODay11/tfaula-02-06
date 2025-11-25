import React, { useEffect } from "react";
import axios from "axios";
import { ListApi, UserModel } from "@app/js/app.types";
import { UsersProvider, useUsersState, useUsersActions } from "../providers/UserProvider";
import UsersPagination from "../components/UsersPagination";

function UsersContent() {
    const { data, currentPage, loading, error } = useUsersState();
    const { changeData, setLoading, setError } = useUsersActions();

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
            console.error('Erro ao carregar usuários:', err);
            setError('Erro ao carregar usuários');
            changeData("error");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="text-lg">Carregando usuários...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="text-red-600 text-lg">{error}</div>
                <button 
                    onClick={() => loadUsers(currentPage)}
                    className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Tentar novamente
                </button>
            </div>
        );
    }

    if (!data || data === "error") {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="text-lg">Nenhum usuário encontrado</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Lista de Usuários</h1>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {data.rows.map((user) => (
                    <div key={user.id} className="bg-white rounded-lg shadow-md p-4 border">
                        <div className="flex items-center space-x-3">
                            {user.photo ? (
                                <img 
                                    src={user.photo} 
                                    alt={user.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                                    <span className="text-gray-600 font-bold">
                                        {user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}
                            <div>
                                <h3 className="font-semibold text-lg">{user.name}</h3>
                                <p className="text-gray-600">{user.email}</p>
                                <p className="text-xs text-gray-500">
                                    ID: {user.id} | Criado em: {new Date(user.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-8">
                <UsersPagination />
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