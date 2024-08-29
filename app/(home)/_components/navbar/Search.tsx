"use client";

import React, { useState } from "react";
import qs from "query-string";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, XIcon } from "lucide-react";

const Search = () => {
  const router = useRouter();

  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value) return;

    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: {
          term: value,
        },
      },
      { skipNull: true, skipEmptyString: true },
    );

    router.push(url);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative flex w-full max-w-[400px] flex-1 items-center shadow-sm"
    >
      <Input
        value={value}
        placeholder="Search..."
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />

      {value.trim() && (
        <XIcon
          className="absolute right-14 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-muted-foreground transition hover:opacity-75"
          onClick={() => setValue("")}
        />
      )}

      <Button
        className="flex items-center justify-center rounded-l-none"
        type="submit"
        variant="secondary"
      >
        <SearchIcon className="h-5 w-5" />
      </Button>
    </form>
  );
};

export default Search;
