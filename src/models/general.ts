type SizeType = string | Size;
type ItemType = string[] | Item[] | [];
type IngredientType =
  | { ingredient: string; number: number }
  | { ingredient: Ingredient; number: number };
type CategoryType = string[] | Category[];
type CustomCompositionType = string | CustomComposition;

export interface Price {
  size?: string;
  price?: number;
}

export interface Option {
  name?: string;
  mandatory?: boolean;
  multi?: boolean;
  maxSelect?: number;
  values?: { value: string; priceChange: number }[];
}

export interface Category {
  name?: string;
  size?: SizeType;
  basePrice?: Price[];
  baseIngredients?: IngredientType[];
  options?: Option[];
  availableSides?: ItemType;
  items?: ItemType;
  customComposition?: CustomCompositionType;
  id?: string;
}

export interface CustomComposition {
  name?: string;
  size?: SizeType;
  groups?: { name: string; minIng: number; maxIng: number; maxTotal: number }[];
  ingredients?: {
    ingredient: string | Ingredient;
    removable: boolean;
    group: string;
    maxNumber: number;
  }[];
  categories?: CategoryType;
  items?: ItemType;
  id?: string;
}

export interface Item {
  name?: string;
  description?: string;
  category?: string;
  noInheritFromCategory?: boolean;
  size?: SizeType;
  basePrice?: Price[];
  price?: Price[];
  ingredients?: IngredientType[];
  itemOptions?: Option[];
  availableSides?: string[];
  customComposition?: string;
  id?: string;
}

export interface Ingredient {
  name?: string;
  uniqueName?: string;
  price?: Price[];
  size?: SizeType;
}

export interface Size {
  name?: string;
  values?: string[];
  id?: string;
}
