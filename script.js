document.addEventListener('DOMContentLoaded', function() {
  // Connect page logic
  const connectPage = document.getElementById('connect-page');
  const predictorApp = document.getElementById('predictor-app');
  const connectBtn = document.getElementById('connect-btn');
  const provablyKeyInput = document.getElementById('provably-key');
  const loadingSection = document.getElementById('loading-section');
  const loadingText = document.getElementById('loading-text');

  const loadingMessages = [
    'Connecting to your 1WIN account',
    'Hacking the server',
    'Extracting predictions'
  ];

  if (connectBtn) {
    connectBtn.addEventListener('click', function() {
      if (!provablyKeyInput.value.trim()) {
        provablyKeyInput.focus();
        return;
      }
      connectBtn.style.display = 'none';
      provablyKeyInput.style.display = 'none';
      loadingSection.style.display = 'block';
      let msgIndex = 0;
      loadingText.textContent = loadingMessages[msgIndex];
      const interval = setInterval(() => {
        msgIndex++;
        if (msgIndex < loadingMessages.length) {
          loadingText.textContent = loadingMessages[msgIndex];
        }
        if (msgIndex >= loadingMessages.length) {
          clearInterval(interval);
          setTimeout(() => {
            connectPage.style.display = 'none';
            predictorApp.style.display = 'flex';
          }, 1000);
        }
      }, 2000);
    });
  }

  // Predictor app logic
  const predictionImg = document.getElementById('prediction-img');
  const totalPredictions = 8;

  // Add loading spinner and text for prediction loading
  let predictionLoading = null;
  function showPredictionLoading() {
    if (!predictionLoading) {
      predictionLoading = document.createElement('div');
      predictionLoading.className = 'prediction-loading';
      predictionLoading.innerHTML = `
        <div class="loading-spinner" style="margin: 0 auto 18px auto;"></div>
        <div class="loading-text">Extracting prediction...</div>
      `;
      predictionImg.parentNode.insertBefore(predictionLoading, predictionImg);
    }
    predictionLoading.style.display = 'flex';
    predictionImg.style.visibility = 'hidden';
  }
  function hidePredictionLoading() {
    if (predictionLoading) {
      predictionLoading.style.display = 'none';
    }
    predictionImg.style.visibility = 'visible';
  }

  // Use a more specific selector for the Predict button inside the predictor app
  const predictBtn = predictorApp.querySelector('.predict-btn');
  predictBtn.addEventListener('click', function() {
    showPredictionLoading();
    setTimeout(() => {
      const random = Math.floor(Math.random() * totalPredictions) + 1;
      predictionImg.src = random + '.png';
      predictionImg.alt = 'Prediction ' + random;
      hidePredictionLoading();
    }, 3000);
  });

  // Q&A dropdown logic
  const qaQuestions = document.querySelectorAll('.qa-question');
  qaQuestions.forEach(q => {
    q.addEventListener('click', function() {
      const item = q.parentNode;
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.qa-item').forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}); 