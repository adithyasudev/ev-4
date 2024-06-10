document.getElementById('filter').addEventListener('change', function () {
    const filter = this.value;
    fetch(`/logs?level=${filter}`)
        .then(response => response.json())
        .then(data => {
            const logOutput = document.getElementById('logOutput');
            logOutput.textContent = data.join('\n');
        });
});

// Initial fetch of logs
fetch('/logs?level=all')
    .then(response => response.json())
    .then(data => {
        const logOutput = document.getElementById('logOutput');
        logOutput.textContent = data.join('\n');
    });
