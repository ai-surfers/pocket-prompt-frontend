import { Pagination, Spin } from "antd";

const PaginatedPrompt = () => {
    const {
        items,
        totalItems,
        isLoading,
        currentPage,
        itemsPerPage,
        handlePageChange,
    } = usePaginatedQuery();

    return (
        <div>
            {isLoading ? (
                <Spin tip="Loading..." />
            ) : (
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            )}

            <Pagination
                current={currentPage}
                pageSize={itemsPerPage}
                total={totalItems}
                onChange={handlePageChange}
                showSizeChanger
                pageSizeOptions={[10, 20, 50]}
            />
        </div>
    );
};

export default PaginatedPrompt;
