import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import DialogCreateServer from "@/components/Dialog/DialogCreateServer";
import DialogWrapper from "@/components/Dialog/DialogWrapper";
import { setActiveGuild } from "@/components/messagesStorage";
import AddIcon from "@/icons/AddIcon";
import { useAppDispatch, useAppSelector } from "@/store";
import GuildItem, { GuildItemButton } from "./GuildItem";
import guildsSelector from "./guildsSelector";
import { fetchGuildsList } from "./guildsStorage";
import type { EntityId } from "@reduxjs/toolkit";

const GuildsWrapper = styled("div")`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-guilds-body);
  padding: 10px 0;
  gap: 10px;
`;

const { getIds, getActiveGuildId } = guildsSelector;
export default function GuildsList() {
  const dispatch = useAppDispatch();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const ids = useAppSelector(getIds);
  const active = useAppSelector(getActiveGuildId);
  useEffect(() => {
    dispatch(fetchGuildsList());
  }, [dispatch]);
  const handleClickGuild = useCallback(
    (id: EntityId) => {
      dispatch(setActiveGuild(String(id)));
    },
    [dispatch]
  );
  const handleShowDialog = () => {
    setShowAddDialog(true);
  };
  const handleCloseDialog = () => {
    setShowAddDialog(false);
  };

  return (
    <>
      <GuildsWrapper>
        <DialogWrapper
          bgColor="--black-500"
          active={showAddDialog}
          onClose={handleCloseDialog}
        >
          <DialogCreateServer />
        </DialogWrapper>

        {ids.map((v) => (
          <GuildItem
            key={v}
            onClick={handleClickGuild}
            active={active === v}
            id={v}
          />
        ))}
        <GuildItemButton onClick={handleShowDialog}>
          <AddIcon height={48} width={48} />
        </GuildItemButton>
      </GuildsWrapper>
    </>
  );
}