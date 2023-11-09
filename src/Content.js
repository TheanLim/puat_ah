import React, { useState, useEffect } from 'react';

function Content({ filePath, title }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    async function fetchContent() {
      try {
        const headers = new Headers();
        headers.append('Accept', 'text/plain'); // Specify the content type as plain text

        const response = await fetch(filePath, { headers });

        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }

        const data = await response.text();
        setContent(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    }

    fetchContent();
  }, [filePath]);

  return (
    <div>
      <h1>{title}</h1>
      <p style={{ whiteSpace: 'pre-line' }}>{content}</p> {/* Use white-space: pre-line to preserve newlines */}
    </div>
  );
}

export default Content;
