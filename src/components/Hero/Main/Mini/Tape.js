import React from "react";
import { useSelector } from "react-redux";
import star from "../../../../images/Hero/section4/Star.svg";

export default function Tape() {
  const darkmode = useSelector((state) => state.utilityReducer.darkmode);
  
  return (
    <div className="tape">
      <div className="tape-inner">
        <span>
          {window.innerWidth < 425 ? (
            <>
              <div>
                <img src={star} alt="star" />
                <p>Bass</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>Beats</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>Chillout</p>
              </div>
            </>
          ) : window.innerWidth < 660 ? (
            <>
              <div>
                <img src={star} alt="star" />
                <p>Bass</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>Beats</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>Chillout</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>Afrobeat</p>
              </div>
            </>
          ) : window.innerWidth < 920 ? (
            <>
              <div>
                <img src={star} alt="star" />
                <p>Bass</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>Beats</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>Chillout</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>Afrobeat</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>POP</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>HIPPOP</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <img src={star} alt="star" />
                <p>Bass</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>Beats</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>Chillout</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>Afrobeat</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>POP</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>HIPPOP</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>DEEP HOUSE</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>JAZZ</p>
              </div>
            </>
          )}
        </span>
        <span>
          {window.innerWidth < 425 ? (
            <>
              <div>
                <img src={star} alt="star" />
                <p>Bass</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>Beats</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>Chillout</p>
              </div>
            </>
          ) : window.innerWidth < 660 ? (
            <>
              <div>
                <img src={star} alt="star" />
                <p>Bass</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>Beats</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>Chillout</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>Afrobeat</p>
              </div>
            </>
          ) : window.innerWidth < 920 ? (
            <>
              <div>
                <img src={star} alt="star" />
                <p>Bass</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>Beats</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>Chillout</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>Afrobeat</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>POP</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>HIPPOP</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <img src={star} alt="star" />
                <p>Bass</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>Beats</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>Chillout</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>Afrobeat</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>POP</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>HIPPOP</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>DEEP HOUSE</p>
              </div>
              <div>
                <img src={star} alt="star" />
                <p>JAZZ</p>
              </div>
            </>
          )}
        </span>
      </div>
    </div>
  );
}
