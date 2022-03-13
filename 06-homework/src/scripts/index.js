const camelToKebab = (str) => str
  .split('')
  .map((letter, index) => (letter.toUpperCase() === letter
    ? `${index !== 0 ? '-' : ''}${letter.toLowerCase()}` : letter)).join('');

const validateParams = (key, value) => {
  if (key.toLowerCase().includes('name')) {
    return value.length < 20;
  } if (key.toLowerCase().includes('email')) {
    return /\S+@\S+\.\S+/.test(value);
  } if (key.toLowerCase().includes('gender')) {
    return value === 'male' || value === 'female';
  }
  return false;
};

const searchParams = Object.fromEntries(
  new URLSearchParams(window.location.search).entries()
);

Object.keys(searchParams).forEach((param) => {
  if (validateParams(param, searchParams[param])) {
    const inputs = document.querySelectorAll(`input[id*=${camelToKebab(param)}]`);
    inputs.forEach((input) => {
      if (input.type === 'radio') {
        if (input.id.includes(`-${searchParams[param]}`)) {
          input.setAttribute('checked', true);
        } else {
          input.removeAttribute('checked');
        }
      } else {
        input.setAttribute('value', searchParams[param]);
      }
    });
  }
});

const elementsWithoutValues = document.querySelectorAll(
  "input[type=text]:not([value]), input[type=text][value=''], input[type=email]:not([value]), input[type=email][value='']"
);

elementsWithoutValues.forEach((elem) => {
  elem.setAttribute('value', elem.placeholder);
});
