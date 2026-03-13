import api from '@/api'
import { useTypedNavigation, useTypedRoute } from '@/hooks'
import { Close } from '@/icons'
import { FinishBookIllustration } from '@/illustrations/finish-book'

import { RatingSelect } from '@/screens/book-impression/rating-select'
import { TagsSelect } from '@/screens/book-impression/tags-select'
import { Button, Field, Icon, ScrollView, Title } from '@/ui'
import { Color } from '@/utils/colors'
import { MutationKeys, QueryKeys } from '@/utils/query-keys'
import { successToast } from '@/utils/toast'
import { ImpressionSchema, type ImpressionSchemaType } from '@/validation/impression.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Sentry from '@sentry/react-native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'

const BookImpression: FC = () => {
  const { params } = useTypedRoute<"BookImpression">();
  const { navigate } = useTypedNavigation();
  const queryClient = useQueryClient();
  const { mutateAsync: sendReview } = useMutation({
    mutationKey: MutationKeys.book.review,
    mutationFn: (dto: ImpressionSchemaType) => api.book.review({
      ...dto,
      bookId: params.id
    }),
    onSuccess: () => {
      Sentry.metrics.increment("start-reading", 1);
      queryClient.invalidateQueries({
        queryKey: QueryKeys.library,
      });
    },
  });
  const { control, handleSubmit, watch, formState: {errors} } = useForm<ImpressionSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(ImpressionSchema.omit({bookId: true})),
  });
  
  console.log(errors)

  const rating = watch("rating");
  const submitReview = async (data: ImpressionSchemaType) => {
    console.log('BookImpression.submitReview called with data:', data);
    await sendReview(data);
    successToast("Thanks for your feedback!");
    navigate("Library");
  };
  return (
    <ScrollView className="h-full px-2">
      <View className="items-start">
        <Icon
          className="mt-2"
          icon={Close}
          size="md"
          variant="muted"
          onPress={() => navigate("Library")}
        />
      </View>
      <View className='mx-auto'>
      <FinishBookIllustration height={200} width={250} />
      </View>
      <Title className="mt-8 text-center" size={"xxl"} weight="bold">
        Thanks for reading!
      </Title>
      <Title color={Color.gray} className="text-center" weight="regular">
        Your feedback is important to us
      </Title>
      <RatingSelect control={control} name="rating" />
      {rating > 0 && (
        <View className="w-full items-center justify-center">
          <Title size={"xl"} className="my-1.5 mb-0 text-center" weight="bold">
            {`Thanks, Why ${rating > 3 ? "did" : "didn't"} you like the book?`}
          </Title>
          <TagsSelect
            control={control}
            name="tags"
            currentRating={watch("rating")}
          />

          <Field
            isArea
            control={control}
            placeholder="Share your thoughts with us here. "
            name="text"
          />
          <Button
            size="lg"
            variant="primary"
            className="mb-4 mt-4 w-full"
            onPress={handleSubmit(submitReview)}
          >
            Submit
          </Button>
        </View>
      )}
    </ScrollView>
  );
};

export default BookImpression;
