import { type APISpaceXResponse, type Doc } from "../types/api";

export const getLatestLaunches = async () => {
  const res = await fetch("https://api.spacexdata.com/v5/launches/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: {},
      options: {
        sort: {
          date_unix: "asc",
        },
        limit: 20,
      },
    }),
  });

  const { docs: launches } = (await res.json()) as APISpaceXResponse;

  return launches;
};

export const getOldestLaunches = async () => {
  const res = await fetch("https://api.spacexdata.com/v5/launches/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: {},
      options: {
        sort: {
          date_unix: "desc",
        },
        limit: 20,
      },
    }),
  });

  const { docs: launches } = (await res.json()) as APISpaceXResponse;

  return launches;
};

export const getLaunchBy = async ({ id }: { id: string }) => {
  const res = await fetch(`https://api.spacexdata.com/v5/launches/${id}`);

  const launch = (await res.json()) as Doc;

  return launch;
};

export const getLaunches = async () => {
  const res = await fetch(`https://api.spacexdata.com/v5/launches`);

  const launches = await res.json();

  return launches;
};

export const getLatestLaunch = async () => {
  const res = await fetch("https://api.spacexdata.com/v4/launches/next");

  const launch = await res.json();

  return launch;
}