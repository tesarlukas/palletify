import { Box, Center, HStack, Icon, Text, VStack } from 'native-base'
import { Entypo } from '@expo/vector-icons'

export const Banner = () => {
  return (
    <>
      <Center my={8}>
        <Box backgroundColor='primary.600' width='80%' borderRadius='2xl' px={8} py={4}>
          <HStack>
            <Icon as={Entypo} name='image' color='white' size={32} />
            <VStack my='auto' ml={4}>
              <Text fontSize={32}>Image</Text>
              <Text fontSize={32}>Gallery </Text>
            </VStack>
          </HStack>
        </Box>
      </Center>
    </>
  )
}
