'use client';

import React, { useState, useRef, useEffect } from 'react';
import emailjs from "@emailjs/browser";

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'failed'>('idle');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptTerms) {
      setStatus('failed'); // popup merah
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setStatus('success'); // popup hijau
      setFormData({ from_name: "", from_email: "", subject: "", message: "" });
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus('failed'); // popup merah
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    if (status !== 'idle') {
      const timer = setTimeout(() => setStatus('idle'), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const SOCIAL_ICONS = [
    {
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=100042779256645",
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898v-2.89h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562v1.873h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.99 22 12z"/>
        </svg>
      )
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/ndesooo__/",
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 2c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm4.5-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"/>
        </svg>
      )
    },
    {
      label: "GitHub",
      href: "https://github.com/mainbuat062-wq",
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .5C5.648.5.5 5.794.5 12.29c0 5.196 3.438 9.615 8.207 11.159.6.113.82-.27.82-.6v-2.087c-3.338.744-4.033-1.65-4.033-1.65-.546-1.434-1.333-1.814-1.333-1.814-1.09-.78.082-.765.082-.765 1.204.087 1.84 1.275 1.84 1.275 1.07 1.908 2.807 1.357 3.492 1.037.108-.803.418-1.357.762-1.67-2.665-.317-5.466-1.378-5.466-6.13 0-1.354.467-2.46 1.235-3.327-.123-.318-.536-1.594.117-3.32 0 0 1.008-.335 3.3 1.27a11.24 11.24 0 013.005-.41c1.02.005 2.047.144 3.005.41 2.29-1.606 3.297-1.27 3.297-1.27.655 1.726.242 3.002.119 3.32.77.867 1.233 1.973 1.233 3.327 0 4.765-2.804 5.81-5.476 6.12.43.392.823 1.16.823 2.34v3.47c0 .335.216.727.828.603C20.07 21.9 23.5 17.48 23.5 12.29 23.5 5.79 18.352.5 12 .5z"/>
        </svg>
      )
    },
    {
      label: "LinkedIn",
      href: "https://id.linkedin.com/in/zidni-ruf-3715aa376",
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
  <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7 0h5v2.5h.08c.69-1.25 2.37-2.57 4.87-2.57 5.21 0 6.05 3.43 6.05 7.87V24h-5v-7.5c0-1.79-.03-4.09-2.5-4.09-2.5 0-2.88 1.95-2.88 3.97V24H7V8z"/>
</svg>

      )
    }
  ];

  return (
    <section id="contact" className="pt-24 pb-20 relative">

      {/* POPUP */}
      {status !== 'idle' && (
        <div className={`fixed top-5 left-1/2 -translate-x-1/2 px-5 py-2 rounded-lg shadow-lg z-[9999] animate-fadeIn text-sm sm:text-base
          ${status === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}
        `}>
          {status === 'success' ? 'Message sent successfully!' : 'You must accept the terms & conditions.'}
        </div>
      )}

      {/* Title */}
      <div className="text-center px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">Contact Me</h2>
        <p className="text-base sm:text-lg mt-2 text-teal-300">Let's Talk About Ideas</p>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto mt-10 sm:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-10 px-4 sm:px-6">

        {/* SOCIAL ICONS */}
        <div className="flex flex-col lg:flex-col gap-4 lg:gap-8 lg:mt-12 order-1 lg:order-none ">
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
            {SOCIAL_ICONS.map((item, i) => (
              <a key={i} href={item.href} target="_blank" rel="noreferrer" className="flex items-center space-x-4 group">
                <div className="flex items-center justify-center rounded-full bg-teal-500/10 border border-teal-500/30 transition-all duration-300
                  group-hover:bg-teal-500/20 group-hover:shadow-[0_0_18px_6px_rgba(20,184,166,0.45)] group-hover:scale-110
                  w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14
                ">
                  {item.svg}
                </div>
                <span className="text-gray-200 text-base sm:text-lg group-hover:text-white transition">{item.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* CONTACT FORM */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="lg:col-span-2 text-white bg-transparent p-4 sm:p-6 lg:p-10 rounded-2xl order-2 lg:order-none"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block mb-1 text-sm">Full Name *</label>
              <input
                type="text"
                name="from_name"
                value={formData.from_name}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-black/20 border border-gray-500 focus:border-teal-300"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Email Address *</label>
              <input
                type="email"
                name="from_email"
                value={formData.from_email}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-black/20 border border-gray-500 focus:border-teal-300"
                required
              />
            </div>
          </div>

          <div className="mt-4 sm:mt-6">
            <label className="block mb-1 text-sm">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-black/20 border border-gray-500 focus:border-teal-300"
            />
          </div>

          <div className="mt-4 sm:mt-6">
            <label className="block mb-1 text-sm">Your Message *</label>
            <textarea
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-black/20 border border-gray-500 resize-none focus:border-teal-300"
              required
            />
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-6 gap-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="h-4 w-4"
              />
              <span className="text-sm text-gray-200">
                I accept the <a className="text-indigo-400 underline" href="#">terms & conditions</a>.
              </span>
            </label>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-7 py-3 bg-teal-500 hover:bg-teal-400 rounded-xl font-semibold disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>

      </div>
    </section>
  );
};

export default Contact;
