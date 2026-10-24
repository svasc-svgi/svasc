import React, { useState } from 'react';
import './OptimizedImage.css';

/**
 * Optimizes external CDN URLs (like Pexels or Unsplash) to request modern formats and sensible dimensions
 */
const getOptimizedSrc = (src, width) => {
    if (!src || typeof src !== 'string') return src;

    // Unsplash optimization
    if (src.includes('images.unsplash.com')) {
        const url = new URL(src);
        if (width) url.searchParams.set('w', width.toString());
        url.searchParams.set('auto', 'format');
        url.searchParams.set('fit', 'crop');
        url.searchParams.set('q', '80');
        return url.toString();
    }

    // Pexels optimization
    if (src.includes('images.pexels.com')) {
        const url = new URL(src);
        if (width) url.searchParams.set('w', width.toString());
        url.searchParams.set('auto', 'compress');
        url.searchParams.set('cs', 'tinysrgb');
        return url.toString();
    }

    return src;
};

const OptimizedImage = ({
    src,
    alt = '',
    className = '',
    style = {},
    priority = false,
    aspectRatio,
    objectFit = 'cover',
    width,
    height,
    fallback,
    onClick,
    ...rest
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const finalSrc = getOptimizedSrc(src, width);

    const containerStyle = {
        ...(aspectRatio ? { aspectRatio } : {}),
        ...style
    };

    return (
        <div className={`optimized-image-container ${className}`} style={containerStyle} onClick={onClick}>
            {/* Shimmer Placeholder while loading */}
            {!isLoaded && !hasError && <div className="optimized-image-shimmer" aria-hidden="true" />}

            {/* Error Fallback */}
            {hasError ? (
                <div className="optimized-image-error-fallback">
                    {fallback ? (
                        <img src={fallback} alt={alt} style={{ width: '100%', height: '100%', objectFit }} />
                    ) : (
                        <span>Image unavailable</span>
                    )}
                </div>
            ) : (
                <img
                    src={finalSrc}
                    alt={alt}
                    loading={priority ? 'eager' : 'lazy'}
                    fetchPriority={priority ? 'high' : 'auto'}
                    decoding="async"
                    width={width}
                    height={height}
                    className={`optimized-image-element ${isLoaded ? 'optimized-image-loaded' : 'optimized-image-loading'}`}
                    style={{ objectFit }}
                    onLoad={() => setIsLoaded(true)}
                    onError={() => setHasError(true)}
                    {...rest}
                />
            )}
        </div>
    );
};

export default OptimizedImage;
