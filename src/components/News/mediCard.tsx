import * as React from "react";
import { Stack } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { News } from "../../model";
import { getWeekday } from "../../utils";

type MediaCardProps = {
  data: News;
};

export default function MediaCard({ data }: MediaCardProps) {
  return (
    <Stack sx={{ maxWidth: "200px" }}>
      <CardMedia
        component="img"
        height="140"
        image={data.img_url}
        alt={data.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <Typography variant="body1" color="black">
            {getWeekday(data.date)}
          </Typography>
          {data.title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {data.description}
        </Typography>
      </CardContent>
    </Stack>
  );
}
