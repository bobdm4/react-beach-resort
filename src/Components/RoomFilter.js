import React, { useContext } from "react";
import { RoomContext } from "../Context";
import { Title } from "./Title";

//get all unigue value
const getUnique = (items, value) => {
  return [...new Set(items.map((item) => item[value]))];
};

export const RoomFilter = ({ rooms }) => {
  const context = useContext(RoomContext);
  const { formState, handleChange } = context;

  //get unique type
  let types = getUnique(rooms, "type");
  //get all
  types = ["all", ...types];
  //map to jsx
  types = types.map((item, i) => {
    return (
      <option value={item} key={i}>
        {item}
      </option>
    );
  });

  let people = getUnique(rooms, "capacity");
  people = people.map((item, i) => {
    return (
      <option key={i} value={item}>
        {item}
      </option>
    );
  });
  return (
    <section className="filter-container">
      <Title title="search rooms" />
      <form className="filter-form">
        {/*select type*/}
        <div className="form-group">
          <label htmlFor="type">room type</label>
          <select
            name="type"
            id="type"
            className="form-control"
            onChange={handleChange}
            value={formState.type}
          >
            {types}
          </select>
        </div>
        {/*select quests*/}
        <div className="form-group">
          <label htmlFor="capacity">Guests</label>
          <select
            name="capacity"
            id="capacity"
            className="form-control"
            onChange={handleChange}
            value={formState.capacity}
          >
            {people}
          </select>
        </div>
        {/*select price*/}
        <div className="form-group">
          <label htmlFor="price">room price ${formState.price}</label>
          <input
            type="range"
            name="price"
            min={formState.minPrice}
            max={formState.maxPrice}
            id="capacity"
            className="form-control"
            onChange={handleChange}
            value={formState.price}
          />
        </div>
        {/* select minsize */}
        <div className="form-group">
          <label htmlFor="size">size</label>
          <div className="size-inputs">
            <input
              type="number"
              name="minSize"
              id="size"
              value={formState.minSize}
              onChange={handleChange}
              className="size-input"
            />
          </div>
        </div>
        {/* select maxsize */}
        <div className="form-group">
          <label htmlFor="size">size</label>
          <div className="size-inputs">
            <input
              type="number"
              name="maxSize"
              id="size"
              value={formState.maxSize}
              onChange={handleChange}
              className="size-input"
            />
          </div>
        </div>
        {/* extra */}
        <div className="form-group">
          <div className="single-extra">
            <input
              type="checkbox"
              name="breakfast"
              className="breakfast"
              id="breakfast"
              checked={formState.breakfast}
              onChange={handleChange}
            />
            <label htmlFor="breakfast">breakfast</label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              className="pets"
              name="pets"
              id="pets"
              checked={formState.pets}
              onChange={handleChange}
            />
            <label htmlFor="pets">pets</label>
          </div>
        </div>
      </form>
    </section>
  );
};
