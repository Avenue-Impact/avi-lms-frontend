// export const scrollToSection = (ref) => {
//     ref.current?.scrollIntoView({ behavior: "smooth" });
//   };



/**
 * Smoothly scrolls to an element with the specified ID
 * @param targetId - The ID of the element to scroll to (without the #)
 * @param options - Optional scroll options (default: { behavior: 'smooth', block: 'start' })
 */
export const scrollToElement = (
    targetId,
    options = { behavior: 'smooth', block: 'start' }
) => {
    if (!targetId) {
      console.warn('No target ID provided for scrollToElement');
      return;
    }
  
    const element = document.getElementById(targetId);
    
    if (!element) {
      console.warn(`Element with ID "${targetId}" not found`);
      return;
    }
  
    element.scrollIntoView(options);
};