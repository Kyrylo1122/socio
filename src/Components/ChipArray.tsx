import { Chip, List, ListItem } from "@mui/material";
interface IChipsArray {
  setChipData: (state: string[]) => void;
  chipData: string[];
}
export default function ChipsArray({ chipData, setChipData }: IChipsArray) {
  const handleDelete = (chipToDelete: string) => {
    setChipData(chipData.filter((chip) => chip !== chipToDelete));
  };

  return (
    <List
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      {chipData.map((data) => {
        let icon;

        return (
          <ListItem key={data} sx={{ display: "inline", width: "auto", p: 0 }}>
            <Chip
              icon={icon}
              label={data}
              onDelete={() => handleDelete(data)}
            />
          </ListItem>
        );
      })}
    </List>
  );
}
