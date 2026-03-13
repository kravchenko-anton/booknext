import { Star } from '@/icons'
import { AnimatedPress, Flatlist, Image, Title } from '@/ui'
import { Color } from '@/utils/colors'
import { View } from 'react-native'

const CatalogList = ({
  data,
  disabledScroll = false,
  onElementPress = () => null,
}: {
  disabledScroll?: boolean;
  data: {
    id: string;
    title: string;
    author: {
      id?: string;
      name?: string;
    };
    rating: number;
    picture: string;
  }[];
  onElementPress?: (slug: string) => void;
}) => (
  <Flatlist
    scrollEnabled={!disabledScroll}
    mt={10}
    className="w-full px-2"
    data={data}
    ListEmptyComponent={() => (
      <Title className="mx-auto" size={"md"} color={Color.gray} weight="medium">
        It's quiet, too quiet
      </Title>
    )}
    renderItem={({ item: book }) => (
      <AnimatedPress
        className="mb-4 w-full flex-row justify-between"
        onPress={() => onElementPress(book.id)}
      >
        <Image className="mb-1 mr-2" height={150} url={book.picture} />
        <View className="w-[70%]">
          <Title
            color={Color.white}
            size={"xl"}
            numberOfLines={2}
            weight="semiBold"
          >
            {book.title}
          </Title>
          <Title
            color={Color.gray}
            size={"md"}
            numberOfLines={2}
            className="mb-2 mt-1"
            weight="regular"
          >
            {book.author.name}
          </Title>
          <View className=" flex-row items-center gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                fill={book.rating > index ? Color.warning : Color.gray}
                width={18}
                height={18}
                color={book.rating > index ? Color.warning : Color.gray}
              />
            ))}
          </View>
        </View>
      </AnimatedPress>
    )}
  />
);

export default CatalogList;
