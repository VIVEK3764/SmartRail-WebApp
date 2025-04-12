import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookingForm.css';

const BookingForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    const [formData, setFormData] = useState({
        passenger_name: '',
        age: '',
        gender: '',
        class: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const trainDetails = {
        train_number: queryParams.get('train_number'),
        train_name: queryParams.get('train_name'),
        source_station: queryParams.get('source_code'),
        source_name: queryParams.get('source_name'),
        destination_station: queryParams.get('destination_code'),
        destination_name: queryParams.get('destination_name'),
        travel_date: queryParams.get('display_date')
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:5000/book-ticket', {
                ...trainDetails,
                ...formData
            });

            if (response.data.success) {
                setSuccess(response.data.message);
                // Show ticket details
                const ticketDetails = response.data.ticket_details;
                navigate('/booking-confirmation', { state: { ticketDetails } });
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to book ticket. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="booking-page">
            <div className="booking-container">
                <div className="train-info">
                    <h2>{trainDetails.train_name} ('{trainDetails.train_number}')</h2>
                    <div className="journey-info">
                        <div className="station-group">
                            <label>From:</label>
                            <div>{trainDetails.source_name} ({trainDetails.source_station})</div>
                        </div>
                        <div className="station-group">
                            <label>To:</label>
                            <div>{trainDetails.destination_name} ({trainDetails.destination_station})</div>
                        </div>
                        <div className="date-group">
                            <label>Date:</label>
                            <div>{trainDetails.travel_date}</div>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="booking-form">
                    <div className="form-group">
                        <label>Select Class:</label>
                        <select
                            name="class"
                            value={formData.class}
                            onChange={handleInputChange}
                            required
                            className="form-select"
                        >
                            <option value="">Select a class</option>
                            <option value="1A">First AC (1A)</option>
                            <option value="2A">Second AC (2A)</option>
                            <option value="3A">Third AC (3A)</option>
                            <option value="SL">Sleeper (SL)</option>
                            <option value="CC">Chair Car (CC)</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Passenger Name:</label>
                        <input
                            type="text"
                            name="passenger_name"
                            value={formData.passenger_name}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Age:</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            required
                            min="1"
                            max="120"
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Gender:</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            required
                            className="form-select"
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <button type="submit" className="book-ticket-btn" disabled={loading}>
                        {loading ? 'Booking...' : 'Book Ticket'}
                    </button>
                </form>

                {error && <div className="error-alert">{error}</div>}
                {success && <div className="success-alert">{success}</div>}
            </div>
        </div>
    );
};

export default BookingForm; 