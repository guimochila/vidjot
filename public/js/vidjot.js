document.querySelectorAll('.delete').forEach(item => {
  item.addEventListener('click', () => {
    item.parentNode.parentNode.remove();
  });
});
