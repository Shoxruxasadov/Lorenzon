export default function ageConverter(timeSeconds) {
  const preset = new Date(Math.floor(Date.now() / 1000) * 1000);
  const happy = new Date(Math.floor(timeSeconds) * 1000);

  const presetYear = preset.getFullYear();
  const happyYear = happy.getFullYear();
  const age = presetYear - happyYear;

  return age;
}
