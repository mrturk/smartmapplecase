import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Stack, Typography } from "@mui/material";
import { Weather } from "../../model";
import { getWeekday } from "../../utils";

type WeatherCardProps = {
  data: Weather;
};

export default function WeatherCard({ data }: WeatherCardProps) {
  return (
    <Card
      sx={{ maxWidth: "150px", alignItems: "center", justifyContent: "center" }}
    >
      <CardContent>
        <Typography
          textAlign="center"
          gutterBottom
          variant="h5"
          component="div"
        >
          {getWeekday(data.date, true)}
        </Typography>
        <CardMedia
          component="img"
          height="140"
          image={`/${data.type}.svg`}
          alt="green iguana"
        />
        <Stack alignItems="center" justifyContent="center">
          <Typography gutterBottom variant="h5" component="div">
            {data.type}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {data.tempeture}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
