import React, { useEffect, useState } from 'react';
import { api } from '../../config/axiosInstence';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
   setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to view your cart.');
      setLoading(false);
      return;
    }

    try {
      const res = await api.get('/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setCart(res.data.data);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Unauthorized. Please log in again.');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

/*const removeFromCart = async (courseID) => {
    try {
      await api.delete(`/cart/remove/${courseID}`);
      fetchCart(); // refresh cart after removal
    } catch (err) {
      alert('Failed to remove course: ' + err.message);
    }
  };*/

   useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <div>Loading cart...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!cart || cart.courses.length === 0) return <div>Your cart is empty.</div>;

  return (
   <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <ul>
        {cart.courses.map(({ courseID, price }) => (
          <li key={courseID._id} className="mb-4 flex justify-between items-center border p-3 rounded">
            <div>
              <h2 className="text-xl font-semibold">{courseID.title}</h2>
              <p>Price: ₹{price}</p>
            </div>
            <button
              onClick={() => removeFromCart(courseID._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-right text-xl font-bold">
        Total: ₹{cart.totalPrice}
      </div>
      <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartPage