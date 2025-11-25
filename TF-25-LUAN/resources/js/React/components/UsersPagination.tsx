import React from "react";
import { useUsers, useUsersState, useUsersActions } from "../providers/UserProvider";

interface UsersPaginationProps {
    className?: string;
}

export default function UsersPagination({ className }: UsersPaginationProps) {
    const { data, currentPage, loading } = useUsersState();
    const { setCurrentPage } = useUsersActions();

    if (!data || data === "error" || loading) {
        return null;
    }

    const { totalPages, page } = data;

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const renderPageButtons = () => {
        const buttons = [];
        const maxButtons = 5;
        let startPage = Math.max(1, page - Math.floor(maxButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxButtons - 1);

        if (endPage - startPage + 1 < maxButtons) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }

        // Botão "Anterior"
        if (page > 1) {
            buttons.push(
                <button
                    key="prev"
                    onClick={() => handlePageChange(page - 1)}
                    className="px-3 py-1 mx-1 bg-gray-200 hover:bg-gray-300 rounded"
                >
                    Anterior
                </button>
            );
        }

        // Primeira página se não estiver visível
        if (startPage > 1) {
            buttons.push(
                <button
                    key={1}
                    onClick={() => handlePageChange(1)}
                    className="px-3 py-1 mx-1 bg-gray-200 hover:bg-gray-300 rounded"
                >
                    1
                </button>
            );
            if (startPage > 2) {
                buttons.push(<span key="ellipsis1" className="px-2">...</span>);
            }
        }

        // Páginas numeradas
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-1 mx-1 rounded ${
                        i === page
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                >
                    {i}
                </button>
            );
        }

        // Última página se não estiver visível
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                buttons.push(<span key="ellipsis2" className="px-2">...</span>);
            }
            buttons.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className="px-3 py-1 mx-1 bg-gray-200 hover:bg-gray-300 rounded"
                >
                    {totalPages}
                </button>
            );
        }

        // Botão "Próximo"
        if (page < totalPages) {
            buttons.push(
                <button
                    key="next"
                    onClick={() => handlePageChange(page + 1)}
                    className="px-3 py-1 mx-1 bg-gray-200 hover:bg-gray-300 rounded"
                >
                    Próximo
                </button>
            );
        }

        return buttons;
    };

    return (
        <div className={`flex items-center justify-center space-x-1 ${className || ''}`}>
            <div className="flex items-center">
                {renderPageButtons()}
            </div>
            <div className="ml-4 text-sm text-gray-600">
                Página {page} de {totalPages} - Total: {data.count} usuários
            </div>
        </div>
    );
}