import { useEffect } from "react";
import { useMemo } from "react";
// import { response } from "../../../backend/src/app";

const API_URL = "http://localhost:3000";

async function httpGetPlanets() {
  const resp = await fetch(`${API_URL}/planets`)
  return await resp.json()
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`)
  const fetchedLaunches = await response .json();
  return fetchedLaunches.sort((a,b)=>a.flightNumber-b.flightNumber)
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try{
    return await fetch(`${API_URL}/launches`, {
    method: "post",
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(launch),
  })
  }
  catch(err){
    return {
    ok: false,
    }
  }
  
  
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try{
  return await fetch(`${API_URL}/launches/${id}`,
    {
      method: "delete"
    }
  )
  }
  catch(err){
    console.log(err)
    return {
    ok: false,
    }
  }
  
  
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
