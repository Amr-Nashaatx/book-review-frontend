export default function DropdownItem({ label, handleClick, key }) {
  return (
    <li key={key}>
      <button onClick={handleClick}>{label}</button>
    </li>
  );
}
