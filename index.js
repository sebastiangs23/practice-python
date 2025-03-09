import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";
const startDate = moment("2025-01-01");
const endDate = moment();

const makeCommits = (date) => {
  if (date.isAfter(endDate)) return;
  const data = {
    date: date.format(),
  };

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date.format(), { "--date": date.format() }).push();
  });
  makeCommits(date.add(1, "day"));
};

makeCommits(startDate);