import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onSubmit}) => {
	return (
		<div>
			<p className = 'f2'>
				{"This Magic Brain will detect the face of your favorite Celebrity!"}
			</p>
			<div className = 'center'>
				<div className = 'form center pa4 br3 shadow-5'>
					<input className = 'f4 pa2 w-90 center' type = 'tex' onChange ={onInputChange}/>
					<button className = 'w-40 grow f3 link ph3 pv2 dib white bg-purple'
					onClick = {onSubmit}
					>Detect</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;