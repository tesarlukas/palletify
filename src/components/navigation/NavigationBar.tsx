import { Button, HStack } from 'native-base'
import { FC } from 'react'
import { useNavigationBar } from './hooks'
import { NavButton } from './types'

const NavigationBar: FC = () => {
  const { navButtons } = useNavigationBar()

  return (
    <HStack
      width={'full'}
      height={'16'}
      bg={'primary.100'}
      borderTopWidth={1}
      borderTopColor={'primary.200'}
      alignItems={'center'}
      justifyContent={'center'}
      space={4}
    >
      {navButtons.map((button: NavButton, i) => {
        return (
          <Button
            key={i}
            rounded={'2xl'}
            bg={'primary.600'}
            size={12}
            onPress={() => button.onClick()}
            display={'flex'}
          >
            {button.icon}
          </Button>
        )
      })}
    </HStack>
  )
}

export default NavigationBar
