import Input from "./Input";

interface DataListProps {
  list: Array<any>;
  selected?: any;
  setSelected: (selected: any) => void;
  query: string;
  setQuery: (query: string) => void;
}

export default function DataList({ list, selected, setSelected, query, setQuery }: DataListProps) {

  const filteredObject =
    query === ''
      ? list
      : list.filter((object) =>
        object.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )

  return (
    <div>
      <div className="relative">
        <Input
          list="list"
          name="object"
          value={query}
          placeholder={selected}
          onChange={(e) => {
            let index = -1
            while (index + 1 < list.length) {
              index = index + 1;
              if (e.target.value === list[index].name) {
                setSelected(e.target.value);
                index = list.length + 1;
              }
            }
            setQuery(e.target.value)
          }}
          onClick={() => setQuery("")}
        />
      </div>

      <datalist id="list">
        {
          filteredObject.map((object) => (
            <option
              key={object._id}
              className={
                `cursor-default select-none bg-azul4 py-2 pl-10 pr-4 text-gray-900`
              }
              value={object.name}
            />
          ))
        }
      </datalist>
    </div>
  );
}