/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Text } from "react-native-elements";

const CountdownTimer = (props) => {
  const [countdown, setCountdown] = useState("00:00:00");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let interval;

    interval = setInterval(() => {
      const now = moment();
      const targetDate = moment(props.pollDateTime);
      const duration = moment.duration(targetDate.diff(now));

      // Check if the target date has passed
      if (duration.asSeconds() <= 0) {
        props.updatePoll();
        clearInterval(interval);
        setDone(true);
      } else {
        // Format the duration as hours:minutes:seconds
        setDone(false);
        const hours = Math.floor(duration.asHours());
        const minutes = Math.floor(duration.asMinutes()) % 60;
        const seconds = Math.floor(duration.asSeconds()) % 60;

        // Pad single-digit minutes and seconds with leading zeros
        const formattedCountdown = `${String(hours).padStart(2, "0")}:${String(
          minutes
        ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        setCountdown(formattedCountdown);
      }
    }, 1000);

    // Clear interval on component unmount or when it loses focus
    return () => clearInterval(interval);
  }, [props.pollDateTime]);

  return (
    <Text
      style={{ fontFamily: "Poppins_400Regular", fontSize: 20, color: "red" }}
    >
      {done ? "Done" : countdown}
    </Text>
  );
};

export default CountdownTimer;
