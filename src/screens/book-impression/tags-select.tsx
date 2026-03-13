import { Button, Title } from "@/ui";
import { Color } from "@/utils/colors";
import { impressionsTags } from "@/utils/impressions-tags";
import type { BaseFieldProperties } from "@/utils/types";
import { Controller, type FieldValues } from "react-hook-form";
import { View } from "react-native";

interface TagsSelectProperties<T extends FieldValues>
  extends BaseFieldProperties<T> {
  currentRating: number;
}

export const mappedTags = (
  tags: {
    id: number;
    name: string;
  }[],
  selectedTags: string[],
  setSelectedTags: (tags: string[]) => void,
) =>
  tags.map((tag) => (
    <Button
      size="sm"
      key={tag.id}
      variant={selectedTags.includes(tag.name) ? "primary" : "muted"}
      onPress={() => {
        if (selectedTags.includes(tag.name)) {
          setSelectedTags(
            selectedTags.filter((selectedTag) => selectedTag !== tag.name),
          );
        } else {
          setSelectedTags([...selectedTags, tag.name]);
        }
      }}
    >
      {tag.name}
    </Button>
  ));

export const TagsSelect = <T extends Record<string, any>>({
  control,
  name,
  currentRating,
}: TagsSelectProperties<T>) => (
  <Controller
    control={control}
    name={name}
    render={({
      field: { value = [] as string[], onChange: setTags },
      fieldState: { error },
    }) => (
      <>
        <View className="mb-2 w-full flex-row flex-wrap items-center justify-center gap-2 pt-4">
          {mappedTags(
            currentRating > 3
              ? impressionsTags.positive
              : impressionsTags.negative,
            value,
            setTags,
          )}
        </View>

        {error ? (
          <Title color={Color.danger} size={"md"}>
            {error.message ?? "error!"}
          </Title>
        ) : null}
      </>
    )}
  />
);
