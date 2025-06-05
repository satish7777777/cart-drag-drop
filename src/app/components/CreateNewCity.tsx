'use client';

import React from 'react';

interface CreateNewCityProps {
  formData: {
    placeName: string;
    review: string;
    noofReviews: string;
    reviewContent: string;
    image: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: () => void;
}

export default function CreateNewCity({ formData, onChange, onSubmit }: CreateNewCityProps) {
  return (
    <div className="bg-gray-100 p-4 rounded space-y-2">
      <input
        name="placeName"
        value={formData.placeName}
        onChange={onChange}
        placeholder="Place Name"
        className="w-full p-2 border rounded"
      />
      <input
        name="review"
        type="number"
        value={formData.review}
        onChange={onChange}
        placeholder="Rating"
        className="w-full p-2 border rounded"
      />
      <input
        name="noofReviews"
        type="number"
        value={formData.noofReviews}
        onChange={onChange}
        placeholder="No. of Reviews"
        className="w-full p-2 border rounded"
      />
      <textarea
        name="reviewContent"
        value={formData.reviewContent}
        onChange={onChange}
        placeholder="Review"
        className="w-full p-2 border rounded"
      />
      <input
        name="image"
        value={formData.image}
        onChange={onChange}
        placeholder="Image URL"
        className="w-full p-2 border rounded"
      />
      <button
        onClick={onSubmit}
        className="w-full mt-2 bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Submit
      </button>
    </div>
  );
}
