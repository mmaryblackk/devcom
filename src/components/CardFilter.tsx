type Props = {
  filter: string;
  setFilter: (value: string) => void;
};

const CardFilter: React.FC<Props> = ({ filter, setFilter }) => (
  <input
    type="text"
    placeholder="Filter by brand or last 4..."
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    className="border p-2 w-64 rounded-md"
  />
);

export default CardFilter;
