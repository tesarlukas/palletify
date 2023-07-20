import { useAtom } from 'jotai'
import { Box, Divider, HStack, Text, VStack } from 'native-base'
import { userAtom } from '../components/shared/atoms'

export const SettingsView = () => {
  const [user, setUser] = useAtom(userAtom)

  const handleLogout = () => {
    setUser({})
  }

  return (
    <VStack flex={1}>
      <HStack minHeight={16} p={4}>
        <Text fontSize={24} my='auto'>
          Currently logged in as{' '}
          <Text color='primary.400'>{user.username}</Text>
        </Text>
      </HStack>
      <Divider bgColor='primary.400' width={'md'} />
      <HStack minHeight={16} p={4} onTouchEnd={handleLogout}>
        <Box width='100%'>
          <Text color='danger.500' fontSize={24} my='auto'>
            Sign out
          </Text>
        </Box>
      </HStack>
      <Divider bgColor='primary.400' width={'md'} />
    </VStack>
  )
}
