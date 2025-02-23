import { Search } from "lucide-react";
import React from "react";
import styled from "styled-components";

type Props = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
  name?: string;
};

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  padding-left: 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  outline: none;
  transition: border 0.2s ease-in-out;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 10px;
  color: #6b7280;
`;

const SearchField = ({ onChange, value, name, placeholder }: Props) => {
  return (
    <SearchContainer>
      <SearchIcon size={20} />
      <SearchInput
        type="text"
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
      />
    </SearchContainer>
  );
};

export default SearchField;
