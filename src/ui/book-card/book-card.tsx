import type { Style } from '@/types/global'

import AnimatedPress from '@/ui/animated-press/animated-press'
import { settings } from '@/ui/book-card/settings'
import type { BookCardProperties } from '@/ui/book-card/types'
import Image from '@/ui/image/image'
import Title from '@/ui/title/title'
import { Color } from '@/utils/colors'
import type { FC } from 'react'

const BookCard: FC<BookCardProperties> = ({
  image,
  size = "md",
  style,
  ...properties
}) => (
  <AnimatedPress
    style={[
      {
        width: settings.width[size],
      },
      style as Style,
    ]}
    {...properties}
  >
    <Image
      url={image.uri}
      borderRadius={12}
      className="mb-2"
      style={{
        borderColor: Color.bordered,
        borderWidth: 1,
      }}
      height={settings.height[size]}
      width={settings.width[size]}
    />
    <Title numberOfLines={2} color={Color.white} weight="medium" size={"sm"}>
      {properties.title}
    </Title>

    <Title numberOfLines={1} weight="regular" size={"ssm"} color={Color.gray}>
      {properties.author}
    </Title>
  </AnimatedPress>
);

export default BookCard;
