import React, { useContext } from "react";
import { RoomFilter } from "./RoomFilter";
import { RoomList } from "./RoomList";
import { RoomContext } from "../Context";
import { Loading } from "./Loading";

export const RoomsContainer = () => {
  const context = useContext(RoomContext);
  const { loading, sortedRooms, rooms } = context;

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <RoomFilter rooms={rooms} />
      <RoomList rooms={sortedRooms} />
    </div>
  );
};
