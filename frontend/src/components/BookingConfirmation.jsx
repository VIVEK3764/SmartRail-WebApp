import { useLocation, useNavigate } from 'react-router-dom';
import './BookingConfirmation.css';

const BookingConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { ticketDetails } = location.state || {};

    if (!ticketDetails) {
        return (
            <div className="confirmation-page">
                <div className="confirmation-container error">
                    <h2>No ticket details found</h2>
                    <button onClick={() => navigate('/')} className="back-btn">
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="confirmation-page">
            <div className="confirmation-container">
                <div className="confirmation-header">
                    <h2>Booking Confirmed!</h2>
                    <div className="pnr-number">PNR: {ticketDetails.pnr_number}</div>
                </div>

                <div className="ticket-details">
                    <div className="detail-row">
                        <div className="detail-group">
                            <label>Train Name:</label>
                            <div>{ticketDetails.train_name} (#{ticketDetails.train_number})</div>
                        </div>
                    </div>

                    <div className="detail-row">
                        <div className="detail-group">
                            <label>From:</label>
                            <div>{ticketDetails.source_station}</div>
                        </div>
                        <div className="detail-group">
                            <label>To:</label>
                            <div>{ticketDetails.destination_station}</div>
                        </div>
                    </div>

                    <div className="detail-row">
                        <div className="detail-group">
                            <label>Travel Date:</label>
                            <div>{ticketDetails.travel_date}</div>
                        </div>
                        <div className="detail-group">
                            <label>Class:</label>
                            <div>{ticketDetails.ticket_class}</div>
                        </div>
                    </div>

                    <div className="detail-row">
                        <div className="detail-group">
                            <label>Total Fare:</label>
                            <div>₹{ticketDetails.total_fare}</div>
                        </div>
                        <div className="detail-group">
                            <label>Status:</label>
                            <div className="status">{ticketDetails.status}</div>
                        </div>
                    </div>
                </div>

                <div className="confirmation-actions">
                    <button onClick={() => window.print()} className="print-btn">
                        Print Ticket
                    </button>
                    <button onClick={() => navigate('/')} className="back-btn">
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingConfirmation; 