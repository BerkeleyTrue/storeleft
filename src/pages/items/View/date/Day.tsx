import { Button } from '@chakra-ui/react';
import { DateObj, RenderProps } from 'dayzed';

interface Props {
  dateObj: DateObj;
  getDateProps: RenderProps['getDateProps'];
}

const halfGap = 0.125; //default Chakra-gap-space-1 is 0.25rem

const afterStyle = {
  content: "''",
  position: 'absolute',
  top: `-${halfGap}rem`,
  left: `-${halfGap}rem`,
  bottom: `-${halfGap}rem`,
  right: `-${halfGap}rem`,
  borderWidth: `${halfGap}rem`,
  borderColor: 'transparent',
};

const hoverStyle = {
  bg: 'purple.400',
};
const selectedStyle = {
  background: 'purple.200',
};
const todayStyle = {
  borderColor: 'blue.400',
};
export const Day = ({ dateObj, getDateProps }: Props) => {
  const { date, selected, selectable, today } = dateObj;

  return (
    <Button
      size='sm'
      variant='outline'
      background='transparent'
      borderColor='transparent'
      _after={afterStyle}
      _hover={hoverStyle}
      {...getDateProps({
        dateObj,
        disabled: !selectable,
      })}
      {...(selected && selectable && selectedStyle)}
      {...(today && todayStyle)}
      disabled={!selectable}
    >
      {selectable ? date.getDate() : 'X'}
    </Button>
  );
};
