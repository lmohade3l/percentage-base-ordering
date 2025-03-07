import { useState, useEffect, ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { toPersianNumber } from "@/lib/numberUtils";

export interface Column<T> {
  header: React.ReactNode;
  accessor?: keyof T | "actions" | "status";
  render?: (row: T, rowIndex: number) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: ((row: T) => void) | null;
  pageSize?: number;
  pageSizeOptions?: number[];
  showPageSizeOptions?: boolean;
  onPageSizeChange?: ((newPageSize: number) => void) | null;
  rowHeight?: number | null;
}

export default function CustomTable<T>({
  columns,
  data,
  onRowClick = null,
  pageSize = 10,
  pageSizeOptions = [5, 10, 25, 50, 100],
  showPageSizeOptions = false,
  onPageSizeChange = null,
  rowHeight = null,
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);
  const [paginatedData, setPaginatedData] = useState<T[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (data) {
      const start = (currentPage - 1) * currentPageSize;
      const end = start + currentPageSize;
      setPaginatedData(data.slice(start, end));
      setTotalPages(Math.ceil(data.length / currentPageSize));
    }
  }, [data, currentPage, currentPageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = parseInt(e.target.value);
    setCurrentPageSize(newPageSize);
    setCurrentPage(1);
    if (onPageSizeChange) {
      onPageSizeChange(newPageSize);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      if (start > 2) {
        pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const renderCellContent = (row: T, column: Column<T>, rowIndex: number): ReactNode => {
    if (column.render) {
      return column.render(row, rowIndex);
    }
    
    if (column.accessor) {
      const value = row[(column.accessor as keyof T)];
      return value !== null && value !== undefined ? String(value) : null;
    }
    
    return null;
  };

  return (
    <div className="space-y-4">
      <Table dir="rtl" className={`text-right`}>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={`col-${index}`} className="text-right">
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, rowIndex) => (
              <TableRow
                key={`row-${rowIndex}`}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={onRowClick ? "cursor-pointer hover:bg-slate-50" : ""}
                style={{
                  height: rowHeight || 50,
                }}
              >
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={`cell-${rowIndex}-${colIndex}`}
                    className="text-right"
                  >
                 {renderCellContent(row, column, rowIndex)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-8">
                داده‌ای برای نمایش وجود ندارد
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div
        className="flex flex-wrap justify-center items-center gap-4 mt-4"
        dir="rtl"
      >
        {showPageSizeOptions && (
          <div className="flex items-center gap-2">
            <span className="text-sm">تعداد در هر صفحه:</span>
            <select
              value={currentPageSize}
              onChange={handlePageSizeChange}
              className="border rounded px-2 py-1 text-sm"
              dir="ltr"
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {toPersianNumber ? toPersianNumber(option) : option}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* <span className="text-sm">
            صفحه {toPersianNumber ? toPersianNumber(currentPage) : currentPage} از {toPersianNumber ? toPersianNumber(totalPages) : totalPages}
          </span> */}

          <div className="flex items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`rounded p-1 ${
                currentPage === 1
                  ? "text-gray-300"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              aria-label="صفحه قبل"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-1 mx-2">
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() =>
                    typeof page === "number" ? handlePageChange(page) : null
                  }
                  className={`px-3 py-1 rounded ${
                    page === currentPage
                      ? "bg-[#00D890] text-white"
                      : page === "..."
                      ? ""
                      : "hover:bg-gray-100"
                  }`}
                  disabled={page === "..."}
                >
                  {page === "..."
                    ? page
                    : toPersianNumber
                    ? toPersianNumber(page)
                    : page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`rounded p-1 ${
                currentPage === totalPages
                  ? "text-gray-300"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              aria-label="صفحه بعد"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
