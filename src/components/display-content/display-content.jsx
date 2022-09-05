import styles from "components/display-content/display-content.module.css";

export const DisplayContent = ({ temp, type, comment, link }) => {
  return (
    <div>
      <header className={["pad-inline", styles.desc].join(" ")}>
        <h2 className=" reg md ">{temp + "c"}</h2>
        <h1 className=" bold lg ">{type}</h1>
        <p className=" reg sm ">{comment}</p>
      </header>

      <img
        className={styles.img}
        src={require(`assets/images/weather-app-${link}.svg`)}
        alt="illustration of the weather for the searched city"
      />
    </div>
  );
};
