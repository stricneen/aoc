
const tick = (state) => {

    const op = state.prog[state.ptr];
    const arg1 = state.prog[state.ptr + 1];
    const arg2 = state.prog[state.ptr + 2];
    const arg3 = state.prog[state.ptr + 3];
//    console.log(op, arg1, arg2, arg3);
    switch (op) {
        case 1: // add
            state.ptr += 4;
            state.prog[arg3] = state.prog[arg1] + state.prog[arg2];
            break;
        case 2: // mul
            state.ptr += 4;
            state.prog[arg3] = state.prog[arg1] * state.prog[arg2];
            break;

        case 3: // input
            state.ptr += 2;
            state.prog[arg1] = 1;
            break;
        
        case 4: // output
            state.ptr += 2;
            console.log(state.prog[arg1]);
            break;

    }


    return state;
}


const run = (state) => {

    let n = { ...state };
    let t = 0;

    while (true) {
        n = tick(n);
        t += 1;
        if (n.prog[n.ptr] === 99 || t > 100) break;
        //console.log(n);
    }

    return n;
}





exports.exe = (prog) => {

    // init
    const state = {
        prog: prog,
        ptr: 0
    };

    const output = run(state);

    return output;
};