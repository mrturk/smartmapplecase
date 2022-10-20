import React from "react";
import { Stack, Typography } from "@mui/material";
import { Weather } from "../../model";
import WeatherCard from "./WeatherCard";

type weatherListProps = {
  weathers: Weather[];
  title?: string;
};

const weatherList = ({ weathers, title = "Hava Durumu" }: weatherListProps) => {
  return (
    <Stack>
      <Stack alignItems="center" justifyContent="center">
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
      </Stack>

      <Stack
        sx={{ maxHeight: "350px", overflowY: "scroll" }}
        flexDirection="row"
        flexWrap="wrap"
        gap="10px"
        paddingY="10px"
      >
        {weathers.map((weather, index) => {
          return <WeatherCard data={weather} key={index} />;
        })}
      </Stack>
    </Stack>
  );
};
export default weatherList;
