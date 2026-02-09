import React from 'react';
import DOMPurify from 'isomorphic-dompurify';

const MainPost = ({ content }: { content: string }) => {
    const sanitizedContent = DOMPurify.sanitize(content);

    return (
        <div style={{ fontFamily: 'Georgia, serif', lineHeight: 1.8 }}>
            <div 
                dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
                style={{ marginBottom: '2rem' }} 
            />
        </div>
    );
};

export default MainPost;