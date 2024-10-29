import React, { useEffect, useState } from 'react';

const ResultPage = ({ basicData, detailedData, generateResponse }: { basicData: any, detailedData: any, generateResponse: (input: { basicData: any, detailedData: any }) => Promise<{ content: string }> }) => {
    const [result, setResult] = useState('');

    useEffect(() => {
        const fetchResult = async () => {
            const input = { basicData, detailedData };
            const response = await generateResponse(input);
            setResult(response.content);
        };

        fetchResult();
    }, [basicData, detailedData, generateResponse]);

    return (
        <div>
            <h1>Job Recommendation</h1>
            <p>{result}</p>
        </div>
    );
};

export default ResultPage;