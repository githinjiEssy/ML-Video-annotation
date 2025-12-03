// src/components/AnnotationList.jsx
import React, { useState } from 'react';
import { Play, Download, Copy, CheckCircle2, Clock, BarChart3, Search } from 'lucide-react';

const AnnotationList = ({ annotations = [], onPlaySegment, searchQuery = '', onSearchChange }) => {
  const [copiedId, setCopiedId] = useState(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = (annotation) => {
    // This would trigger segment extraction in a real app
    console.log('Download segment:', annotation);
    alert(`Downloading segment: ${annotation.title}\nFrom ${formatTime(annotation.start)} to ${formatTime(annotation.end)}`);
  };

  const filteredAnnotations = annotations.filter(ann =>
    ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ann.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return 'text-green-400';
    if (confidence >= 0.7) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">AI Analysis Results</h2>
            <p className="text-gray-400">Found {filteredAnnotations.length} relevant segments</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search annotations..."
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 w-64"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Duration</p>
                <p className="text-xl font-bold text-white">
                  {formatTime(annotations.reduce((sum, ann) => sum + (ann.end - ann.start), 0))}
                </p>
              </div>
              <Clock className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Avg Confidence</p>
                <p className="text-xl font-bold text-white">
                  {annotations.length > 0
                    ? `${(annotations.reduce((sum, ann) => sum + ann.confidence, 0) / annotations.length * 100).toFixed(1)}%`
                    : '0%'}
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Topics Found</p>
                <p className="text-xl font-bold text-white">{new Set(annotations.map(a => a.topic)).size}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Annotations List */}
      <div className="space-y-4">
        {filteredAnnotations.map((annotation, index) => (
          <div
            key={annotation.id}
            className="bg-gradient-to-r from-gray-900/50 to-gray-800/30 rounded-xl p-4 border border-gray-700 hover:border-blue-500/50 transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                      {annotation.title}
                    </h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-300 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {formatTime(annotation.start)} - {formatTime(annotation.end)}
                      </span>
                      <span className={`text-sm font-medium ${getConfidenceColor(annotation.confidence)}`}>
                        {(annotation.confidence * 100).toFixed(1)}% confidence
                      </span>
                      <span className="text-sm px-3 py-1 bg-gray-700/50 rounded-full text-gray-300">
                        {annotation.topic}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-3">{annotation.description}</p>
                
                {annotation.keywords && annotation.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {annotation.keywords.slice(0, 5).map((keyword, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => onPlaySegment?.(annotation)}
                  className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  title="Play segment"
                >
                  <Play className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAnnotations.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No annotations found</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            {searchQuery ? 'Try a different search term' : 'Upload a video to start analysis'}
          </p>
        </div>
      )}
    </div>
  );
};

export default AnnotationList;