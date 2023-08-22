import React from "react";
import SectionOne from "./SectionOne";
import TrendignLoop from "./Mini/TrendignLoop";
import SectionTwo from "./SectionTwo";
import Artists from "./Mini/Artists";
import SectionThree from "./SectionThree";
import Tape from "./Mini/Tape";
import SectionFour from "./SectionFour";

export default function Main() {
  return (
    <main>
      <SectionOne />
      <TrendignLoop />
      <SectionTwo />
      <Artists />
      <SectionThree />
      <Tape />
      <SectionFour />
    </main>
  );
}
