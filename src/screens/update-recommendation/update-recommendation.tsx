import api from "@/api";
import { useTypedNavigation } from "@/hooks";
import { Close } from "@/icons";
import { Button, Icon, Loader, ScrollLayout, Title } from "@/ui";

import { SvgButton } from "@/ui/svg-button/svg-button";
import { cn } from "@/utils";
import { Color } from "@/utils/colors";
import { MutationKeys, QueryKeys } from "@/utils/query-keys";
import { successToast } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UpdateRecommendationDto } from "api-client";
import { useState } from "react";
import { View } from "react-native";

const UpdateRecommendation = () => {
  const queryClient = useQueryClient();
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const { data: genres } = useQuery({
    queryKey: QueryKeys.genres.key,
    queryFn: () => api.genre.catalog(),
    select: (data) => data.data,
  });

  const { mutateAsync: update, isPending: updateLoading } = useMutation({
    mutationKey: MutationKeys.recommendation.update,
    mutationFn: (dto: UpdateRecommendationDto) =>
      api.recommendation.updateRecommendation(dto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QueryKeys.recommendationGenres,
      });
      successToast("Recommendation updated");
    },
  });
  const { navigate } = useTypedNavigation();
  if (!genres) return <Loader />;
  return (
    <>
      <ScrollLayout className="p-2 py-4">
        <Icon
          variant="transparent"
          className="ml-auto"
          icon={Close}
          size="md"
          onPress={() => navigate("Featured")}
        />
        <View>
          <Title size={"xxl"} weight="bold" className="mb-2" numberOfLines={2}>
            What you next goal?
          </Title>
          <Title
            size={"lg"}
            numberOfLines={2}
            weight="light"
            color={Color.gray}
            className="mb-4"
          >
            Select 3 genres for better recommendations
          </Title>
        </View>
        <View className="flex w-full flex-row flex-wrap justify-around">
          {genres.map((genre) => (
            <SvgButton
              altEmoji={genre.emoji}
              title={genre.name}
              svgUri={genre.icon}
              key={genre.id}
              size="md"
              className="mb-2.5 mr-2.5"
              variant={selectedGenres.includes(genre.id) ? "primary" : "muted"}
              onPress={() => {
                selectedGenres.includes(genre.id)
                  ? setSelectedGenres(
                      selectedGenres.filter((g) => g !== genre.id),
                    )
                  : selectedGenres.length < 3 &&
                    setSelectedGenres([...selectedGenres, genre.id]);
              }}
            />
          ))}
        </View>
      </ScrollLayout>
      <Button
        disabled={selectedGenres.length !== 3}
        variant="primary"
        isLoading={updateLoading}
        size="lg"
        className={cn("mx-2 mb-4", selectedGenres.length === 0 && "hidden")}
        onPress={async () => {
          console.log({ selectedGenres });
          await update({ genreSlugs: selectedGenres });

          await queryClient.invalidateQueries({
            queryKey: QueryKeys.featured,
          });
          navigate("Featured");
        }}
      >
        Save
      </Button>
    </>
  );
};

export default UpdateRecommendation;
