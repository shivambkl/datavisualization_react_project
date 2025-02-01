// src/components/Pagination.js

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex justify-between mt-4">
            <button
                onClick={handlePrevPage}
                className="bg-gray-300 p-2 rounded"
                disabled={currentPage === 1}
                style={{ color: '#8acfed' }}
            >
                Previous
            </button>
            <span className="self-center">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
            type="buttton"
                onClick={handleNextPage}
                className={`bg-[#8acfed] p-2 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
