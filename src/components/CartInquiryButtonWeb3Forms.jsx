// components/CartInquiryButtonWeb3Forms.jsx
import React, { useContext, useMemo, useState } from 'react';
import { ShopContext } from '../context/ShopContext';

const CartInquiryButtonWeb3Forms = ({ items = [], className = '' }) => {
  const { formatPrice } = useContext(ShopContext);

  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || ''; // required

  const itemLines = useMemo(() => {
    return items.map(({ product, qty }, i) => {
      const img = Array.isArray(product.image) ? product.image[0] : product.image;
      const parts = [
        `${i + 1}. ${product.name}`,
        `SKU: ${product._id}`,
        product.category ? `Category: ${product.category}` : '',
        product.subCategory && product.subCategory !== 'NULL' ? `Sub: ${product.subCategory}` : '',
        `Qty: ${qty}`,
        `Price: ${formatPrice(product.price)}`
      ].filter(Boolean);
      return parts.join(' | ');
    });
  }, [items, formatPrice]);

  const itemsJson = useMemo(() => {
    return JSON.stringify(
      items.map(({ product, qty }) => ({
        id: product._id,
        name: product.name,
        qty,
        category: product.category || '',
        subCategory: product.subCategory || '',
        priceText: formatPrice(product.price),
        image: Array.isArray(product.image) ? product.image[0] : product.image
      })),
      null,
      2
    );
  }, [items, formatPrice]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setOk(false);

    if (!items.length) {
      setErr('Your bag is empty.');
      return;
    }
    if (!accessKey) {
      setErr('Missing Web3Forms access key.');
      return;
    }
    if (!form.name || !form.email) {
      setErr('Please provide your name and email.');
      return;
    }

    setSending(true);
    try {
      const payload = {
        access_key: accessKey,
        subject: `Cart Inquiry (${items.length} item${items.length === 1 ? '' : 's'})`,
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message || '(no message)',

        items_text: itemLines.join('\n'),
        items_json: itemsJson,
      };

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        setOk(true);
        setForm({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setOpen(false), 1400);
      } else {
        setErr(data.message || 'Failed to send.');
      }
    } catch (e2) {
      setErr('Could not send your inquiry. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <button
        disabled={!items.length}
        onClick={() => setOpen(true)}
        className={`rounded-full bg-black text-white px-5 py-2 text-sm hover:opacity-90 disabled:opacity-50 ${className}`}
      >
        Inquiry for all
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-xl">
            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold">
                  Cart Inquiry ({items.length} item{items.length === 1 ? '' : 's'})
                </h3>
                <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-black">✕</button>
              </div>

              {/* Summary */}
              <div className="mt-3 max-h-40 overflow-auto rounded border bg-gray-50 p-3 text-xs text-gray-700 whitespace-pre-wrap">
                {itemLines.join('\n')}
              </div>

              {/* Form */}
              <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    className="rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-black/10"
                    name="name" placeholder="Your name *" value={form.name} onChange={onChange}
                  />
                  <input
                    className="rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-black/10"
                    name="email" type="email" placeholder="Your email *" value={form.email} onChange={onChange}
                  />
                </div>
                <input
                  className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-black/10"
                  name="phone" placeholder="Phone (optional)" value={form.phone} onChange={onChange}
                />
                <textarea
                  className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-black/10"
                  name="message" rows={4} placeholder="Message (optional)" value={form.message} onChange={onChange}
                />

                {err && <div className="text-sm text-red-600">{err}</div>}
                {ok && <div className="text-sm text-green-700">Inquiry sent! We’ll get back to you shortly.</div>}

                <button
                  type="submit"
                  disabled={sending}
                  className="rounded-full bg-black text-white px-4 py-2 text-sm disabled:opacity-60"
                >
                  {sending ? 'Sending…' : 'Send Inquiry'}
                </button>
              </form>

              <p className="mt-3 text-[11px] text-gray-500">
                Your info is used only to reply to this inquiry.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartInquiryButtonWeb3Forms;
