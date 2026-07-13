import standardOptions from "./StandardOptions/standardOptions";
import seriesOptions from "./SeriesOptions/seriesOptions";
import progressiveOptions from "./ProgressiveOptions/progressiveOptions";
import dieOptions from "./DieOptions/dieOptions";
import centerlineOptions from "./CenterLineOptions/centerlineOptions";
import parallelOptions from "./ParallelOptions/parallelOptions";
import basicOpitons from "./BasicOptions/basicOptions";

const linearOptions = [
    {
        category: "StandardOptions",
        options: standardOptions,
    },
    {
        category: "SeriesOptions",
        options: seriesOptions,
    },
    {
        category: "ProgressiveOptions",
        options: progressiveOptions,
    },
    {
        category: "Die",
        options: dieOptions,
    },
    {
        category: "CenterLineOptions",
        options: centerlineOptions,
    },
    {
        category: "ParallelOptions",
        options: parallelOptions,
    },
    {
        category: "BasicOpitons",
        options: basicOpitons,
    },
];

export default linearOptions;