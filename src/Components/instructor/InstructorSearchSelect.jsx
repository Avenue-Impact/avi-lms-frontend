import { useState, useMemo, useRef, useEffect } from "react";
import { Search, Check, ChevronDown, X, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function InstructorSearchSelect({
  instructors = [],
  selectedId = "",
  onSelect,
  placeholder = "Select an instructor...",
  className = "",
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Find currently selected instructor
  const selectedInstructor = useMemo(() => {
    return instructors.find(
      (inst) => (inst.id || inst._id) === selectedId,
    );
  }, [instructors, selectedId]);

  // Filter instructors by name or email
  const filteredInstructors = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return instructors;

    return instructors.filter((inst) => {
      const firstName = (inst.first_name || inst.firstname || "").toLowerCase();
      const lastName = (inst.last_name || inst.lastname || "").toLowerCase();
      const fullName = `${firstName} ${lastName}`.trim();
      const email = (inst.email || "").toLowerCase();

      return (
        fullName.includes(q) ||
        firstName.includes(q) ||
        lastName.includes(q) ||
        email.includes(q)
      );
    });
  }, [instructors, searchQuery]);

  const getInstructorName = (inst) => {
    const first = inst.first_name || inst.firstname || "";
    const last = inst.last_name || inst.lastname || "";
    return `${first} ${last}`.trim() || "Unknown Instructor";
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "IN";
  };

  const handleSelect = (id) => {
    onSelect(id);
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onSelect("");
    setSearchQuery("");
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "flex w-full items-center justify-between rounded-lg border bg-white px-3.5 py-2.5 text-left text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-color-600 focus:border-primary-color-600",
          isOpen ? "border-primary-color-600 ring-2 ring-primary-color-100" : "border-gray-300 hover:border-gray-400",
          disabled && "cursor-not-allowed opacity-60 bg-gray-50",
        )}
      >
        {selectedInstructor ? (
          <div className="flex items-center gap-2.5 truncate">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-color-100 text-xs font-bold text-primary-color-700">
              {getInitials(getInstructorName(selectedInstructor))}
            </div>
            <div className="truncate">
              <span className="font-semibold text-gray-900">
                {getInstructorName(selectedInstructor)}
              </span>
              <span className="ml-1.5 text-xs text-gray-500">
                ({selectedInstructor.email})
              </span>
            </div>
          </div>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}

        <div className="flex items-center gap-1.5 ml-2 shrink-0">
          {selectedInstructor && !disabled && (
            <span
              role="button"
              tabIndex={0}
              onClick={handleClear}
              className="rounded p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              title="Clear selection"
            >
              <X className="h-3.5 w-3.5" />
            </span>
          )}
          <ChevronDown
            className={cn(
              "h-4 w-4 text-gray-400 transition-transform duration-200",
              isOpen && "rotate-180 text-primary-color-600",
            )}
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 mt-1.5 w-full rounded-xl border border-gray-200 bg-white p-2 shadow-xl animate-in fade-in-50 zoom-in-95 duration-100">
          {/* Search Input */}
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by instructor name or email..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-8 text-xs text-gray-800 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-primary-color-600 focus:ring-1 focus:ring-primary-color-600"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* List of Instructors */}
          <div className="max-h-60 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            {filteredInstructors.length === 0 ? (
              <div className="py-6 text-center text-xs text-gray-400">
                <User className="mx-auto mb-1.5 h-6 w-6 text-gray-300" />
                No instructors found matching &quot;{searchQuery}&quot;
              </div>
            ) : (
              filteredInstructors.map((inst) => {
                const id = inst.id || inst._id;
                const name = getInstructorName(inst);
                const isSelected = id === selectedId;

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleSelect(id)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors",
                      isSelected
                        ? "bg-primary-color-50 text-primary-color-900 font-medium"
                        : "text-gray-700 hover:bg-gray-100",
                    )}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div
                        className={cn(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                          isSelected
                            ? "bg-primary-color-600 text-white"
                            : "bg-gray-100 text-gray-600",
                        )}
                      >
                        {getInitials(name)}
                      </div>
                      <div className="truncate">
                        <div className="font-semibold text-gray-900 truncate">
                          {name}
                        </div>
                        <div className="text-[11px] text-gray-500 truncate">
                          {inst.email}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="h-4 w-4 shrink-0 text-primary-color-600 ml-2" />
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer count indicator */}
          <div className="mt-2 border-t border-gray-100 pt-1.5 px-1 text-[11px] text-gray-400 flex justify-between">
            <span>
              Showing {filteredInstructors.length} of {instructors.length} instructors
            </span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-primary-color-600 hover:underline font-medium"
              >
                Reset search
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
