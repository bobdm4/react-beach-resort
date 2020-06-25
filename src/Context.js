import React, { useState, useEffect } from "react";
import Client from "./contentful";

export const RoomContext = React.createContext();

const formatData = (items) =>
  items.map((item) => {
    let id = item.sys.id;
    let images = item.fields.images.map((image) => image.fields.file.url);
    let room = { ...item.fields, images, id };
    return room;
  });

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [sortedRooms, setSortedRooms] = useState([]);
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formState, setFormState] = useState({
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  });

  const getData = async () => {
    try {
      let response = await Client.getEntries({
        content_type: "beachResort",
        order: "-fields.price",
      });
      let rooms = formatData(response.items);
      let featuredRooms = rooms.filter((room) => room.featured === true);
      let maxPrice = Math.max(...rooms.map((item) => item.price));
      let maxSize = Math.max(...rooms.map((item) => item.size));

      setRooms(rooms);
      setSortedRooms(rooms);
      setFeaturedRooms(featuredRooms);
      setLoading(false);

      setFormState((prevState) => ({ ...prevState, price: maxPrice }));
      setFormState((prevState) => ({ ...prevState, maxPrice }));
      setFormState((prevState) => ({ ...prevState, maxSize }));
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getRoom = (slug) => {
    let tempRooms = [...rooms];
    const room = tempRooms.find((room) => room.slug === slug);
    return room;
  };

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    filterRooms();
    // eslint-disable-next-line
  }, [formState]);

  const filterRooms = () => {
    let {
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets,
    } = formState;
    let tempRooms = [...rooms];
    capacity = parseInt(capacity);
    price = parseInt(price);

    //filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter((room) => room.type === formState.type);
    }
    //filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
    }
    //filter by price
    tempRooms = tempRooms.filter((room) => room.price <= price);
    //filter by size
    tempRooms = tempRooms.filter(
      (room) => room.size >= minSize && room.size <= maxSize
    );
    //filter by extra
    if (breakfast) {
      tempRooms = tempRooms.filter((room) => room.breakfast === true);
    }
    if (pets) {
      tempRooms = tempRooms.filter((room) => room.pets === true);
    }

    setSortedRooms(tempRooms);
  };

  return (
    <RoomContext.Provider
      value={{
        formState,
        rooms,
        sortedRooms,
        featuredRooms,
        loading,
        getRoom,
        handleChange,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const RoomConsumer = RoomContext.Consumer;
