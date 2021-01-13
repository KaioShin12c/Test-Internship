const m = [
    ["a1", "a2", "a3", "a4", "a5"],
    ["b1", "b2", "b3", "b4", "b5"],
    ["c1", "c2", "c3", "c4", "c5"],
    ["d1", "d2", "d3", "d4", "d5"],
    ["e1", "e2", "e3", "e4", "e5"]
  ];
  const combineArr = (a, b) => {
    let arr = [];
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b.length; j++) {
        if (Array.isArray(a[i])) {
          arr.push(a[i].concat(b[j]));
        } else {
          arr.push([a[i], b[j]]);
        }
      }
    }
    console.log(arr);
    return arr;
  };
  const finalAns = arr => {
    let value = arr[0];
    for (let i = 1; i < arr.length; i++) {
      console.log("a");
      value = combineArr(value, arr[i]);
    }
    return value;
  };
  console.log("combi", finalAns(f));