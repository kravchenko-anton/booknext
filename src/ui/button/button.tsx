import AnimatedPress from '@/ui/animated-press/animated-press'
import { cn } from '@/utils'
import { InnerColor } from '@/utils/colors'
import { ActivityIndicator } from 'react-native'
import Title from '../title/title'
import { settings } from './settings'
import type { ButtonProperties } from './types'

const Button = ({
  size = "lg",
  variant = "foreground",
  disabled = false,
  isLoading = false,
  icon: Icon,

  className = "",
  children = "",
  ...properties
}: ButtonProperties) => (
  <AnimatedPress
    disabled={disabled || isLoading}
    className={cn(
      "flex-row items-center justify-center rounded-lg",
      settings.padding[size],

      settings.colors[variant],
      (disabled || isLoading) && "opacity-70",
      className,
    )}
    {...properties}
  >
    {isLoading ? (
      <ActivityIndicator
        className="mr-2 mt-0.5"
        color={InnerColor[variant]}
        style={{
          width: settings.iconSize[size],
          height: settings.iconSize[size],
        }}
      />
    ) : null}

    {!!Icon && !isLoading && (
      <Icon
        className="mr-2 mt-1"
        color={InnerColor[variant]}
        width={settings.iconSize[size]}
        height={settings.iconSize[size]}
      />
    )}

    <Title
      weight="semiBold"
      color={InnerColor[variant]}
      size={settings.titleSize[size]}
    >
      {children}
    </Title>
  </AnimatedPress>
);

export default Button;
