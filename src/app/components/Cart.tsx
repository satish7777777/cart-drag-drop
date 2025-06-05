'use client';

import { useState } from 'react';
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiTrash } from "react-icons/hi";
import { BiLink } from "react-icons/bi";
import EditPlaceForm from './EditPlaceForm';

interface CartProps {
  id: number;
  placeName: string;
  review: number;
  noofReviews: number;
  reviewContent: string;
  image: string;
  onDelete: (id: number) => void;
  onEdit: (data: any) => void;
}

export default function Cart({ id, placeName, review, noofReviews, reviewContent, image, onDelete, onEdit }: CartProps) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    placeName,
    review: review.toString(),
    noofReviews: noofReviews.toString(),
    reviewContent,
    image
  });

  const handleEditChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onEdit({
      id,
      placeName: formData.placeName,
      review: parseFloat(formData.review),
      noofReviews: parseInt(formData.noofReviews),
      reviewContent: formData.reviewContent,
      image: formData.image,
    });
    setEditMode(false);
  };

  return (
    <div className="relative flex items-start gap-4 p-4 rounded-xl shadow bg-white">
      <div className="relative shrink-0">
        <img src={formData.image} alt={formData.placeName} className="w-28 h-28 object-cover rounded-xl" />
        <div className="absolute top-0 left-0 bg-purple-500 text-white text-sm font-semibold w-6 h-6 flex items-center justify-center rounded-full">
          {id}
        </div>
      </div>

      <div className="flex-1 space-y-1">
        <div className="flex justify-between">
          <div>
            {editMode ? (
              <input
                name="placeName"
                value={formData.placeName}
                onChange={handleEditChange}
                className="font-bold text-lg border-b border-gray-300 focus:outline-none"
              />
            ) : (
              <div className="font-semibold text-lg">{formData.placeName}</div>
            )}

            <div className="text-sm text-gray-600 flex items-center gap-2">
              {formData.review}
              <FaStar className="text-yellow-400" />
              <span className="text-gray-500">({parseInt(formData.noofReviews).toLocaleString()})</span>
            </div>
          </div>

          <div className="flex gap-3 text-lg">
            <FaMapMarkerAlt className="text-blue-500 cursor-pointer" />
            <BiLink className="text-green-600 cursor-pointer hidden sm:inline" />
            <HiTrash
              onClick={() => onDelete(id)}
              className="text-red-600 cursor-pointer hidden sm:inline"
            />
          </div>
        </div>

        {editMode ? (
          <EditPlaceForm
            formData={formData}
            onChange={handleEditChange}
            onSave={handleSave}
          />
        ) : (
          <div className="bg-gray-100 p-2 rounded text-sm flex justify-between items-start">
            <span>{formData.reviewContent}</span>
            <FiEdit2
              onClick={() => setEditMode(true)}
              className="cursor-pointer text-gray-500 shrink-0 ml-2 mt-1"
            />
          </div>
        )}
      </div>
    </div>
  );
}
