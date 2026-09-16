import React, { useState, useEffect } from 'react';
import Hero from '../components/Common/Hero';
import { getNewsletters } from '../services/newsletterService';
import './NewsLetter.css';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

const NewsLetter = () => {
    const [newsletters, setNewsletters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNewsletters = async () => {
            try {
                setLoading(true);
                const response = await getNewsletters();
                const list = response?.data ?? (Array.isArray(response) ? response : []);
                setNewsletters(list);
            } catch (error) {
                console.error('Error fetching newsletters:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNewsletters();
    }, []);

    return (
        <div>
            <Hero title="NewsLetter"
                description="Get the latest updates and news from us"
                image="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            />
            <div className="container">
                <div className="row">
                    <h2 className='title'>NewsLetter</h2>
                    {loading ? (
                        <div className="text-center py-10">Loading newsletters...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {newsletters.length > 0 ? (
                                newsletters.map((item) => {
                                    const cleanPdf = (item.pdf || '').replace(/^\/+/, '');
                                    const fileSrc = item.pdf?.startsWith('http') ? item.pdf : `${BASE_URL}/${cleanPdf}`;
                                    return (
                                        <div key={item._id} className="newsletter-card shadow-lg rounded-lg overflow-hidden border border-gray-100 flex flex-col items-center bg-white">
                                            <img 
                                                src={fileSrc} 
                                                alt={item.title} 
                                                className="w-full h-auto object-cover max-h-96"
                                            />
                                            <div className="p-4 w-full text-center bg-gray-50">
                                                <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="col-span-full text-center py-10 text-gray-500">
                                    No newsletters available at the moment.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NewsLetter