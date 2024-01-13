import { Box, Grid, Skeleton } from "@mui/material";

function SkeletonChildrenDemo() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" width="100%" height="2rem" />
      </Box>
      <Skeleton variant="rectangular" width="100%" height={150} />
    </Box>
  );
}

export default function PostSkeleton() {
  return (
    <Grid container spacing={8}>
      <Grid item xs>
        <SkeletonChildrenDemo />
      </Grid>
    </Grid>
  );
}
