const exploreButton = document.getElementById('explore-button');
const usernameInput = document.getElementById('username');
const resultDiv = document.getElementById('result');

exploreButton.addEventListener('click', () => {
  const username = usernameInput.value;

  // Fetch user details from GitHub API
  fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  })
    .then(response => response.json())
    .then(user => {
      // Create a link to the user's profile
      const profileLink = document.createElement('a');
      profileLink.href = user.html_url;
      profileLink.textContent = user.login;
      profileLink.target = '_blank';

      // Create a list of user details
      const detailsList = document.createElement('ul');
      detailsList.innerHTML = `
        <li>Name: ${user.name || 'N/A'}</li>
        <li>Location: ${user.location || 'N/A'}</li>
        <li>Public Repositories: ${user.public_repos}</li>
        <li>Followers: ${user.followers}</li>
        <li>Following: ${user.following}</li>
      `;

      // Clear existing result
      resultDiv.innerHTML = '';

      // Add the link and details to the result
      resultDiv.appendChild(profileLink);
      resultDiv.appendChild(detailsList);
    })
    .catch(error => {
      console.error(error);
      alert('Error fetching user details');
    });
});
