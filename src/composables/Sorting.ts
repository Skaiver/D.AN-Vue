// @ts-nocheck
export function Sorting(weeks): Object {
  // first we want the single weeks to be sorted in months. use index of month as key
  // inside of the months the first key/week should be the youngest e.g. first week of the month
  let months: Object = {}

  console.log(weeks.length)

  for (let index = 0; index < weeks.length; index++) {
    const element = weeks[index]

    let ms = Date.parse(element.date.start)
    let date = new Date(ms)
    let monthNumber = date.getMonth()
    monthNumber++;

    if (!months[monthNumber]) {
      months[monthNumber] = []
    }

    months[monthNumber].push(element)

    // sort current month
    months[monthNumber].sort((a, b) => {
        return (
            new Date(`${a.date.start}`) -
            new Date(`${b.date.start}`)
        );
    });
  }

  return months;
}
