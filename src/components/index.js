const test = (arr) => {
  const result = [];

  for (let i = 0; i < 3; i++) {
    let random = Math.random() * (9 - i);
    console.log(random);
    result.push(arr[Math.floor(random)]);
    arr.s(arr, Math.floor(random));
  }
  console.log(result);
  return result;
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
test(arr);
