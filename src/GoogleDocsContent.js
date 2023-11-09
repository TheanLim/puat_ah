import { useState, useEffect } from 'react';

const cache = {}; // Cache object to store fetched content
const CACHE_EXPIRATION_MS = 600000; // 10 minutes (adjust as needed)

function GoogleDocsContent({ docId, title }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    async function fetchAndCacheContent() {
      const url = `https://docs.google.com/document/d/${docId}/export?format=txt`;

      if (cache[docId] && cache[docId].expiration > Date.now()) {
        // If content is cached and not expired, use it
        setContent(cache[docId].data);
      } else {
        // Otherwise, fetch and cache the content
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Failed to fetch content');
          }
          const data = await response.text();
          cache[docId] = {
            data,
            expiration: Date.now() + CACHE_EXPIRATION_MS,
          };
          setContent(data);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      }
    }

    // Fetch and cache content when the component mounts
    fetchAndCacheContent();

    // Listen for the beforeunload event to force update on page refresh
    const handleBeforeUnload = () => {
      cache[docId] = {}; // Clear the cache when the user refreshes the page
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [docId]);

  return (
    <div>
      <h1>{title}</h1>
      <p style={{ whiteSpace: 'pre-line' }}>{content}</p>
    </div>
  );
}

export default GoogleDocsContent;
