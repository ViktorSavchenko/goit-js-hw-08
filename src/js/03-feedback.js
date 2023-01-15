import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
let formData = {};
const FORM_VALUE = 'feedback-form-state';

formRef.addEventListener('submit', onFormSubmit);
formRef.addEventListener('input', throttle(onFormInputValue, 500));

getFormDataFromStorage();

function onFormSubmit(e) {
  e.preventDefault();

  const formLength = e.currentTarget.elements.length - 1;

  if (Object.keys(formData).length !== formLength) {
    alert('Not all fields are filled');
    return;
  }

  e.currentTarget.reset();

  localStorage.removeItem(FORM_VALUE);

  console.log(formData);
  formData = {};
}

function onFormInputValue(e) {
  formData[e.target.name] = e.target.value.trim();

  const stringifyFormData = JSON.stringify(formData);

  localStorage.setItem(FORM_VALUE, stringifyFormData);
}

function getFormDataFromStorage() {
  const savedMessage = localStorage.getItem(FORM_VALUE);

  if (savedMessage) {
    try {
      formData = JSON.parse(savedMessage);

      Object.entries(formData).forEach(
        ([name, value]) => (formRef.elements[name].value = value)
      );
    } catch (error) {
      console.log(error.message);
    }
  }
}
