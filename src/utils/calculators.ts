
export const calculateBMI = (weight: number, height: number): number => {
  if (weight <= 0 || height <= 0) {
    throw new Error("Weight and height must be positive numbers");
  }
  return Number((weight / (height * height)).toFixed(1));
};

export const calculateBMR = (
  weight: number,
  height: number,
  age: number,
  gender: 'male' | 'female'
): number => {
  if (weight <= 0 || height <= 0 || age <= 0) {
    throw new Error("All values must be positive numbers");
  }
  if (gender === 'male') {
    return Math.round(88.362 + (13.397 * weight) + (4.799 * height * 100) - (5.677 * age));
  }
  return Math.round(447.593 + (9.247 * weight) + (3.098 * height * 100) - (4.330 * age));
};

export const calculateTDEE = (bmr: number, activityLevel: string): number => {
  if (bmr <= 0) {
    throw new Error("BMR must be a positive number");
  }
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  };
  return Math.round(bmr * activityMultipliers[activityLevel as keyof typeof activityMultipliers]);
};

export const calculateBodyFat = (
  waist: number,
  neck: number,
  height: number,
  gender: 'male' | 'female',
  hip?: number
): number => {
  if (waist <= 0 || neck <= 0 || height <= 0 || (gender === 'female' && (!hip || hip <= 0))) {
    throw new Error("All measurements must be positive numbers");
  }
  if (gender === 'male') {
    return Number((495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450).toFixed(1));
  }
  if (!hip) return 0;
  return Number((495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450).toFixed(1));
};
