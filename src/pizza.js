import axios from "axios";
import { useState } from "react";
import * as Yup from "yup";

const initialFormState = {
	name: "",
	size: "",
	topping1: false,
	topping2: false,
	topping3: false,
	topping4: false,
	special: "",
};

const initialErrorState = {
	name: "",
};

const formSchema = Yup.object().shape({
	name: Yup.string().min(2, "name must be at least 2 characters"),
});

export const Pizza = () => {
	const [formValues, setFormValues] = useState(initialFormState);
	const [errors, setErrors] = useState(initialErrorState);

	const onFormValueChange = (e) => {
		if (e.target.type === "checkbox") {
			setFormValues({
				...formValues,
				[e.target.name]: !formValues[e.target.name],
			});
		} else {
			setFormValues({ ...formValues, [e.target.name]: e.target.value });
		}
		if (e.target.name === "name") {
			Yup.reach(formSchema, e.target.name)
				.validate(e.target.value)
				.then((valid) => {
					setErrors({
						...errors,
						[e.target.name]: "",
					});
				})
				.catch((err) => {
					setErrors({
						...errors,
						[e.target.name]: err.errors[0],
					});
				});
		}
	};

	const submitClicked = (e) => {
		e.preventDefault();
		console.log(formValues);
		axios.post("https://reqres.in/api/orders", formValues).then((res) => {
			console.log(res);
		});
	};

	return (
		<>
			<form onSubmit={submitClicked} id="pizza-form">
				<input
					onChange={onFormValueChange}
					name="name"
					value={formValues.name}
					id="name-input"
				/>
				{errors.name && <div>{errors.name}</div>}
				<select
					onChange={onFormValueChange}
					name="size"
					value={formValues.size}
					id="size-dropdown"
				>
					<option value=""></option>
					<option value="small">small</option>
					<option value="medium">medium</option>
					<option value="large">large</option>
				</select>
				<input
					onChange={onFormValueChange}
					name="topping1"
					checked={formValues.topping1}
					type="checkbox"
				/>
				Pepperoni
				<input
					onChange={onFormValueChange}
					name="topping2"
					checked={formValues.topping2}
					type="checkbox"
				/>
				Peppers
				<input
					onChange={onFormValueChange}
					name="topping3"
					checked={formValues.topping3}
					type="checkbox"
				/>
				Pineapple
				<input
					onChange={onFormValueChange}
					name="topping4"
					checked={formValues.topping4}
					type="checkbox"
				/>
				Onions
				<input
					onChange={onFormValueChange}
					name="special"
					value={formValues.special}
					id="special-text"
				/>
				<button id="order-button">Submit</button>
			</form>
		</>
	);
};