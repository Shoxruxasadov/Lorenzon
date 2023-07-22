import React from "react";
import SectionOne from "./SectionOne";
import TrendignLoop from "./Mini/TrendignLoop";
import SectionTwo from "./SectionTwo";
import Artists from "./Mini/Artists";
import SectionThree from "./SectionThree";
import Tape from "./Mini/Tape";
import SectionFour from "./SectionFour";

export default function Main({ darkmode }) {
  return (
    <main>
      <SectionOne darkmode={darkmode} />
      <TrendignLoop />
      <SectionTwo />
      <Artists />
      <SectionThree />
      <Tape />
      <SectionFour darkmode={darkmode} />
    </main>
  );
}
