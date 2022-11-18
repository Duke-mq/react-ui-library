test("common matcher", () => {
  //计算验证
  expect(2 + 2).toBe(4);
  expect(2 + 2).not.toBe(5);
  expect(5 + 5).toBe(10);
  expect(5 + 5).toBe(10);
});

test("ro be true or false", () => {
  //计算正伪
  expect(1).toBeTruthy();
  expect(0).toBeFalsy();
});

test("number", () => {
  //计算大于/小于
  expect(4).toBeGreaterThan(3);
  expect(2).toBeLessThan(3);
});

test("object", () => {
  //测试值是否相同,用toEqual
  expect({ name: "viking" }).toEqual({ name: "viking" });
});
