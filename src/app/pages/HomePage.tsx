'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Cart from '../components/Cart';
import ImageComponent from '../components/image';
import CreateNewCity from '../components/CreateNewCity';
import { PointerSensor, TouchSensor } from '@dnd-kit/core';
import { DndContext, closestCenter,  useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FaBars } from 'react-icons/fa';

interface User {
  id: number;
  placeName: string;
  review: number;
  noofReviews: number;
  reviewContent: string;
  image: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    placeName: '',
    review: '',
    noofReviews: '',
    reviewContent: '',
    image: '',
  });

  const fetchUsers = async () => {
    const res = await axios.get('/api/users');
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddUser = async () => {
    await axios.post('/api/users', {
      ...formData,
      review: parseFloat(formData.review),
      noofReviews: parseInt(formData.noofReviews),
    });
    setFormData({ placeName: '', review: '', noofReviews: '', reviewContent: '', image: '' });
    setShowForm(false);
    fetchUsers();
  };

  const handleDelete = async (id: number) => {
    await axios.delete('/api/users', { data: { id } });
    fetchUsers();
  };

  const handleEdit = async (updatedUser: User) => {
    await axios.put('/api/users', updatedUser);
    fetchUsers();
  };

  // const sensors = useSensors(useSensor(PointerSensor));
  const sensors = useSensors(
  useSensor(PointerSensor),
  useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  })
);


  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = users.findIndex((u) => u.id === active.id);
      const newIndex = users.findIndex((u) => u.id === over?.id);
      setUsers((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Cart Section */}
      <div className="w-full md:w-1/2 overflow-y-scroll p-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-pink-600">Y2Z TRAVEL</h1>
          <button className="md:hidden">
            <FaBars className="text-2xl" />
          </button>
        </div>

        <div className="text-3xl font-bold mt-4">Itinerary</div>
        <div className="text-md text-gray-500 font-semibold mb-2">Day</div>

        {showForm && (
            <CreateNewCity
              formData={formData}
              onChange={handleInputChange}
              onSubmit={handleAddUser}
            />
          )}


        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 mt-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {showForm ? 'Close' : 'Add Place'}
        </button>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={users.map((u) => u.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-4 mt-4">
              {users.map((user) => (
                <SortableCart key={user.id} user={user} onDelete={handleDelete} onEdit={handleEdit} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* ImageComponent Section (hidden on small screens) */}
      <div className="hidden md:block w-full md:w-1/2 h-full">
        <ImageComponent />
      </div>
    </div>
  );
}

function SortableCart({ user, onDelete, onEdit }: { user: User; onDelete: (id: number) => void; onEdit: (data: User) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: user.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div className="px-2" ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Cart {...user} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
}
