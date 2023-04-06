import classes from "./FilterItem.module.css";

const FilterItem = (props) => {
  const { title, items, selectedItems, toggleItemHandler } = props;

  return (
    <div className={classes[`filter-item`]}>
      <h3>{title}</h3>
      {items.map((item) => (
        <div key={item} className={classes[`filter-item-inner`]}>
          <input
            id={item}
            type="checkbox"
            checked={selectedItems.includes(item)}
            onChange={() => toggleItemHandler(item)}
          />
          <label htmlFor={item}>{item}</label>
        </div>
      ))}
    </div>
  );
};

export default FilterItem;
