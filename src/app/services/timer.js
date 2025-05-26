export const decrementTime = (
  mins,
  secs,
  timeDecrementedCallback,
  timeOverCallback
) => {
  if (mins === 0 && secs === 0) {
    timeOverCallback();
  } else if (secs === 0) {
    timeDecrementedCallback([mins - 1, 59]);
  } else {
    timeDecrementedCallback([mins, secs - 1]);
  }
};

export const determineNextPeriod = (currentPeriod, counter, periods) => {
  if (counter === 7) {
    return periods.longBrk;
  }

  if (currentPeriod.id === "focus") {
    return periods.shortBrk;
  }

  return periods.focus;
};
