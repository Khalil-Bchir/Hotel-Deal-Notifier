export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    const navbarHeight = 80; // Approximate height of the navbar
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - navbarHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
}
