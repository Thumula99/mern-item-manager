import { useEffect, useState } from 'react';
import { getItems, deleteItem } from '../api';

export default function ItemList({ refreshTrigger }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const res = await getItems();
            setItems(res.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [refreshTrigger]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await deleteItem(id);
                fetchItems();
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    if (loading) return <p>Loading items...</p>;

    return (
        <div>
            <h2>Item List</h2>
            {items.length === 0 ? (
                <p>No items found. Add some!</p>
            ) : (
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {items.map(item => (
                        <div key={item._id} style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <p><strong>Price:</strong> ${item.price}</p>
                            </div>
                            <button 
                                onClick={() => handleDelete(item._id)}
                                style={{ padding: '0.5rem 1rem', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
