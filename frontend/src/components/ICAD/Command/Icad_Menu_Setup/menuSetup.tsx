import "./Menu_Setup_Theme/Menu_Setup_Theme.css";

export default function MenuSetup() {
    return (
        <div className="menu-setup-container">
            <div className="menu-setup-card">
                <h2 className="menu-title">iCAD Menu Setup</h2>

                <div className="table-wrapper">
                    <table className="menu-table">
                        <tr>
                            <td>F1</td><td>;DIMSW1 @GO</td>
                        </tr>
                        <tr>
                            <td>F2</td><td>@ORGN</td>
                        </tr>
                        <tr>
                            <td>F3</td><td>@MESDIST</td>
                        </tr>
                        <tr>
                            <td>F4</td><td>;ERASE;FEATURE</td>
                        </tr>
                        <tr>
                            <td>F5</td><td>;VWCHGA</td>
                        </tr>
                        <tr>
                            <td>F6</td><td>;BALOON</td>
                        </tr>
                        <tr>
                            <td>F7</td><td>;COPY3;VIW</td>
                        </tr>
                        <tr>
                            <td>F8</td><td>;COPY3;WIN;FEATURE</td>
                        </tr>
                        <tr>
                            <td>F9</td><td>;PLNPTW</td>
                        </tr>
                        <tr>
                            <td>F10</td><td>@CRSON</td>
                        </tr>
                        <tr>
                            <td>F11</td><td>@WFONCG ON @CGET2 0</td>
                        </tr>
                        <tr>
                            <td>F12</td><td>@WFET2 0</td>
                        </tr>
                        <tr><td></td><td></td></tr>
                        <tr>
                            <th></th>
                            <th>CONTROL +</th>
                            <th>SHIFT +</th>
                            <th>ALT +</th>
                            <th>CONTROL + SHIFT +</th>
                            <th>CONTROL + ALT +</th>
                            <th>SHIFT + ALT +</th>
                        </tr>
                        <tr>
                            <td>A</td><td>;PLAY;BOX;ARG;VER;@IOFF;CUR</td><td>;TRANS3;MOV;FEATURE</td><td>;TRANS3;MOV;FEATURE</td><td></td><td></td><td>;TRANS3;MIR;FEATURE</td>
                        </tr>
                        <tr>
                            <td>B</td><td>;OFFSET;BOT</td><td>;OFFSET;OSID</td><td>;OFFSET;OSID</td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>C</td><td></td><td></td><td>;DIMARW;OPTS</td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>D</td><td>;BLEND;CNR;SNG;@ION;SRCH</td><td>;NOTE</td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>E</td><td>;TRANS6;MIR;@IOFF;FEATURE;@IOFF;HSCH</td><td>;SMBAPL;LCT</td><td>;SMBAPL;FIN;TR1</td><td></td><td></td><td>;SMBAPL;FIN;WAV</td>
                        </tr>
                        <tr>
                            <td>F</td><td>;BLEND;BLN;SNG;EQL;@ION;SRCH</td><td></td><td>;APLLIN;CLN</td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>G</td><td>;SKTWIR;CIR31;RAD</td><td></td><td>;CIR1;RAD</td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>H</td><td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>I</td><td>;CNVDRW;IMPORT</td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>J</td><td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>K</td><td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>L</td><td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>M</td><td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>N</td><td>;NEW;CLR</td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>O</td><td>;OPEN;LOD</td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>P</td><td>;PLOT3;OUT;AREA</td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>Q</td><td>;TRANS6;MOV;@IOFF;FEATURE;@IOFF;HSCH</td><td>;DRFEDT;TXT</td><td>;DRFEDT;PLA</td><td>;COPY5;MOV;@ION;CON;@IOFF;DEL;@ION;ATR;@ION;LAY;@ION;CLA;@ION;GRM;@IOFF;FEATURE;@IOFF;HSCH</td><td>;DRFEDT;TMARK;MIR</td><td>;DRFEDT;ATR</td>
                        </tr>
                        <tr>
                            <td>R</td><td>;EXPAND;EXP2;EXP;@ION;SEAR;@IOFF;CON;@IOFF;AXS;@IOFF;FIXF</td><td>;LABEL;PLBL</td><td>;LABEL;PLBL</td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>S</td><td>;SAVEO</td><td>;COPY3;ROT;FEATURE</td><td>;COPY3;MOV;FEATURE</td><td>;SAVEAS;SAVE</td><td></td><td>;COPY3;MIR;FEATURE</td>
                        </tr>
                        <tr>
                            <td>T</td><td>;SKTWIR;BSLN3</td><td></td><td>;BSLINE;PTP;LLIN;TRN;CAJ</td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>U</td><td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>V</td><td></td><td>;DIMARC;RAD;SMS</td><td>;DIMARC;DIA;BOT</td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>W</td><td>;TRANS6;ROT;@IOFF;FEATURE;@IOFF;HSCH</td><td>;DIMLIN;STA;OPT</td><td>;DIMLIN;CHA;IVL</td><td>;COPY6;ROT;@IOFF;CON;@IOFF;DEL;@ION;ATR;@ION;LAY;@ION;CLA;@ION;GRM;@IOFF;FEATURE;@IOFF;HSCH</td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>X</td><td>;CNVDRW;EXPORT</td><td></td><td>;HATCH</td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>Y</td><td>;REDO</td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>Z</td><td>;UNDO</td><td>;RETUCH;ENDS;LUMP</td><td>;RETUCH;ENDS;SINGLE</td><td></td><td></td><td></td>
                        </tr>
                        <tr><td></td><td></td></tr>
                        <tr>
                            <td>1</td><td>;COLCHG 1</td><td>@SCAN SET ALLCOL @GO</td><td>;LCLCHG;SAKUZU;NONCOL;CSOL;NONTHK</td>
                        </tr>
                        <tr>
                            <td>2</td><td>;COLCHG 2</td><td>@SCAN SET ALLCOL @GO @SCAN DEL C01 @GO</td><td>;LCLCHG;SAKUZU;NONCOL;CDAS;NONTHK</td>
                        </tr>
                        <tr>
                            <td>3</td><td>;COLCHG 3</td><td>@SCAN SET ALLCOL @GO @SCAN DEL C03 @GO</td><td>;LCLCHG;SAKUZU;NONCOL;COCH;NONTHK</td>
                        </tr>
                        <tr>
                            <td>4</td><td>;COLCHG 4</td><td>@SCAN SET ALLCOL @GO @SCAN DEL C07 @GO</td><td>;LCLCHG;SAKUZU;NONCOL;CTCH;NONTHK</td>
                        </tr>
                        <tr>
                            <td>5</td><td>;COLCHG 7</td><td>@SCAN DEL ALLCOL @GO @SCAN ADD C01 @GO</td>
                        </tr>
                        <tr>
                            <td>6</td><td>;COLCHG 15</td><td>@SCAN DEL ALLCOL @GO @SCAN ADD C03 @GO</td>
                        </tr>
                        <tr>
                            <td>7</td><td></td><td>@SCAN DEL ALLCOL @GO @SCAN ADD C07 @GO</td>
                        </tr>
                        <tr>
                            <td>8</td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>9</td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>0</td><td></td><td></td>
                        </tr>
                        <tr>
                            <td>`</td><td>;DRFEDT;PLA;ANG;DMLI;HOR</td><td></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
}