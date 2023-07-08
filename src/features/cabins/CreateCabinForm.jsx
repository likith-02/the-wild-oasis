import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow";
import { Textarea } from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import useCreateCabin from "./useCreateCabin";
import useUpdateCabin from "./useUpdateCabin";

function CreateCabinForm({ cabinData, onCloseModal }) {
  const isEditForm = Boolean(cabinData?.id);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditForm ? cabinData : {},
  });
  const errors = formState.errors;
  const { isCreating, createCabin } = useCreateCabin();
  const { isUpdating, updateCabin } = useUpdateCabin();

  function onSubmit(data) {
    if (!isEditForm)
      createCabin(
        { ...data, image: data.image[0] },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      updateCabin(
        {
          ...data,
          image: typeof data.image === "string" ? data.image : data.image[0],
          id: cabinData.id,
        },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }
  function onError(err) {
    console.log(err);
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          disabled={isEditForm ? isUpdating : isCreating}
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required!",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          disabled={isEditForm ? isUpdating : isCreating}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required!",
            min: {
              value: 1,
              message: "Capacity should be atleast 1!",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          disabled={isEditForm ? isUpdating : isCreating}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required!",
            min: {
              value: 1,
              message: "Regular price should be atleast 1!",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          disabled={isEditForm ? isUpdating : isCreating}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required!",
            validate: (value) => {
              return (
                value <= Number(getValues().regularPrice) ||
                "Discount should be less than the regular price!"
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isEditForm ? isUpdating : isCreating}
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required!",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          disabled={isEditForm ? isUpdating : isCreating}
          id="image"
          accept="image/*"
          {...register(
            "image",
            !isEditForm
              ? {
                  required: "This field is required!",
                }
              : {}
          )}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isEditForm ? isUpdating : isCreating}>
          {isEditForm ? "Edit cabin" : "Add new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
