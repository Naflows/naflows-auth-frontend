
'use client';
import '@/public/root/index.scss';


export default function NotFound() {
  return (
    <div className="not-found-page">
      <img src="https://www.naflows.com/public/assets/naflows_full_logotype.png" alt="404 Not Found" className="not-found-image" />
      <div className="not__found-header">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>

      <button className="primary-button" onClick={() => window.location.href = '/account/me'}>
        Go Back to Home
      </button>
    </div>
  );
}