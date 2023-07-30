import React from "react";
import star from "../../../../images/section4/Star.webp";

export default function Tape() {
  return (
    <div className="tape">
      <div className="tape-inner">
        <span>
          {window.innerWidth < 425 ? (
            <>
              <div>
                <img src={star} />
                <p>Bass</p>
              </div>
              <div>
                <img src={star} />
                <p>Beats</p>
              </div>
              <div>
                <img src={star} />
                <p>Chillout</p>
              </div>
            </>
          ) : window.innerWidth < 660 ? (
            <>
              <div>
                <img src={star} />
                <p>Bass</p>
              </div>
              <div>
                <img src={star} />
                <p>Beats</p>
              </div>
              <div>
                <img src={star} />
                <p>Chillout</p>
              </div>
              <div>
                <img src={star} />
                <p>Afrobeat</p>
              </div>
            </>
          ) : window.innerWidth < 920 ? (
            <>
              <div>
                <img src={star} />
                <p>Bass</p>
              </div>
              <div>
                <img src={star} />
                <p>Beats</p>
              </div>
              <div>
                <img src={star} />
                <p>Chillout</p>
              </div>
              <div>
                <img src={star} />
                <p>Afrobeat</p>
              </div>
              <div>
                <img src={star} />
                <p>POP</p>
              </div>
              <div>
                <img src={star} />
                <p>HIPPOP</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <img src={star} />
                <p>Bass</p>
              </div>
              <div>
                <img src={star} />
                <p>Beats</p>
              </div>
              <div>
                <img src={star} />
                <p>Chillout</p>
              </div>
              <div>
                <img src={star} />
                <p>Afrobeat</p>
              </div>
              <div>
                <img src={star} />
                <p>POP</p>
              </div>
              <div>
                <img src={star} />
                <p>HIPPOP</p>
              </div>
              <div>
                <img src={star} />
                <p>DEEP HOUSE</p>
              </div>
              <div>
                <img src={star} />
                <p>JAZZ</p>
              </div>
            </>
          )}
        </span>
        <span>
          {window.innerWidth < 425 ? (
            <>
              <div>
                <img src={star} />
                <p>Bass</p>
              </div>
              <div>
                <img src={star} />
                <p>Beats</p>
              </div>
              <div>
                <img src={star} />
                <p>Chillout</p>
              </div>
            </>
          ) : window.innerWidth < 660 ? (
            <>
              <div>
                <img src={star} />
                <p>Bass</p>
              </div>
              <div>
                <img src={star} />
                <p>Beats</p>
              </div>
              <div>
                <img src={star} />
                <p>Chillout</p>
              </div>
              <div>
                <img src={star} />
                <p>Afrobeat</p>
              </div>
            </>
          ) : window.innerWidth < 920 ? (
            <>
              <div>
                <img src={star} />
                <p>Bass</p>
              </div>
              <div>
                <img src={star} />
                <p>Beats</p>
              </div>
              <div>
                <img src={star} />
                <p>Chillout</p>
              </div>
              <div>
                <img src={star} />
                <p>Afrobeat</p>
              </div>
              <div>
                <img src={star} />
                <p>POP</p>
              </div>
              <div>
                <img src={star} />
                <p>HIPPOP</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <img src={star} />
                <p>Bass</p>
              </div>
              <div>
                <img src={star} />
                <p>Beats</p>
              </div>
              <div>
                <img src={star} />
                <p>Chillout</p>
              </div>
              <div>
                <img src={star} />
                <p>Afrobeat</p>
              </div>
              <div>
                <img src={star} />
                <p>POP</p>
              </div>
              <div>
                <img src={star} />
                <p>HIPPOP</p>
              </div>
              <div>
                <img src={star} />
                <p>DEEP HOUSE</p>
              </div>
              <div>
                <img src={star} />
                <p>JAZZ</p>
              </div>
            </>
          )}
        </span>
      </div>
    </div>
  );
}
