document.querySelectorAll('a').forEach(link => {
  // Check if the link is external (not internal)
  if (link.hostname !== window.location.hostname) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');  // For security reasons
  }
});
