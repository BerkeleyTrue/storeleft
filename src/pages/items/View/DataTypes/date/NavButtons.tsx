import { Button } from '@chakra-ui/react';
import { Calendar, RenderProps } from 'dayzed';

interface Props {
  calendars: Calendar[];
  propsFactory: RenderProps['getForwardProps'] | RenderProps['getBackProps'];
}

function createDatePickerBtn<P extends Props = Props>(forward: boolean) {
  const DatePickerButton = ({ calendars, propsFactory }: P) => {
    const arrows: [string, string] = forward ? ['>', '->'] : ['<', '<-'];

    const monthBtn = (
      <Button {...propsFactory({ calendars })} key='month' variant='outline'>
        {arrows[0]}
      </Button>
    );

    const yearBtn = (
      <Button
        {...propsFactory({
          calendars,
          offset: 12,
        })}
        key='year'
        variant='outline'
      >
        {arrows[1]}
      </Button>
    );
    return <>{forward ? [monthBtn, yearBtn] : [yearBtn, monthBtn]}</>;
  };

  DatePickerButton.displayName = forward ? 'DPForwardButton' : 'DPBackwardButton';

  return DatePickerButton;
}

export const ForwardButtons: React.FC<Props> = createDatePickerBtn(true);
ForwardButtons.displayName = 'ForwardButtons';

export const BackwardButtons: React.FC<Props> = createDatePickerBtn(false);
BackwardButtons.displayName = 'BackwardButtons';
