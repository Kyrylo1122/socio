import { Chip, List, ListItem } from "@mui/material";
interface IChipsArray {
  setChipData?: (state: string[]) => void;
  chipData: string[];
}
export default function ChipsArray({ chipData, setChipData }: IChipsArray) {
  const handleDelete = (chipToDelete: string) => {
    if (!setChipData) return;
    setChipData(chipData.filter((chip) => chip !== chipToDelete));
  };
  const handleClick = (value: string) => console.log(value);
  return (
    <List
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      {chipData.map((data) => (
        <ListItem
          key={data}
          sx={{ display: "inline", width: "auto", p: 0, cursor: "pointer" }}
        >
          <Chip
            label={data}
            onClick={() => handleClick(data)}
            onDelete={setChipData ? () => handleDelete(data) : undefined}
          />
        </ListItem>
      ))}
    </List>
  );
}
