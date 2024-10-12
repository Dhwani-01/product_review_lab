// src/components/FormDisplay.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FormDisplay = () => {
    const { id } = useParams(); // Get form ID from the URL
    const [form, setForm] = useState(null);

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/forms/${id}`);
                setForm(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching form:', error);
            }
        };

        fetchForm();
    }, [id]);

    if (!form) return <p>Loading...</p>;

    return (
        <div>
            <h1>form</h1>
            <h2>{form.formName}</h2>
            {form.fields.map((field, index) => (
                <div key={index}>
                    <label>{field.label}</label>
                    {field.type === 'text' && <input type="text" placeholder={field.placeholder} />}
                    {field.type === 'email' && <input type="email" placeholder={field.placeholder} />}
                    {field.type === 'text-area' && <textarea placeholder={field.placeholder}></textarea>}
                    {field.type === 'dropdown' && (
                        <select>
                            {field.options.map((option, i) => (
                                <option key={i} value={option}>{option}</option>
                            ))}
                        </select>
                    )}
                    {/* Add other field types as needed */}
                </div>
            ))}
        </div>
    );
};

export default FormDisplay;
