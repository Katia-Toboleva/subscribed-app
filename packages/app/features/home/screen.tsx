import { Anchor, Button, H1, Paragraph, Separator, XStack, YStack } from '@my/ui'
import { Drawer } from '@tamagui/drawer'
import { ChevronDown, ChevronUp } from '@tamagui/feather-icons'
import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { useLink } from 'solito/link'

export function HomeScreen() {
  const linkProps = useLink({
    href: '/user/nate',
  })
  
  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <YStack space="$4" maw={600}>
        <H1 ta="center">Welcome to Subscribed.</H1>
        <Paragraph ta="center">
          I will be a great APP some time soon!
        </Paragraph>
        <Separator />
        <Paragraph ta="center">
          This is an app that helps you keep track of your subscriptions
        </Paragraph>
      </YStack>

      <XStack>
        <Button {...linkProps}>Link to user</Button>
      </XStack>

      <DrawerDemo />
    </YStack>
  )
}

function DrawerDemo() {
  const [show, setShow] = useState(false)
  const dimensions = useWindowDimensions()
  return (
    <>
      <Button
        size="$6"
        icon={show ? ChevronDown : ChevronUp}
        circular
        onPress={() => setShow((x) => !x)}
      />
      <Drawer open={show} onChangeOpen={setShow}>
        <Drawer.Frame h={dimensions.height * 0.8} ai="center" jc="center" p="$6" space>
          <Paragraph selectable={false}>Hello.</Paragraph>
          <Button
            size="$6"
            icon={show ? ChevronDown : ChevronUp}
            circular
            onPress={() => setShow((x) => !x)}
          />
        </Drawer.Frame>
      </Drawer>
    </>
  )
}
