const { useEffect, useState } = React

export function LongTxt({ txt, length = 100 }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleIsExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const displayText = isExpanded ? txt : txt.slice(0, length);

    return (
        <div>
            <p>{displayText}{!isExpanded && txt.length > length && '...'}</p>
            {txt.length > length && (
                <button onClick={toggleIsExpanded}>
                    {isExpanded ? 'Read Less' : 'Read More'}
                </button>
            )}
        </div>
    );
}