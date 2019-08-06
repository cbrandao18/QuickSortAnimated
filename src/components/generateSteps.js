let generateStep = (steps, array, stepInAlgo, left, right) => {
  let arrData = array.map( (el, idx) => {
    if (stepInAlgo === 0 && idx === 0){
      return { num: el, cssClass: "pivot" }
    } else {
      return { num: el }
    }
  })
  steps.push({
    arrData,
    step: stepInAlgo,
    data: {
      left: left,
      right: right
    }
  })
}

let generateSteps = (array) => {
  let steps = [];

  let quicksort = (array) => {

    const pivot = array[0];
    generateStep(steps, array, 0, [], []);

    let left = [];
    let right = [];
    for (let i = 1; i<array.length; i++){
      generateStep(steps, array, 1, left, right);
      if (array[i] < pivot){
        left.push(array[i])
        generateStep(steps, array, 2, left, right);
      } else {
        right.push(array[i])
        generateStep(steps, array, 3, left, right);
      }
    }

    generateStep(steps, array, 4, left, right);
    left = quicksort(left);
    right = quicksort(right);

    generateStep(steps, array, 5, left, right);
    return left.concat([pivot]).concat(right);
  }

  return steps;
}