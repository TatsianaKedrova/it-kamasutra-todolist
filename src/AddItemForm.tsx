import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemPropsType = {
	addItem: (title: string) => void;
};

const AddItemForm = (props: AddItemPropsType) => {
	const [title, setTitle] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setError(null);
		setTitle(e.currentTarget.value);
	};

	const addItem = () => {
		const trimmedTitle = title.trim();
		if (trimmedTitle) {
			props.addItem(title);
		} else {
			setError("Please add title!");
		}
		setTitle("");
	};

	const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			addItem();
		}
	};

	return (
		<div>
			<input
				value={title}
				onChange={changeTitle}
				onKeyPress={onKeyPressAddTask}
				className={error ? "error" : ""}
			/>
			<button onClick={addItem}>+</button>
			{error && <div className={"error-text"}>{error}</div>}
		</div>
	);
};

export default AddItemForm;
