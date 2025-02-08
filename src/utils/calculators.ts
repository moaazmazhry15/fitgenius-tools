
export const calculateBMI = (weight: number, height: number): number => {
  if (weight <= 0 || height <= 0) {
    throw new Error("Weight and height must be positive numbers");
  }
  // BMI formula: weight (kg) / (height (m))²
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
  
  // Convert height from meters to centimeters for the formula
  const heightInCm = height * 100;
  
  // Mifflin-St Jeor Formula
  if (gender === 'male') {
    return Math.round((10 * weight) + (6.25 * heightInCm) - (5 * age) + 5);
  }
  return Math.round((10 * weight) + (6.25 * heightInCm) - (5 * age) - 161);
};

export const calculateTDEE = (bmr: number, activityLevel: string): number => {
  if (bmr <= 0) {
    throw new Error("BMR must be a positive number");
  }

  const activityMultipliers = {
    sedentary: 1.2, // Little or no exercise
    light: 1.375, // Light exercise/sports 1-3 days/week
    moderate: 1.55, // Moderate exercise/sports 3-5 days/week
    active: 1.725, // Hard exercise/sports 6-7 days/week
    veryActive: 1.9 // Very hard exercise/sports & physical job or training
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

  // Convert height to centimeters for the formula
  const heightInCm = height * 100;

  if (gender === 'male') {
    const logValue = Math.log10(waist - neck);
    return Number((495 / (1.0324 - 0.19077 * logValue + 0.15456 * Math.log10(heightInCm)) - 450).toFixed(1));
  }

  if (!hip) {
    throw new Error("Hip measurement is required for females");
  }

  const logValue = Math.log10(waist + hip - neck);
  return Number((495 / (1.29579 - 0.35004 * logValue + 0.22100 * Math.log10(heightInCm)) - 450).toFixed(1));
};

