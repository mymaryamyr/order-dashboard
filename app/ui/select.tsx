"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SelectProps = {
  name: string;
  placeholder: string;
  options: { value: string; label: string }[];
};

const Select = ({ name, placeholder, options }: SelectProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentValue = searchParams.get(name) || "";

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0 max-w-xs">
      <label htmlFor={name} className="sr-only">
        {placeholder}
      </label>
      <select
        id={name}
        value={currentValue}
        onChange={(e) => handleChange(e.target.value)}
        className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
