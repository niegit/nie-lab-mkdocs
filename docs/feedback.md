# We value your feedback!

NIE Lab depends on people like yourself to help report issues, bugs, and inconsistencies, but we **really** want your feedback and suggestions! Let us know what you want to see here! Take a moment and let us know below, we truly appreciate your input.😊

<br>

<form id="feedback-form">
  <div class="form-group">
    <label for="name">Your Name:</label>
    <input type="text" id="name" name="name" required>
  </div>
  <div class="form-group">
    <label for="feedback-type">Type of Feedback:</label>
    <select id="feedback-type" name="feedback-type" required>
      <option value="suggestion" selected>Suggestion</option>
      <option value="issue">Issue</option>
      <option value="other">Other</option>
    </select>
  </div>
  <div class="form-group">
    <label for="feedback" id="feedback-label">We appreciate the feedback! What suggestions are you thinking of?!</label>
    <textarea id="feedback" name="feedback" required></textarea>
  </div>
  <div class="form-group">
    <button type="submit">Submit</button>
  </div>
</form>

<script>
  document.getElementById('feedback-type').addEventListener('change', function() {
    const feedbackType = document.getElementById('feedback-type').value;
    const feedbackLabel = document.getElementById('feedback-label');
    if (feedbackType === 'issue') {
      feedbackLabel.textContent = 'Please explain your issue in more detail and be sure to let us know what lab or page has the problem.';
    } else if (feedbackType === 'suggestion') {
      feedbackLabel.textContent = 'We appreciate the feedback! What suggestions are you thinking of?!';
    } else {
      feedbackLabel.textContent = 'Please provide your feedback:';
    }
  });

  document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const feedbackType = document.getElementById('feedback-type').value;
    const feedback = document.getElementById('feedback').value;

    if (!name || !feedback) {
      alert('Please fill out all fields before submitting.');
      return;
    }

    fetch('https://webhook.site/f40f8065-99fe-49ad-ac05-f84c335479a7', {
      method: 'POST',
      mode: 'no-cors', // Bypass CORS
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name, feedbackType: feedbackType, feedback: feedback })
    })
      .then(() => {
        alert('Feedback submitted successfully!');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('We encountered an issue while submitting your feedback. Please try again later.');
      });
  });
</script>


<style>
  #feedback-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 1em;
    background: #f9f9f9;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .form-group {
    margin-bottom: 1em;
  }

  #feedback-form label {
    margin-bottom: .5em;
    color: #333333;
    display: block;
  }

  #feedback-form input, #feedback-form select, #feedback-form textarea {
    border: 1px solid #CCCCCC;
    padding: .5em;
    font-size: 1em;
    width: 100%;
    box-sizing: border-box;
    border-radius: 5px;
  }

  #feedback-form button {
    padding: 0.7em;
    color: #fff;
    background-color: #F15A2B;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    display: block;
    margin: 0 auto;
  }

  #feedback-form button:hover {
    background-color: #d14a24;
  }

  @media (max-width: 600px) {
    #feedback-form {
      padding: 0.5em;
    }

    #feedback-form input, #feedback-form select, #feedback-form textarea {
      font-size: 0.9em;
    }

    #feedback-form button {
      font-size: 0.9em;
    }
  }
</style>
