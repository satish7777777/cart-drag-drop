'use client';

import React from 'react';

interface EditPlaceFormProps {
  formData: {
    placeName: string;
    review: string;
    noofReviews: string;
    reviewContent: string;
    image: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => void;
}

export default function EditPlaceForm({ formData, onChange, onSave }: EditPlaceFormProps) {
  return (
    <>
      <textarea
        name="reviewContent"
        value={formData.reviewContent}
        onChange={onChange}
        className="w-full text-sm bg-gray-100 p-2 rounded resize-none"
      />
      <input
        name="review"
        type="number"
        step="0.1"
        value={formData.review}
        onChange={onChange}
        placeholder="Rating"
        className="border p-1 rounded w-full text-sm"
      />
      <input
        name="noofReviews"
        type="number"
        value={formData.noofReviews}
        onChange={onChange}
        placeholder="No. of Reviews"
        className="border p-1 rounded w-full text-sm"
      />
      <input
        name="image"
        value={formData.image}
        onChange={onChange}
        placeholder="Image URL"
        className="border p-1 rounded w-full text-sm"
      />
      <button
        onClick={onSave}
        className="mt-2 bg-green-600 text-white text-sm px-4 py-1 rounded hover:bg-green-700"
      >
        Save
      </button>
    </>
  );
}
