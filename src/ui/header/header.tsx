import { useTypedNavigation } from '@/hooks'
import { ArrowLeft } from '@/icons'
import type { PressableDefaultProperties, TextDefaultProperties, ViewDefaultProperties } from '@/types/component-types'
import BaseButton from '@/ui/button/button'
import type { ButtonProperties } from '@/ui/button/types'
import type { IconProperties } from '@/ui/icon/types'
import { cn } from '@/utils'
import { Color } from '@/utils/colors'
import { appName } from '@/utils/constants/index'
import type { FC, PropsWithChildren } from 'react'
import { Pressable, View } from 'react-native'
import { Title } from '../../ui'

export const Head: FC<PropsWithChildren<ViewDefaultProperties>> = ({
  children,
  className,
  ...properties
}) => (
  <View
    className={cn(
      "bg-background  border-bordered z-50 w-full flex-row items-center justify-between border-b-[1px]",
      className,
    )}
    {...properties}
  >
    {children}
  </View>
);

export const BackButton: FC<PressableDefaultProperties> = ({
  className,
  ...properties
}) => {
  const { goBack } = useTypedNavigation();
  return (
    <Pressable
      className={cn("py-2", className)}
      onPress={goBack}
      {...properties}
    >
      <ArrowLeft width={26} height={26} color={Color.white} />
    </Pressable>
  );
};
export const BackWithTitle: FC<{ title: string }> = ({ title }) => (
  <View className="flex-row items-center">
    <BackButton className="px-3" />
    <Title className="py-2" size={"xl"} weight="bold" color={Color.white}>
      {title}
    </Title>
  </View>
);
export const HeaderTitle: FC<{ title: string }> = ({ title }) => (
  <View className="flex-row px-3 py-1 items-center">
    <Title className="" size={"xxl"} weight="bold" color={Color.white}>
      {title}
    </Title>
  </View>
);
export const Logo: FC<Omit<TextDefaultProperties, "onPress">> = ({
  className,
  ...properties
}) => (
  <Title
    size={"xxl"}
    weight="bold"
    className={cn("py-2", className)}
    color={Color.white}
    {...properties}
  >
    {appName}
  </Title>
);
export const Button: FC<
  Pick<ButtonProperties, "variant" | "children" | "onPress">
> = ({ onPress, variant = "foreground", children }) => (
  <BaseButton
    size="sm"
    variant={variant}
    className="my-2 mr-2 py-1.5"
    onPress={onPress}
  >
    {children}
  </BaseButton>
);
export const Icon: FC<
  Omit<IconProperties, "variant" | "noPadding" | "size">
> = ({ icon: Icon, className, ...properties }) => (
  <Pressable className={cn("py-2 ", className)} {...properties}>
    <Icon width={26} height={26} color={Color.white} />
  </Pressable>
);

export default { Head, Logo, Title: HeaderTitle, BackWithTitle, Icon };
