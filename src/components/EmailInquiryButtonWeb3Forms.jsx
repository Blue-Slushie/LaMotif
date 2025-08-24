import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

export default function EmailInquiryButtonWeb3Forms({ product }) {
  const { formatPrice } = useContext(ShopContext);
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || ''; 
  const primaryImg = Array.isArray(product.image) ? product.image[0] : product.image;
  const priceText = formatPrice(product.price);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setOk(false);

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
        subject: `Inquiry: ${product.name} (${product._id})`,
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message || '(no message)',

        product_id: String(product._id),
        product_name: product.name,
        product_price: priceText,
        product_image: primaryImg || '',
        product_category: product.category || '',
        product_collection: product.subCategory || '',
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
        onClick={() => setOpen(true)}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-black text-white px-4 py-2 text-sm hover:opacity-90"
      >
        Email for Inquiry
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
          <path d="M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm15 3.236-6.708 5.366a1 1 0 0 1-1.284 0L4.3 7.236 4 7l.008 10H20V7l-1 .236zM5.119 6l6.281 5.027L17.681 6H5.119z"/>
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-md rounded-2xl bg-white shadow-xl">
            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold">Inquiry about {product.name}</h3>
                <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-black">✕</button>
              </div>

              <div className="mt-4 flex gap-3">
                {primaryImg && (
                  <img src={primaryImg} alt={product.name} className="w-16 h-16 rounded object-cover ring-1 ring-gray-200" />
                )}
                <div className="text-sm text-gray-700">
                  <div className="font-medium">{product.name}</div>
                  <div>SKU: {product._id}</div>
                  <div>Price: {priceText}</div>
                </div>
              </div>

              <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input className="rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-black/10"
                         name="name" placeholder="Your name *" value={form.name} onChange={onChange} />
                  <input className="rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-black/10"
                         name="email" type="email" placeholder="Your email *" value={form.email} onChange={onChange} />
                </div>
                <input className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-black/10"
                       name="phone" placeholder="Phone (optional)" value={form.phone} onChange={onChange} />
                <textarea className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-black/10"
                          name="message" rows={4} placeholder="Message (optional)" value={form.message} onChange={onChange} />

                {err && <div className="text-sm text-red-600">{err}</div>}
                {ok && <div className="text-sm text-green-700">Inquiry sent! We’ll get back to you shortly.</div>}

                <button type="submit" disabled={sending}
                        className="rounded-full bg-black text-white px-4 py-2 text-sm disabled:opacity-60">
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
}
