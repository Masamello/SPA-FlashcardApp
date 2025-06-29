import React,{useContext,useState,useEffect} from "react";
import { AuthContext } from "../Context/AuthContext";
import './Profile.css';

const Profile = () =>{
    const { currentUser, updateProfile } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        birthday: '',
        gender: '',
        bio: ''
    });

    // currentUserが変更されたときにformDataを更新
    useEffect(() => {
        if (currentUser) {
            console.log('Current user data loaded:', currentUser); // デバッグ用
            setFormData({
                name: currentUser.name || '',
                birthday: currentUser.birthday || '',
                gender: currentUser.gender || '',
                bio: currentUser.bio || ''
            });
        }
    }, [currentUser]);

    const submitHandler = (e)=>{
        e.preventDefault();
        console.log('Submitting form data:', formData); // デバッグ用
        updateProfile(formData);
        alert('Profile updated successfully!');
    };

    // ユーザーがログインしていない場合
    if (!currentUser) {
        return (
            <div className="container mt-4">
                <div className="alert alert-warning">
                    Please log in to view your profile.
                </div>
            </div>
        );
    }

    return(
        <div className="profile-container">
            <div className="row">
                {/* left column profile form */}
                <div className="col-lg mb-4">
                    <div className="card profile-card">
                        <div className="card-body text-center">
                            <div className="profile-avatar mb-3">
                                {formData.gender ==='male'?(
                                    <i className="bi bi-person-circle display-4 text-primary"></i>
                                ):formData.gender === 'female'?(
                                    <i className="bi bi-person-circle display-4 text-danger"></i>
                                ):(
                                    <i className="bi bi-person-circle display-4 text-secondary"></i>
                                )}
                            </div>
                            <h3 className="profile-name">{formData.name || 'Anonymous'}</h3>
                            <p className="text-muted">Flashcard Learner</p>
                            <hr/>
                            <div className="profile-info">
                                <p>
                                    <i className="bi bi-gender-ambiguous me-2"></i>
                                    {formData.gender === 'male'?'Male':formData.gender === 'female' ? 'Female':'Other'}
                                </p>
                                {formData.birthday && (
                                    <p>
                                        <i className="bi bi-calendar3 me-2"></i>
                                        {new Date(formData.birthday).toLocaleDateString()}
                                    </p>
                                )}
                                {formData.bio && (
                                    <p>
                                        <i className="bi bi-chat-quote me-2"></i>
                                        {formData.bio}
                                    </p>
                                )}
                            </div>
                            {/* デバッグ情報表示 */}
                            <div className="mt-3 p-2 bg-light rounded">
                                <small className="text-muted">
                                    <strong>Debug Info:</strong><br/>
                                    Email: {currentUser.email}<br/>
                                    ID: {currentUser.id}<br/>
                                    Role: {currentUser.role}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>

                {/* right column edit form*/}
                <div className="col-lg-8">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h4 className="mb-0">Edit Profile</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={submitHandler}>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Full Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={formData.name} 
                                            onChange={(e)=>setFormData({...formData,name:e.target.value})}
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Birthday</label>
                                        <input 
                                            type="date" 
                                            className="form-control" 
                                            value={formData.birthday} 
                                            onChange={(e)=>setFormData({...formData, birthday:e.target.value})}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Gender</label>
                                        <select 
                                            className="form-select" 
                                            value={formData.gender} 
                                            onChange={(e)=>setFormData({...formData,gender:e.target.value})}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Bio</label>
                                        <textarea 
                                            className="form-control" 
                                            rows="3" 
                                            value={formData.bio} 
                                            onChange={(e)=>setFormData({...formData,bio:e.target.value})} 
                                            placeholder="Tell us about yourself"
                                        />
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary px-4">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
