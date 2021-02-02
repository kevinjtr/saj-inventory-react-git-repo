import React, { useState } from 'react';

const AddCategoryForm = (props) => {
	const initialFormState = { name: '' };
	const [ category, setCategory ] = useState(initialFormState);

	const handleInputChange = (event) => {
		const { name, value } = event.target;

		setCategory({ ...category, [name]: value });
	};

	const submitForm = (event) => {
		event.preventDefault();

		if (!category.name) return;

		props.addCategory(category);
		setCategory(initialFormState);
	};

	return (
		<div className="row">
			<form className="col s12" onSubmit={submitForm}>
				<div className="row">
					<div className="col-md-9">
						<input
							type="text"
							id="name"
							name="name"
							className="form-control"
							placeholder="Category Name"
							value={category.name}
							onChange={handleInputChange}
							required
						/>
					</div>
				</div>

				{/* <div className="row">
                    <div className="input-field col s12">

                        <input 
                            type="text" 
                            name="username" 
                            value={user.username}
                            onChange={handleInputChange} 
                            required />
                        <label htmlFor="username">Username</label>
                    </div>
                </div> */}

				<br />
				<div className="row">
					<div className="input-field col s12">
						<button className="btn btn-primary">Add</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddCategoryForm;
