export default function DisplayProperty({ propName, propVal, setPropVal }) {
  return (
    <>
    {propVal !== null ? (
      <div className="property">
        <label htmlFor={propName}>{propName}: </label>
        <input
          value={propVal}
          onChange={(e) => setPropVal(e.target.value)}
          name={propName}
          />
      </div>
    ) : (null)}
    </>
  );
}
