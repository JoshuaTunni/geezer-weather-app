import styles from "components/search-bar/search-bar.module.css";

export const SearchBar = ({ currentCity, changeCity }) => {
  const handleInput = (event) => {
    changeCity(event.target.value);
  };

  return (
    <form
      className={styles.form}
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label
        htmlFor="search-bar"
        className={["light xsm", styles.label].join(" ")}
      >
        search a city
      </label>

      <div className={styles.wrapper}>
        <input
          id="search-bar"
          className={["light sm", styles.searchBar].join(" ")}
          type="text"
          placeholder="city"
          aria-label="Search for a city"
          value={currentCity}
          onChange={handleInput}
        />

        <img
          className={styles.icon}
          src={require("assets/images/weather-app-search-icon.svg").default}
          alt="search icon"
        />
      </div>
    </form>
  );
};
