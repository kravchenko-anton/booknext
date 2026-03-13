import api from '@/api'
import { Button, Title } from '@/ui'
import { SvgButton } from '@/ui/svg-button/svg-button'
import { Color } from '@/utils/colors'
import { QueryKeys } from '@/utils/query-keys'
import type { FunctionType } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'
import type { FC } from 'react'
import React from 'react'
import { View } from 'react-native'

interface ManageRecommendationProperties {
  onManagePress: FunctionType;
}

const ManageRecommendationMenu: FC<ManageRecommendationProperties> = ({
  onManagePress,
}) => {
  const { data: selectedGenres } = useQuery({
    queryKey: QueryKeys.recommendationGenres,
    queryFn: () => api.recommendation.currentRecommendation(),
    select: (data) => data.data,
  });

  if (!selectedGenres) return null;
  return (
    <View className="bg-foreground border-bordered m-3 rounded-lg border-[1px] p-3.5">
      <Title size={"xl"} color={Color.white} weight="bold">
        Manage Recommendation
      </Title>
      <Title weight="light" className="mb-4" numberOfLines={2} size={"md"}>
        To get new recommendations, you need to adjust your goals
      </Title>
      <View className="mb-4 flex flex-row flex-wrap">
        {selectedGenres.map((genre) => (
          <SvgButton
            size="sm"
            altEmoji={genre.emoji}
            className="mr-2 mb-1"
            key={genre.name}
            svgUri={genre.icon}
            title={genre.name}
          />
        ))}
      </View>

      <Button size={"md"} variant="primary" onPress={onManagePress}>
        Manage
      </Button>
    </View>
  );
};

export default ManageRecommendationMenu;
