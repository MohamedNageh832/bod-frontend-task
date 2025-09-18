type PaginationConfig = {
  currentPage: number;
  totalPages: number;
};

export const getPagination = (config: PaginationConfig) => {
  const { currentPage, totalPages } = config;

  if (totalPages <= 3) return [...Array(totalPages)].map((_, i) => `${i + 1}`);
  else if (
    totalPages > 3 &&
    (currentPage === totalPages || currentPage === totalPages - 1)
  ) {
    return [
      "1",
      "...",
      `${totalPages - 2}`,
      `${totalPages - 1}`,
      `${totalPages}`,
    ];
  } else if (totalPages > 3 && currentPage < 3) {
    return ["1", "2", "3", "...", `${totalPages}`];
  } else {
    return [
      "1",
      "...",
      `${currentPage - 1}`,
      `${currentPage}`,
      `${currentPage + 1}`,
      "...",
      `${totalPages}`,
    ];
  }
};
