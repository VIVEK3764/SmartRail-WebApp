import { useState } from 'react';
import './findtrain.css'
import { SearchByLocation, SearchByName, SearchByNumber } from '../components/SearchForTrain';
function Profile() {

    const token = localStorage.getItem('token');
    console.log(token);
    return (
        <div className="find-train-page">
            hello
        </div>
    );
}

export default Profile;
