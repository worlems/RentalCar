import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { selectBrands } from "../../redux/carsBrands/selectors";
import { getBrandsList } from "../../redux/carsBrands/operations";

import s from "./FilterPanel.module.css";
import clsx from "clsx";

const FilterPanel = ({ onSearch }) => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [mileageFrom, setMileageFrom] = useState(null);
  const [mileageTo, setMileageTo] = useState(null);

  useEffect(() => {
    dispatch(getBrandsList());
  }, [dispatch]);

  const handleSearchClick = () => {
    const filters = {};
    if (selectedBrand) filters.brand = selectedBrand;
    if (selectedPrice) filters.rentalPrice = Number(selectedPrice);
    if (mileageFrom !== null) filters.minMileage = mileageFrom;
    if (mileageTo !== null) filters.maxMileage = mileageTo;

    onSearch(filters);
  };

  const isDisabled =
    !selectedBrand &&
    !selectedPrice &&
    mileageFrom === null &&
    mileageTo === null;

  const uniqueBrands = [...new Set(brands)];
  const uniquePrices = [30, 40, 50, 60, 70, 80, 90, 100, 110, 120];

  const handleMileageChange = (value, setter) => {
    const numeric = value.replace(/\D/g, "");
    setter(numeric ? Number(numeric) : null);
  };

  return (
    <div className={s.panel}>
      <div className={s.selects}>
        <div className={s.selectGroup}>
          <label className={s.label}>Car brand</label>
          <select
            className={s.selectBtn}
            value={selectedBrand || ""}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="" disabled>
              Choose a brand
            </option>
            {uniqueBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className={s.selectGroup}>
          <label className={s.label}>Price / 1 hour</label>
          <select
            className={clsx(s.selectBtn, selectedPrice && s.selected)}
            value={selectedPrice || ""}
            onChange={(e) => setSelectedPrice(e.target.value)}
          >
            <option value="" disabled>
              Choose a price
            </option>
            {uniquePrices.map((price) => (
              <option key={price} value={price}>
                {price}
              </option>
            ))}
          </select>
        </div>

        <div className={s.selectGroup}>
          <label className={s.label}>Car mileage / km</label>
          <div className={s.inputGroup}>
            <input
              type="text"
              inputMode="numeric"
              className={s.mileageInput}
              placeholder="From"
              value={mileageFrom !== null ? mileageFrom.toLocaleString() : ""}
              onChange={(e) =>
                handleMileageChange(e.target.value, setMileageFrom)
              }
            />
            <input
              type="text"
              inputMode="numeric"
              className={s.mileageInput}
              placeholder="To"
              value={mileageTo !== null ? mileageTo.toLocaleString() : ""}
              onChange={(e) =>
                handleMileageChange(e.target.value, setMileageTo)
              }
            />
          </div>
        </div>

        <button
          className={s.searchBtn}
          onClick={handleSearchClick}
          disabled={isDisabled}
        >
          Search
        </button>
      </div>
    </div>
  );
};

FilterPanel.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default FilterPanel;
