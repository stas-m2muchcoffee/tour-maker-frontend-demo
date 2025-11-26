import { FormProvider, useForm } from "react-hook-form";
import { useMemo } from "react";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { map } from "lodash";
import { useQuery } from "@apollo/client/react";

import { CreateTourDto } from "./dtos";
import {
  GetCategoriesDocument,
  GetCitiesDocument,
} from "../../graphql/__generated__/graphql";
import { AppSelect } from "../../components/app-select";
import { AppButton } from "../../components/app-button";
import { AppToggleGroup } from "../../components/app-toggle-group";
import { useTourCreation } from "../../hooks/use-tour-creation";

const CreateTourPage = () => {
  const { createTour } = useTourCreation();
  const { data: citiesData } = useQuery(GetCitiesDocument);
  const { data: categoriesData } = useQuery(GetCategoriesDocument);

  const form = useForm<CreateTourDto>({
    resolver: classValidatorResolver(CreateTourDto),
  });
  const { handleSubmit } = form;

  const citiesOptions = useMemo(() => {
    const options = map(citiesData?.city?.getCities || [], (city) => ({
      value: city.id,
      label: city.name,
    }));
    return [{ value: "", label: "Select a city" }, ...options];
  }, [citiesData?.city?.getCities]);

  const categoriesOptions = useMemo(() => {
    return map(categoriesData?.category?.getCategories || [], (category) => ({
      value: category.id,
      label: category.name,
    }));
  }, [categoriesData?.category?.getCategories]);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(createTour)}
        className="w-full max-w-2xl mx-auto flex flex-col gap-4"
      >
        <p className="text-secondary mb-2">
          Design your personalized experience
        </p>
        <AppSelect name="cityId" labelText="City" options={citiesOptions} />
        <AppToggleGroup
          name="categoryIds"
          labelText="Categories"
          options={categoriesOptions}
        />
        <AppButton type="submit" text="Create tour" iconName="plus" />
      </form>
    </FormProvider>
  );
};

export default CreateTourPage;
