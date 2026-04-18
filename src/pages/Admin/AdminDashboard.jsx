import React, { useState } from 'react';
import { useGlobal } from '../../context/GlobalContext';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit, Save, X, Image as ImageIcon } from 'lucide-react';

const AdminDashboard = () => {
  const { products, updateProducts, heroSlides, updateHeroSlides, logout } = useGlobal();
  const [activeTab, setActiveTab] = useState('products');
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({ name: '', price: '', description: '', image: '' });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 100 * 1024) { // 100KB limit for demo, prompt said 50KB
        alert('Image too large. Please use an image under 50KB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (editingItem) {
          setEditingItem({ ...editingItem, image: reader.result });
        } else {
          setNewItem({ ...newItem, image: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addProduct = () => {
    if (!newItem.name || !newItem.price || !newItem.image) return;
    const productToAdd = { ...newItem, id: Date.now().toString() };
    updateProducts([...products, productToAdd]);
    setNewItem({ name: '', price: '', description: '', image: '' });
  };

  const deleteProduct = (id) => {
    updateProducts(products.filter(p => p.id !== id));
  };

  const saveEdit = () => {
    if (activeTab === 'products') {
      updateProducts(products.map(p => p.id === editingItem.id ? editingItem : p));
    } else {
      updateHeroSlides(heroSlides.map(s => s.id === editingItem.id ? editingItem : s));
    }
    setEditingItem(null);
  };

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h2>Dashboard</h2>
        <button onClick={logout} className="btn-outline" style={{ padding: '8px 20px' }}>Logout</button>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', borderBottom: '1px solid #ddd' }}>
        <button 
          onClick={() => setActiveTab('products')} 
          style={{ padding: '10px 20px', borderBottom: activeTab === 'products' ? '2px solid var(--accent-gold)' : 'none', color: activeTab === 'products' ? 'var(--accent-gold)' : '#666' }}
        >
          Manage Products
        </button>
        <button 
          onClick={() => setActiveTab('hero')} 
          style={{ padding: '10px 20px', borderBottom: activeTab === 'hero' ? '2px solid var(--accent-gold)' : 'none', color: activeTab === 'hero' ? 'var(--accent-gold)' : '#666' }}
        >
          Manage Hero Slides
        </button>
      </div>

      {activeTab === 'products' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          {/* Add New Product */}
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '15px', boxShadow: 'var(--shadow-soft)' }}>
            <h3 style={{ marginBottom: '20px' }}>Add New Product</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input 
                type="text" 
                placeholder="Name" 
                value={newItem.name} 
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
              />
              <input 
                type="number" 
                placeholder="Price" 
                value={newItem.price} 
                onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
              />
              <textarea 
                placeholder="Description" 
                value={newItem.description} 
                onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', height: '100px' }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} id="add-img" />
                <label htmlFor="add-img" style={{ cursor: 'pointer', padding: '10px 20px', backgroundColor: '#eee', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ImageIcon size={18} /> {newItem.image ? 'Image Selected' : 'Choose Image'}
                </label>
                {newItem.image && <img src={newItem.image} style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />}
              </div>
              <button onClick={addProduct} className="btn-premium" style={{ marginTop: '10px' }}>
                <Plus size={18} /> Add Product
              </button>
            </div>
          </div>

          {/* List Products */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {products.map(product => (
              <div key={product.id} style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '10px', boxShadow: 'var(--shadow-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <img src={product.image} style={{ width: '50px', height: '50px', borderRadius: '5px', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ fontSize: '0.95rem' }}>{product.name}</h4>
                    <p style={{ color: 'var(--accent-gold)', fontSize: '0.85rem' }}>${product.price}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => setEditingItem(product)} style={{ color: 'blue' }}><Edit size={18} /></button>
                  <button onClick={() => deleteProduct(product.id)} style={{ color: 'red' }}><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Similar structure for Hero Slides - simplified for brevity */
        <div>
          <h3>Manage Hero Slides</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
            {heroSlides.map(slide => (
              <div key={slide.id} style={{ backgroundColor: '#fff', borderRadius: '10px', overflow: 'hidden', boxShadow: 'var(--shadow-soft)' }}>
                <img src={slide.image} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                <div style={{ padding: '15px' }}>
                  <h4 style={{ marginBottom: '5px' }}>{slide.title}</h4>
                  <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '15px' }}>{slide.subtitle}</p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                     <button onClick={() => setEditingItem(slide)} style={{ fontSize: '0.85rem', color: 'blue' }}>Edit</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Modal (Simple) */}
      {editingItem && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zRef: 2000 }}>
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '15px', width: '400px' }}>
            <h3>Edit Item</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
              <input 
                type="text" 
                value={editingItem.name || editingItem.title} 
                onChange={(e) => setEditingItem({...editingItem, [activeTab === 'products' ? 'name' : 'title']: e.target.value})}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
              />
              <textarea 
                value={editingItem.description || editingItem.subtitle} 
                onChange={(e) => setEditingItem({...editingItem, [activeTab === 'products' ? 'description' : 'subtitle']: e.target.value})}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', height: '80px' }}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={saveEdit} className="btn-premium" style={{ flex: 1 }}><Save size={18} /> Save</button>
                <button onClick={() => setEditingItem(null)} className="btn-outline" style={{ flex: 1 }}><X size={18} /> Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
