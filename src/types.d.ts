export interface MealTypeMutation {
  name: string;
  text: string;
  amount: string;
}

export interface MealType extends MealTypeMutation {
  id: string;
}

export interface MealsType {
  [id: string]: MealType;
}