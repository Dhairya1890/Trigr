import { cn } from "@/components/ui/button";

export function DataTable({ columns, data, className, onRowClick }) {
  if (!data || data.length === 0) return null;

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-outline-variant/20">
            {columns.map((col, idx) => (
              <th
                key={col.header || idx}
                className="text-left py-3 px-4 text-xs font-bold text-outline uppercase tracking-wider font-headline"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={row.id || i}
              className={cn(
                "border-b border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors",
                onRowClick && "cursor-pointer"
              )}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col, idx) => (
                <td key={col.header || idx} className="py-3 px-4 text-on-surface">
                  {typeof col.accessor === "function" 
                    ? col.accessor(row) 
                    : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
