import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {} }) {
	const { id: editId, ...editValues } = cabinToEdit;
	const isWorking = isCreating || isEditing;
	const isEditSession = Boolean(editId);
	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditSession ? editValues : {},
	});

	const { errors } = formState;
	const { isEditing, editCabin } = useEditCabin();
	const { isCreating, createCabin } = useCreateCabin();

	function onSubmit(data) {
		const image = typeof data.image === "string" ? data.image : data.image[0];

		if (isEditSession)
			editCabin(
				{ newCabinData: { ...data, image }, id: editId },
				{ onSuccess: (data) => reset() }
			);
		else
			createCabin(
				{ ...data, image: data.image },
				{ onSuccess: (data) => reset() }
			);
	}
	function onError(errors) {
		// console.log(errors);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow
				disabled={isWorking}
				label="Cabin name"
				error={errors?.name?.message}
			>
				<Input
					type="text"
					id="name"
					{...register("name", { required: "This field is required" })}
				/>
			</FormRow>
			<FormRow
				disabled={isWorking}
				label="Maximum capacity"
				error={errors?.maxCapacity?.message}
			>
				<Input
					type="number"
					id="maxCapacity"
					{...register("maxCapacity", { required: "This field is required" })}
				/>
			</FormRow>

			<FormRow
				disabled={isWorking}
				label="Maximum capacity"
				error={errors?.name?.message}
			>
				<Input
					type="number"
					id="regularPrice"
					{...register("regularPrice", { required: "This field is required" })}
				/>
			</FormRow>

			<FormRow
				disabled={isWorking}
				label="Discount"
				error={errors?.discount?.message}
			>
				<Input
					type="number"
					id="discount"
					defaultValue={0}
					{...register("discount", {
						required: "This field is required",
						validate: (value) =>
							value <= getValues().regularPrice ||
							"Discount should be less than regular price",
					})}
				/>
			</FormRow>

			<FormRow
				label="Description for website"
				error={errors?.description?.message}
			>
				<Textarea
					type="number"
					id="description"
					defaultValue=""
					{...register("description", { required: "This field is required" })}
				/>
			</FormRow>

			<FormRow
				disabled={isWorking}
				// error={errors?.image?.message}
			>
				<FileInput
					id="image"
					accept="image/*"
					type="file"
					{...register("image", {
						required: isEditSession ? false : "This field is required",
					})}
				/>
			</FormRow>

			<FormRow disabled={isWorking}>
				{/* type is an HTML attribute! */}
				<Button
					variation="secondary"
					type="reset"
				>
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isEditSession ? "Edit Cabin" : "Create New Cabin"}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
