import React from "react";

const Help = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Why Cookies Are Important & How to Enable Them
      </h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">🔒 Why We Use Cookies</h2>
        <p className="text-gray-700 leading-relaxed">
          Cookies are essential for making this app function correctly. We use
          cookies to:
        </p>
        <ul className="list-disc ml-6 mt-3 text-gray-700 space-y-1">
          <li>Keep you securely logged in</li>
          <li>Store your session and preferences temporarily</li>
          <li>Prevent unauthorized access to your account</li>
        </ul>
        <p className="mt-4 text-gray-700">
          If cookies are disabled, login and personalized features won't work
          properly.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">🛠️ How to Enable Cookies</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium">Google Chrome:</h3>
            <ol className="list-decimal ml-6 mt-2 text-gray-700">
              <li>
                Go to <strong>Settings</strong> →{" "}
                <strong>Privacy and security</strong>.
              </li>
              <li>
                Click <strong>Cookies and other site data</strong>.
              </li>
              <li>
                Select <strong>Allow all cookies</strong>.
              </li>
              <li>Refresh this page.</li>
            </ol>
          </div>

          <div>
            <h3 className="font-medium">Mozilla Firefox:</h3>
            <ol className="list-decimal ml-6 mt-2 text-gray-700">
              <li>
                Go to <strong>Settings</strong> →{" "}
                <strong>Privacy & Security</strong>.
              </li>
              <li>
                Under <strong>Cookies and Site Data</strong>, select{" "}
                <strong>Standard</strong>.
              </li>
              <li>Restart Firefox and reload this page.</li>
            </ol>
          </div>

          <div>
            <h3 className="font-medium">Safari (Mac):</h3>
            <ol className="list-decimal ml-6 mt-2 text-gray-700">
              <li>
                Go to <strong>Safari</strong> → <strong>Preferences</strong>.
              </li>
              <li>
                Click the <strong>Privacy</strong> tab.
              </li>
              <li>
                Uncheck <strong>Block all cookies</strong>.
              </li>
              <li>Close settings and refresh the page.</li>
            </ol>
          </div>

          <div>
            <h3 className="font-medium">Microsoft Edge:</h3>
            <ol className="list-decimal ml-6 mt-2 text-gray-700">
              <li>
                Go to <strong>Settings</strong> →{" "}
                <strong>Cookies and site permissions</strong>.
              </li>
              <li>
                Select <strong>Manage and delete cookies</strong>.
              </li>
              <li>
                Enable <strong>Allow sites to save and read cookie data</strong>
                .
              </li>
              <li>Reload the website.</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="text-center mt-10">
        <p className="text-gray-800 text-lg">
          After enabling cookies, try logging in again. If issues persist, feel
          free to contact support.
        </p>
      </section>
    </div>
  );
};

export default Help;
