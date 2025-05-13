tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#4D0000',
                secondary: '#A20000',
            }
        }
    }
}


const menuToggle = document.getElementById('menu-toggle');
const dropdownMenu = document.getElementById('dropdown-menu');

menuToggle.addEventListener('click', () => {
    dropdownMenu.classList.toggle('hidden');
});

