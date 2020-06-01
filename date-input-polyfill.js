import './date-input-polyfill.scss';
import Input from './input.js';

export const addPicker = (elm) => {
	if(elm && !elm.getAttribute('data-has-picker') 
		&& (elm.getAttribute('type')=='text' || !Input.supportsDateInput())) {
		new Input(elm);
	}
}

export const addPickers = (rootElm) => {
  var c = Input.addPickerToOtherInputs(rootElm);
  // Check if type="date" is supported.
  if(!Input.supportsDateInput()) {
    c += Input.addPickerToDateInputs(rootElm);
  }
  return c;
};

// Run the above code on any <input type="date"> in the document, also on dynamically created ones.
if(document.body.className.indexOf('no-auto-polyfill') < 0) {
	//removed
	//addPickers();
	document.addEventListener(`DOMContentLoaded`, () => {
		addPickers();
	});

	// This is also on mousedown event so it will capture new inputs that might
	// be added to the DOM dynamically.
	if(document.body.className.indexOf('no-dynamic-polyfill') < 0)
		document.querySelector(`body`).addEventListener(`mousedown`, () => {
			addPickers();
		});
}
