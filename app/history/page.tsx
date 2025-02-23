"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import Button from "../components/button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f3f4f6;
  padding: 1rem;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
  margin: 1rem 0;
  color: #6b7280;
`;

const HistoryWrapper = styled.div`
  width: 100%;
  max-width: 42rem;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  overflow: hidden;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #e5e7eb;
  padding: 0.75rem;
  font-weight: 600;
  color: #374151;
`;

const EntryRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
  }
`;

const Text = styled.p`
  color: #374151;
`;

const UserDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AvatarWrapper = styled.div`
  width: 6rem;
  height: 6rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  overflow: hidden;
`;

const PlaceholderText = styled.p`
  color: #6b7280;
  text-align: center;
  padding: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

export default function SearchHistory() {
  const [history, setHistory] = useState<
    { term: string; user: { avatarUrl: string; username: string } | string }[]
  >([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setHistory(savedHistory);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("searchHistory");
    setHistory([]);
  };

  return (
    <Container>
      <Title>Search History</Title>

      <HistoryWrapper>
        <Header>
          <Text>Search Term</Text>
          <Text>Search Result</Text>
        </Header>

        {history.length > 0 ? (
          history.map((entry, index) => (
            <EntryRow key={index}>
              <Text>{entry.term}</Text>

              {typeof entry.user === "string" ? (
                <Text>{entry.user}</Text>
              ) : (
                <UserDetails>
                  <UserInfo>
                    <Text className="font-medium mb-2">User Image</Text>
                    <AvatarWrapper>
                      <Image
                        src={entry.user.avatarUrl}
                        alt="User Avatar"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </AvatarWrapper>
                  </UserInfo>

                  <UserInfo>
                    <Text className="font-medium mb-2">GitHub Username</Text>
                    <Text className="text-lg font-semibold">{entry.user.username}</Text>
                  </UserInfo>
                </UserDetails>
              )}
            </EntryRow>
          ))
        ) : (
          <PlaceholderText>No search history available</PlaceholderText>
        )}
      </HistoryWrapper>

      {history.length > 0 && (
        <ButtonWrapper>
          <Button onClick={clearHistory}>Clear Search History</Button>
        </ButtonWrapper>
      )}
    </Container>
  );
}
