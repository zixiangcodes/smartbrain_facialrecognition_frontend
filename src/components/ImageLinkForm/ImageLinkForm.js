import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return (
		<div className="image-link-form">
			<p className="description">
				{'This Smart Brain Facial Recognition app will detect a human face in your pictures (currently limited to detect 1 face per image, regardless of no. of people in the image).'}
			</p>
			<p className="description">
				{'Copy and paste a URL that ends with a jpg. Give it a try!'}
			</p>
			<div className="form-container">
				<div className="form">
					<input className="input-field" type="text" onChange={onInputChange} />
					<button
						className="submit-button"
						onClick={onButtonSubmit}
					>Detect</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;