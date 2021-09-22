// import { makeStyles, Theme } from '@material-ui/core';
import MenuPart, { MenuPartOption } from '../../components/MenuPart/MenuPart';
import CustomTabs from '../../components/Template/CustomTabs/CustomTabs';

// const useStyles = makeStyles((theme: Theme) => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

const Menu: React.FC = () => {
  return (
    <CustomTabs
      headerColor='rose'
      tabs={[
        {
          tabName: 'Category',
          tabContent: <MenuPart displayedOption={MenuPartOption.CATEGORY} />,
        },
        {
          tabName: 'Size',
          tabContent: <MenuPart displayedOption={MenuPartOption.SIZE} />,
        },
        {
          tabName: 'Custom Composition',
          tabContent: (
            <MenuPart displayedOption={MenuPartOption.CUSTOM_COMPOSITION} />
          ),
        },
        {
          tabName: 'Items',
          tabContent: <MenuPart displayedOption={MenuPartOption.ITEM} />,
        },
        {
          tabName: 'Ingredients',
          tabContent: <MenuPart displayedOption={MenuPartOption.INGREDIENT} />,
        },
      ]}
    />
  );
};

export default Menu;
