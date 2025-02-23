"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Nav = styled.nav`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavList = styled.ul`
  display: none;
  margin-left: auto;
  gap: 1.5rem;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const NavItem = styled.li<{ $isActive: boolean }>`
  position: relative;
  color: ${({ $isActive }) => ($isActive ? "#1f2937" : "#4b5563")};
  font-size: 1.125rem;
  font-weight: 500;
  padding: 1rem 0;
  transition: color 0.3s ease;

  &:hover {
    color: #1f2937;
  }

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    height: 4px;
    width: 100%;
    background-color: ${({ $isActive }) => ($isActive ? "#3b82f6" : "#93c5fd")};
    transform: scaleX(${({ $isActive }) => ($isActive ? 1 : 0)});
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }
`;

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <NavItem $isActive={isActive}>
      <Link href={href} className="px-4">
        <span>{children}</span>
      </Link>
    </NavItem>
  );
};

const Navbar = () => {

      const [mounted, setMounted] = useState(false);
    
      useEffect(() => {
        setMounted(true);
      }, []);
    
      if (!mounted) return null; 
  return (
    <Nav>
      <NavContainer>
        <NavList>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/history">History</NavLink>
        </NavList>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
