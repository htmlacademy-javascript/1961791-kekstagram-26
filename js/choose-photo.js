const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooserElement = document.querySelector('.img-upload__input');
const PreviewElement = document.querySelector('.img-upload__preview');
const imgPreviewElement = PreviewElement.querySelector('img');

fileChooserElement.addEventListener('change', () => {
  imgPreviewElement.src = '';
  const file = fileChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it)
  );

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      imgPreviewElement.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});
