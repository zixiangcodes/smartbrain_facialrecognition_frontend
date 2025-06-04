import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ input, onInputChange, onButtonSubmit }) => {
	return (
		<div className="image-link-form">
			<p className="description">
				<b>{'The Smart Brain Facial Recognition app detects a human face in your pictures. Copy & paste a URL that ends with a picture file (eg: jpg or png). Give it a try! (limited to detect only 1 face per image).'}</b>
			</p>
			<div className="form-container">
				<div className="form">
					{/* Bind the input field to the input prop to ensure it reflects the state */}
					<input
						className="input-field"
						type="text"
						value={input}  // This line ensures that the input field shows the state value
						onChange={onInputChange}
					/>
					<button
						className="submit-button"
						onClick={onButtonSubmit}
					>Detect</button>
				</div>
			</div>
		</div >
	);
}

export default ImageLinkForm;
