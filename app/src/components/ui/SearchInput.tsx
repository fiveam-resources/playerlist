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

  const handleFocusBlur = (isFocus: boolean) => {
    if (isExpanded && query.length >= 1) return;
    setIsExpanded(isFocus ? !isExpanded : false);
  };

  const handleFocus = () => {
    inputRef.current?.focus();
    handleFocusBlur(true);
  };

  const handleBlur = () => {
    handleFocusBlur(false);
  };

  return (
    <div
      className={cn(
        "flex items-center rounded-sm bg-white/5 transition-all duration-300 hover:bg-zinc-950",
        isExpanded && "rounded-sm bg-zinc-950",
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
