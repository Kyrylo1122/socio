import { Box, Slider } from "@mui/material";

type OnChangeType = (e: Event, value: number | number[]) => void;

interface ISliderSizer {
  step?: number;
  defaultValue: number;
  min: number;
  max: number;
  onChange: OnChangeType;
}

interface ISetState {
  setState: (value: number) => void;
}
const SliderSizer = ({
  step = 1,
  defaultValue,
  min,
  max,
  onChange,
}: ISliderSizer) => {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        size="medium"
        defaultValue={defaultValue}
        aria-label="Small"
        valueLabelDisplay="auto"
        step={step}
        min={min}
        max={max}
        onChange={onChange}
        color="secondary"
      />
    </Box>
  );
};

export const SliderRotate = ({ setState }: ISetState) => (
  <SliderSizer
    defaultValue={0}
    min={0}
    max={360}
    onChange={(_, newValue) => setState(newValue as number)}
  />
);
export const SliderScale = ({ setState }: ISetState) => (
  <SliderSizer
    defaultValue={1}
    step={0.01}
    min={0.2}
    max={1}
    onChange={(_, newValue) => setState(newValue as number)}
  />
);
