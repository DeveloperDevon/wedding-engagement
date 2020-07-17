export const goToRegistry = () =>
  window.location.replace(
    "https://www.amazon.com/wedding/share/chandleranddevon-november2020",
  );

export const handleRsvp = (auth, history, showModal) => {
  auth ? history.push('rsvp') : showModal(true)
}