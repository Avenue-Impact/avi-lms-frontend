import { cn } from "@/lib/utils";
import { createContext, useContext } from "react";

const TableContext = createContext();

function Table({ children, cols }) {
  return (
    <TableContext.Provider value={{ cols }}>
      <div role="table" className="">
        {children}
      </div>
    </TableContext.Provider>
  );
}

function Header({ children, className }) {
  const { cols } = useContext(TableContext);

  return (
    <div
      role="table header"
      className={cn(
        `grid rounded-tl-[10px] rounded-tr-[10px] bg-[#F0F2F5] px-7 py-[13.5px]`,
        className,
      )}
      style={{ gridTemplateColumns: cols }}
    >
      {children}
    </div>
  );
}

function Row({ children, className }) {
  const { cols } = useContext(TableContext);
  return (
    <div
      role="table row"
      className={cn(`grid  px-4 py-[26px]`, className)}
      style={{ gridTemplateColumns: cols }}
    >
      {children}
    </div>
  );
}

Table.Header = Header;
Table.Row = Row;

export default Table;
