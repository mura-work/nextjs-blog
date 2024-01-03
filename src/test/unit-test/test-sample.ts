export const add = (a: number, b: number) => {
  if (a < 0 || a > 100) {
    throw new Error("入力は0~100の間で入力してください");
  }
  if (b < 0 || b > 100) {
    throw new Error("入力は0~100の間で入力してください");
  }
  const sum = a + b;
  if (sum > 100) {
    return 100;
  }
  return a + b;
};

export const willSumExceedOneHundred = (a: number, b: number) => {
  return a + b > 100;
};

export const validateTitle = (title: string): boolean => {
  const titleLength = title.length;
  if (0 >= titleLength || titleLength > 20) {
    return false;
  }
  return true;
};

export const wait = async (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(duration); // durationがreturnされる
    }, duration);
  });
};

export const timeout = async (duration: number) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(duration);
    }, duration);
  });
};
