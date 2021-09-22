import CircularProgress from 'material-ui/CircularProgress';
import { useState } from 'react';
import { useEffect } from 'react';
import Table, { TableDataElement } from '../../components/Template/Table/Table';
import { useQuery } from '../../graphql/hooks';
import {
  GET_TABLE_CATEGORIES,
  GET_TABLE_CUSTOM_COMPS,
  GET_TABLE_INGREDIENTS,
  GET_TABLE_ITEMS,
  GET_TABLE_SIZES,
} from '../../graphql/queries';
import { useAppSelector } from '../../hooks';
import {
  Category,
  CustomComposition,
  Ingredient,
  Item,
  Size,
} from '../../models/general';

export enum MenuPartOption {
  CATEGORY,
  SIZE,
  CUSTOM_COMPOSITION,
  ITEM,
  INGREDIENT,
}

export interface MenuPartProps {
  displayedOption: MenuPartOption;
}

const MenuPart: React.FC<MenuPartProps> = ({ displayedOption }) => {
  let tableHead: string[];
  let query: string;

  switch (displayedOption) {
    case MenuPartOption.CATEGORY:
      tableHead = ['Name', 'Size name', 'Number of items', 'Options'];
      query = GET_TABLE_CATEGORIES;
      break;
    case MenuPartOption.SIZE:
      tableHead = ['Name', 'Options'];
      query = GET_TABLE_SIZES;
      break;
    case MenuPartOption.CUSTOM_COMPOSITION:
      tableHead = [
        'Name',
        'Size name',
        'Number of items',
        'Number of categories',
        'Options',
      ];
      query = GET_TABLE_CUSTOM_COMPS;
      break;
    case MenuPartOption.ITEM:
      tableHead = ['Name', 'Size name', 'Category name', 'Options'];
      query = GET_TABLE_ITEMS;
      break;
    case MenuPartOption.INGREDIENT:
      tableHead = ['Name', 'Unique name', 'Size name', 'Options'];
      query = GET_TABLE_INGREDIENTS;
      break;
  }

  const [transData, setTransData] = useState<TableDataElement[][]>();

  const { token } = useAppSelector((state) => state.auth);

  const displayAction = (id: string) => {
    console.log('DISPLAY', id);
  };

  const updateAction = (id: string) => {
    console.log('UPDATE', id);
  };

  const deleteAction = (id: string, name: string) => {
    console.log('DELETE', id, name);
  };

  const { isLoading } = useQuery<
    Category[] | Size[] | CustomComposition[] | Item[] | Ingredient[],
    null
  >({
    fetchOnInit: true,
    authToken: token!,
    query: query,
    onData: (data) => {
      switch (displayedOption) {
        case MenuPartOption.CATEGORY:
          const { getCategories: categories } = data;
          setTransData(() =>
            categories.map((cat: any, key: any) => {
              const catOptions = {
                name: '',
                options: [
                  {
                    name: 'Display',
                    cb: () => displayAction(cat.id),
                  },
                  {
                    name: 'Update',
                    cb: () => updateAction(cat.id),
                  },
                  {
                    name: 'Delete',
                    cb: () => deleteAction(cat.id, cat.name),
                  },
                ],
              };

              return [cat.name, cat.size.name, cat.itemsCount, catOptions];
            }),
          );
          break;
        case MenuPartOption.SIZE:
          const { getSizes: sizes } = data;
          setTransData(() =>
            sizes.map((size: any, key: any) => {
              const sizeOptions = {
                name: '',
                options: [
                  {
                    name: 'Display',
                    cb: () => displayAction(size.id),
                  },
                  {
                    name: 'Update',
                    cb: () => updateAction(size.id),
                  },
                  {
                    name: 'Delete',
                    cb: () => deleteAction(size.id, size.name),
                  },
                ],
              };

              return [size.name, sizeOptions];
            }),
          );
          break;
        case MenuPartOption.CUSTOM_COMPOSITION:
          const { getCustomCompositions: customComps } = data;
          setTransData(() =>
            customComps.map((cc: any, key: any) => {
              const ccOptions = {
                name: '',
                options: [
                  {
                    name: 'Display',
                    cb: () => displayAction(cc.id),
                  },
                  {
                    name: 'Update',
                    cb: () => updateAction(cc.id),
                  },
                  {
                    name: 'Delete',
                    cb: () => deleteAction(cc.id, cc.name),
                  },
                ],
              };

              return [
                cc.name,
                cc.size.name,
                cc.itemsCount,
                cc.categoriesCount,
                ccOptions,
              ];
            }),
          );
          break;
        case MenuPartOption.ITEM:
          const { getItems: items } = data;
          setTransData(() =>
            items.map((item: any, key: any) => {
              const itemOptions = {
                name: '',
                options: [
                  {
                    name: 'Display',
                    cb: () => displayAction(item.id),
                  },
                  {
                    name: 'Update',
                    cb: () => updateAction(item.id),
                  },
                  {
                    name: 'Delete',
                    cb: () => deleteAction(item.id, item.name),
                  },
                ],
              };

              return [
                item.name,
                item.size.name,
                item.category.name,
                itemOptions,
              ];
            }),
          );
          break;
        case MenuPartOption.INGREDIENT:
          const { getIngredients: ingredients } = data;
          setTransData(() =>
            ingredients.map((ingredient: any, key: any) => {
              const ingredientOptions = {
                name: '',
                options: [
                  {
                    name: 'Display',
                    cb: () => displayAction(ingredient.id),
                  },
                  {
                    name: 'Update',
                    cb: () => updateAction(ingredient.id),
                  },
                  {
                    name: 'Delete',
                    cb: () => deleteAction(ingredient.id, ingredient.name),
                  },
                ],
              };

              return [
                ingredient.name,
                ingredient.uniqueName,
                ingredient.size.name,
                ingredientOptions,
              ];
            }),
          );
          break;
      }
    },
  });

  useEffect(() => {}, [displayedOption]);
  return isLoading || !transData ? (
    <CircularProgress />
  ) : (
    <>
      <Table
        tableHeaderColor='primary'
        tableHead={tableHead}
        tableData={transData!}
      />
    </>
  );
};

export default MenuPart;
