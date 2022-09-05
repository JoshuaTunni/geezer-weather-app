export const DisplayContext = ({ date, location }) => {
  return (
    <div>
      <h4 className={"light sm"}>{date}</h4>
      <h4 className={"light sm"}>{location}</h4>
    </div>
  );
};
