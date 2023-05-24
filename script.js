window.addEventListener('DOMContentLoaded', () => {
    const reviewsContainer = document.getElementById('reviews');
  
    // Fetch review data from JSON file
    fetch('reviews.json')
      .then(response => response.json())
      .then(data => {
        const restaurants = data.restaurants;
  
        // Iterate through each restaurant
        restaurants.forEach(restaurant => {
          const restaurantName = restaurant.name;
          const reviews = restaurant.reviews;
          const reviewCount = reviews.length; // Count of comments
  
          // Create restaurant container
          const restaurantContainer = document.createElement('div');
          restaurantContainer.classList.add('restaurant');
  
          // Display restaurant name and review count
          const restaurantInfoElement = document.createElement('div');
          restaurantInfoElement.classList.add('restaurant-info');
  
          const restaurantNameElement = document.createElement('h2');
          restaurantNameElement.textContent = restaurantName;
  
          const reviewCountElement = document.createElement('span');
          reviewCountElement.classList.add('review-count');
          reviewCountElement.textContent = reviewCount === 1 ? `${reviewCount} Comment` : `${reviewCount} Comments`;
  
          restaurantInfoElement.appendChild(restaurantNameElement);
          restaurantInfoElement.appendChild(reviewCountElement);
  
          restaurantContainer.appendChild(restaurantInfoElement);
  
          // Iterate through each review for the restaurant
          reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review');
  
            const ratingElement = document.createElement('div');
            ratingElement.classList.add('rating');
            ratingElement.textContent = 'Rating: ' + review.rating;
  
            const commentElement = document.createElement('p');
            commentElement.classList.add('comment');
            commentElement.textContent = review.comment;
            commentElement.style.display = 'none'; // Hide comments by default
  
            reviewElement.appendChild(ratingElement);
            reviewElement.appendChild(commentElement);
  
            reviewElement.addEventListener('click', () => {
              // Toggle display of comments when clicked
              commentElement.style.display = commentElement.style.display === 'none' ? 'block' : 'none';
            });
  
            // Add color to rating based on value
            if (review.rating >= 4) {
              ratingElement.classList.add('green');
            } else if (review.rating >= 3) {
              ratingElement.classList.add('blue');
            } else {
              ratingElement.classList.add('red');
            }
  
            restaurantContainer.appendChild(reviewElement);
          });
  
          // Create "See All" element
          const seeAllElement = document.createElement('div');
          seeAllElement.classList.add('see-all');
          seeAllElement.textContent = 'See All';
  
          let showAllComments = false; // Track if comments are shown
  
          seeAllElement.addEventListener('click', () => {
            // Toggle display of comments when "See All" is clicked
            const comments = restaurantContainer.querySelectorAll('.comment');
            comments.forEach(comment => {
              comment.style.display = showAllComments ? 'none' : 'block';
            });
  
            showAllComments = !showAllComments; // Toggle the flag value
          });
  
          restaurantContainer.appendChild(seeAllElement);
  
          reviewsContainer.appendChild(restaurantContainer);
        });
      })
      .catch(error => {
        console.log('Error fetching review data:', error);
      });
  });
  