import styled from "styled-components";
import { chatsSelector } from "../chatsSelector";
import { useAppDispatch, useAppSelector } from "../../../store";
import { EntityId } from "@reduxjs/toolkit";
import Avatar from "boring-avatars";
import { setActiveChat } from "../../../mainStore";
import { useCallback } from "react";

const { getChatById } = chatsSelector;
const ListItemWrapper = styled.div<{ $active: boolean }>`
  display: flex;

  height: fit-content;
  padding: 5px 10px;
  background-color: ${(props) => (props.$active ? "#2d2d2d" : "#252525")};
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
  user-select: none;
  align-items: center;
  gap: 10px;
`;
const ChatTitleWrapper = styled.div``;

const ChatsListItem = (props: { id: EntityId; active?: string }) => {
  const { id, active } = props;
  const chat = useAppSelector((s) => getChatById(s, id));
  const dispatch = useAppDispatch();
  const handleSelectChat = useCallback(() => {
    dispatch(setActiveChat(`${id}`));
  }, [dispatch, id]);

  return (
    <>
      <ListItemWrapper $active={active === id} onClick={handleSelectChat}>
        <Avatar size={40} variant="beam" name={chat?.title} />
        <ChatTitleWrapper>{chat?.title}</ChatTitleWrapper>
      </ListItemWrapper>
    </>
  );
};
export default ChatsListItem;