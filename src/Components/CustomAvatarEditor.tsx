import { useState, forwardRef } from "react";
import { SpeedDial, SpeedDialIcon } from "@mui/material";
import Editor from "react-avatar-editor";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import PhotoSizeSelectLargeIcon from "@mui/icons-material/PhotoSizeSelectLarge";
import { SliderRotate, SliderScale } from "./ui/Sliders";
import { StyledSpeedDialAction } from "./ui/StyledComponents";
import AvatarEditorType from "react-avatar-editor";

interface IProp {
  file: File;
}

const AvatarEditor = forwardRef<AvatarEditorType, IProp>(({ file }, ref) => {
  const [openTools, setOpenTools] = useState(false);
  const [openRotate, setOpenRotate] = useState(false);
  const [openScale, setOpenScale] = useState(true);

  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1);

  return (
    <>
      <Editor
        ref={ref}
        disableHiDPIScaling={false}
        width={250}
        height={250}
        image={file}
        borderRadius={125}
        scale={scale}
        rotate={rotate}
      />
      <SpeedDial
        ariaLabel="SpeedDial controlled open example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClick={() => setOpenTools((state) => !state)}
        open={openTools}
      >
        <StyledSpeedDialAction
          icon={<RotateRightIcon />}
          tooltipTitle="rotate"
          onClick={() => {
            setOpenRotate(true);
            setOpenScale(false);
          }}
        />
        <StyledSpeedDialAction
          icon={<PhotoSizeSelectLargeIcon />}
          tooltipTitle="scale"
          onClick={() => {
            setOpenScale(true);
            setOpenRotate(false);
          }}
        />
      </SpeedDial>
      {openRotate ? <SliderRotate setState={setRotate} /> : null}
      {openScale ? <SliderScale setState={setScale} /> : null}
    </>
  );
});
export default AvatarEditor;
