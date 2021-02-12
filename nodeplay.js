// hello(1,2)(1,222,3)(1,3,2)

const hello = (...list) => {
  return list.reduce((elem, acc) => elem + acc, 0)
}


console.log(
  hello(1, 2, 33)
);

const hello2 = (...list) => {
  if (list.length === 1) {
    return list[0]
  }

  const result = list.reduce((elem, acc) => elem + acc, 0)

  return (...list) => hello2([...list, result])
}


console.log(
  hello2(1, 2, 33)(1, 2)(2,4,44,333)
);
