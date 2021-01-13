function combination(...args) {
    if(args.length === 1) return args;
    return args.reduce((acc, curArr) =>
        acc.reduce((result, curValue) => 
        [...result, ...curArr.map(e => [].concat(curValue, e))], [])
    )
};
console.log(combination([1,2,3], [4,5,6], [7,8,9]));