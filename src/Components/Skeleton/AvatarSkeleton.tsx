import { Skeleton } from "@mui/material";

const AvatarSkeleton = () => (
  <Skeleton
    variant="circular"
    width={150}
    height={150}
    sx={{ bgcolor: "primary.accent" }}
  />
);

export default AvatarSkeleton;
