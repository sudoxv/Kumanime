(function() {
  const button = document.getElementById('toggleButton');
  const icon = document.getElementById('icon');
  const input = document.getElementById('searchInput');
  
  let isOpen = false;
  
  button.addEventListener('click', function() {
    isOpen = !isOpen;

    if (isOpen) {
      input.classList.remove('w-0', 'opacity-0', 'px-0', 'py-0', 'border-0');
      input.classList.add('w-64', 'opacity-100', 'px-5', 'py-3', 'border', 'border-gray-300');
      
      icon.classList.remove('fa-search');
      icon.classList.add('fa-times');
    } else {
      input.classList.remove('w-64', 'opacity-100', 'px-5', 'py-3', 'border', 'border-gray-300');
      input.classList.add('w-0', 'opacity-0', 'px-0', 'py-0', 'border-0');
                    
      icon.classList.remove('fa-times');
      icon.classList.add('fa-search');
    }
    
    icon.classList.add('rotate-once');
    setTimeout(() => {
      icon.classList.remove('rotate-once');
    }, 300);
  });
})();
