export default function timeConverter(timeSeconds) {
  const date = new Date(timeSeconds * 1000);

  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${day}-${month}-${year}`;
}
