import { useCallback, useEffect, useMemo } from "react";
import { concat, map, uniqBy } from "lodash";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client/react";
import { toast } from "react-toastify";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";

import { AppToggleGroup } from "../../components/app-toggle-group/index.tsx";
import { AppButton } from "../../components/app-button/index.tsx";
import { userPreferenceOptions } from "../../constants/user-preferences.ts";
import { useActiveUser } from "../../hooks/use-active-user.ts";
import { UpdateMyPreferencesDocument } from "../../graphql/__generated__/graphql";
import { UpdateUserPreferencesDto } from "./dtos.ts";

const ProfilePage = () => {
  const user = useActiveUser();

  const [updateMyPreferencesMutation, { loading: updateMyPreferencesLoading }] =
    useMutation(UpdateMyPreferencesDocument, {
      onCompleted: () => {
        toast.success("Preferences updated");
      },
      update: (cache) => {
        cache.evict({
          id: "TourQuery",
          fieldName: "getRecommendedTours",
        });
      },
    });
  const form = useForm<UpdateUserPreferencesDto>({
    resolver: classValidatorResolver(UpdateUserPreferencesDto),
    disabled: updateMyPreferencesLoading,
  });
  const { handleSubmit, reset } = form;

  useEffect(() => {
    reset({
      preferences: user?.preferences || [],
    });
  }, [user, reset]);

  const myPreferenceOptions = useMemo(() => {
    return uniqBy(
      concat(
        userPreferenceOptions,
        map(user?.preferences || [], (preference) => ({
          value: preference,
          label: preference,
        }))
      ),
      "value"
    );
  }, [user?.preferences]);

  const updateMyPreferences = useCallback(
    (input: UpdateUserPreferencesDto) => {
      updateMyPreferencesMutation({ variables: { input } });
    },
    [updateMyPreferencesMutation]
  );

  return (
    <FormProvider {...form}>
      <form
        className="w-full max-w-2xl mx-auto flex flex-col gap-4"
        onSubmit={handleSubmit(updateMyPreferences)}
      >
        <p className="text-primary">
          Signed in as: <span className="font-semibold">{user?.email}</span>
        </p>

        <AppToggleGroup
          name="preferences"
          labelText="Preferences"
          options={myPreferenceOptions}
          displayCustomValue
          customValuePlaceholder="Enter your own..."
        />

        <div className="flex items-center justify-end gap-2">
          <AppButton
            type="submit"
            text="Save changes"
            iconName="save"
            disabled={updateMyPreferencesLoading}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default ProfilePage;
