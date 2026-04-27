import { useState } from 'react';
import { createItem } from '../api';

export default function ItemForm({ onItemAdded }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createItem({ name, description, price: Number(price) });
            setName('');
            setDescription('');
            setPrice('');
            onItemAdded();
        } catch (error) {
            console.error('Error creating item:', error);
            alert('Failed to add item');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
            <h2>Add New Item</h2>
            <div style={{ marginBottom: '1rem' }}>
                <input
                    placeholder="Item name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                />
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', minHeight: '80px' }}
                />
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                />
            </div>
            <button type="submit" style={{ padding: '0.6rem 1.2rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Add Item
            </button>
        </form>
    );
}


