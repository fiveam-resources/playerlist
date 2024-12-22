import { motion } from "motion/react";
import { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { cn } from "../../lib/utils";

interface SearchInputProps {
  onChange?: (query: string) => void;
}

const SearchInput = ({ onChange }: SearchInputProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (query: string) => {
    setQuery(query);

    if (onChange) {
      onChange(query);
    }
  };

  const handleFocus = () => {
    if (isExpanded && query.length >= 1) return;
    setIsExpanded(!isExpanded);
  };

  const handleBlur = () => {
    if (isExpanded && query.length >= 1) return;
    setIsExpanded(false);
  };

  return (
    <div
      className={cn(
        "flex items-center rounded-sm transition-all duration-300 hover:bg-muted",
        isExpanded && "rounded-sm ring-1 ring-white/10",
      )}
    >
      <FaSearch className="block size-6 p-1.5" onClick={handleFocus} />
      <motion.input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        className="bg-transparent outline-none"
        initial={{ width: 0, paddingLeft: 0 }}
        animate={{
          width: isExpanded ? "200px" : 0,
          paddingLeft: isExpanded ? "calc(var(--spacing) * 2)" : 0,
        }}
      />
    </div>
  );
};

export default SearchInput;
