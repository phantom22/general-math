type VectorN = number[];

//https://www.youtube.com/watch?v=JGQe4kiPnrU
type Markovchain = {
    isReducible: boolean;
    isPeriodic: boolean; // => irreducible
    [state:number]: VectorN;
    stationaryDistribution: Matrix;
}

function MarkChain(...v:VectorN[]) {
    let o = <Markovchain>{};
    
    (function(){
        const correctLength = v.length;
        for (let i=0; i<correctLength; i++) {
             
            if (v[i].length!==correctLength) throw "Invalid Markov Chain!";
            for (let x=0; x<v[i].length; x++) {

            }
            if (v[i].reduce((a,b) => a+b) !== 1) throw "Invalid Markov Chain!";
        }
    })(); // validate all nodes
}

// ERGODIC THEOREM
/*
 * title: Ergodic Theorem
 * FOR IRREDUCIBLE AND APERIODIC MARKOV CHAINS
 *   1. A unique stationary distribution PI exists
 *   2. All initial distributions "PI con 0" eventualmente convergono a PI
 */
