// src/pages/Results.jsx
import React, { useState } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import AnnotationList from '../components/AnnotationList';

const Results = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with real data from your backend
  const mockAnnotations = [
    {
      id: '1',
      title: 'React Hooks Introduction',
      description: 'Learn about useState and useEffect hooks with practical examples and common use cases.',
      start: 220, // 3:40
      end: 340, // 5:40
      confidence: 0.95,
      topic: 'React',
      keywords: ['useState', 'useEffect', 'hooks', 'functional components']
    },
    {
      id: '2',
      title: 'Custom Hooks Creation',
      description: 'Building reusable custom hooks for API calls, form handling, and state management.',
      start: 520, // 8:40
      end: 620, // 10:20
      confidence: 0.88,
      topic: 'React',
      keywords: ['custom hooks', 'API', 'forms', 'reusability']
    },
    {
      id: '3',
      title: 'State Management Patterns',
      description: 'Exploring different state management patterns including Context API and Redux.',
      start: 850, // 14:10
      end: 950, // 15:50
      confidence: 0.92,
      topic: 'React',
      keywords: ['state', 'Context API', 'Redux', 'patterns']
    },
    {
      id: '4',
      title: 'Performance Optimization',
      description: 'Techniques for optimizing React application performance with memoization.',
      start: 1100, // 18:20
      end: 1250, // 20:50
      confidence: 0.85,
      topic: 'React',
      keywords: ['performance', 'memo', 'useMemo', 'optimization']
    }
  ];

  const mockVideoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  const handleTimeUpdate = (e) => {
    if (e.target) {
      setCurrentTime(e.target.currentTime);
    }
  };

  const handlePlaySegment = (segment) => {
    setCurrentTime(segment.start);
    // In a real app, you would seek the video to this time
    console.log('Play segment:', segment);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Video Analysis Results
          </h1>
          <p className="text-gray-400">
            AI has analyzed your video and found {mockAnnotations.length} relevant segments
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Video Player */}
          <div className="lg:col-span-2">
            <VideoPlayer
              videoUrl={mockVideoUrl}
              currentTime={currentTime}
              onTimeUpdate={handleTimeUpdate}
              segments={mockAnnotations}
            />
            
            {/* Video Info */}
            <div className="mt-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">React Tutorial Video</h3>
                  <p className="text-gray-400">Uploaded: Today at 14:30</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">Duration</p>
                  <p className="text-xl font-bold text-white">21:40</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-900/30 rounded-lg">
                  <p className="text-sm text-gray-400">File Size</p>
                  <p className="font-semibold text-white">156 MB</p>
                </div>
                <div className="text-center p-3 bg-gray-900/30 rounded-lg">
                  <p className="text-sm text-gray-400">Format</p>
                  <p className="font-semibold text-white">MP4</p>
                </div>
                <div className="text-center p-3 bg-gray-900/30 rounded-lg">
                  <p className="text-sm text-gray-400">Resolution</p>
                  <p className="font-semibold text-white">1080p</p>
                </div>
                <div className="text-center p-3 bg-gray-900/30 rounded-lg">
                  <p className="text-sm text-gray-400">Status</p>
                  <p className="font-semibold text-green-400">Analyzed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Annotations */}
          <div>
            <AnnotationList
              annotations={mockAnnotations}
              onPlaySegment={handlePlaySegment}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;