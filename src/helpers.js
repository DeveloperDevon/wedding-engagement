export const goToRegistry = () =>
  window.location.replace(
    "https://www.amazon.com/wedding/share/chandleranddevon-november2020",
  );

export const handleRsvp = (auth, admin, history, showModal) => {
  const guestName = localStorage.getItem('guestName')
  auth && !!guestName ? history.push('rsvp') : admin ? history.push('/admin') : showModal(true)
}