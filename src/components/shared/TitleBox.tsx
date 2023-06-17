import { Box, Text } from 'native-base';
import { FC } from 'react';

const TitleBox: FC<{ text: string }> = ({ text }) => {
  return (
    <Box bg={'primary.400'} p={4} width={'full'}>
      <Text color={'white'}>{text}</Text>
    </Box>
  );
};

export default TitleBox;
