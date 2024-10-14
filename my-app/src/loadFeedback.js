// src/loadFeedback.js
export function loadFeedback(eventId) {
    const container = document.createElement('div');
    container.id = 'feedback-container';

    // Load React and ReactDOM if they are not already loaded
    if (!window.React) {
        const reactScript = document.createElement('script');
        reactScript.src = 'https://unpkg.com/react/umd/react.production.min.js';
        document.head.appendChild(reactScript);
    }

    if (!window.ReactDOM) {
        const reactDomScript = document.createElement('script');
        reactDomScript.src = 'https://unpkg.com/react-dom/umd/react-dom.production.min.js';
        document.head.appendChild(reactDomScript);
    }

    // Load your application bundle (make sure this path is correct)
    const appScript = document.createElement('script');
    appScript.src = 'http://localhost:3000/static/js/main.js'; // Adjust this path as necessary
    appScript.onload = () => {
        // Once React and ReactDOM are loaded, render the component
        const ResponseDisplay = window.ResponseDisplay; // Expose your component globally

        ReactDOM.render(
            React.createElement(ResponseDisplay, { eventId }),
            container
        );
    };

    document.body.appendChild(appScript);
    document.body.appendChild(container);
}
