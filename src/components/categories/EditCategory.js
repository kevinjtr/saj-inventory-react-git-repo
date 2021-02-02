import React, { useState, useEffect } from 'react';

const EditUserForm = (props) => {
	const [category, setCategory ] = useState(props.currentCategory);

	console.log(props)
	//console.log(useState(props.currentUser))
	const handleInputChange = (event) => {
		const { name, value } = event.target;

		setCategory({ ...category, [name]: value });
	};

	const submitForm = (event) => {
		event.preventDefault();

		props.updateCategory(category.id, category);
	};

	useEffect(
		() => {
			setCategory(props.currentCategory);
		},
		[ props ]
	);

	return (
		<div className="row">
			<form className="col s12" onSubmit={submitForm}>
				<div className="row">
					<div className="input-field col s12">
						<input
							type="text"
							id={category.id}
							name="name"
							value={category.name}
							onChange={handleInputChange}
							required
						/>
						<label htmlFor="name" />
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
                        <label htmlFor="username"></label>
                    </div>
                </div> */}

				<div className="row">
					<div className="input-field col s12 m6">
						<button className="waves-effect waves-light btn">Update</button>
					</div>

					<div className="input-field col s12 m6">
						<button className="waves-effect waves-light btn" onClick={() => props.setEditing(false)}>
							Cancel
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default EditUserForm;
