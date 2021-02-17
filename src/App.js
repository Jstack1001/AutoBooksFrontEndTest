import "./App.css";
import React, { useState, useEffect } from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { DataGrid } from "@material-ui/data-grid";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [input, setInput] = useState(null);
  const [rows, setRows] = useLocalStorage("todos", [
    {
      id: 1,
      "Start Time": "0",
      "Stop Time": 0,
      Duration: 0,
      Description: input,
    },
  ]);

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  }));

  const classes = useStyles();

  const inputDescription = (event) => {
    event.preventDefault();
    setInput(event.target.value);
    console.log(input);
    setRows([
      {
        id: 1,
        "Start Time": 0,
        "Stop Time": 0,
        Duration: 0,
        Description: input,
      },
    ]);
  };

  useEffect(() => {
    let watch = null;
    if (timerOn) {
      watch = setInterval(() => {
        setTime((ptime) => ptime + 10);
      }, 10);
    } else if (!timerOn) {
      clearInterval(watch);
    }
    return () => clearInterval(watch);
  }, [timerOn]);

  return (
    <div className="App">
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          type="string"
          label="Enter Activity Description"
          value={input}
          onChange={inputDescription}
          onKeyPress={(ev) => {
            if (ev.key === "Enter") {
              ev.preventDefault();
            }
          }}
        />
      </form>
      <br />
      <br />
      <ButtonGroup disableElevation variant="contained" color="primary">
        {!timerOn && time === 0 && (
          <Button
            data-testid="test-button0"
            onClick={() => {
              setTimerOn(true);

              setRows([
                {
                  id: 1,
                  "Start Time": time,
                  "Stop Time": 0,
                  Duration: 0,
                  Description: input,
                },
              ]);
            }}
          >
            Start Activity
          </Button>
        )}

        <Button
          data-testid="test-button1"
          onClick={() => {
            setTimerOn(false);

            setRows([
              {
                id: 1,
                "Start Time": "00:00",
                "Stop Time": time,
                Duration: time,
                Description: input,
              },
            ]);
          }}
        >
          Stop Activity
        </Button>

        <Button data-testid="test-button2" onClick={() => setTime(0)}>
          Reset
        </Button>
      </ButtonGroup>
      <br />
      <br />
      <div id="display">
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      <br />
      <br />
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid
          columns={[
            { field: "id", width: 200 },
            { field: "Start Time", width: 200 },
            { field: "Stop Time", width: 200 },
            { field: "Duration", width: 200 },
            { field: "Description", width: 200 },
          ]}
          rows={rows}
          checkboxSelection
        />
      </div>
    </div>
  );
}

export default App;
